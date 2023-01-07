import { Col, Row } from 'antd';
import { Card, Text } from './styled';

const Home = () => {
  return (
    <div>
      <Row>
        <Col xs={24} sm={12} md={12}>
          <Card src="assets/images/video-thumbnail-1.jpeg" height={400} />
        </Col>
        <Col xs={0} sm={0} md={12}>
          <Row>
            <Col span={24}>
              <Card src="assets/images/video-thumbnail-2.jpeg" height={200} />
            </Col>
            <Col span={12} style={{ backgroundColor: 'green', height: '200px' }}>
              <Card src="assets/images/video-thumbnail-3.jpeg" height={200} />
            </Col>
            <Col span={12} style={{ backgroundColor: 'black', height: '200px' }}>
              <Card src="assets/images/video-thumbnail-3.jpeg" height={200} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Text></Text>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
