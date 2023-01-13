import { Col, Row } from 'antd';
import ReactPlayer from 'react-player';

import ChatBox from './ChatBox';
import VideoInfo from './VideoInfo';
import VideoReaction from './VideoReaction';

const StreamRoom = (props: any) => {
  return (
    <Row>
      <Col span={18}>
        <VideoInfo />
        <ReactPlayer width={'100%'} height={480} url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
        <VideoReaction />
      </Col>

      <Col span={6}>
        <ChatBox roomId={props.slug} />
      </Col>
    </Row>
  );
};

export default StreamRoom;
