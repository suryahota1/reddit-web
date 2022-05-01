import { Box, Button } from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import Wrapper from "../../../components/Wrapper";
import { usePostQuery, useUpdatePostMutation } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import NavBar from "../../../components/navbar";
import { Form, Formik } from "formik";
import InputField from "../../../components/InputField";

const EditPost: NextPage<{token: string}> = () => {

    const router = useRouter();

    const id = typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
    const [{ data, error, fetching }] = usePostQuery({
        pause: id === -1,
        variables: {
            id: id
        }
    });

    const [, updatePost] = useUpdatePostMutation();

    console.log("EditPost data", data);
    console.log("EditPost error", error);
    console.log("EditPost fetching", fetching);

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
                <Formik initialValues={{ title:data.post.title, text:data.post.text}}
                    onSubmit={async ( values, { setErrors } ) => {
                        console.log("values", values);
                        if ( data.post && data.post.id ) {
                            await updatePost({
                                updatePostId: data.post.id,
                                ...values
                            });
                            router.back();
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <InputField 
                                name="title"
                                label="Title"
                                placeholder="Title"
                            />
                            <InputField 
                                name="text"
                                label="Body"
                                placeholder="Text"
                                isTextArea
                            />
                            <Button mt={4} isLoading={isSubmitting} type="submit" bgColor="teal" color="#fff">Save Post</Button>
                        </Form>
                    )}
                </Formik>

            </Wrapper>
        </>
    );
}

export default withUrqlClient(createUrqlClient)(EditPost);