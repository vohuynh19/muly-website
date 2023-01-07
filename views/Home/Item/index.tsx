import { PAGE_ROUTES } from '@src/utils/constants/routes';
import Link from 'next/link';
import { FC } from 'react';
import { ItemWrapper } from './styled';
import { Text } from './styled';

type ItemProps = {
  id: string;
  src: string;
  title: string;
  des: string;
};

const Item: FC<ItemProps> = (props: ItemProps) => {
  return (
    <Link href={PAGE_ROUTES.STREAM_ROOM(props.id)}>
      <ItemWrapper src={props.src}>
        <Text bottom={40} left={16} weight={700} size="lg">
          {props.title}
        </Text>
        <Text bottom={16} left={16} size="md">
          {props.des}
        </Text>
      </ItemWrapper>
    </Link>
  );
};

export default Item;
