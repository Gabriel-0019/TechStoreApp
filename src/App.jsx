import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login/Login";
import Error404 from "./components/pages/Error404/Error404";
import Register from "./components/pages/Register/Register";
import ForgotPassword from "./components/pages/ForgotPassword/ForgotPassword";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
