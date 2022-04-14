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
            <Formik initialValues={{ userNameOrEmail:"", password:""}}
            onSubmit={async ( values, { setErrors } ) => {
                console.log("values", values);
                const response = await login(values);
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
                            name="userNameOrEmail"
                            label="User name or Email"
                            placeholder="User name or Email"
                        />
                        <InputField 
                            name="password"
                            label="Password"
                            placeholder="Password"
                            type="password"
                        />
                        <Button mt={4} isLoading={isSubmitting} type="submit" bgColor="teal" color="#fff">Login</Button>
                        <span onClick={() => {
                            console.log("here");
                            router.push("/forgot-password");
                        }}>Forgot Password</span>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient)(Login);
