import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import db from '../db.json';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    /* New styles */
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    // Deixa branco no começo
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;
const { theme } = db;

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <Head>
        <title>PokéQuiz !</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet" />
        {/* <!-- Primary Meta Tags --> */}
        <meta name="title" content="PokeQuiz! Made with next.JS by risaddex" />
        <meta name="description" content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!" />

        {/* <!-- Open Graph / Facebook -- /> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vercel.com/risaddex/pokemon-quiz" />
        <meta property="og:title" content="PokeQuiz! Made with next.JS by risaddex" />
        <meta property="og:description" content="PokeQuiz! Made with next.JS by risaddex" />
        <meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" />

        {/* <!-- Twitter -- /> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://vercel.com/risaddex/pokemon-quiz" />
        <meta property="twitter:title" content="PokeQuiz! Made with next.JS by risaddex" />
        <meta property="twitter:description" content="Poké Quiz!" />
        <meta property="twitter:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" />

      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
