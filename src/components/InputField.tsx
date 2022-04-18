import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    isTextArea?: boolean
};

const InputField: React.FC<InputFieldProps> = ( { label, size: _, isTextArea, ...props } ) => {
    const [ field, { error }] = useField(props);

    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            {isTextArea ? <Textarea {...field} id={field.name}></Textarea> : <Input {...field} {...props} id={field.name} />}
            { error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
};

export default InputField;