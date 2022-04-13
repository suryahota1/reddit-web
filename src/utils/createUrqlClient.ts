import { dedupExchange, cacheExchange, fetchExchange } from 'urql';

export const createUrqlClient = ( ssrExchange: any ) => ({
    url: 'http://localhost:4000/graphql',
    fetchOptions: () => {
        return {
            credentials: "include" as const,
            headers: { "x-forwarded-proto": "https" },
        };
    },
    exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],
});
