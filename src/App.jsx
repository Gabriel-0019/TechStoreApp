import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login/Login";
import Error404 from "./components/pages/Error404/Error404";
import Register from "./components/pages/Register/Register";
import ForgotPassword from "./components/pages/ForgotPassword/ForgotPassword";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./components/pages/Home/Home";
import Navbar from "./components/layouts/navbar/Navbar";
import ChangePassword from "./components/pages/ChangePassword/ChangePassword";
//import { ThemeProvider, createTheme } from "@mui/material/styles";
//import CssBaseline from "@mui/material/CssBaseline";
import CategoriesTable from "./components/pages/CategoriesTable/CategoriesTable";
import { Footer } from "./components/layouts/footer/Footer";

/* const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
}); */

function App() {
  return (
    <>
      {/* <ThemeProvider theme={darkTheme}> */}
      <BrowserRouter>
        <Navbar>
          <AuthContextProvider>
            <Routes>
              <Route
                path="/maintenance/categories"
                element={<CategoriesTable />}
              />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route
                path="/changepassword/:token"
                element={<ChangePassword />}
              />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </AuthContextProvider>
        </Navbar>
        <Footer />
      </BrowserRouter>
      {/*      </ThemeProvider> */}
    </>
  );
}

export default App;
