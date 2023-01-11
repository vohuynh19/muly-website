import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import styled from 'styled-components';

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

const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 100vh;
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
`;

const StyledVideo = styled.video`
  height: 40%;
  width: 50%;
`;

const Video = (props: any) => {
  const ref = useRef<any>();

  useEffect(() => {
    props.peer.on('stream', (stream: any) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

const SOCKET_SERVER_URL = '18.144.54.166:8000';

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const Room = (props: any) => {
  const [peers, setPeers] = useState<any>([]);
  const socketRef = useRef<any>();
  const userVideo = useRef<any>();
  const peersRef = useRef<any>([]);
  const roomID = '1';

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      transports: ['websocket'],
    });

    navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then((stream) => {
      userVideo.current.srcObject = stream;
      socketRef.current.emit('join room', roomID);

      console.log('all users');

      socketRef.current.on('all users', (users: any) => {
        const peers: any = [];
        users.forEach((userID: any) => {
          const peer = createPeer(userID, socketRef.current.id, stream);

          peersRef.current.push({
            peerID: userID,
            peer,
          });

          peers.push(peer);
        });
        setPeers(peers);
      });

      // Kết nối với các peer có sẳn
      socketRef.current.on('user joined', (payload: any) => {
        console.log('user joined');

        const peer = addPeer(payload.signal, payload.callerID, stream);
        peersRef.current.push({
          peerID: payload.callerID,
          peer,
        });

        setPeers((users: any) => [...users, peer]);
      });

      socketRef.current.on('receiving returned signal', (payload: any) => {
        const item = peersRef.current.find((p: any) => p.peerID === payload.id);
        item.peer.signal(payload.signal);
      });
    });
  }, []);

  function createPeer(userToSignal: any, callerID: any, stream: any) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
      config: pc_config,
    });

    peer.on('signal', (signal) => {
      console.log('sending signal');

      socketRef.current.emit('sending signal', {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal: any, callerID: any, stream: any) {
    console.log('addPeer');

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
      config: pc_config,
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('returning signal', { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <Container>
      <StyledVideo muted ref={userVideo} autoPlay playsInline />
      {peers.map((peer: any, index: any) => {
        return <Video key={index} peer={peer} />;
      })}
    </Container>
  );
};

export default Room;
