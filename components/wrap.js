import { Box } from "@chakra-ui/react"
import styled from "@emotion/styled"

export const Wrap = styled(Box)`
	&:before {
		content: " ";
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-image: url("/images/lines-bg.png");
		background-size: auto;
		background-position: 10% 5%;
	}
`