import React, { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest/dist/Autosuggest";

const CITY_TO_COUNTRY_MAP = {
  Almaty: "kazakhstan", Oral: "kazakhstan", Qostanay: "kazakhstan",
  Amman: "jordan",
  Ashgabat: "turkmenistan",
  Baghdad: "iraq",
  Baku: "azerbaijan",
  Bangkok: "thailand",
  Beirut: "lebanon",
  Bishkek: "kyrgyzstan",
  Brunei: "brunei",
  Colombo: "sri-lanka",
  Damascus: "syria",
  Dhaka: "bangladesh",
  Dili: "tuvalu",
  Dushanbe: "tajikistan",
  Dubai: "united-arab-emirates",
  Famagusta: "cyprus", Nicosia: "cyprus",
  Gaza: "palestine", Hebron: "palestine",
  Jakarta: "indonesia", Jayapura: "indonesia", Makassar: "indonesia", Pontianak: "indonesia",
  Jerusalem: "israel",
  Ho_Chi_Minh: "vietnam",
  Hong_Kong: "hong-kong",
  Irkutsk: "russia", Kamchatka: "russia", Krasnoyarsk: "russia", Novokuznetsk: "russia", Omsk: "russia", "Ust-Nera": "russia", Yakutsk: "russia", Vladivostok: "russia",
  Kabul: "afghanistan",
  Karachi: "pakistan",
  Kathmandu: "nepal",
  Kolkata: "india",
  Kuala_Lumpur: "malaysia", Kuching: "malaysia",
  Macau: "macau",
  Manila: "philippines",
  Pyongyang: "north-korea",
  Qatar: "qatar",
  Riyadh: "saudi-arabia",
  Sanghai: "china", Urumqi: "china",
  Samarkand: "uzbekistan", Tashkent: "uzbekistan",
  Seoul: "south-korea",
  Singapore: "singapore",
  Taipei: "taiwan",
  Tbilisi: "georgia",
  Tehran: "iran",
  Thimphu: "bhutan",
  Tokyo: "japan",
  Ulaanbaatar: "mongolia", Hovd: "mongolia", Choibalsan: "mongolia",
  Yangon: "myanmar",
  Yerevan: "armenia"
};

const AVAILABLE_CITIES = Object.keys(CITY_TO_COUNTRY_MAP)
  .sort()
  .map((city) => ({ name: city }));

const TimeZoneComponent = () => {
  const [data, setData] = useState([]);
  const [city, setCity] = useState("");

  const API_BASE_URL = "https://time.now/developer/api/timezone/Asia/";

  const handleClick = () => {
    fetchTimeZone(city);
  };

  const fetchTimeZone = async (targetCity) => {
    try {
      const response = await fetch(`${API_BASE_URL}${targetCity || "Kolkata"}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      console.log("Timezone Data API Response:", json);
      setData(json);
    } catch (error) {
      console.error("Failed to fetch timezone data from API:", error);
      // Fallback or error state could be handled here
    }
  };

  useEffect(() => {
    fetchTimeZone();
  }, []);

  let mystr = JSON.stringify(data.datetime);

  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  //console.log("city typed  =  "+city);

  const cityToCodeMatcher = (city) => {
    return CITY_TO_COUNTRY_MAP[city] || "india";
  };

  const escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === "") {
      return [];
    }

    const regex = new RegExp("^" + escapedValue, "i");

    return AVAILABLE_CITIES.filter((cityObj) => regex.test(cityObj.name));
  }

  function getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  function renderSuggestion(suggestion) {
    return <span className="text-base lg:text-xl xl:text-3xl" >{suggestion.name}</span>;
  }

  const onAutoChange = (e, { newValue, method }) => {
    setValue(newValue);
    //console.log(newValue)
    setCity(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Any Asian Capital Here ...",
    value,
    onChange: onAutoChange,
    className: "m-1 py-1 px-2 lg:py-3 border-[1px] border-black lg:px-5 xl:py-6 xl:px-8 lg:text-xl xl:text-3xl w-4/5 text-center text-extrabold rounded-md text-sm lg:text-base",
  };

  const readySRC = (city) => {
    let temp = "https://assets.thebasetrip.com/api/v2/countries/flags/".concat(
      cityToCodeMatcher(city)
    );
    return temp.concat(".png");
  };

  return (
    <>
      <div className="container text-center  p-4 m-auto">
        <h1 className="p-2 text-5xl sm:text-6xl text-center text-white font-bold" style={{ fontFamily: "Pacifico" }}>Time - Travel</h1>
        <div className="border-2 border-black  w-3/5 text-center text-3xl m-auto mt-3 p-5 bg-gradient-to-tr from-red-100 to-blue-400 flex flex-col justify-center">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </div>
        <div className="p-2 sm:p-10">
          <button
            onClick={() => handleClick()}
            className="bg-gray-700 hover:bg-gray-800 text-white px-3 md:px-4 py-5 text-lg sm:text-2xl font-semibold  hover:border-2 hover:border-white hover:outline hover:outline-gray-900 rounded-lg"
          >
            Get Current DateTime
          </button>
        </div>

        <div className="flex flex-col justify-center item-center text-2xl p-2 sm:p-4 bg-gray-100/70 w-full   md:w-3/5 xl:w-2/5 m-auto">
          <div>
            <strong className="text-red-900 ">Date - </strong>{" "}
            {mystr?.slice(1, 11)}
          </div>
          <div>
            <strong className="text-red-900 ">Time - </strong>{" "}
            {mystr?.slice(12, 20)}
          </div>
          <div>
            <strong className="text-red-900 ">TimeZone - </strong>{" "}
            {data.timezone}
          </div>
        </div>
        <div className="text-center m-auto">
          <img
            src={readySRC(city)}
            alt="Country flag"
            className="border-2 border-black w-3/5 sm:w-2/5 m-auto mt-3"
          />
        </div>
      </div>
    </>
  );
};
export default TimeZoneComponent;
