import { Box, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import Wrapper from "../../components/Wrapper";
import { usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import NavBar from "../../components/navbar";
import EditDeletePostButtons from "../../components/EditDeletePostButtons";

const ViewPost: NextPage<{token: string}> = () => {

    const router = useRouter();

    const id = typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
    const [{ data, error, fetching }] = usePostQuery({
        pause: id === -1,
        variables: {
            id: id
        }
    });

    console.log("ViewPost data", data);
    console.log("ViewPost error", error);
    console.log("ViewPost fetching", fetching);

    if ( fetching ) {
        return (
            <>
                <NavBar />
                <Wrapper variant="small">
                    <Box>Loading...</Box>
                </Wrapper>
            </>
        );
    }

    if ( error ) {
        return (
            <>
                <NavBar />
                <Wrapper variant="small">
                    <Box>{error.message}</Box>
                </Wrapper>
            </>
        );
    }

    if ( !data || !data.post ) {
        return (
            <>
                <NavBar />
                <Wrapper variant="small">
                    <Box>Post not found</Box>
                </Wrapper>
            </>
        );
    }

    return (
        <>
            <NavBar />
            <Wrapper variant="small">
                <Heading mb={4}>{data.post.title}</Heading>
                {data.post.text}

                <EditDeletePostButtons id={data.post.id} creatorId={data.post.creator.id} />
            </Wrapper>
        </>
    );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(ViewPost);