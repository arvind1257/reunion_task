import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert';

import "./Home.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Data } from '../Data'
import Filter from '../Filter/Filter'
import CardList from '../CardList/CardList'

const Home = () => {

    const data = Data;
    const [filterData, setFilterData] = useState(Data);
    const [alert, setAlert] = useState(false);
    const [search,setSearch] = useState("");

    const changeFilter = (data) => {
        setSearch("");
        setFilterData(data);
    }

    const displayAlert = (status) => {
        setAlert(status)
    }

    if(alert!==false){
        setTimeout(()=>setAlert(false),5000);
    }

    return (
        <section className='section'>
            {
                alert !== false &&
                <Alert className='filter-alert' variant={alert==="login" ? "warning" : "danger"} onClose={() => setAlert(false)} dismissible>
                    {
                        alert === "location" ?
                            <>
                                Its is an invalid location. Kindly select the location from the given dropdown list.

                            </>
                            :
                            alert === "login" ?
                            <>
                                To store the property details in your favorite, you need to login to the portal.
                            </>
                            :
                            <>
                            Its is an invalid Property Type. Kindly select the property type from the given dropdown list.
                            </>
                    }
                </Alert>
            }
            <div className='Main'>
                <div className='Main-Container-1 row'>
                    <div className='Main-text col-xl-6 col-lg-6 col-md-7'>
                        Search properties to rent
                    </div>
                    <div className='Main-search col-xl-6 col-lg-6 col-md-5'>
                        <i className='bx bx-search search-icon'></i>
                        <input value={search} onChange={(e)=>setSearch(e.target.value)}  placeholder='Search' type="search" />
                    </div>
                </div>
                <Filter Data={data} filter={(data) => changeFilter(data)} displayAlert={(status) => displayAlert(status)} />
                <CardList Data={filterData} search={search} displayAlert={(status) => displayAlert(status)} />
            </div>
        </section>
    )
}

export default Home
