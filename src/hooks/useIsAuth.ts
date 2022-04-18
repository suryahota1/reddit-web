import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";

let triggered = false;

const useIsAuth = () => {

    const [{ data, fetching }] = useMeQuery();
    const router = useRouter();

    useEffect(() => {
        console.log("initialized -----------------");
        triggered = false;
    }, []);

    useEffect(() => {
        if ( fetching ) {
            triggered = true;
        }
        
        console.log("useIsAuth data", data);
        console.log("useIsAuth triggered", triggered);
        console.log("useIsAuth fetching", fetching);

        if ( triggered && !fetching && !data?.me ) {
            router.replace({
                pathname: "/login",
                query: {
                    path: router.pathname
                }
            });
        }
    }, [ fetching, data ]);
};

export default useIsAuth;
