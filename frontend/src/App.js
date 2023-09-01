import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home/index";
import Activate from "./pages/home/activate";
import { useSelector } from "react-redux";
import LoggedInRoute from "./routes/LoggedInRoute";
import NotLoggedInRoute from "./routes/NotLoggedInRoute";
function App() {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div>
      <Routes>
        <Route element={<LoggedInRoute />}>
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/" element={<Home />} exact />
          <Route path="/activate/:token" element={<Activate />} exact />
        </Route>
        <Route element={<NotLoggedInRoute />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
