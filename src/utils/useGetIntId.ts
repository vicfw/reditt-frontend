import { useRouter } from 'next/router';

export const useGetIntId = () => {
  const router = useRouter();

  const { id } = router.query;

  const intId = typeof id === 'string' ? parseInt(id) : -1;

  return intId;
};
