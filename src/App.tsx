import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { MainPage } from './pages/MainPage';
import { darkTheme, lightTheme } from './theme';
import { useState } from 'react';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box>
        <MainPage isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme}/>
      </Box>
    </ThemeProvider>
  );
}

export default App;
