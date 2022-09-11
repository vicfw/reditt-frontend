import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import UpdootSection from '../components/UpdootSection';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: '' as string | undefined,
  });

  const [{ data, fetching, stale }] = usePostsQuery({ variables });

  return (
    <Layout variant="regular">
      <NextLink href="/create-post">
        <Button>Create post</Button>
      </NextLink>
      <br />
      <Stack spacing={8}>
        {!data
          ? null
          : data!.posts.posts.map((p, i) => (
              <Flex p={5} shadow="md" borderWidth="1px" key={p.id}>
                <UpdootSection post={p} />
                <Box>
                  <Heading fontSize="xl">{p.title}</Heading>
                  <Text>posted by {p.creator.username}</Text>
                  <Text mt={4}>{p.textSnippet}</Text>
                </Box>
              </Flex>
            ))}
      </Stack>
      {data && data.posts.hasMore ? (
        <Flex my={5} justifyContent="center">
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts.at(-1)?.createdAt,
              });
            }}
            isLoading={stale}
          >
            Load more!
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
