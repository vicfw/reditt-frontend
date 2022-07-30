import { Box, Button, Flex, Link } from '@chakra-ui/react';
import React, { FC } from 'react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

const NavBar: FC<any> = ({}) => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(), // this piece of code makes query just run in client side .skip srr part
  });

  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

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
      <Flex>
        <Box mr={4}>{data.me.user?.username}</Box>
        <Box>
          <Button
            variant={'link'}
            isLoading={logoutFetching}
            onClick={() => logout()}
          >
            logout
          </Button>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex position="sticky" zIndex={10} top={0} bg="tomato" p={4}>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};
export default NavBar;
