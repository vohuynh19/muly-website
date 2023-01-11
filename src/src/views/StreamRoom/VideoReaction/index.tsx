import { Button, Space } from 'antd';
import styled from 'styled-components';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ShareIcon from '@mui/icons-material/Share';
import FlagIcon from '@mui/icons-material/Flag';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 48px 0;

  button {
    width: 48px !important;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const VideoReaction = () => {
  return (
    <Wrapper>
      <Space size={32}>
        <Button icon={<ThumbUpIcon />} />
        <Button icon={<ThumbDownIcon />} />
        <Button icon={<ShareIcon />} />
        <Button icon={<FlagIcon />} />
      </Space>
    </Wrapper>
  );
};

export default VideoReaction;
