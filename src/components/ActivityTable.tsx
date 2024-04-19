import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { SmallTableCell as TC } from './SmallTableCell';
import ActivityStage from '../model/ActivityStage';
import { readable } from '../model/Misc';

interface ActivityTableProps {
  laborCosts: number;
  stages: ActivityStage[];
  labor: number[];
}

export function ActivityTable(p: ActivityTableProps) {
  const stagesBudgetPercent = p.stages.map(s => s.budgetPercent).reduce((a, b) => a + b, 0);
  const stagesLabor = p.stages.map((_, i) => p.labor[i]).reduce((a, b) => a + b, 0);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TC pl={1}>Вид деятельности</TC>
            <TC>Бюджет</TC>
            <TC pr={1}>Трудозатраты</TC>
          </TableRow>
        </TableHead>
        <TableBody>
          {p.stages.map((value, index) => {
            return (
              <TableRow key={value.name}>
                <TC>{value.displayName}</TC>
                <TC>{value.budgetPercent}%</TC>
                <TC>{readable(p.labor[index])} чел-мес.</TC>
              </TableRow>
            );
          })}
          <TableRow key='lifecycle-summary'>
            <TC><b>Итог</b></TC>
            <TC><b>{stagesBudgetPercent}%</b></TC>
            <TC><b>{readable(stagesLabor)} чел-мес.</b></TC>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ActivityTable;
