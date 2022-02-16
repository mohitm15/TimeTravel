import React, { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest/dist/Autosuggest";

const TimeZoneComponent = () => {
  const [data, setData] = useState([]);
  const [city, setCity] = useState("");
  const [printCity, setPrintCity] = useState(false);

  const handleClick = () => {
    setPrintCity(true);
    if (printCity) {
      timeZone(city);
    }
  };

  async function timeZone(city) {
    await fetch(`https://worldtimeapi.org/api/timezone/Asia/${city}`)
      .then((response) => response.json())
      .then((json) => {
        //console.log(json);
        setData(json);
      });
  }

  useEffect(() => {
    timeZone();
  }, []);

  let mystr = JSON.stringify(data.datetime);

  const [value,setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  //console.log("city typed  =  "+city);

  const cityToCodeMatcher = (city) => {
    let code;
    if (city === "Kolkata") code = "india";
    else if (city === "Almaty") code = "kazakhstan";
    else if (city === "Amman") code = "jordan";
    else if (city === "Ashgabat") code = "turkmenistan";
    else if (city === "Baghdad") code = "iraq";
    else if (city === "Baku") code = "azerbaijan";
    else if (city === "Bangkok") code = "thailand";
    else if (city === "Beirut") code = "lebanon";
    else if (city === "Bishkek") code = "kyrgyzstan";
    else if (city === "Brunei") code = "brunei";
    else if (city === "Damascus") code = "syria";
    else if (city === "Dhaka") code = "bangladesh";
    else if (city === "Dili") code = "tuvalu";
    else if (city === "Dushanbe") code = "tajikistan";
    else if (city === "Jakarta") code = "indonesia";
    else if (city === "Jerusalem") code = "israel";
    else if (city === "Kabul") code = "afghanistan";
    else if (city === "Kathmandu") code = "nepal";
    else if (city === "Kuala_Lumpur") code = "malaysia";
    else if (city === "Pyongyang") code = "north-korea";
    else if (city === "Manila") code = "philippines";
    else if (city === "Riyadh") code = "saudi-arabia";
    else if (city === "Sanghai") code = "china";
    else if (city === "Seoul") code = "south-korea";
    else if (city === "Singapore") code = "singapore";
    else if (city === "Taipei") code = "taiwan";
    else if (city === "Tashkent") code = "uzbekistan";
    else if (city === "Tbilisi") code = "georgia";
    else if (city === "Tehran") code = "iran";
    else if (city === "Thimphu") code = "bhutan";
    else if (city === "Tokyo") code = "japan";
    else if (city === "Ulaanbaatar") code = "mongolia";
    else if (city === "Yerevan") code = "armenia";
    else code = "india";
    // if (city === "Kolkata") code = "IN";
    // else if (city === "Almaty") code = "KZ";
    // else if (city === "Amman") code = "JO";
    // else if (city === "Ashgabat") code = "TM";
    // else if (city === "Baghdad") code = "IQ";
    // else if (city === "Baku") code = "AZ";
    // else if (city === "Bangkok") code = "TH";
    // else if (city === "Beirut") code = "LB";
    // else if (city === "Bishkek") code = "KG";
    // else if (city === "Brunei") code = "BN";
    // else if (city === "Damascus") code = "SY";
    // else if (city === "Dhaka") code = "BD";
    // else if (city === "Dili") code = "TL";
    // else if (city === "Dushanbe") code = "TJ";
    // else if (city === "Jakarta") code = "ID";
    // else if (city === "Jerusalem") code = "IL";
    // else if (city === "Kabul") code = "AF";
    // else if (city === "Kathmandu") code = "NP";
    // else if (city === "Kuala_Lumpur") code = "MY";
    // else if (city === "Pyongyang") code = "KP";
    // else if (city === "Manila") code = "PH";
    // else if (city === "Riyadh") code = "SA";
    // else if (city === "Sanghai") code = "CN";
    // else if (city === "Seoul") code = "KR";
    // else if (city === "Singapore") code = "SG";
    // else if (city === "Taipei") code = "TW";
    // else if (city === "Tashkent") code = "UZ";
    // else if (city === "Tbilisi") code = "GE";
    // else if (city === "Tehran") code = "IR";
    // else if (city === "Thimphu") code = "BT";
    // else if (city === "Tokyo") code = "JP";
    // else if (city === "Ulaanbaatar") code = "MN";
    // else if (city === "Yerevan") code = "AM";
    // else code = "IN";
    return code;
  };

  const languages = [
    {
      name: 'Almaty',
    },
    {
      name: 'Amman',
    },
    
  ];

  const escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    
    if (escapedValue === '') {
      return [];
    }
  
    const regex = new RegExp('^' + escapedValue, 'i');
  
    return languages.filter(language => regex.test(language.name));
  }

  function getSuggestionValue(suggestion) {
    return suggestion.name;
  }
  
  function renderSuggestion(suggestion) {
    return (
      <span>{suggestion.name}</span>
    );
  }

  const onAutoChange = (e, { newValue, method}) => {
    setValue(newValue);
    setCity(e.target.value);
  }

  const onSuggestionsFetchRequested = ({value}) => {
    setSuggestions(getSuggestions(value));
  }
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  }

  const inputProps = {
    placeholder: "Type City Name",
    value,
    onChange: onAutoChange
  }
  const readySRC = (city) => {
    let temp = "https://assets.thebasetrip.com/api/v2/countries/flags/".concat(cityToCodeMatcher(city));
    return temp.concat(".png");
  };

  return (
    <>
      <div className="container text-center bg-gray-200 p-4 m-auto">
      <h1 className='p-2 text-5xl sm:text-7xl text-center'>Time Travel</h1>
        <div className="border-2 border-black  w-3/5 text-center m-auto mt-3 p-5 bg-gray-200">
          <label className="text-2xl ">
            Type Any Asian City Here
            <input
              type="text"
              className="m-3 p-2 w-3/5 text-center text-extrabold rounded-md"
              placeholder=" Type city here.."
              onChange={(event) => setCity(event.target.value)}
            />
            <Autosuggest 
             suggestions = {suggestions}
             onSuggestionsFetchRequested = {onSuggestionsFetchRequested}
             onSuggestionsClearRequested = {onSuggestionsClearRequested}
             getSuggestionValue = {getSuggestionValue}
             renderSuggestion = {renderSuggestion}
            inputProps = {inputProps}
            />
            <br />
          </label>
        </div>
        <div className="p-2 sm:p-10">
        <button onClick={() => handleClick()} className="bg-gray-700 hover:bg-gray-800 text-white px-3 md:px-4 py-5 text-lg sm:text-2xl font-semibold  hover:border-2 hover:border-white hover:outline hover:outline-gray-900 rounded-lg">
              Get Current DateTime
            </button>
        </div>

        <div className="flex flex-col justify-center item-center text-2xl p-2 sm:p-2">
          <div><strong className="text-red-900 ">Date - </strong> {mystr?.slice(1, 11)}</div> 
          <div><strong className="text-red-900 ">Time - </strong> {mystr?.slice(12, 20)}</div> 
          <div><strong className="text-red-900 ">TimeZone - </strong> {data.timezone}</div>
        </div>
        <div className="text-center m-auto">
          <img src={readySRC(city)} alt="Country flag" className="border-2 border-black w-3/5 sm:w-2/5 m-auto"/>
        </div>
      </div>
    </>
  );
};
export default TimeZoneComponent;
