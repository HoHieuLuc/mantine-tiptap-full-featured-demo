import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            retry: false
        },
    },
});

export default queryClient;