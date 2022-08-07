import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import Layout from '../components/Layout';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({ variables: { limit: 10 } });

  return (
    <Layout variant="regular">
      <NextLink href="/create-post">
        <Button>Create post</Button>
      </NextLink>
      <br />
      <Stack spacing={8}>
        {!data
          ? null
          : data.posts.map((p, i) => (
              <Box p={5} shadow="md" borderWidth="1px" key={p.id}>
                <Heading fontSize="xl">{p.title}</Heading>
                <Text mt={4}>{p.text}</Text>
              </Box>
            ))}
      </Stack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
