import React,{useContext, useState} from 'react'
import { Panel } from 'rsuite'
import "./CardList.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as solid from "@fortawesome/free-solid-svg-icons"
import * as regular from "@fortawesome/free-regular-svg-icons"
import { UserContext,LoginContext } from '../../App'
import { images } from '../Data'

const CardList = ({ Data,search,displayAlert }) => {


    const displayFav = useContext(UserContext)
    const loginStatus = useContext(LoginContext)
    const data = Data;
    const [favorite,setFavorite] = useState([]);
    //let images = require("./images/House1.jpeg");

    console.log(loginStatus);
    console.log(displayFav);

    if(favorite.length===0 && sessionStorage.getItem('fav') && loginStatus){
        setFavorite(JSON.parse(sessionStorage.getItem('fav')));
    }

    if(favorite.length!==0 && !loginStatus){
        setFavorite([]);
    }

    const handleFavourite = (id,status) =>{
        if(sessionStorage.getItem("login")){
            if(!status){
                let arr = []
                let fav = sessionStorage.getItem('fav');
                if(fav!=="")
                    arr = JSON.parse(fav);
                arr.push(id);
                sessionStorage.setItem('fav',JSON.stringify(arr));
                setFavorite(arr);
            }
            else{
                let fav = sessionStorage.getItem('fav');
                let arr = JSON.parse(fav);
                const index = arr.indexOf(id);
                arr.splice(index, 1);
                if(arr.length===0)
                    sessionStorage.setItem('fav',"");
                else
                    sessionStorage.setItem('fav',JSON.stringify(arr));
                setFavorite(arr);
            }
        }
        else{
            displayAlert("login");
        }
    }

    return (
        <div className='CardList-Container row'>
            {
                data.filter((item)=>{
                    if(!displayFav){
                    if(item.houseName.includes(search)){
                        return true;
                    }
                    if(item.state.includes(search)){
                        return true;
                    }
                    if(item.country.includes(search)){
                        return true;
                    }
                    // eslint-disable-next-line
                    if(item.bed == search || item.bathroom == search || item.size == search){
                        return true;
                    }
                    if(item.line1.includes(search)){
                        return true;
                    }
                    }
                    else{
                        if(favorite.includes(item.id)){
                            return true;
                        }
                    }
                    return false;
                }).map((item, index) => (
                    <div key={index+1} className='CardList-Content col-xl-3 col-lg-4 col-md-5 col-sm-6 col-xs-9'>
                        <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: "100%", maxWidth: "240px" }}>
                            <img alt="no img" src={images[item.image]} style={{height:"240px",width:"-webkit-fill-available"}}  />
                            <div className='Panel-Container'>
                                <div className='Panel-Container-1'>
                                    <div className='Panel-Container-1-1'>
                                        <div className='Panel-Price-Col'>${item.price}<span>/month</span></div>
                                        <div className='Panel-Name-Col'>{item.houseName}</div>
                                    </div>
                                    <div className='Panel-Fav-Col'>
                                        <FontAwesomeIcon onClick={()=>handleFavourite(item.id,favorite.includes(item.id))} icon={favorite.includes(item.id) ? solid.faHeart : regular.faHeart} />
                                    </div>
                                </div>
                                <div className='Panel-Address-Col'>{item.line1 + "," + item.city + "," + item.state + "," + item.country}</div>
                                <hr />
                                <div className='Panel-Container-2'>
                                    {
                                        item.bed && item.bathroom ? <>
                                            <div><FontAwesomeIcon icon={solid.faBed}/> {item.bed} Bed</div>
                                            <div><FontAwesomeIcon icon={solid.faBath}/> {item.bathroom} Bathroom</div>
                                        </>
                                        :
                                        <></>
                                    }
                                    <div><FontAwesomeIcon icon={solid.faLayerGroup}/> {item.size}m<sup>2</sup></div>
                                </div>
                            </div>
                        </Panel>
                    </div>
                ))
            }
        </div>
    )
}

export default CardList
