import { Divider } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import NavBar from '../components/NavBar';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Index = () => {
  const [{ data, fetching }] = usePostsQuery();

  return (
    <>
      <NavBar />
      <div>hello</div>
      <br />
      {!data ? null : data.posts.map((p) => <div>{p.title}</div>)}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
