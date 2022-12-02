import type { AppProps } from 'next/app';
import HomeLayout from '~/views/layouts/app-layouts/HomeLayout';
import '@styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  //
  //
  return (
    <HomeLayout>
      <Component {...pageProps} />
    </HomeLayout>
  );
}
