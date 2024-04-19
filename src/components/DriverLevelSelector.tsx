import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ExpensesDriver, SelectedLevel } from '../model/ExpensesDrivers';

interface DriverLevelSelectorParams {
  driver: ExpensesDriver,
  setLevel: (_driver: SelectedLevel) => void
}

function DriverLevelSelector({ driver, setLevel }: DriverLevelSelectorParams) {
  const handleChange = (e: SelectChangeEvent) => {
    setLevel(e.target.value as SelectedLevel);
  };

  return (
    <Select
      labelId={`select-${driver.name}-label`}
      id={`select-${driver.name}`}
      label={driver.name}
      value={driver.level}
      onChange={handleChange}
      variant='standard'
    >
      {driver.levels.veryLow &&
        <MenuItem value={SelectedLevel.VERY_LOW}>Очень низкий</MenuItem>}
      {driver.levels.low &&
        <MenuItem value={SelectedLevel.LOW}>Низкий</MenuItem>}
      {driver.levels.nominal &&
        <MenuItem value={SelectedLevel.NOMINAL}>Номинальный</MenuItem>}
      {driver.levels.high &&
        <MenuItem value={SelectedLevel.HIGH}>Высокий</MenuItem>}
      {driver.levels.veryHigh &&
        <MenuItem value={SelectedLevel.VERY_HIGH}>Очень высокий</MenuItem>}
    </Select>
  );
}

export default DriverLevelSelector;
