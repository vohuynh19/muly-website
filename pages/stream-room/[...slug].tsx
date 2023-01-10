import StreamRoom from '@views/StreamRoom';
import StreamRoomTest from '@views/StreamRoom/VideoRTC';
import Head from 'next/head';
const StreamRoomPage = () => {
  return (
    <>
      <Head>
        <title>Loc phu ho</title>
      </Head>
      {/* <StreamRoom /> */}

      <StreamRoomTest />
    </>
  );
};

export default StreamRoomPage;
