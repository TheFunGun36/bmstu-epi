import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ExpensesDriversDisplay from "../components/ExpensesDriversDisplay";

interface ExpensesDriversPageProps {
  setEaf: (_eaf: number) => void
}

function ExpensesDriversPage(p: ExpensesDriversPageProps) {
  const navigate = useNavigate();
  const toMain = () => navigate('/');

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
          <Button onClick={toMain}>На главную</Button>
        </Toolbar>
      </AppBar>

      <Box display='flex' flexDirection='row' justifyContent='center'>
        <Box display='flex' flexDirection='column'>
          <ExpensesDriversDisplay setEAF={p.setEaf} />
        </Box>
      </Box>
    </Box>
  )
}

export default ExpensesDriversPage;
