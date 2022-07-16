import { ChakraProvider } from '@chakra-ui/react';

import theme from '../theme';
import { AppProps } from 'next/app';
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import { cacheExchange, Cache, QueryInput } from '@urql/exchange-graphcache';
import { LoginMutation, MeDocument, MeQuery } from '../generated/graphql';

function MyApp({ Component, pageProps }: AppProps) {
  function betterUpdateQuery<Result, Query>(
    cache: Cache,
    qi: QueryInput,
    result: any,
    fn: (r: Result, q: Query) => Query
  ) {
    return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
  }

  const client = createClient({
    url: 'http://localhost:4000/graphql',
    fetchOptions: {
      credentials: 'include',
    },
    // exchanges: [
    //   dedupExchange,
    //   cacheExchange({
    //     updates: {
    //       Mutation: {
    //         login: (result, args, cache, info) => {
    //           betterUpdateQuery<LoginMutation, MeQuery>(
    //             cache,
    //             { query: MeDocument },
    //             result,
    //             (result, query: any) => {
    //               if (result.login.errors) {
    //                 return query;
    //               } else {
    //                 return {
    //                   me: result.login.user,
    //                 };
    //               }
    //             }
    //           );
    //         },
    //       },
    //     },
    //   }),
    //   fetchExchange,
    // ],
  });

  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
