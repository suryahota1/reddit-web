import { FieldError } from "../generated/graphql";

export const toErrorMap = ( errors: FieldError[] ) => {
    const errorMap: Record<string, string> = {};
    errors.forEach(({ name, message }) => {
        errorMap[name] = message;
    });

    return errorMap;
};
