import { MenuItem, Select, SelectChangeEvent, SxProps, Theme } from '@mui/material';
import { ExpensesDriver, SelectedLevel } from '../model/ExpensesDrivers';

interface DriverLevelSelectorParams {
  driver: ExpensesDriver,
  setLevel: (_driver: SelectedLevel) => void,
  sx?: SxProps<Theme>,
  variant?: 'standard' | 'outlined' | 'filled'
}

function DriverLevelSelector({ driver, setLevel, sx, variant }: DriverLevelSelectorParams) {
  const handleChange = (e: SelectChangeEvent) => {
    setLevel(e.target.value as SelectedLevel);
  };

  return (
    <Select
      sx={sx}
      labelId={`select-${driver.name}-label`}
      id={`select-${driver.name}`}
      label={driver.name}
      value={driver.level}
      onChange={handleChange}
      variant={variant || 'standard'}
    >
      {driver.levels.veryLow &&
        <MenuItem value={SelectedLevel.VERY_LOW}>Очень низкий ({driver.levels.veryLow})</MenuItem>}
      {driver.levels.low &&
        <MenuItem value={SelectedLevel.LOW}>Низкий ({driver.levels.low})</MenuItem>}
      {driver.levels.nominal &&
        <MenuItem value={SelectedLevel.NOMINAL}>Номинальный ({driver.levels.nominal})</MenuItem>}
      {driver.levels.high &&
        <MenuItem value={SelectedLevel.HIGH}>Высокий ({driver.levels.high})</MenuItem>}
      {driver.levels.veryHigh &&
        <MenuItem value={SelectedLevel.VERY_HIGH}>Очень высокий ({driver.levels.veryHigh})</MenuItem>}
    </Select>
  );
}

export default DriverLevelSelector;
