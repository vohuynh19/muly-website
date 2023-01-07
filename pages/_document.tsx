import React, { ReactElement } from 'react';
import Document, { Html, Head, Main, NextScript, DocumentInitialProps, DocumentContext } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '@src/utils/functions/createEmotionCache';
import { AppType } from 'next/app';
import { EmotionCache } from '@emotion/react';

type AppCustomType = {
  emotionCache?: EmotionCache;
};

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage;
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: AppType<AppCustomType>) => (props) => <App {...props} pageProps={{ emotionCache: cache }} />,
        });

      const initialProps = await Document.getInitialProps(ctx);
      const emotionStyles = extractCriticalToChunks(initialProps.html);
      const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
          data-emotion={`${style.key} ${style.ids.join(' ')}`}
          key={style.key}
          dangerouslySetInnerHTML={{ __html: style.css }}
        />
      ));

      return {
        ...initialProps,
        styles: [
          <>
            {initialProps.styles} {emotionStyleTags}
          </>,
        ],
      };
    } finally {
    }
  }

  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
