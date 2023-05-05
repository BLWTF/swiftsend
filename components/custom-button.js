import { Button } from "@chakra-ui/react";

export default function CustomButton(props) {
  return (
    <Button bg="#0088b4" color="#FFF" {...props}>
      {props.children}
    </Button>
  );
}
