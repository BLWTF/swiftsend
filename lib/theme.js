const { extendTheme } = require("@chakra-ui/react")

const styles = {
	global: (props) => ({
		body: {
			// bg: "#dbf2ff",
		}
	})
}

const components = {
	Heading: {
		variants: {
			'page-title': {
				fontSize: 25,
			}
		}
	}
}

const theme = extendTheme({
	styles,
	components
})

export default theme