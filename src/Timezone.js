import React, { useState, useEffect } from "react";

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

  const readySRC = (city) => {
    let temp = "https://assets.thebasetrip.com/api/v2/countries/flags/".concat(cityToCodeMatcher(city));
    return temp.concat(".png");
  };

  return (
    <>
      <div style={{ textAlign: "center", padding: "5%", fontSize: "120%" }}>
        <div>
          <label style={{ fontSize: "30px" }}>
            Type ANY Asian City Here..
            <br />
            <input
              type="text"
              style={{ margin: "1%", fontSize: "20px" }}
              placeholder=" Type city here.."
              onChange={(event) => setCity(event.target.value)}
            />
            <br />
            <button onClick={() => handleClick()} style={{ fontSize: "20px" }}>
              Get Current DateTime
            </button>
          </label>
        </div>
        <div style={{padding:'2%'}}>
          Date: {mystr?.slice(1, 11)} <br />
          Time: {mystr?.slice(12, 20)} <br />
          Timezone: {data.timezone}
        </div>
        <div>
          <img src={readySRC(city)} alt="Country flag" style={{border:"2px solid black"}}/>
        </div>
      </div>
    </>
  );
};
export default TimeZoneComponent;
