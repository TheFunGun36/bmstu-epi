import { AppBar, Box, Divider, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import ExpensesDriversDisplay from '../components/ExpensesDriversDisplay';
import { useState } from 'react';
import { laborCosts, projectModeDisplayName, projectModeFromKloc, projectTime } from '../model/ProjectMode';
import NumberInput from '../components/NumberInput';
import { DarkMode, LightMode } from '@mui/icons-material';
import LifecycleTable from '../components/LifecycleTable';
import ActivityTable from '../components/ActivityTable';
import { readable } from '../model/Misc';
import { BarChart } from '@mui/x-charts/BarChart';
import LifecycleStage from '../model/LifecycleStage';
import lifecycle from '../json/lifecycle.json';
import { ChartsReferenceLine } from '@mui/x-charts';

interface MainPageProps {
  isDarkTheme: boolean;
  setIsDarkTheme: (isDarkTheme: boolean) => void;
}

export function MainPage(p: MainPageProps) {
  const [eaf, setEaf] = useState(1.0);
  const [kloc, setKloc] = useState(10);
  const projectMode = projectModeFromKloc(kloc);

  const [salaryAnalyst, setSalaryAnalyst] = useState(0.0);
  const [salaryArchitect, setSalaryArchitect] = useState(0.0);
  const [salaryDeveloper, setSalaryDeveloper] = useState(0.0);
  const [salaryManager, setSalaryManager] = useState(0.0);
  const [salaryQA, setSalaryQA] = useState(0.0);
  const [salaryDevOps, setSalaryDevOps] = useState(0.0);

  const toggleTheme = () => {
    p.setIsDarkTheme(!p.isDarkTheme);
  };

  const laborCostsValue = laborCosts(projectMode, eaf, kloc);
  const projectTimeValue = projectTime(projectMode, laborCostsValue);

  const lifecycleStages: LifecycleStage[] = lifecycle;
  const lifecycleLabor = lifecycleStages.map(e => e.laborPercent * laborCostsValue / 100);
  const lifecycleTime = lifecycleStages.map(e => e.timePercent * projectTimeValue / 100);

  const calculateBars = () => {
    const result: number[] = [];
    lifecycleStages.forEach((el, i) => {
      const days = Math.round(lifecycleLabor[i] / lifecycleTime[i]);
      result.push(...new Array(Math.ceil(lifecycleTime[i])).fill(days));
    });
    return result;
  };

  const calculateBarsXTicks = () => {
    const result: number[] = [0];
    lifecycleStages.forEach((el, i) => {
      const days = Math.round(lifecycleLabor[i] / lifecycleTime[i]);
      result.push(days);
    });
    return result;
  };

  const bars = calculateBars();
  const barsYTicks = calculateBarsXTicks();

  const budget = () => {
    let result = 0;

    // Планирование и определение требований. Аналитик + менеджеры
    let staff = Math.round(lifecycleLabor[0] / lifecycleTime[0]);
    result += staff > 1 ?
      (staff - 1) * salaryManager + salaryAnalyst :
      staff * salaryAnalyst;

    // Проектирование продукта
    staff = Math.round(lifecycleLabor[1] / lifecycleTime[1]);
    result += staff > 1 ?
      (staff - 1) * salaryArchitect + salaryAnalyst :
      staff * salaryArchitect;

    // Детальное проектирование
    staff = Math.round(lifecycleLabor[2] / lifecycleTime[2]);
    if (staff > 2) {
      result += salaryManager + salaryAnalyst;
      staff -= 2;
    } else if (staff > 1) {
      result += salaryAnalyst;
      staff -= 1;
    }
    result += staff * salaryArchitect;

    // Кодирование и тестирование отдельных модулей
    staff = Math.round(lifecycleLabor[3] / lifecycleTime[3]);
    const developer = Math.round(staff * 0.7);
    let qa = staff - developer;
    result += developer * salaryDeveloper + qa * salaryQA;

    // Интеграция и тестирование
    staff = Math.round(lifecycleLabor[4] / lifecycleTime[4]);
    const devOps = Math.round(staff * 0.6);
    qa = staff - devOps;
    result += devOps * salaryDevOps + qa * salaryQA;

    return result;
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
            {!p.isDarkTheme && <DarkMode />}
            {p.isDarkTheme && <LightMode />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Grid container spacing={1} p={1} columns={12}>
        <Grid item xs={5}>
          <ExpensesDriversDisplay setEAF={setEaf} />
        </Grid>
        <Grid item xs={5}>
          <LifecycleTable
            laborCosts={laborCostsValue}
            timeCosts={projectTimeValue}
            labor={lifecycleLabor}
            stages={lifecycleStages}
            time={lifecycleTime}
          />
          <Box mt={1} />
          <ActivityTable
            laborCosts={laborCostsValue} />
        </Grid>
        <Grid item xs={6}>
          <BarChart
            series={[{ data: bars }]}
            xAxis={[{ scaleType: 'band', label: 'Месяц', data: bars.map((_, i) => i) }]}
            yAxis={[{ scaleType: 'linear', label: 'Количество работников' }]}
            grid={{ horizontal: true, vertical: true }}
          />
        </Grid>
        <Grid item xs={3}>
          <Box component={Paper} display='flex' flexDirection='column' p={1}>
            <Typography>
              Число исходных инструкций конечного продукта:
            </Typography>
            <NumberInput
              forbidNegative
              label='KLOC'
              value={kloc}
              setValue={setKloc}
              sx={{ mt: 1, mb: 1 }} />
            <Divider sx={{ m: 1 }} />
            <Typography>
              Режим проекта: {projectModeDisplayName(projectMode)}
            </Typography>
            <Typography>
              EAF: {eaf}
            </Typography>
            <Typography>
              Трудозатраты: {readable(laborCostsValue)} чел-мес.
            </Typography>
            <Typography>
              Бюджет: р.
            </Typography>
            <Typography>
              Время разработки: {readable(projectTimeValue)} мес.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
