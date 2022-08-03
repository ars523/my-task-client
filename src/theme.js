import { createTheme } from '@mui/material/styles'
import { green} from '@mui/material/colors'

const primary = {
    main: green[600],
    background: green[100],
    contrastText: green[50]
}
const customizedTheme = createTheme({
    palette: {
        primary:{
            main: primary.main,
            contrastText: primary.contrastText,
            background: primary.background
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