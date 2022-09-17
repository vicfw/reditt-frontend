import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import { AppProps } from 'next/app';
import theme from '../theme';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
