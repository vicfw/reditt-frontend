import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { useMutation } from 'urql';
import { REGISTER_MUT } from '../graphql/mutations';

const Register = () => {
  const [, register] = useMutation(REGISTER_MUT);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => register(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="Username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
              />
            </Box>
            <Button mt={4} isLoading={isSubmitting} type="submit" color="teal">
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
