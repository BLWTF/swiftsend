import { FormLabel, Input } from "@chakra-ui/react";

export const FormInput = (props) => {
  return (
    <>
      <FormLabel>{props.placeholder}</FormLabel>
      <Input mb={2} id={props.name} {...props} />
    </>
  );
};
