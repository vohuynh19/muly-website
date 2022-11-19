import { useState } from 'react';
import { useRouter } from 'next/router';

import PAGES_ROUTES from '~/src/routes';
import { uuid } from '~/libs';

import { Icon, PopoverIconButton } from '@ui';
import SearchBar from './SearchBar';
import {
  AvatarPopoverView,
  CountryPopoverView,
  DownloadPopoverView,
  HistoryPopoverView,
  MySubscribePopoverView,
  SettingPopoverView,
} from './PopoverView';

import { Wrapper, Logo, BodyWrapper, LeftTabList, RightTabList, UnderlineItem, DepositButton } from './styled';

const linkList = [
  {
    title: 'Trang chủ',
    url: PAGES_ROUTES.HOME,
  },
  {
    title: 'Trực tiếp',
    url: PAGES_ROUTES.LIVES,
  },
  {
    title: 'Cộng đồng',
    url: PAGES_ROUTES.COMMUNITY,
  },
];

const Header = () => {
  const router = useRouter();

  const [visible, setVisible] = useState(false);

  return (
    <Wrapper>
      <Logo />

      <BodyWrapper>
        <LeftTabList>
          {linkList.map((item) => (
            <UnderlineItem
              key={uuid()}
              onClick={() => {
                router.push(item.url);
              }}
              isActive={router.pathname === item.url}
            >
              {item.title}
            </UnderlineItem>
          ))}
        </LeftTabList>

        <RightTabList>
          <SearchBar />
          <DepositButton>
            <Icon name="download" />
            <div>Nạp</div>
          </DepositButton>

          <PopoverIconButton
            behavior={'hover'}
            onClick={() => {
              router.push(PAGES_ROUTES.DOWNLOAD);
            }}
            popoverView={<DownloadPopoverView />}
          >
            <Icon name="download" />
          </PopoverIconButton>

          <PopoverIconButton
            onClick={() => {
              router.push(PAGES_ROUTES.INFORMATION.MY_SUBSCRIBE);
            }}
            popoverView={<MySubscribePopoverView />}
          >
            <Icon name="download" />
          </PopoverIconButton>
          <PopoverIconButton popoverView={<HistoryPopoverView />}>
            <Icon name="download" />
          </PopoverIconButton>

          <PopoverIconButton popoverView={<CountryPopoverView />} behavior="click">
            <Icon name="download" />
          </PopoverIconButton>

          <PopoverIconButton popoverView={<CountryPopoverView />} behavior="click">
            <Icon name="download" />
          </PopoverIconButton>

          <PopoverIconButton popoverView={<SettingPopoverView />} behavior="click">
            <Icon name="download" />
          </PopoverIconButton>

          <PopoverIconButton popoverView={<AvatarPopoverView />} behavior="click">
            <Icon name="download" />
          </PopoverIconButton>
        </RightTabList>
      </BodyWrapper>
    </Wrapper>
  );
};

export default Header;
