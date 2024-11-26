// A search to input city names and trigger the API call.


import React,{useState} from "react";

const SearchCity =({onSearch}) => {

    const [city, setCity] = useState('');

    const handleSearch = () => {
        if (city.trim()){
            onSearch(city);
            setCity('');
        }
    }

       return(
        <div>
            <input 
                type="text"
                placeholder="Enter City..."
                value={city}
                onChange={(e) => setCity(e.target.value)}/>

                <button onClick={handleSearch}>Search</button>
        </div>
    ); 
}



export default SearchCity;