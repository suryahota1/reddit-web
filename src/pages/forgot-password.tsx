import { Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
import login from "./login";

interface forgotPassword {

}

const ForgotPassword: React.FC<forgotPassword> = () => {

    const [, forgotPassword] = useForgotPasswordMutation();
    
    return (
        <Wrapper variant="small">
            <Formik initialValues={{ email:""}}
            onSubmit={async ( values, { setErrors } ) => {
                console.log("values", values);

                const response = await forgotPassword(values);
                if ( response.data?.forgotPassword ) {
                    // setErrors(toErrorMap(response.data.login.errors));
                }
            }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField 
                            name="email"
                            label="Email"
                            placeholder="User name or Email"
                        />
                        <Button mt={4} isLoading={isSubmitting} type="submit" bgColor="teal" color="#fff">Send Email</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
