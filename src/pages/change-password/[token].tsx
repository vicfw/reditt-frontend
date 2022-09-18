import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import InputField from '../../components/InputField';
import Wrapper from '../../components/Wrapper';
import {
  MeDocument,
  MeQuery,
  useChangePasswordMutation,
} from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { withApollo } from '../../utils/withApollo';

const ChangePassword = () => {
  const router = useRouter();
  const token =
    typeof router.query.token === 'string' ? router.query.token : '';
  const [tokenError, setTokenError] = useState('');

  const [changePassword] = useChangePasswordMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          if (token) {
            const response = await changePassword({
              variables: {
                newPassword: values.newPassword,
                token,
              },
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: 'Query',
                    me: {
                      user: data?.changePassword.user,
                    },
                  },
                });
                cache.evict({ fieldName: 'posts:{}' });
              },
            });

            if (response.data?.changePassword.errors?.length) {
              const errorMap = toErrorMap(response.data.changePassword.errors);

              if ('token' in errorMap) {
                setTokenError(errorMap.token);
              }

              setErrors(errorMap);
            } else if (response.data?.changePassword.user) {
              // worked
              router.push('/');
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField
                name="newPassword"
                placeholder="New Password"
                label="New Password"
                type="password"
              />
              {tokenError ? (
                <Flex>
                  <Box mr={2} style={{ color: 'red' }}>
                    {tokenError}
                  </Box>
                  <NextLink href="/forgot-password">
                    <Link>Go to Reset Password</Link>
                  </NextLink>
                </Flex>
              ) : null}
            </Box>
            <Button mt={4} isLoading={isSubmitting} type="submit" color="teal">
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default withApollo({ ssr: false })(ChangePassword);
