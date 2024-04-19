import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
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

export const lightTheme = createTheme({
  palette: {
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
