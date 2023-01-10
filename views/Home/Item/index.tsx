import { PAGE_ROUTES } from '@src/utils/constants/routes';
import Link from 'next/link';
import { FC } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { ItemWrapper } from './styled';
import { Text } from './styled';
type ItemProps = {
  id: string;
  src: string;
  title: string;
  des: string;
  height?: string;
  width?: string;
  isBanner?: boolean;
};
const Item: FC<ItemProps> = (props: ItemProps) => {
  return (
    <Link href={PAGE_ROUTES.STREAM_ROOM(props.id)}>
      <ItemWrapper height={props.height} width={props.width} style={{ backgroundImage: `url(${props.src})` }}>
        {props.isBanner ? (
          <>
            <Text bottom={80} left={16} weight={700} size="xxl">
              {props.title}
            </Text>
            <Text bottom={24} left={16} size="lg">
              {props.des}
            </Text>
          </>
        ) : (
          <>
            <Text bottom={40} left={16} weight={700} size="lg">
              {props.title}
            </Text>
            <Text bottom={16} left={16} size="md">
              {props.des}
            </Text>
          </>
        )}

        <div className="player">
          <PlayArrowIcon fontSize={'large'} />
        </div>
      </ItemWrapper>
    </Link>
  );
};

export default Item;
