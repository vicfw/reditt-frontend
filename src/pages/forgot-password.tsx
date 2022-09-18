import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC, useState } from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import {
  MeDocument,
  MeQuery,
  useForgotPasswordMutation,
} from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

const ForgotPassword: FC<any> = ({}) => {
  const [completed, setCompleted] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values, { setErrors }) => {
          if (!values.email && !values.email.includes('@'))
            return setErrors({ email: 'please enter an email' });
          await forgotPassword({
            variables: values,
          });
          setCompleted(true);
        }}
      >
        {({ isSubmitting }) =>
          completed ? (
            <Box>if an account with that email exist,we sent you an email</Box>
          ) : (
            <Form>
              <InputField
                name="email"
                placeholder="Email"
                label="Email"
                type="email"
              />

              <Button
                mt={4}
                isLoading={isSubmitting}
                type="submit"
                color="teal"
              >
                Forgot password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};
export default withApollo({ ssr: false })(ForgotPassword);
