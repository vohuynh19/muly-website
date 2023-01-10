import { PAGE_ROUTES } from '@src/utils/constants/routes';
import { uuid } from '@src/utils/functions/uuid';
import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import Item from './Item';
import { Card, HorizontalList, Section, Text } from './styled';

const mock = [
  {
    id: uuid(),
    src: 'assets/images/video-thumbnail-3.jpeg',
    title: 'Loc Phu Ho',
    des: 'Stream title dai vai lol ne thang ngu hocccccccccccccccdddddddd',
  },
  {
    id: uuid(),
    src: 'assets/images/video-thumbnail-3.jpeg',
    title: 'Loc Phu Ho',
    des: 'Stream title dai vai lol ne thang ngu hocccccccccccccccdddddddd',
  },
  {
    id: uuid(),
    src: 'assets/images/video-thumbnail-3.jpeg',
    title: 'Loc Phu Ho',
    des: 'Stream title dai vai lol ne thang ngu hocccccccccccccccdddddddd',
  },
  {
    id: uuid(),
    src: 'assets/images/video-thumbnail-3.jpeg',
    title: 'Loc Phu Ho',
    des: 'Stream title dai vai lol ne thang ngu hocccccccccccccccdddddddd',
  },
  {
    id: uuid(),
    src: 'assets/images/video-thumbnail-3.jpeg',
    title: 'Loc Phu Ho',
    des: 'Stream title dai vai lol ne thang ngu hocccccccccccccccdddddddd',
  },
];
const Home = () => {
  const router = useRouter();

  const routingHandler = () => {
    router.push(PAGE_ROUTES.STREAM_ROOM('1'));
  };

  return (
    <div>
      <Row>
        <Col xs={24} sm={24} md={12}>
          <Card onClick={routingHandler} style={{ backgroundImage: 'url(assets/images/video-thumbnail-1.jpeg)' }} height={400} />
        </Col>
        <Col xs={0} sm={0} md={12}>
          <Row>
            <Col span={24}>
              <Card
                onClick={routingHandler}
                style={{ backgroundImage: 'url(assets/images/video-thumbnail-2.jpeg)' }}
                height={200}
              />
            </Col>
            <Col span={12}>
              <Card
                onClick={routingHandler}
                style={{ backgroundImage: 'url(assets/images/video-thumbnail-3.jpeg)' }}
                height={200}
              />
            </Col>
            <Col span={12}>
              <Card
                onClick={routingHandler}
                style={{ backgroundImage: 'url(assets/images/video-thumbnail-3.jpeg)' }}
                height={200}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Section>
        <Text>Hot Streamers</Text>
        <HorizontalList>
          {mock.map((streamRoom) => (
            <Item key={uuid()} {...streamRoom} />
          ))}
        </HorizontalList>
      </Section>
    </div>
  );
};

export default Home;
