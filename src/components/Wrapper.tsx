import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';

interface WrapperProps {
  variant?: 'small' | 'regular';
  children: any;
}

const Wrapper: FC<WrapperProps> = ({ children, variant = 'regular' }) => {
  return (
    <Box
      w="100%"
      maxW={variant === 'regular' ? '800px' : '400px'}
      mt={8}
      mx="auto"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
