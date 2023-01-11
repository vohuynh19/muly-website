import { Button, Space } from 'antd';
import { FC } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { DescItem, Info, Spacer, Title, Wrapper, Avatar } from './styled';

type PropsType = {
  title: string;
  avatarUrl: string;
  streamerName: string;
  viewCount: number;
};

const VideoInfo: FC<Partial<PropsType>> = ({
  title = 'Hom nay troi that dep',
  avatarUrl = '/assets/images/favicon.png',
  streamerName = 'Loc phu ho',
  viewCount = 130234,
}) => {
  return (
    <Wrapper>
      <Avatar src={avatarUrl} />
      <Info>
        <Title>{title}</Title>
        <Space size={16}>
          <DescItem>
            <PersonIcon fontSize="small" />
            {streamerName}
          </DescItem>

          <DescItem>
            <RemoveRedEyeIcon fontSize="small" />
            {viewCount}
          </DescItem>
        </Space>
      </Info>

      <Spacer />

      <Button>Share</Button>
    </Wrapper>
  );
};

export default VideoInfo;
