import { Col, Row } from 'antd';

const Home = () => {
  return (
    <div>
      <Row>
        <Col xs={24} sm={12} md={12} style={{ backgroundColor: 'red', height: '400px' }}></Col>
        <Col xs={0} sm={0} md={12}>
          <Row>
            <Col span={24}></Col>
            <Col span={12} style={{ backgroundColor: 'green', height: '200px' }}></Col>
            <Col span={12} style={{ backgroundColor: 'black', height: '200px' }}></Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
