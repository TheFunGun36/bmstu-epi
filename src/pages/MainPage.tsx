import { AppBar, Box, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import ProjectParamsInput from '../components/ProjectParamsInput';
import FunctionalPointsInput from '../components/FunctionalPointsInput';
import { useState } from 'react';
import LanguagesInput from '../components/LanguagesInput';
import PowerFactorsInput from '../components/PowerFactorsInput';
import EarlyArchModel from '../components/EarlyArchModel';
import SalaryInput from '../components/SalaryInput';
import LifecycleTable from '../components/LifecycleTable';
import CompositionModel from '../components/CompositionModel';

interface MainPageProps {
  isDarkTheme: boolean;
  setIsDarkTheme: (isDarkTheme: boolean) => void;
}

export function MainPage(props: MainPageProps) {
  const [fp, setFp] = useState(0);
  const [nfp, setNfp] = useState(0);
  const [loc, setLoc] = useState(0);
  const [p, setP] = useState(0);

  const toggleTheme = () => {
    props.setIsDarkTheme(!props.isDarkTheme);
  };

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
          <IconButton onClick={toggleTheme}>
            {!props.isDarkTheme && <DarkMode />}
            {props.isDarkTheme && <LightMode />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Grid container spacing={1} p={1} columns={14}>
        <Grid item xs={5}>
          <FunctionalPointsInput
            fp={fp}
            setFp={setFp}
          />
        </Grid>
        <Grid item xs={6}>
          <ProjectParamsInput
            fp={fp}
            nfp={nfp}
            setNfp={setNfp}
          />
        </Grid>
        <Grid item xs={3}>
          <LanguagesInput
            nfp={nfp}
            loc={loc}
            setLoc={setLoc}
          />
        </Grid>

        <Grid item xs={2}/>
        <Grid item xs={10}>
          <PowerFactorsInput
            p={p}
            setP={setP}
          />
        </Grid>
        <Grid item xs={2}/>

        <Grid item xs={7}>
          <EarlyArchModel
            loc={loc}
          />
        </Grid>
        <Grid item xs={7}>
          <CompositionModel
            p={p}
            loc={loc}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
