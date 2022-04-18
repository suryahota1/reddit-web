import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../components/InputField";
import NavBar from "../components/navbar";
import { useCreatePostMutation } from "../generated/graphql";
import useIsAuth from "../hooks/useIsAuth";
import { createUrqlClient } from "../utils/createUrqlClient";
import Wrapper from "./../components/Wrapper";


interface createPostProps {

}

const CreatePost: React.FC<createPostProps> = () => {

    const [, createPost] = useCreatePostMutation();
    const router = useRouter();
    useIsAuth();

    return (
        <>
            <NavBar />
            <Wrapper variant="small">
                <Formik initialValues={{ title:"", text:""}}
                    onSubmit={async ( values, { setErrors } ) => {
                        console.log("values", values);
                        const response = await createPost({input: values});
                        if ( response.data?.createPost.id ) {
                            router.push("/");
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
                            <Button mt={4} isLoading={isSubmitting} type="submit" bgColor="teal" color="#fff">Create Post</Button>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        </>
    );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
