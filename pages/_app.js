import { StrictMode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
    return (
        <StrictMode>
            <Head>
                <title>Baccalà</title>
                <link rel="icon" href="/icon.ico" />
            </Head>
            <CssBaseline />

            <Component {...pageProps} />

        </StrictMode>
    )
  }
  