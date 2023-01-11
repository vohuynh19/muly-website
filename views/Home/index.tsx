import axiosInstance from '@src/apis/axios';
import { ENDPOINTS } from '@src/apis/endpoints';
import { uuid } from '@src/utils/functions/uuid';
import { useQuery } from 'react-query';
import Item from './Item';
import { HorizontalList, Section, Text } from './styled';

const defaultFilter = {
  filter: {},
  sort: {
    createdAt: -1,
  },
  page: 1,
  limit: 10,
};

const Home = () => {
  const { data } = useQuery('stream-room/all', () => axiosInstance.post(ENDPOINTS.STREAM_ROOM.GET, defaultFilter));

  if (!data?.data) {
    return null;
  }

  return (
    <div>
      <div style={{ padding: '16px 24px' }}>
        <Item
          isBanner
          height="400px"
          width="100%"
          key={uuid()}
          src={data?.data.docs[0].thumbnail || 'assets/images/video-thumbnail-3.jpeg'}
          {...data?.data.docs[0]}
        />
      </div>

      <Section>
        <Text>{'Hot Streamers'}</Text>
        <HorizontalList>
          {data?.data.docs.map((streamRoom: any) => (
            <Item
              key={streamRoom._id}
              id={streamRoom._id}
              isBanner
              src={streamRoom.thumbnail || 'assets/images/video-thumbnail-3.jpeg'}
              title={streamRoom.title}
              des={streamRoom.des}
            />
          ))}
        </HorizontalList>
      </Section>
    </div>
  );
};

export default Home;
