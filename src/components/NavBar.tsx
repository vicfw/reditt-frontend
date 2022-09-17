import { Box, Button, Container, Flex, Heading, Link } from '@chakra-ui/react';
import React, { FC } from 'react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { useRouter } from 'next/router';

const NavBar: FC<any> = ({}) => {
  const router = useRouter();
  const { data, loading } = useMeQuery({
    skip: isServer(), // this piece of code makes query just run in client side .skip srr part
  });

  const [logout, { loading: logoutFetching }] = useLogoutMutation();

  let body = null;

  if (!data?.me) {
    body = (
      <>
        <NextLink href={'/login'}>
          <Link color={'white'} mr={2}>
            login
          </Link>
        </NextLink>

        <NextLink href={'/register'}>
          <Link color={'white'}>register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex alignItems={'center'}>
        <Box mr={4} color="#fff">
          Welcome {data.me.user?.username}
        </Box>

        <NextLink href="/create-post">
          <Button mr={2}>Create post</Button>
        </NextLink>

        <Box>
          <Button
            isLoading={logoutFetching}
            onClick={async () => {
              await logout();
              router.reload();
            }}
          >
            logout
          </Button>
        </Box>
      </Flex>
    );
  }

  return (
    <Container
      position="sticky"
      zIndex={10}
      top={0}
      bg="tomato"
      p={4}
      width={'100%'}
      maxW={'100%'}
    >
      <Flex maxW={800} flex={1} margin="auto" align="center">
        <Heading color={'#fff'}>
          <NextLink href={'/'}>LiReddiit</NextLink>
        </Heading>
        <Box ml="auto">{body}</Box>
      </Flex>
    </Container>
  );
};
export default NavBar;
