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

const StreamRoom = () => {
  const inputRef = useRef<InputRef>(null);
  const pc = useRef<RTCPeerConnection | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [localSdp, setLocalSdp] = useState<any>();

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

    if (!localSdp) {
      return;
    }

    console.log(localSdp);

    await pc.current?.setLocalDescription(new RTCSessionDescription(localSdp));
    setLocalSdp(localSdp);
  };

  const acceptAnswer = async () => {
    const sdp = inputRef.current?.input?.value;

    await pc.current?.setRemoteDescription(
      new RTCSessionDescription({
        sdp,
        type: 'answer',
      }),
    );
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
        <h1>{localSdp ? localSdp.sdp.toString() : 'Please create SDP'}</h1>
      </Col>

      <Col span={24}>
        <Input ref={inputRef} />
        <Button onClick={acceptAnswer}>Accepted Answer SDP</Button>
      </Col>

      <Col span={24}>
        <video autoPlay muted={true} ref={remoteVideoRef} style={{ width: 240, height: 240 }} />
      </Col>
    </Row>
  );
};

export default StreamRoom;
