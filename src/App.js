import {
  Box,
  CssBaseline,
  Toolbar,
} from "@mui/material";

import {
  Routes,
  Route,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewTasks from "./pages/NewTasks";
import AddTask from "./pages/AddTask";
import Dashboard from "./pages/Dashboard";
import InProgress from "./pages/InProgress";
import Cancelled from "./pages/Cancelled";
import Login from "./pages/Login";
import PrivateRoute from "./componests/PrivateRoute";
import Completed from "./pages/Completed";
import Registration from "./pages/Registration";


function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<NewTasks />} />
        </Route>


        <Route path="/addTask" element={<PrivateRoute />}>
          <Route path="/addTask" element={<AddTask />} />
        </Route>

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/progress" element={<PrivateRoute />}>
          <Route path="/progress" element={<InProgress />} />
        </Route>

        <Route path="/cancelled" element={<PrivateRoute />}>
          <Route path="/cancelled" element={<Cancelled />} />
        </Route>

        <Route path="/completed" element={<PrivateRoute />}>
          <Route path="/completed" element={<Completed />} />
        </Route>

      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
