import axiosInstance from '@src/apis/axios';
import { Button, Col, Input, InputRef, Row } from 'antd';
import { useRef, useState } from 'react';

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

const Stream = () => {
  const pc = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

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

  const createAnswer = async () => {
    const localSdp = await pc.current?.createAnswer({
      offerToReceiveVideo: true,
      offerToReceiveAudio: true,
    });
    if (!localSdp) return;

    await pc.current?.setLocalDescription(new RTCSessionDescription(localSdp));
    await sentLocalSdp(localSdp);
  };

  const acceptOffer = async () => {
    const sdp = await getRemoteSdp();
    await pc.current?.setRemoteDescription(sdp);
  };

  return (
    <Row>
      <Col span={24}>
        <Button onClick={startStream}>Start Stream</Button>
      </Col>

      <Col span={24}>
        <Button onClick={acceptOffer}>Accept Offer SDP</Button>
      </Col>

      <Col span={24}>
        <Button onClick={createAnswer}>Create Answer SDP</Button>
      </Col>

      <Col span={24}>
        <video autoPlay muted={true} ref={localVideoRef} style={{ width: 240, height: 240 }} />
      </Col>
    </Row>
  );
};

export default Stream;
