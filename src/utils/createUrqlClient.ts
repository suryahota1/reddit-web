import { dedupExchange, cacheExchange, fetchExchange, ExchangeInput } from 'urql';
import { isServer } from './isServer';

export const createUrqlClient = ( ssrExchange: any, ctx: any ) => {
    let cookie = "";
    if ( isServer() ) {
        cookie = ctx?.req.headers.cookie;
    }
    return {
        url: 'http://localhost:4000/graphql',
        fetchOptions: () => {
            return {
                credentials: "include" as const,
                headers: { 
                    "x-forwarded-proto": "https" ,
                    cookie: cookie
                },
            };
        },
        exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],
    }
};
