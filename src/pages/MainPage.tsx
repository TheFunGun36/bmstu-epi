import { AppBar, Box, Button, Grid, Toolbar, Typography } from '@mui/material';
import ExpensesDriversDisplay from '../components/ExpensesDriversDisplay';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { projectModeFromKloc } from '../model/ProjectMode';

export function MainPage() {
  const [eaf, setEaf] = useState(1.0);
  const [kloc, setKloc] = useState(10);
  const [mode, setMode] = useState(projectModeFromKloc(kloc));

  return (
    <Box>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}>
            Лабораторная работа №6
          </Typography>
          <Button>На главную</Button>
          <Button>Драйвера расходов</Button>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ExpensesDriversDisplay setEAF={setEaf} />
        </Grid>
        <Grid item>

        </Grid>
      </Grid>

      <Box display='flex'>
        EAF={eaf}
      </Box>
    </Box>
  );
}
