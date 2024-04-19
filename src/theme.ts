import { Components, Theme, createTheme } from '@mui/material/styles';

const defaultComponents: Components<Omit<Theme, 'components'>> = {
  MuiPaper: {
    defaultProps: {
      sx: {
        borderRadius: 0.5
      }
    }
  },
  MuiButton: {
    defaultProps: {
      sx: {
        borderRadius: 0.5,
        m: 0.5
      }
    }
  },
  MuiTextField: {
    defaultProps: {
      size: 'small',
      InputLabelProps: {
        shrink: true
      }
    }
  }

};

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: defaultComponents
});

export const lightTheme = createTheme({
  palette: {
  },
  components: defaultComponents
});
