import { PAGE_ROUTES } from '@src/utils/constants/routes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { ItemWrapper } from './styled';

type ItemProps = {
  id: string;
  src: string;
};

const Item: FC<ItemProps> = ({ id, src }) => {
  return (
    <Link href={PAGE_ROUTES.STREAM_ROOM(id)}>
      <ItemWrapper src={src}></ItemWrapper>
    </Link>
  );
};

export default Item;
