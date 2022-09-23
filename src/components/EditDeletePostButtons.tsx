import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';
import React, { FC } from 'react';
import NextLink from 'next/link';
import { useDeletePostMutation, useMeQuery } from '../generated/graphql';

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

const EditDeletePostButtons: FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [deletePost] = useDeletePostMutation();
  const { data: meData } = useMeQuery();

  if (meData?.me?.user?.id !== creatorId) {
    return null;
  }

  return (
    <Box ml="auto">
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton ml={'auto'} aria-label="editPost" icon={<EditIcon />} />
      </NextLink>
      <IconButton
        ml={'3'}
        aria-label="deletePost" 
        icon={<DeleteIcon />}
        onClick={() =>
          deletePost({
            variables: { id },
            update: (cache) => {
              cache.evict({ id: 'Post:' + id });
            },
          })
        }
      />
    </Box>
  );
};

export default EditDeletePostButtons;
