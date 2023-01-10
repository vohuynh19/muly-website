import { uuid } from '@src/utils/functions/uuid';
import Item from './Item';
import { HorizontalList, Section, Text } from './styled';

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
  return (
    <div>
      <div style={{ padding: '16px 24px' }}>
        <Item isBanner height="400px" width="100%" key={uuid()} {...mock[0]} />
      </div>

      <Section>
        <Text>{'Hot Streamers'}</Text>
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
