import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login/Login";
import Error404 from "./components/pages/Error404/Error404";
import Register from "./components/pages/Register/Register";
import ForgotPassword from "./components/pages/ForgotPassword/ForgotPassword";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./components/pages/Home/Home";
import Navbar from "./components/layouts/navbar/navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar>
          <AuthContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </AuthContextProvider>
        </Navbar>
      </BrowserRouter>
    </>
  );
}

export default App;
