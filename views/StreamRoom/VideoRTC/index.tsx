import useDebouncedCallback from '@src/hooks/useDebounceCallback';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';
import Video from './Video';

export type WebRTCUser = {
  id: string;
  email: string;
  stream: MediaStream;
};

const pc_config = {
  iceServers: [
    {
      urls: 'stun:relay.metered.ca:80',
    },
    {
      urls: 'turn:relay.metered.ca:80',
      username: 'c68320f96ec907f1df6af2d1',
      credential: '8ishceLvdUrTBe2n',
    },
    {
      urls: 'turn:relay.metered.ca:443',
      username: 'c68320f96ec907f1df6af2d1',
      credential: '8ishceLvdUrTBe2n',
    },
    {
      urls: 'turn:relay.metered.ca:443?transport=tcp',
      username: 'c68320f96ec907f1df6af2d1',
      credential: '8ishceLvdUrTBe2n',
    },
  ],
};

const myEmail = 'vohuynh01092002@gmail.com';
const SOCKET_SERVER_URL = '18.144.54.166:9001';

const StreamRoomTest = () => {
  const socketRef = useRef<Socket<any, any>>();
  const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream>();
  const [users, setUsers] = useState<WebRTCUser[]>([]);

  const getLocalStream = useDebouncedCallback(
    async () => {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            width: 240,
            height: 240,
          },
        });
        localStreamRef.current = localStream;
        if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
        if (!socketRef.current) return;
        console.log('run here', socketRef.current);

        socketRef.current.emit('join_room', {
          room: '1234',
          email: myEmail,
        });
      } catch (e) {
        console.log(`getUserMedia error: ${e}`);
      }
    },
    500,
    [],
  );

  const createPeerConnection = useCallback((socketID: string, email: string) => {
    try {
      const pc = new RTCPeerConnection(pc_config);

      pc.onicecandidate = (e) => {
        if (!(socketRef.current && e.candidate)) return;
        console.log('onicecandidate');
        socketRef.current.emit('candidate', {
          candidate: e.candidate,
          candidateSendID: socketRef.current.id,
          candidateReceiveID: socketID,
        });
      };

      pc.oniceconnectionstatechange = (e) => {
        console.log(e);
      };

      pc.ontrack = (e) => {
        console.log('ontrack success');
        setUsers((oldUsers) =>
          oldUsers
            .filter((user) => user.id !== socketID)
            .concat({
              id: socketID,
              email,
              stream: e.streams[1],
            }),
        );
      };

      if (localStreamRef.current) {
        console.log('localstream add');
        localStreamRef.current.getTracks().forEach((track) => {
          if (!localStreamRef.current) return;
          console.log('add track');
          pc.addTrack(track, localStreamRef.current);
        });
      } else {
        console.log('no local stream');
      }

      return pc;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }, []);

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      transports: ['websocket'],
    });

    getLocalStream();

    socketRef.current.on('all_users', (allUsers: Array<{ id: string; email: string }>) => {
      allUsers.forEach(async (user) => {
        // id: socket.id, email: data.email
        if (!localStreamRef.current) return;
        const pc = createPeerConnection(user.id, user.email);
        if (!(pc && socketRef.current)) return;
        pcsRef.current = { ...pcsRef.current, [user.id]: pc };

        try {
          const localSdp = await pc.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
          });

          console.log('create offer success');
          await pc.setLocalDescription(new RTCSessionDescription(localSdp));
          socketRef.current.emit('offer', {
            sdp: localSdp,
            offerSendID: socketRef.current.id,
            offerSendEmail: myEmail,
            offerReceiveID: user.id,
          });
        } catch (e) {
          console.error(e);
        }
      });
    });

    socketRef.current.on(
      'getOffer',
      async (data: { sdp: RTCSessionDescription; offerSendID: string; offerSendEmail: string }) => {
        const { sdp, offerSendID, offerSendEmail } = data;
        console.log('get offer');
        if (!localStreamRef.current) return;
        const pc = createPeerConnection(offerSendID, offerSendEmail);
        if (!(pc && socketRef.current)) return;
        pcsRef.current = { ...pcsRef.current, [offerSendID]: pc };
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          console.log('answer set remote description success');
          const localSdp = await pc.createAnswer({
            offerToReceiveVideo: true,
            offerToReceiveAudio: true,
          });
          await pc.setLocalDescription(new RTCSessionDescription(localSdp));
          socketRef.current.emit('answer', {
            sdp: localSdp,
            answerSendID: socketRef.current.id,
            answerReceiveID: offerSendID,
          });
        } catch (e) {
          console.error(e);
        }
      },
    );

    socketRef.current.on('getAnswer', (data: { sdp: RTCSessionDescription; answerSendID: string }) => {
      const { sdp, answerSendID } = data;
      console.log('get answer');
      const pc: RTCPeerConnection = pcsRef.current[answerSendID];
      if (!pc) return;
      pc.setRemoteDescription(new RTCSessionDescription(sdp));
    });

    socketRef.current.on('getCandidate', async (data: { candidate: RTCIceCandidateInit; candidateSendID: string }) => {
      console.log('get candidate');
      const pc: RTCPeerConnection = pcsRef.current[data.candidateSendID];
      if (!pc) return;
      await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      console.log('candidate add success');
    });

    socketRef.current.on('user_exit', (data: { id: string }) => {
      if (!pcsRef.current[data.id]) return;
      pcsRef.current[data.id].close();
      delete pcsRef.current[data.id];
      setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
    });

    return () => {
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current?.disconnect();
      }

      users.forEach((user) => {
        if (!pcsRef.current[user.id]) return;
        pcsRef.current[user.id].close();
        delete pcsRef.current[user.id];
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createPeerConnection]);

  return (
    <div>
      <div>{users.length}</div>
      <video
        style={{
          width: '100%',
          height: '480px',
          backgroundColor: 'black',
        }}
        muted
        ref={localVideoRef}
        autoPlay
      />

      {users.map((user, index) => (
        <Video key={index} email={user.email} stream={user.stream} />
      ))}
    </div>
  );
};

export default StreamRoomTest;
