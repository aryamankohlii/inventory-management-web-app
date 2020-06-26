import { createMuiTheme } from '@material-ui/core/styles'
const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    backgroundColor: "white",
                },
                body: {
                    backgroundColor: "white",
                }
            },
        },
    },
    typography: {
        fontFamily: " 'Jost', sans-serif",
        // h5: {
        //     fontWeight: 700,
        //     fontSize: "2rem",
        // },
        // h1: {
        //     fontFamily: "'Bebas Neue', cursive",
        //     fontSize: "3rem"
        // }
    },
})
export default theme