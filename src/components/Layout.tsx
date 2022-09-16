import { WrapItemProps } from '@chakra-ui/react';
import { FC } from 'react';
import { WrapperVariants } from '../types';
import NavBar from './NavBar';
import Wrapper from './Wrapper';

interface LayoutProps {
  variant?: WrapperVariants;
  children: any;
}

const Layout: FC<LayoutProps> = ({ variant, children }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
export default Layout;
