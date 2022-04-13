import React from "react";
import { Form, Formik } from "formik";
import { Button } from "@chakra-ui/react";
import Wrapper from "./../components/Wrapper";
import InputField from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface loginProps {

}

const Login: React.FC<loginProps> = ({}) => {
    const [, login] = useLoginMutation();
    const router = useRouter();

    return (
        <Wrapper variant="small">
            <Formik initialValues={{ username:"", password:""}}
            onSubmit={async ( values, { setErrors } ) => {
                console.log("values", values);
                const response = await login({
                    "options": values
                });
                if ( response.data?.login.errors ) {
                    setErrors(toErrorMap(response.data.login.errors));
                } else if ( response.data?.login.user ) {
                    router.push("/");
                }
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <InputField 
                        name="username"
                        label="Username"
                        placeholder="Username"
                    />
                    <InputField 
                        name="password"
                        label="Password"
                        placeholder="Password"
                        type="password"
                    />
                    <Button mt={4} isLoading={isSubmitting} type="submit" bgColor="teal" color="#fff">Login</Button>
                </Form>
            )}
        </Formik>
        </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient)(Login);
