window.addEventListener('load', () => {
    let long;
    let lat; 
    let temperaturedescription = document.querySelector(".temperature-description");
    let temperaturedergee = document.querySelector(".temperature-degree");
    let locationtimezone = document.querySelector(".location-timezone");
    let humiditylevel = document.querySelector(".humidity");
    let wind=document.querySelector(".windspeed");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/98f12c19cd3806abe4a5e7de43f33330/${lat},${long}`;

            fetch(api)
            .then(data => {
                return data.json() 
            })
            .then(data => {
                console.log(data);
                const {temperature,summary,icon,humidity,windSpeed} = data.currently;
                //set dom elements form api
                temperaturedergee.innerHTML =  temperature + '&#176';
                locationtimezone.textContent =  data.timezone;
                temperaturedescription.textContent = summary;
                humiditylevel.textContent ="humidity level : " + humidity;
                wind.textContent = "wind : "+windSpeed;
                //set icon
                setIcons(icon,document.querySelector(".icon"));
                convert(temperature);
                defaultcity(lat,long);
            });
        });
        function defaultcity(lat,long)
        {   let cityname= document.querySelector(".cityname");
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=7d763254818c90bacb2e1f113042eac3`;
            fetch(api) . then(data => {
                return data.json();
            })
            .then(data => {
                console.log(data);
                console.log(data.name);
                cityname.textContent=data.name;

            })
        }
    }
    function setIcons(icon,iconid){
        const skycons = new Skycons({color:"white"});
        const currenticon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconid,Skycons[currenticon]);
    }

    function convert(temp)
    {
        let temperaturesection = document.querySelector(".degree-section");
        let temperaturespan = document.querySelector(".degree-section span");
        temperaturesection.addEventListener('click', () => {
            if(temperaturespan.textContent === "F"){
               temperaturespan.textContent = "C";
               formulacelsius(temp);
            }
            else{
                temperaturespan.textContent = "F";
                temperaturedergee.innerHTML =  temp + '&#176';
            }

        });
    }
    function formulacelsius(tem){
        let celsius = ((tem - 32) *(5/9));
        temperaturedergee.innerHTML = Math.floor(celsius) + '&#176';
    }

    
    //search option


    document.getElementById('searchbtn').addEventListener("click", () => {
        let searchterm = document.getElementById('searchinput').value;
        if(searchterm)
        {
            searchweather(searchterm);
        }    
    })
    function searchweather(searchterm){
        let cityname=document.querySelector(".cityname");
        let lati;
        let longi;
        const api = `http://api.openweathermap.org/data/2.5/weather?q=${searchterm}&APPID=7d763254818c90bacb2e1f113042eac3`;
            fetch(api)
            .then(data => {
                return data.json();
            }).then( data => {
                console.log(data);
                console.log(data.name);
                cityname.textContent=data.name;
                const{lon,lat}=data.coord;
                lati=lat;
                longi=lon;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const apiweather = `${proxy}https://api.darksky.net/forecast/98f12c19cd3806abe4a5e7de43f33330/${lati},${longi}`;
            fetch(apiweather)
            .then(data => {
                return data.json() 
            })
            .then(data => {
                console.log(data);
                const {temperature,summary,icon,humidity,windSpeed,time} = data.currently;
                //set dom elements form api
                temperaturedergee.innerHTML =  temperature + '&#176';
                locationtimezone.textContent =  data.timezone;
                temperaturedescription.textContent = summary;
                humiditylevel.textContent ="humidity level : " + humidity;
                wind.textContent = "wind : "+windSpeed;
                //set icon
                setIcons(icon,document.querySelector(".icon"));
                convert(temperature);
            });
        });
    }
});