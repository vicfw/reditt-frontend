import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import InputField from '../../../components/InputField';
import Layout from '../../../components/Layout';
import {
  usePostQuery,
  useUpdatePostMutation,
} from '../../../generated/graphql';
import { createUrqlClient } from '../../../utils/createUrqlClient';
import { useGetIntId } from '../../../utils/useGetIntId';

const EditPost = () => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data: postData, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [, updatePost] = useUpdatePostMutation();
  if (fetching) {
    <Layout>
      <div>loading...</div>
    </Layout>;
  }

  if (!postData?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout variant="small">
      <Formik
        initialValues={{
          title: postData?.post?.title,
          text: postData?.post?.text,
        }}
        onSubmit={async (values, { setErrors }) => {
          await updatePost({ id: intId, ...values });

          router.back();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="Title" label="title" />
            <Box mt={4}>
              <InputField
                name="text"
                placeholder="What you think..."
                label="Body"
                textArea
              />
            </Box>

            <Button mt={4} isLoading={isSubmitting} type="submit" color="teal">
              Edit post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
