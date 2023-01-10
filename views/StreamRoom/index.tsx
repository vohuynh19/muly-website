import axiosInstance from '@src/apis/axios';
import { Button, Col, Input, InputRef, Row } from 'antd';
import { useRef, useState } from 'react';

import ChatBox from './ChatBox';
import VideoInfo from './VideoInfo';
import VideoReaction from './VideoReaction';
import VideoRTC from './VideoRTC';

// const StreamRoom = () => {
//   return (
//     <Row>
//       <Col span={18}>
//         <VideoInfo />
//         <VideoRTC />
//         <VideoReaction />
//       </Col>

//       <Col span={6}>
//         <ChatBox />
//       </Col>
//     </Row>
//   );
// };

const PC_CONFIG = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302',
    },
  ],
};

const sentLocalSdp = async (localSdp: RTCSessionDescriptionInit) => {
  await axiosInstance.post('http://localhost:9000/chat/sdp', localSdp);
};

const getRemoteSdp = async (): Promise<RTCSessionDescriptionInit> => {
  const { data } = await axiosInstance.get('http://localhost:9000/chat/sdp/hello');
  return {
    sdp: data[0].sdp,
    type: data[0].type,
  };
};
const StreamRoom = () => {
  const pc = useRef<RTCPeerConnection | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const initConnection = async () => {
    pc.current = new RTCPeerConnection(PC_CONFIG);

    pc.current.onicecandidate = (e) => {
      console.log('onicecandidate', e);
    };

    pc.current.oniceconnectionstatechange = (e) => {
      console.log('oniceconnectionstatechange', e);
    };

    pc.current.ontrack = (e) => {
      console.log('ontrack success', e);
    };
  };

  const createOffer = async () => {
    const localSdp = await pc.current?.createOffer({
      offerToReceiveVideo: true,
      offerToReceiveAudio: true,
    });
    if (!localSdp) return;
    await pc.current?.setLocalDescription(new RTCSessionDescription(localSdp));
    await sentLocalSdp(localSdp);
  };

  const acceptAnswer = async () => {
    const sdp = await getRemoteSdp();
    await pc.current?.setRemoteDescription(new RTCSessionDescription(sdp));
  };

  return (
    <Row>
      <Col span={24}>
        <Button onClick={initConnection}>Init connection</Button>
      </Col>

      <Col span={24}>
        <Button onClick={createOffer}>Create Offer SDP</Button>
      </Col>

      <Col span={24}>
        <Button onClick={acceptAnswer}>Accepted Answer SDP</Button>
      </Col>

      <Col span={24}>
        <video autoPlay muted={true} ref={remoteVideoRef} style={{ width: 240, height: 240 }} />
      </Col>
    </Row>
  );
};

export default StreamRoom;
