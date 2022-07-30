import { withUrqlClient } from 'next-urql';
import Layout from '../components/Layout';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link';
import { Button, Link } from '@chakra-ui/react';

const Index = () => {
  const [{ data, fetching }] = usePostsQuery();

  return (
    <Layout variant="regular">
      <NextLink href="/create-post">
        <Button>Create post</Button>
      </NextLink>
      {/* <br /> */}
      {/* {!data ? null : data.posts.map((p) => <div>{p.title}</div>)} */}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
