import { dedupExchange, fetchExchange, ssrExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';

import {
  LogoutMutation,
  MeQuery,
  MeDocument,
  LoginMutation,
  RegisterMutation,
} from '../generated/graphql';
import { betterUpdateQuery } from './betterUpdateQuery';

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include' as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => ({ me: null })
            );
          },
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query: any) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query: any) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
          // logout: (_result, args, cache, info) => {
          //   betterUpdateQuery<LogoutMutation, MeQuery>(
          //     cache,
          //     { query: MeDocument },
          //     _result,
          //     (result, query: any) => {
          //       if (!result.logout) {
          //         return query;
          //       } else {
          //         console.log(cache, 'cache');

          //         return {
          //           me: null,
          //         };
          //       }
          //     }
          //   );
          // },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
