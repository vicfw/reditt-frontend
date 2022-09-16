import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import Link from 'next/link';
import { useState } from 'react';
import EditDeletePostButtons from '../components/EditDeletePostButtons';
import Layout from '../components/Layout';
import UpdootSection from '../components/UpdootSection';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: '' as string | undefined,
  });

  const [{ data, stale }] = usePostsQuery({ variables });

  return (
    <Layout variant="regular">
      <Stack spacing={8}>
        {!data
          ? null
          : data!.posts.posts.map((p, i) =>
              !p ? null : ( //if we don't add it here we gonna get error because of invalidation in cache update
                <Flex p={5} shadow="md" borderWidth="1px" key={p.id}>
                  <UpdootSection post={p} />
                  <Box flex={1}>
                    <Link
                      href="/post/[id]"
                      as={`post/${p.id}`}
                      prefetch={false}
                    >
                      <Heading cursor={'pointer'} fontSize="xl">
                        {p.title}
                      </Heading>
                    </Link>
                    <Text>posted by {p.creator.username}</Text>
                    <Flex>
                      <Text flex={1} mt={4}>
                        {p.textSnippet}
                      </Text>
                      {/* edit and delete buttons */}
                      <EditDeletePostButtons
                        id={p.id}
                        creatorId={p.creator.id}
                      />
                    </Flex>
                  </Box>
                </Flex>
              )
            )}
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
