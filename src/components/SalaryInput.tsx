import { useEffect, useState } from "react";
import { Salaries, calculateBudget } from "../model/Budget";
import { Typography } from "@mui/material";
import NumberInput from "./NumberInput";
import { readable } from "../model/Misc";

export interface SalaryInputProps {
  budget: number;
  setBudget: (value: number) => void;
  lifecycleLabor: number[];
  lifecycleTime: number[];
}

export function SalaryInput(p: SalaryInputProps) {
  const [salaryAnalyst, setSalaryAnalyst] = useState(180000);
  const [salaryArchitect, setSalaryArchitect] = useState(250000);
  const [salaryDeveloper, setSalaryDeveloper] = useState(217000);
  const [salaryManager, setSalaryManager] = useState(217000);
  const [salaryQA, setSalaryQA] = useState(135000);
  const [salaryDevOps, setSalaryDevOps] = useState(185000);

  useEffect(() => {
    const salaries: Salaries = {
      analyst: salaryAnalyst,
      architect: salaryArchitect,
      developer: salaryDeveloper,
      devOps: salaryDevOps,
      manager: salaryManager,
      qa: salaryQA
    };

    p.setBudget(calculateBudget(p.lifecycleLabor, p.lifecycleTime, salaries));
  }, [salaryAnalyst, salaryArchitect, salaryDeveloper, salaryManager, salaryQA, salaryDevOps]);

  return (
    <>
      <Typography>Зарплаты сотрудников:</Typography>
      <NumberInput forbidNegative label='Аналитик' value={salaryAnalyst} setValue={setSalaryAnalyst} sx={{ mt: 1, mb: 1 }} />
      <NumberInput forbidNegative label='Архитектор' value={salaryArchitect} setValue={setSalaryArchitect} sx={{ mb: 1 }} />
      <NumberInput forbidNegative label='Разработчик (программист)' value={salaryDeveloper} setValue={setSalaryDeveloper} sx={{ mb: 1 }} />
      <NumberInput forbidNegative label='Менеджер' value={salaryManager} setValue={setSalaryManager} sx={{ mb: 1 }} />
      <NumberInput forbidNegative label='QA' value={salaryQA} setValue={setSalaryQA} sx={{ mb: 1 }} />
      <NumberInput forbidNegative label='DevOps' value={salaryDevOps} setValue={setSalaryDevOps} sx={{ mb: 1 }} />
      <Typography><b>Бюджет:</b> {readable(p.budget)} р.</Typography>
    </>
  );
}

export default SalaryInput;
