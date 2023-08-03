import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from 'rsuite'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as solid from "@fortawesome/free-solid-svg-icons"
import * as regular from "@fortawesome/free-regular-svg-icons"


import 'rsuite/dist/rsuite.min.css';
import "./NavBar.css"

const Navbar = ({displayFav1,login1}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [login, setLogin] = useState(false)
    const [displayFav,setDisplayFav] = useState(false);

    if(!login && sessionStorage.getItem("login")){
        setLogin(true);
        login1(true);
    }

    const handleLogin = (status) =>{
        if(status){
            sessionStorage.setItem("login","true");
            sessionStorage.setItem("fav",[]);
            setLogin(true);
            login1(true);
        }
        else{
            sessionStorage.clear();
            setLogin(false);
            login1(false);
        }
    }

    return (
        <nav className="top-navbar">
            <Link to="/" className="title">
                Estatehut
            </Link>
            <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                <i className='bx bx-menu' ></i>
            </div>
            <ul className={menuOpen ? "top-navbar-ul open" : "top-navbar-ul"}>
                <li>
                    <Button color="violet" className="btn1" appearance="subtle">Rent</Button>
                </li>
                <li>
                    <Button color="violet" className="btn1" appearance="subtle">Buy</Button>
                </li>
                <li className="custom-align">
                    <Button color="violet" className="btn1" appearance="subtle">Sell</Button>
                </li>
                {
                    !login ?
                        <>
                            <li>
                                <Button color="violet" onClick={()=>handleLogin(true)} appearance="ghost">Login</Button>
                            </li>
                            <li>
                                <Button color="violet" appearance="primary">SignUp</Button>
                            </li>
                        </>
                        :
                        <>
                            <li className="custom-align">
                                <FontAwesomeIcon onClick={()=>{setDisplayFav(!displayFav);displayFav1(!displayFav);}} color="#531ba8" style={{fontSize:"25px"}} icon={ displayFav ? solid.faHeart : regular.faHeart} />
                            </li>
                            <li>
                                <Button color="violet" appearance="primary" onClick={()=>handleLogin(false)} >LogOut</Button>
                            </li>
                        </>
                }


            </ul>
        </nav >
    )
}

export default Navbar