import { AppBar, Box, Button, Divider, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import ExpensesDriversDisplay from '../components/ExpensesDriversDisplay';
import { useRef, useState } from 'react';
import { laborCosts as calcLaborCosts, projectModeDisplayName, projectModeFromKloc, projectTime as calcProjectTime } from '../model/ProjectMode';
import NumberInput from '../components/NumberInput';
import { DarkMode, LightMode } from '@mui/icons-material';
import LifecycleTable from '../components/LifecycleTable';
import ActivityTable from '../components/ActivityTable';
import { readable } from '../model/Misc';
import { BarChart } from '@mui/x-charts/BarChart';
import LifecycleStage from '../model/LifecycleStage';
import lifecycle from '../json/lifecycle.json';
import activity from '../json/activity.json';
import ActivityStage from '../model/ActivityStage';
import SalaryInput from '../components/SalaryInput';
import { AxisConfig, LineChart, LineSeriesType } from '@mui/x-charts';
import drivers from '../json/drivers.json';
import { ExpensesDriver, driverIterator, driverIteratorNext, driverLevel } from '../model/ExpensesDrivers';

interface MainPageProps {
  isDarkTheme: boolean;
  setIsDarkTheme: (isDarkTheme: boolean) => void;
}

const lifecycleStages: LifecycleStage[] = lifecycle;
const activityStages: ActivityStage[] = activity;

const calculateBars = (labor: number[], time: number[]) => {
  const result: number[] = [];
  lifecycleStages.forEach((_, i) => {
    const days = Math.round(labor[i] / time[i]);
    result.push(...new Array(Math.ceil(time[i])).fill(days));
  });
  return result;
};

type ParamSpread = {
  name: string,
  values: number[],
};

function calculateDots(kloc: number): [number[][], ParamSpread[], ParamSpread[]] {
  const labors: ParamSpread[] = [{ name: 'MODP', values: [] }, { name: 'TOOL', values: [] }, { name: 'ACAP', values: [] }, { name: 'PCAP', values: [] }];
  const times: ParamSpread[] = [{ name: 'MODP', values: [] }, { name: 'TOOL', values: [] }, { name: 'ACAP', values: [] }, { name: 'PCAP', values: [] }];
  const xs: number[][] = [[], [], [], []];

  const modp = drivers.find(e => e.name === 'MODP') as ExpensesDriver;
  const tool = drivers.find(e => e.name === 'TOOL') as ExpensesDriver;
  const acap = drivers.find(e => e.name === 'ACAP') as ExpensesDriver;
  const pcap = drivers.find(e => e.name === 'PCAP') as ExpensesDriver;

  const mode = projectModeFromKloc(kloc);

  const params = [modp, tool, acap, pcap];
  params.forEach((p, i) => {
    let it = driverIterator(p);
    while (it) {
      const eaf = driverLevel(p, it);
      const labor = calcLaborCosts(mode, eaf, kloc);
      const time = calcProjectTime(mode, labor);
      labors[i].values.push(labor);
      times[i].values.push(time);
      xs[i].push(eaf);
      it = driverIteratorNext(p, it);
    }
  });

  console.log(xs);
  return [xs, labors, times];
};

export function MainPage(p: MainPageProps) {
  // INPUT
  const [kloc, setKloc] = useState(170);

  // CALCULATED IN CHILD COMPONENTS
  const [eaf, setEaf] = useState(1.0);
  const [budget, setBudget] = useState(0);

  // EASILY CALCULATED
  const projectMode = projectModeFromKloc(kloc);
  const laborCosts = calcLaborCosts(projectMode, eaf, kloc);
  const projectTime = calcProjectTime(projectMode, laborCosts);

  // CALCULATED ON DEMAND
  const [lifecycleLabor, setLifecycleLabor] = useState(lifecycleStages.map(e => e.laborPercent * laborCosts / 100));
  const [lifecycleTime, setLifecycleTime] = useState(lifecycleStages.map(e => e.timePercent * projectTime / 100));
  const [activityLabor, setActivityLabor] = useState(activityStages.map(e => e.budgetPercent * laborCosts / 100));
  const [bars, setBars] = useState(calculateBars(lifecycleLabor, lifecycleTime));
  const [dotsTimes, setDotsTimes] = useState<ParamSpread[] | undefined>();
  const [dotsLabors, setDotsLabors] = useState<ParamSpread[] | undefined>();
  const [dotsX, setDotsX] = useState<number[][]>([[]]);

  const myRef = useRef<any>(undefined);
  const executeScroll = () => { myRef && myRef.current && myRef.current.scrollIntoView(); };

  const recalculateProject = () => {
    const labor = lifecycleStages.map(e => e.laborPercent * laborCosts / 100);
    const time = lifecycleStages.map(e => e.timePercent * projectTime / 100);
    setBars(calculateBars(labor, time));
    setLifecycleLabor(labor);
    setLifecycleTime(time);
    setActivityLabor(activityStages.map(e => e.budgetPercent * budget / 100));

    const [x, labors, times] = calculateDots(kloc);
    setDotsX(x);
    setDotsLabors(labors);
    setDotsTimes(times);
    executeScroll();
  };

  const toggleTheme = () => {
    p.setIsDarkTheme(!p.isDarkTheme);
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

      <Grid container spacing={1} p={1} columns={26}>
        <Grid item xs={10}>
          <ExpensesDriversDisplay setEAF={setEaf} />
        </Grid>
        <Grid item xs={10}>
          <LifecycleTable
            laborCosts={laborCosts}
            timeCosts={projectTime}
            labor={lifecycleLabor}
            stages={lifecycleStages}
            time={lifecycleTime}
          />
          <Box mt={1} />
          <ActivityTable
            laborCosts={laborCosts}
            stages={activityStages}
            labor={activityLabor}
          />
        </Grid>
        <Grid item xs={6}>
          <Box component={Paper} display='flex' flexDirection='column' p={1}>
            <Typography>Число исходных инструкций конечного продукта:</Typography>
            <NumberInput forbidNegative label='KLOC' value={kloc} setValue={setKloc} sx={{ mt: 1, mb: 1 }} />
            <Typography><b>Режим проекта:</b> {projectModeDisplayName(projectMode)}</Typography>
            <Typography><b>EAF:</b> {eaf}</Typography>
            <Typography><b>Трудозатраты:</b> {readable(laborCosts)} чел-мес.</Typography>
            <Typography><b>Время разработки:</b> {readable(projectTime)} мес.</Typography>
            <Divider sx={{ m: 1 }} />
            <SalaryInput budget={budget} setBudget={setBudget} lifecycleLabor={lifecycleLabor} lifecycleTime={lifecycleTime} />
            <Divider sx={{ m: 1 }} />
            <Button onClick={recalculateProject} variant='contained'>Перерасчитать таблицы и графики</Button>
          </Box>
        </Grid>
        <Grid item xs={26}>
          <BarChart
            ref={myRef}
            series={[{ data: bars }]}
            xAxis={[{ scaleType: 'band', label: 'Месяц', data: bars.map((_, i) => i) }]}
            yAxis={[{ scaleType: 'linear', label: 'Количество работников' }]}
            grid={{ horizontal: true, vertical: true }}
            height={500}
          />
        </Grid>
        {dotsLabors && dotsX &&
          <Grid item xs={13}>
            <Typography variant='h5' align='center'>Трудозатраты</Typography>
            <LineChart
              series={dotsLabors.map((e, i): LineSeriesType => { return { data: e.values, label: e.name, type: 'line', xAxisKey: `axis-${i}` }; })}
              xAxis={dotsX.map((e, i): AxisConfig => { return { id: `axis-${i}`, label: 'Параметр', data: e }; })}
              yAxis={[{ scaleType: 'linear', label: 'Трудозатраты' }]}
              grid={{ horizontal: true, vertical: true }}
              height={500}
              tooltip={{ trigger: 'item' }}
              axisHighlight={{
                x: 'none',
                y: 'line',
              }}
            />
            <div id='graph-view-pos' />
          </Grid>}
        {dotsTimes && dotsX &&
          <Grid item xs={13}>
            <Typography variant='h5' align='center'>Время</Typography>
            <LineChart
              series={dotsTimes.map((e, i): LineSeriesType => { return { data: e.values, label: e.name, type: 'line', xAxisKey: `axis-${i}` }; })}
              xAxis={dotsX.map((e, i): AxisConfig => { return { id: `axis-${i}`, label: 'Параметр', data: e }; })}
              yAxis={[{ scaleType: 'linear', label: 'Время' }]}
              grid={{ horizontal: true, vertical: true }}
              height={500}
              tooltip={{ trigger: 'item' }}
              axisHighlight={{
                x: 'none',
                y: 'line',
              }}
            />
          </Grid>}
      </Grid>
    </Box>
  );
}
