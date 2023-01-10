import { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import CameraIcon from '@mui/icons-material/Camera';

import { Wrapper, ScreenView, ToolBar, ToolbarButton, ScreenWrapper } from './styled';
import PostModal, { ModelHandler } from './PostModal';

const Stream = () => {
  const [isShareScreen, setIsShareScreen] = useState(false);
  const [isTurnOnCamera, setIsTurnOnCamera] = useState(false);

  const cameraRef = useRef<HTMLVideoElement | null>(null);
  const displayRef = useRef<HTMLVideoElement | null>(null);

  const streamCameraRef = useRef<MediaStream | null>(null);
  const streamDisplayRef = useRef<MediaStream | null>(null);

  const modelRef = useRef<ModelHandler>(null);

  const turnCamera = () => {
    if (isTurnOnCamera) {
      setIsTurnOnCamera(false);
      disconnectCamera();
      return;
    }

    navigator.mediaDevices.getUserMedia({ video: { width: 240, height: 240 } }).then((value) => {
      setIsTurnOnCamera(true);
      cameraRef.current!.srcObject = value;
      streamCameraRef.current = value;
    });
  };

  const shareScreen = () => {
    if (isShareScreen) {
      setIsShareScreen(false);
      disconnectDisplay();
      return;
    }

    navigator.mediaDevices.getDisplayMedia().then((value) => {
      displayRef.current!.srcObject = value;
      streamDisplayRef.current = value;

      setIsShareScreen(true);
    });
  };

  const disconnectCamera = () => {
    streamCameraRef.current?.getTracks()?.forEach((track) => {
      track.stop();
    });
  };

  const disconnectDisplay = () => {
    streamDisplayRef.current?.getTracks()?.forEach((track) => {
      track.stop();
    });
  };

  useEffect(() => {
    return () => {
      disconnectCamera();
      disconnectDisplay();
    };
  }, []);

  return (
    <Wrapper>
      <ScreenWrapper>
        {<ScreenView show={isTurnOnCamera} autoPlay ref={cameraRef} />}
        {<ScreenView show={isShareScreen} autoPlay ref={displayRef} />}
      </ScreenWrapper>

      <ToolBar>
        <ToolbarButton active={isTurnOnCamera} onClick={turnCamera}>
          <CameraIcon />
          Turn on camera
        </ToolbarButton>

        <ToolbarButton active={isShareScreen} onClick={shareScreen}>
          <ScreenShareIcon />
          Share screen
        </ToolbarButton>

        <Button onClick={() => modelRef.current?.toggle()} style={{ marginTop: 24 }} type="primary" size="large">
          Start Stream
        </Button>
      </ToolBar>

      <PostModal ref={modelRef} />
    </Wrapper>
  );
};

export default Stream;
