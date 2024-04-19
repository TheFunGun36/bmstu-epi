import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { SmallTableCell as TC } from './SmallTableCell';
import LifecycleStage from '../model/LifecycleStage';
import { readable } from '../model/Misc';

interface LifecycleTableProps {
  stages: LifecycleStage[];
  labor: number[];
  time: number[];
  laborCosts: number;
  timeCosts: number;
}

export function LifecycleTable(p: LifecycleTableProps) {
  const stagesLaborPercent = p.stages.map(s => s.laborPercent).reduce((a, b) => a + b, 0);
  const stagesLabor = p.stages.map((_, i) => p.labor[i]).reduce((a, b) => a + b, 0);
  const stagesTimePercent = p.stages.map(s => s.timePercent).reduce((a, b) => a + b, 0);
  const stagesTime = p.stages.map((_, i) => p.time[i]).reduce((a, b) => a + b, 0);

  const planStage = p.stages.find(e => e.name == 'plan') as LifecycleStage;
  const stagesLaborPercentNoPlan = stagesLaborPercent - planStage.laborPercent;
  const stagesLaborNoPlan = stagesLabor - p.labor[0];
  const stagesTimePercentNoPlan = stagesTimePercent - planStage.timePercent;
  const stagesTimeNoPlan = stagesTime - p.time[0];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TC pl={1}>Вид деятельности</TC>
            <TC>Трудозатраты</TC>
            <TC pr={1}>Время</TC>
          </TableRow>
        </TableHead>
        <TableBody>
          {p.stages.map((value, index) => {
            return (
              <TableRow key={value.name}>
                <TC>{value.displayName}</TC>
                <TC>{value.laborPercent}% ({readable(p.labor[index])})</TC>
                <TC>{value.timePercent}% ({readable(p.time[index])})</TC>
              </TableRow>
            );
          })}
          <TableRow key='lifecycle-summary-no-plan'>
            <TC><b>Итог (без планирования)</b></TC>
            <TC><b>{stagesLaborPercentNoPlan}% ({readable(stagesLaborNoPlan)})</b></TC>
            <TC><b>{stagesTimePercentNoPlan}% ({readable(stagesTimeNoPlan)})</b></TC>
          </TableRow>
          <TableRow key='lifecycle-summary'>
            <TC><b>Итог</b></TC>
            <TC><b>{stagesLaborPercent}% ({readable(stagesLabor)})</b></TC>
            <TC><b>{stagesTimePercent}% ({readable(stagesTime)})</b></TC>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default LifecycleTable;
