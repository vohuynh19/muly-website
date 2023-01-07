import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import adapter from 'webrtc-adapter';
import StreamRoomTest from '../TEST/StreamRoomTest';

import { Wrapper } from './styled';

const VideoPlayer = () => {
  return (
    <Wrapper>
      {/* <ReactPlayer className="react-player" width={'100%'} url="https://www.youtube.com/watch?v=ysz5S6PUM-U" playing controls />
      {adapter.browserDetails.browser}
      {adapter.browserDetails.version} */}
      <StreamRoomTest/>
    </Wrapper>
  );
};

export default VideoPlayer;
