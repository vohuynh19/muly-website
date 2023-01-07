import { Col, Row } from 'antd';

import ChatBox from './ChatBox';
import StreamerInfo from './StreamerInfo';
import VideoInfo from './VideoInfo';
import VideoPlayer from './VideoPlayer';

const StreamRoom = () => {
  return (
    <Row>
      <Col span={18}>
        <VideoPlayer />
        <VideoInfo />
        <StreamerInfo />
      </Col>

      <Col span={6}>
        <ChatBox />
      </Col>
    </Row>
  );
};

export default StreamRoom;
