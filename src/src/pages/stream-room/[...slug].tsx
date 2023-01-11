import StreamRoom from '@views/StreamRoom';
import Head from 'next/head';
import { useRouter } from 'next/router';

const StreamRoomPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <>
      <Head>
        <title>Loc phu ho</title>
      </Head>
      <StreamRoom slug={slug?.[0]} />
    </>
  );
};

export default StreamRoomPage;
