import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import LoggedInRoute from "./routes/LoggedInRoute";
import NotLoggedInRoute from "./routes/NotLoggedInRoute";
function App() {
  return (
    <div>
      <Routes>
        <Route element={<LoggedInRoute />}>
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/" element={<Home />} exact />
        </Route>
        <Route element={<NotLoggedInRoute />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
