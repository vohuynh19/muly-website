import { Col, Row } from 'antd';

import ChatBox from './ChatBox';
import VideoInfo from './VideoInfo';
import VideoReaction from './VideoReaction';
import VideoRTC from './VideoRTC';

const StreamRoom = () => {
  return (
    <Row>
      <Col span={18}>
        <VideoInfo />
        <VideoRTC />
        <VideoReaction />
      </Col>

      <Col span={6}>
        <ChatBox />
      </Col>
    </Row>
  );
};

export default StreamRoom;
