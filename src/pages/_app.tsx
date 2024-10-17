import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '@fontsource-variable/sora';

const theme = extendTheme({
  fonts: {
    heading: `'Sora Variable', sans-serif`,
    body: `'Sora Variable', sans-serif`,
  },
})

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>CS2 Server Panel</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
