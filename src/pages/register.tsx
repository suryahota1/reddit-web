import React from "react";
import { Form, Formik } from "formik";
import { Button } from "@chakra-ui/react";
import Wrapper from "./../components/Wrapper";
import InputField from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface registerProps {

}

const Register: React.FC<registerProps> = ({}) => {
    const [, register] = useRegisterMutation();
    const router = useRouter();

    return (
        <Wrapper variant="small">
            <Formik initialValues={{ username:"", password:""}}
            onSubmit={async ( values, { setErrors } ) => {
                console.log("values", values);
                const response = await register({
                    "options": values
                });
                if ( response.data?.register.errors ) {
                    setErrors(toErrorMap(response.data.register.errors));
                } else if ( response.data?.register.user ) {
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
                    <Button mt={4} isLoading={isSubmitting} type="submit" bgColor="teal" color="#fff">Register</Button>
                </Form>
            )}
        </Formik>
        </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient)(Register);
