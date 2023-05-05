const { extendTheme } = require("@chakra-ui/react")

const styles = {
	global: (props) => ({
		body: {
			// bg: "#dbf2ff",
		}
	})
}

const theme = extendTheme({
	styles
})

export default theme