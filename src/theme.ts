import { createTheme } from '@mui/material/styles';

export const dark_theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: '#303843',
      paper: '#1F2329',
    },
    primary: {
      main: '#66C0F5',
    },
    secondary: {
      main: '#4B619C',
    },
    error: {
      main: "#CD5444",
    },
    success: {
      main: "#A1CE44"
    }
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small",
        InputLabelProps: {
          shrink: true
        }
      }
    }
  }
});
