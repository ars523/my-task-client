import {
  Box,
  CssBaseline,
  Toolbar,
} from "@mui/material";

import {
  Routes,
  Route,
} from 'react-router-dom'

import NavBar from "./componests/NavBar";
import PermanentDrawer from "./componests/PermanentDrawer";
import NewTasks from "./pages/NewTasks";
import AddTask from "./pages/AddTask";
import Dashboard from "./pages/Dashboard";
import InProgress from "./pages/InProgress";
import Cancelled from "./pages/Cancelled";
import useMediaQuery from '@mui/material/useMediaQuery';
import Login from "./pages/Login";
import PrivateRoute from "./componests/PrivateRoute";
import Completed from "./pages/Completed";


function App() {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavBar />
      {matches && <PermanentDrawer />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: '2rem',
          bgcolor: '#eee',
          minHeight: '100vh'
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<NewTasks />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/addTask" element={<AddTask />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/progress" element={<InProgress />} />
          <Route path="/cancelled" element={<Cancelled />} />
          <Route path="/completed" element={<Completed />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
