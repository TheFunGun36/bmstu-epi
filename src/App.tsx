import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { MainPage } from './pages/MainPage';
import { useState } from 'react';
import { projectModeFromKloc } from './model/ProjectMode';
import ExpensesDriversPage from './pages/ExpensesDriversPage';

function App() {

  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <MainPage/>
          } />
          <Route path='*' Component={NotFoundPage} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
