import { useRouter } from 'next/router';
import PAGES_ROUTES from '~/src/routes';
import PopoverIconButton from '@components/widgets/PopoverIconButton';
import SearchBar from './SearchBar';
import DownloadPopoverView from './PopoverView/DownloadPopoverView';
import MySubscribePopoverView from './PopoverView/MySubscribePopoverView';
import HistoryPopoverView from './PopoverView/HistoryPopoverView';
import CountryPopoverView from './PopoverView/CountryPopoverView';
import Icons from '~/src/assets/icons';
import SettingPopoverView from './PopoverView/SettingPopoverView';
import AvatarPopoverView from './PopoverView/AvatarPopoverView';
import { Wrapper, Logo, BodyWrapper, LeftTabList, RightTabList, UnderlineItem, DepositButton } from './styled';
import { useRef, useState } from 'react';
import PopoverCore, { PopoverCoreHandle } from '@components/core/popover';
import { uuid } from '~/libs';

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

  const popoverRef = useRef<PopoverCoreHandle>(null);

  return (
    <Wrapper>
      <Logo onClick={() => popoverRef.current?.toggle()} />

      <PopoverCore
        ref={popoverRef}
        popoverView={
          <div style={{ backgroundColor: 'red' }}>
            <div>dasdassad</div>
            <div>dasdassad</div>
            <div>dasdassad</div>
            <div>dasdassad</div>
          </div>
        }
      >
        <span>alo</span>
      </PopoverCore>

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
            <Icons.DOWNLOAD />
            <div>Nạp</div>
          </DepositButton>

          <PopoverIconButton
            behavior={'hover'}
            onClick={() => {
              router.push(PAGES_ROUTES.DOWNLOAD);
            }}
            popoverView={<DownloadPopoverView />}
          >
            <Icons.DOWNLOAD />
          </PopoverIconButton>

          <PopoverIconButton
            onClick={() => {
              router.push(PAGES_ROUTES.INFORMATION.MY_SUBSCRIBE);
            }}
            popoverView={<MySubscribePopoverView />}
          >
            <Icons.DOWNLOAD />
          </PopoverIconButton>
          <PopoverIconButton popoverView={<HistoryPopoverView />}>
            <Icons.DOWNLOAD />
          </PopoverIconButton>

          <PopoverIconButton popoverView={<CountryPopoverView />} behavior="click">
            <Icons.FLAG />
          </PopoverIconButton>

          <PopoverIconButton popoverView={<CountryPopoverView />} behavior="click">
            <Icons.FLAG />
          </PopoverIconButton>

          <PopoverIconButton popoverView={<SettingPopoverView />} behavior="click">
            <Icons.SETTING />
          </PopoverIconButton>

          <PopoverIconButton popoverView={<AvatarPopoverView />} behavior="click">
            <Icons.SETTING />
          </PopoverIconButton>
        </RightTabList>
      </BodyWrapper>
    </Wrapper>
  );
};

export default Header;
