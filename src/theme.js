import { createTheme } from '@mui/material/styles'

const primary = {
    main: '#0B72B9',
}
const customizedTheme = createTheme({
    palette: {
        primary:{
            main: primary.main,
        }
    },

    components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              
            },
          },
        },
        MuiFormHelperText: {
          styleOverrides: {
            root: {

            },
          },
        },
      },
})
export default customizedTheme