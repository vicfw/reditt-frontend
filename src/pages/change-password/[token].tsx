import { NextPage } from 'next';
import { useRouter } from 'next/router';

const ChangePassword: NextPage<{ token: string }> = ({}) => {
  const { token } = useRouter().query;

  return <div>token is : {token}</div>;
};
export default ChangePassword;
