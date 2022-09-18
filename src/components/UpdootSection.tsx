import { ApolloCache } from '@apollo/client';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { FC, useState } from 'react';
import {
  PostSnippetFragment,
  useVoteMutation,
  VoteMutation,
} from '../generated/graphql';

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

const updateAfterVote = (
  value: number,
  postId: number,
  cache: ApolloCache<VoteMutation>
) => {
  const data = cache.readFragment<{
    id: number;
    points: number;
    voteStatus: number | null;
  }>({
    id: 'Post:' + postId,
    fragment: gql`
      fragment _ on Post {
        id
        points
        voteStatus
      }
    `,
  });

  if (data) {
    if (data.voteStatus === value) {
      return;
    }
    const newPoints =
      (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
    cache.writeFragment({
      id: 'Post:' + postId,
      fragment: gql`
        fragment __ on Post {
          points
          voteStatus
        }
      `,
      data: { points: newPoints, voteStatus: value },
    });
  }
};

const UpdootSection: FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    'updoot-loading' | 'downdoot-loading' | 'not-loading'
  >('not-loading');
  const [vote] = useVoteMutation();

  return (
    <Flex direction={'column'} alignItems="center" mr={4}>
      <Box>
        <IconButton
          onClick={async () => {
            if (post.voteStatus === 1) {
              return;
            }
            setLoadingState('updoot-loading');
            await vote({
              variables: {
                postId: post.id,
                value: 1,
              },
              update: (cache) => updateAfterVote(1, post.id, cache),
            });
            setLoadingState('not-loading');
          }}
          aria-label={'ChevronUpIcon'}
          isLoading={loadingState === 'updoot-loading'}
          bgColor={post.voteStatus === 1 ? 'green' : undefined}
        >
          <ChevronUpIcon />
        </IconButton>
      </Box>
      <Box>{post.points}</Box>
      <Box>
        <IconButton
          onClick={async () => {
            if (post.voteStatus === -1) {
              return;
            }
            setLoadingState('downdoot-loading');

            await vote({
              variables: {
                postId: post.id,
                value: -1,
              },
              update: (cache) => updateAfterVote(-1, post.id, cache),
            });
            setLoadingState('not-loading');
          }}
          aria-label={'ChevronDownIcon'}
          isLoading={loadingState === 'downdoot-loading'}
          bgColor={post.voteStatus === -1 ? 'tomato' : undefined}
        >
          <ChevronDownIcon />
        </IconButton>
      </Box>
    </Flex>
  );
};
export default UpdootSection;
