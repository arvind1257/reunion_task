import React, { useState, useEffect } from 'react'
import { Stack, Button, Divider, Popover, Whisper, Dropdown, DatePicker, RangeSlider } from 'rsuite'
import "./Filter.css"
import 'bootstrap/dist/css/bootstrap.min.css'

const Filter = ({ Data, filter, displayAlert }) => {

    const ref = React.useRef();
    const [edit, setEdit] = useState(false);
    const [location, setLocation] = useState("");
    const [moveDate, setMoveDate] = useState(null);
    const [price, setPrice] = useState([0, 10000]);
    const [type, setType] = useState("");

    const [data, setData] = useState(Data);

    const getMinDate = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to 00:00:00.000
        return today;
    };

    const checkDate = (date1, date2) => {
        let Date1 = new Date(date1);
        Date1.setHours(0, 0, 0, 0);
        let Date2 = new Date(date2);
        return Date2 - Date1 > 0;
    }

    if (edit) {
        let customData = []
        if (location !== '') {
            if (Array.from(new Set(Data.map(location1 => location1.state + "," + location1.country))).filter((location1) => location1.includes(location)).length > 0) {
                customData = Data.filter((location1) => (location1.state + "," + location1.country).includes(location) || location1.country.includes(location))
            }
        }
        else {
            customData = Data;
        }
        if (moveDate !== null) {
            customData = customData.filter((date1) => checkDate(date1.Date, moveDate));
        }
        if (price[0] !== 0 || price[1] !== 10000) {
            customData = customData.filter((price1) => price1.price >= price[0] && price1.price <= price[1])
        }
        if (type !== "") {
            if (Array.from(new Set(Data.map(type1 => type1.type))).filter((type1) => type1.includes(type)).length > 0) {
                customData = customData.filter((type1) => type1.type.includes(type))
            }
        }
        setData(customData);
        setEdit(false);
    }

    const handleSearch = () => {
        let valid = true;
        if (location !== '') {
            if (Array.from(new Set(data.map(location1 => location1.state + "," + location1.country))).filter((location1) => location1.includes(location)).length === 0) {
                valid = false;
                setLocation("");
                displayAlert("Location")

            }
        }
        if (type !== '') {
            if (Array.from(new Set(data.map(type1 => type1.type))).filter((type1) => type1.includes(type)).length === 0) {
                valid = false;
                setType("");
                displayAlert("Type")
            }
        }
        if (valid)
            filter(data);

    }



    const MenuPopover = React.forwardRef(({ selection, ...rest }, ref) => (
        <Popover ref={ref} {...rest}>
            {
                selection === "Location" &&
                <Dropdown.Menu className='Filter-DropDown' onSelect={(eventKey) => { setLocation(eventKey); setEdit(true); handleSelectMenu(); }}>
                    {
                        Array.from(new Set(data.map(location1 => location1.state + "," + location1.country))).filter((location1) => location1.includes(location)).map((location1) => (
                            <Dropdown.Item eventKey={location1}>{location1}</Dropdown.Item>
                        ))
                    }

                </Dropdown.Menu>
            }
            {
                selection === "Price" &&
                <RangeSlider
                    onChange={(value) => { setPrice(value); setEdit(true); }}
                    value={price}
                    min={0}
                    max={10000}
                    style={{ margin: "20px", width: "200px" }}
                />
            }
            {
                selection === "Type" &&
                <Dropdown.Menu className='Filter-DropDown' onSelect={(eventKey) => { setType(eventKey); handleSelectMenu(); setEdit(true); }}>
                    {
                        Array.from(new Set(data.map(type1 => type1.type))).filter((type1) => type1.includes(type)).map((type1) => (
                            <Dropdown.Item eventKey={type1}>{type1}</Dropdown.Item>
                        ))
                    }

                </Dropdown.Menu>
            }
        </Popover>

    ));

    function handleSelectMenu() {
        ref.current.close();
    }

    useEffect(() => {
        const handleScroll = () => {
            handleSelectMenu();
        };

        document.querySelector(".Main").addEventListener('scroll', handleScroll);
        document.querySelector(".Filter-Stack").addEventListener('scroll', handleScroll);
        return () => {
            document.querySelector(".Main").removeEventListener('scroll', handleScroll);
            document.querySelector(".Filter-Stack").removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className='Filter-Container'>
                <Stack className='Filter-Stack' divider={<Divider vertical />}>
                    <div className='filter-location'>
                        <label className='filter-input-label'>Location</label>
                        <Whisper
                            placement="bottomStart"
                            controlId="control-id-with-dropdown"
                            trigger="click"
                            ref={ref}
                            speaker={<MenuPopover selection="Location" />}
                        >
                            <input id="location" onChange={(e) => { setLocation(e.target.value); setEdit(true); }} value={location} type='text' placeholder='Select Location' className='filter-input-text' />
                        </Whisper>
                    </div>
                    <div className='filter-date'>
                        <label className='filter-input-label'>When</label>
                        <DatePicker value={moveDate} onChange={(value) => { setMoveDate(value); setEdit(true) }} format="MMM dd,yyyy" oneTap size="md" placeholder="Select Move-in Date" disabledDate={(date) => date < getMinDate()} />
                    </div>
                    <div className='filter-price'>
                        <label className='filter-input-label'>Price</label>
                        <Whisper
                            placement="bottomStart"
                            controlId="control-id-container"
                            trigger="click"
                            ref={ref}
                            speaker={<MenuPopover selection="Price" onSelect={handleSelectMenu} />}
                        >
                            <input value={price[0] + "$-" + price[1] + "$"} type='text' placeholder='Select Price Range' className='filter-input-text' readOnly/>
                        </Whisper>
                    </div>
                    <div className='filter-type'>
                        <label className='filter-input-label'>Property Type</label>
                        <Whisper
                            placement="bottomStart"
                            controlId="control-id-with-dropdown"
                            trigger="click"
                            ref={ref}
                            speaker={<MenuPopover selection="Type" onSelect={handleSelectMenu} />}
                        >
                            <input value={type} onChange={(e) => { setType(e.target.value); setEdit(true); }} type='text' placeholder='Select Location' className='filter-input-text' />
                        </Whisper>
                    </div>
                    <Button onClick={() => handleSearch()} style={{ padding: "15px 30px", fontSize: "18px" }} color="violet" appearance='primary'>Search</Button>
                </Stack>
            </div>
        </>
    )
}

export default Filter
