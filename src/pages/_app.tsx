import type { AppProps } from 'next/app'
import Head from 'next/head'
import { background, ChakraProvider, extendTheme, Flex, Text, useColorMode } from '@chakra-ui/react'
import '@fontsource-variable/sora';
import { useState, useEffect } from 'react';
import Navbar from '../../components/navBar';

const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
  breakpoints: {
    base: '0em',
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '1400px',
    xxl: '1800px',
    '2xl': '96em',
  },
  fonts: {
    heading: `'Sora Variable', sans-serif`,
    body: `'Sora Variable', sans-serif`,
  },
  styles: {
    global: {
      html: {
        background: "181C14",
        cursor: "default",
        color: "#ECDFCC"
      },
      body: {
        background: "181C14",
        cursor: "default",
        color: "#ECDFCC"
      }
    }
  },
  components: {
    Modal: {
      background: "black"
    }
  }
})

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch('/api/auth')
      .then((res) => {
        if (res.status === 200) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      })
      .catch(() => setAuthenticated(false));
  }, []);

  return (
    <ChakraProvider theme={theme}>
      {authenticated ? (
        <>
          <Head>
            <title>CS2 Server Panel</title>
          </Head>
          <Navbar/>
          <Component {...pageProps} />
        </>
      ) : (
        <Flex flexDirection={"column"} gap={2} width={"100vw"} justifyContent={"center"} alignItems={"center"} height={"100vh"}>
          <Text fontSize={"7xl"}>Not Authorized</Text>
          <Text fontSize={"3xl"}>Please login to proceed</Text>
        </Flex>
      )}
    </ChakraProvider>
  )
}
