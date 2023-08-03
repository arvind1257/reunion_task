import "./App.css";
import Navbar from "./Components/NavBar/NavBar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import { useState, createContext } from "react";

export const UserContext = createContext();
export const LoginContext = createContext();

function App() {

  const [displayFav,setDisplayFav] = useState(false);
  const [login, setLogin] = useState(false)

  const displayFav1 = (status) =>{
    setDisplayFav(status);
  }

  const login1 = (status) =>{
    setLogin(status);
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={displayFav}>
        <LoginContext.Provider value={login}>
        <Navbar displayFav1={(status)=>displayFav1(status)} login1={(status)=>login1(status)}/>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        </LoginContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
