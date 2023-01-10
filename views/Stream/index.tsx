import { Button, Col, Input, InputRef, Row } from 'antd';
import { useRef, useState } from 'react';

const PC_CONFIG = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302',
    },
  ],
};

const Stream = () => {
  const input1Ref = useRef<InputRef>(null);
  const input2Ref = useRef<InputRef>(null);
  const pc = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [localSdp, setLocalSdp] = useState<any>();

  const startStream = async () => {
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

    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: 240,
        height: 240,
      },
    });
    localStreamRef.current = localStream;
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
      console.log('gogogo');
    }
  };

  const acceptOffer = async () => {
    const sdp = input1Ref.current?.input?.value;

    await pc.current?.setRemoteDescription(
      new RTCSessionDescription({
        sdp,
        type: 'offer',
      }),
    );
  };

  const createAnswer = async () => {
    const localSdp = await pc.current?.createAnswer({
      offerToReceiveVideo: true,
      offerToReceiveAudio: true,
    });

    if (!localSdp) {
      return;
    }

    await pc.current?.setLocalDescription(new RTCSessionDescription(localSdp));

    setLocalSdp(localSdp);
  };

  return (
    <Row>
      <Col span={24}>
        <Button onClick={startStream}>Start Stream</Button>
      </Col>

      <Col span={24}>
        <Input ref={input1Ref} />
        <Button onClick={acceptOffer}>Accept Offer SDP</Button>
      </Col>

      <Col span={24}>
        <Input ref={input2Ref} />
        <Button onClick={createAnswer}>Create Answer SDP</Button>
      </Col>

      <Col span={24}>
        <h1>{localSdp ? localSdp.sdp.toString() : 'Please create SDP'}</h1>
      </Col>

      <Col span={24}>
        <video autoPlay muted={true} ref={localVideoRef} style={{ width: 240, height: 240 }} />
      </Col>
    </Row>
  );
};

export default Stream;
