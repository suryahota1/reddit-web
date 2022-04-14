import { Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import InputField from "../../components/InputField";
import Wrapper from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
import login from "../login";

const ChangePassword: NextPage<{token: string}> = ({ token }) => {

    const router = useRouter();
    const [, changePassword] = useChangePasswordMutation();

    return (
        <Wrapper variant="small">
            <Formik 
                initialValues={{ newPassword:"" }}
                onSubmit={async ( values, { setErrors } ) => {
                    console.log("values-------", values);
                    const response = await changePassword({
                        newPassword: values.newPassword,
                        token: token
                    });
                    if ( response.data?.changePassword.errors ) {
                        const errorMap = toErrorMap(response.data.changePassword.errors);
                        setErrors(errorMap);
                    } else if ( response.data?.changePassword.user ) {
                        router.push("/");
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField 
                            name="newPassword"
                            label="New password"
                            placeholder="Enter new password"
                            type="password"
                        />
                        <Button mt={4} isLoading={isSubmitting} type="submit" bgColor="teal" color="#fff">Reset Password</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

ChangePassword.getInitialProps = ({ query }) => {
    return {
        token: query.token as string
    };
};

export default withUrqlClient(createUrqlClient)(ChangePassword);