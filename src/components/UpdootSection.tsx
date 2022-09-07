import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { FC } from 'react';
import { PostSnippetFragment } from '../generated/graphql';

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

const UpdootSection: FC<UpdootSectionProps> = ({ post }) => {
  return (
    <Flex direction={'column'} alignItems="center" mr={4}>
      <Box>
        <IconButton aria-label={'ChevronUpIcon'}>
          <ChevronUpIcon />
        </IconButton>
      </Box>
      <Box>{post.points}</Box>
      <Box>
        <IconButton aria-label={'ChevronDownIcon'}>
          <ChevronDownIcon />
        </IconButton>
      </Box>
    </Flex>
  );
};
export default UpdootSection;
