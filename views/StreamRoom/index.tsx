import { Col, Row } from 'antd';

const StreamRoom = () => {
  return (
    <Row>
      <Col xs={12} sm={12} md={12}>
        <div style={{ width: '100%', minHeight: '600px', backgroundColor: 'grey' }}> </div>
      </Col>

      <Col xs={12} sm={12} md={12}>
        <Row>
          <Col span={24}>
            <div style={{ width: '100%', minHeight: '300px', backgroundColor: 'blue' }}> </div>
          </Col>
          <Col span={12}>
            <div style={{ width: '100%', minHeight: '300px', backgroundColor: 'green' }}> </div>
          </Col>
          <Col span={12}>
            <div style={{ width: '100%', minHeight: '300px', backgroundColor: 'grey' }}> </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default StreamRoom;
