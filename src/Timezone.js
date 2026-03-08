import React, { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest/dist/Autosuggest";

//TODO: The api response does not shows the default time after clearing the input
//TODO: Integerating the country stats api

const CITY_TO_COUNTRY_MAP = {
  Almaty: { name: "kazakhstan", code: "kaz" }, Oral: { name: "kazakhstan", code: "kaz" }, Qostanay: { name: "kazakhstan", code: "kaz" },
  Amman: { name: "jordan", code: "jor" },
  Ashgabat: { name: "turkmenistan", code: "tkm" },
  Baghdad: { name: "iraq", code: "irq" },
  Baku: { name: "azerbaijan", code: "aze" },
  Bangkok: { name: "thailand", code: "tha" },
  Beirut: { name: "lebanon", code: "lbn" },
  Bishkek: { name: "kyrgyzstan", code: "kgz" },
  Brunei: { name: "brunei", code: "brn" },
  Colombo: { name: "sri-lanka", code: "lka" },
  Damascus: { name: "syria", code: "syr" },
  Dhaka: { name: "bangladesh", code: "bgd" },
  Dili: { name: "timor-leste", code: "tls" },
  Dushanbe: { name: "tajikistan", code: "tjk" },
  Dubai: { name: "united-arab-emirates", code: "are" },
  Famagusta: { name: "cyprus", code: "cyp" }, Nicosia: { name: "cyprus", code: "cyp" },
  Gaza: { name: "palestine", code: "pse" }, Hebron: { name: "palestine", code: "pse" },
  Jakarta: { name: "indonesia", code: "idn" }, Jayapura: { name: "indonesia", code: "idn" }, Makassar: { name: "indonesia", code: "idn" }, Pontianak: { name: "indonesia", code: "idn" },
  Jerusalem: { name: "israel", code: "isr" },
  Ho_Chi_Minh: { name: "vietnam", code: "vnm" },
  Hong_Kong: { name: "hong-kong", code: "hkg" },
  Irkutsk: { name: "russia", code: "rus" }, Kamchatka: { name: "russia", code: "rus" }, Krasnoyarsk: { name: "russia", code: "rus" }, Novokuznetsk: { name: "russia", code: "rus" }, Omsk: { name: "russia", code: "rus" }, "Ust-Nera": { name: "russia", code: "rus" }, Yakutsk: { name: "russia", code: "rus" }, Vladivostok: { name: "russia", code: "rus" },
  Kabul: { name: "afghanistan", code: "afg" },
  Karachi: { name: "pakistan", code: "pak" },
  Kathmandu: { name: "nepal", code: "npl" },
  Kolkata: { name: "india", code: "ind" },
  Kuala_Lumpur: { name: "malaysia", code: "mys" }, Kuching: { name: "malaysia", code: "mys" },
  Macau: { name: "macau", code: "mac" },
  Manila: { name: "philippines", code: "phl" },
  Pyongyang: { name: "north-korea", code: "prk" },
  Qatar: { name: "qatar", code: "qat" },
  Riyadh: { name: "saudi-arabia", code: "sau" },
  Sanghai: { name: "china", code: "chn" }, Urumqi: { name: "china", code: "chn" },
  Samarkand: { name: "uzbekistan", code: "uzb" }, Tashkent: { name: "uzbekistan", code: "uzb" },
  Seoul: { name: "south-korea", code: "kor" },
  Singapore: { name: "singapore", code: "sgp" },
  Taipei: { name: "taiwan", code: "twn" },
  Tbilisi: { name: "georgia", code: "geo" },
  Tehran: { name: "iran", code: "irn" },
  Thimphu: { name: "bhutan", code: "btn" },
  Tokyo: { name: "japan", code: "jpn" },
  Ulaanbaatar: { name: "mongolia", code: "mng" }, Hovd: { name: "mongolia", code: "mng" }, Choibalsan: { name: "mongolia", code: "mng" },
  Yangon: { name: "myanmar", code: "mmr" },
  Yerevan: { name: "armenia", code: "arm" }
};

const AVAILABLE_CITIES = Object.keys(CITY_TO_COUNTRY_MAP)
  .sort()
  .map((city) => ({ name: city }));

const TimeZoneComponent = () => {
  const [data, setData] = useState(null);
  const [countryStats, setCountryStats] = useState(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [city, setCity] = useState("Kolkata");
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const API_BASE_URL = "https://time.now/developer/api/timezone/Asia/";

  const handleClick = () => {
    fetchTimeZone(city);
  };

  const fetchTimeZone = (targetCity) => {
    if (!targetCity) return;
    try {
      const countryCode = CITY_TO_COUNTRY_MAP[targetCity]?.code || "ind";

      // Wrapping the apicountries fetch with a public CORS proxy (allorigins) to prevent the CORS browser block
      const corsProxy = "https://api.allorigins.win/raw?url=";
      const statsApiUrl = encodeURIComponent(`https://www.apicountries.com/alpha/${countryCode}`);

      setIsLoadingStats(true);

      // Fetch TimeZone Data (doesn't wait for Stats)
      fetch(`${API_BASE_URL}${targetCity}`)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
          return res.json();
        })
        .then(timezoneJson => setData(timezoneJson))
        .catch(error => console.error("Failed to fetch timezone data:", error));

      // Fetch Country Stats (doesn't hold up TimeZone)
      fetch(`${corsProxy}${statsApiUrl}`)
        .then(res => {
          if (!res.ok) throw new Error("Stats fetch failed");
          return res.json();
        })
        .then(statsJson => {
          setCountryStats(statsJson);
          setIsLoadingStats(false);
        })
        .catch(error => {
          console.error("Failed to fetch country stats:", error);
          setCountryStats(null);
          setIsLoadingStats(false);
        });

    } catch (error) {
      console.error("Failed to fetch data:", error);
      setIsLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchTimeZone(city);
  }, [city]);

  const cityToCodeMatcher = (cityName) => {
    return CITY_TO_COUNTRY_MAP[cityName] || { name: "india", code: "ind" };
  };

  const escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  function getSuggestions(val) {
    const escapedValue = escapeRegexCharacters(val.trim());
    if (escapedValue === "") return [];
    const regex = new RegExp("^" + escapedValue, "i");
    return AVAILABLE_CITIES.filter((cityObj) => regex.test(cityObj.name));
  }

  function getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  const readySRC = (cityName) => {
    return `https://assets.thebasetrip.com/api/v2/countries/flags/${cityToCodeMatcher(cityName).name}.png`;
  };

  function renderSuggestion(suggestion) {
    const countryData = cityToCodeMatcher(suggestion.name);
    return (
      <div className="flex items-center gap-3">
        <img src={readySRC(suggestion.name)} alt="flag" className="w-6 h-4 object-cover rounded-sm shadow-sm" />
        <span className="text-base font-medium">{suggestion.name} &mdash; <span className="text-gray-400 capitalize">{countryData.name.replace("-", " ")}</span></span>
      </div>
    );
  }

  const onAutoChange = (e, { newValue }) => {
    setValue(newValue);
    if (!newValue || newValue.trim() === "") {
      setCity("Kolkata");
    } else {
      setCity(newValue);
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Type any Capital City of Asia... ( eg. KolKata )",
    value,
    onChange: onAutoChange,
    className: "w-full bg-transparent text-white placeholder-gray-400 border-none outline-none py-3 px-4 text-lg",
  };

  const clearInput = () => {
    setValue("");
    setCity("Kolkata");
  };

  // Safe parsing of datetime
  const dateStr = data?.datetime ? data.datetime.slice(0, 10).split("-").reverse().join("-") : "Loading..."; // e.g., 03-03-2026 format approximation
  const timeStr = data?.datetime ? data.datetime.slice(11, 19) : "--:--:--";
  const timeZoneDisplay = data?.timezone || "Loading...";

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">

      {/* NAVBAR */}
      <nav className="flex items-center justify-center mb-12">



        <div className="text-center">
          <div className="flex flex-row justify-center gap-8 mb-4">
            <h1 className="text-4xl sm:text-5xl text-white font-bold tracking-wider" style={{ fontFamily: "Pacifico" }}>
              Time
            </h1>
            <svg className="w-8 h-8 text-blue-400 pt-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            <h1 className="text-4xl sm:text-5xl text-white font-bold tracking-wider" style={{ fontFamily: "Pacifico" }}>
              Travel
            </h1>
          </div>
          <p className="text-blue-200/80 text-sm tracking-widest font-light">Explore Time Across Asian <span className="font-semibold text-blue-400">Capitals</span></p>
        </div>


      </nav >

      {/* SEARCH BAR */}
      < div className="flex justify-center mb-16 relative z-50" >
        <div className="w-full max-w-2xl bg-gray-900/60 backdrop-blur-md border border-blue-500/50 rounded-full flex items-center px-4 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-shadow duration-300">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>

          <div className="flex-grow">
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
          </div>

          <svg
            className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer"
            fill="currentColor"
            viewBox="0 0 24 24"
            onClick={clearInput}
          >
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm3.54 13.46a1 1 0 01-1.41 1.41L12 13.41l-2.12 2.12a1 1 0 01-1.41-1.41L10.59 12 8.47 9.88a1 1 0 011.41-1.41L12 10.59l2.12-2.12a1 1 0 011.41 1.41L13.41 12l2.13 2.12z" />
          </svg>
        </div>
      </div >

      {/* DATA DISPLAY SECTION */}
      {
        data && (
          <div className="flex flex-col items-center animate-fade-in-up">

            {/* Header */}
            <div className="text-center mb-6">
              <p className="text-gray-300 text-sm mb-2">Selected Capital</p>
              <div className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <h2 className="text-3xl font-bold text-white tracking-wide">{city}, <span className="font-normal text-gray-300 capitalize">{cityToCodeMatcher(city).name.replace("-", " ")}</span></h2>
                <img src={readySRC(city)} alt="Small flag" className="w-8 h-6 rounded object-cover shadow-sm ml-2" />
                <button
                  onClick={handleClick}
                  className="flex items-center ml-4 bg-gray-800/80 hover:bg-gray-700 backdrop-blur-md text-white px-2 py-2 rounded-full border border-white/10 hover:border-blue-400/50 shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300 font-medium tracking-wide"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                </button>
              </div>
            </div>

            {/* Time Card */}
            <div className="w-full max-w-4xl bg-white/5 backdrop-blur-lg rounded-3xl p-6 sm:p-10 shadow-2xl mb-12 flex flex-col md:flex-row items-center justify-between">

              {/* Date */}
              <div className="flex-1 flex flex-col items-center justify-center w-full pt-4 md:pt-0">
                <div className="flex items-center gap-2 text-blue-300 mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  <span className="font-medium tracking-wide">Date</span>
                </div>
                <div className="text-2xl text-white font-light tracking-wide">{dateStr}</div>
              </div>

              {/* Time */}
              <div className="flex-1 flex flex-col items-center justify-center w-full pt-6 md:pt-0">
                <div className="flex items-center gap-2 text-blue-300 mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span className="font-medium tracking-wide">Time</span>
                </div>
                <div className="text-5xl sm:text-6xl text-white font-bold tracking-wider mb-1 drop-shadow-md">{timeStr}</div>
                {/* <div className="text-sm text-gray-400">(Local Time)</div> */}
              </div>

              {/* TimeZone */}
              <div className="flex-1 flex flex-col items-center justify-center w-full pt-6 md:pt-0">
                <div className="flex items-center gap-2 text-blue-300 mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                  <span className="font-medium tracking-wide">TimeZone</span>
                </div>
                <div className="text-2xl text-white font-light tracking-wide">{timeZoneDisplay}</div>
              </div>

            </div>

            {/* Bottom Info Section */}
            <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 mb-12">

              {/* Big Flag */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-4 w-full mb-6">
                  <div className="h-px bg-white/20 flex-1"></div>
                  <span className="text-gray-300 tracking-widest text-sm uppercase">Country Stats</span>
                  <div className="h-px bg-white/20 flex-1"></div>
                </div>
                <img
                  src={readySRC(city)}
                  alt="Large Country Flag"
                  className="w-64 h-40 object-cover rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] waving-flag border border-white/10"
                />
              </div>

              {/* Static Facts */}
              <div className="flex flex-col gap-4 text-gray-300">
                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  <span className="w-24 text-gray-400">Country:</span>
                  <span className="font-medium text-white capitalize">{cityToCodeMatcher(city).name.replace("-", " ")}</span>
                </div>
                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                  <span className="w-24 text-gray-400">Capital:</span>
                  <span className="font-medium text-white">
                    {isLoadingStats ? <div className="h-4 w-24 bg-gray-700/90 rounded animate-pulse"></div> : (countryStats?.capital || "--")}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span className="w-24 text-gray-400">Currency:</span>
                  <span className="font-medium text-white">
                    {isLoadingStats ? <div className="h-4 w-32 bg-gray-700/90 rounded animate-pulse"></div> : (countryStats?.currencies?.[0] ? `${countryStats.currencies[0].symbol || ""} (${countryStats.currencies[0].name || ""})` : "--")}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                  <span className="w-24 text-gray-400">Population:</span>
                  <span className="font-medium text-white">
                    {isLoadingStats ? <div className="h-4 w-28 bg-gray-700/90 rounded animate-pulse"></div> : (countryStats?.population ? countryStats.population.toLocaleString() : "--")}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
                  <span className="w-24 text-gray-400">Language:</span>
                  <span className="font-medium text-white">
                    {isLoadingStats ? <div className="h-4 w-20 bg-gray-700/90 rounded animate-pulse"></div> : (countryStats?.languages?.[0]?.name || "--")}
                  </span>
                </div>
              </div>

            </div>

          </div>
        )
      }
    </div>
  );
};
export default TimeZoneComponent;
