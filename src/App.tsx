import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
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
        <BrowserRouter>
          <Routes>
            <Route path='/' element={
              <MainPage isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme}/>
            } />
            <Route path='*' Component={NotFoundPage} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
