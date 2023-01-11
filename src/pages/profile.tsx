import Head from 'next/head';
import Profile from '@views/Profile';

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>

      <Profile />
    </>
  );
};

export default ProfilePage;
