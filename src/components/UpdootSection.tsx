import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

const UpdootSection: FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    'updoot-loading' | 'downdoot-loading' | 'not-loading'
  >('not-loading');
  const [, vote] = useVoteMutation();

  return (
    <Flex direction={'column'} alignItems="center" mr={4}>
      <Box>
        <IconButton
          onClick={async () => {
            setLoadingState('updoot-loading');
            await vote({
              postId: post.id,
              value: 1,
            });
            setLoadingState('not-loading');
          }}
          aria-label={'ChevronUpIcon'}
          isLoading={loadingState === 'updoot-loading'}
        >
          <ChevronUpIcon />
        </IconButton>
      </Box>
      <Box>{post.points}</Box>
      <Box>
        <IconButton
          onClick={async () => {
            setLoadingState('downdoot-loading');

            await vote({
              postId: post.id,
              value: -1,
            });
            setLoadingState('not-loading');
          }}
          aria-label={'ChevronDownIcon'}
          isLoading={loadingState === 'downdoot-loading'}
        >
          <ChevronDownIcon />
        </IconButton>
      </Box>
    </Flex>
  );
};
export default UpdootSection;
