document.addEventListener("DOMContentLoaded", function() {

    
    const apiKey = "b385900f0547b145f469ef493cbf08ca" ;
    const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=" ;
    const searchbox = document.getElementById("search-input") ;
    const time_today= document.getElementById
    

    const searchbtn = document.getElementById("search-button") ;
    const weatherinfo = document.getElementById("weather-image");
    
    async function checkweather(city){
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        var data = await response.json();
        console.log(data); 
        // var currentTimeElement = document.getElementById('currentTime');
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        var year = now.getFullYear();
        var month = now.getMonth() + 1; // Months are zero-based
        var day = now.getDate();
        
        // Add leading zeros if needed
        month = (month < 10) ? '0' + month : month;
        day = (day < 10) ? '0' + day : day;
        hours = (hours < 10) ? '0' + hours : hours;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        var currentdate =year + '-' + month + '-' + day
        var currentTimeString = year + '-' + month + '-' + day + ' ' +  hours + ':' + minutes + ':' + seconds;
        
        var currentTime = hours + ':' + minutes + ':' + seconds
        let evaltime ;
        for(let i=0 ; i<8 ; i++){
            if(data.list[i].dt_txt>currentTimeString){
                evaltime=data.list[i-1] ;
                break ;
            }
        }
        function getDayOfWeek(dateString) {
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
            const dateObject = new Date(dateString);
            
            // Check if the date is valid
            if (isNaN(dateObject.getTime())) {
                return 'Invalid Date';
            }
        
            const dayIndex = dateObject.getDay();
            const dayOfWeek = daysOfWeek[dayIndex];
        
            return dayOfWeek;
        }
           
        const lats = data.city.coord.lat ;
        
        const lons = data.city.coord.lon ;
        document.querySelector("#City").innerHTML=`City : ${data.city.name}` ;
        document.getElementById("day").innerHTML=`${getDayOfWeek(currentdate)}` ;
        document.querySelector("#date").innerHTML=`${currentTimeString}` ;
        document.querySelector("#temp").innerHTML=`${evaltime.main.temp}°C` ;
        document.querySelector("#feels_like").innerHTML=`Feels Like : ${evaltime.main.feels_like}` ;
        document.querySelector("#humidity").innerHTML=`Humidity : ${evaltime.main.humidity}%` ;
        document.getElementById("prec").innerHTML=`Pressure : ${evaltime.main.pressure}` ;
        document.getElementById("temp_max").innerHTML=`Maximum Temp : ${evaltime.main.temp_max}` ;
        document.getElementById("temp_min").innerHTML=`Minimum Temp : ${evaltime.main.temp_min}` ;
        document.getElementById("weather").innerHTML=`${evaltime.weather[0].main}` ;
        
        function eval_images(time_weather){

            if(time_weather == "Clouds"){
                weatherinfo.src="./images/clouds.png"
            }
            else if(time_weather == "Clear"){
                weatherinfo.src="./images/sunny.png"
            }
            else if(time_weather == "Rain"){
                weatherinfo.src="./images/isolated_thunderstorms.png"
            }
            else if(time_weather == "Drizzle"){
                weatherinfo.src="./images/rains.png"
            }
            else if(time_weather == "Mist"){
                weatherinfo.src="./images/periodic_clouds.png"
            }
        }
        // evaltime.weather[0].main
        for ( let i=0 ; i<8 ; i++){
            let today_weather = document.getElementById(`${[i+1]}`)
            
            today_weather.firstElementChild.innerHTML = data.list[i].dt_txt.substring(11)
            
            today_weather.children[1].src=eval_images(data.list[i].weather[0].main)
            today_weather.children[2].innerHTML = data.list[i].weather[0].main
            today_weather.children[3].innerHTML = data.list[i].main.temp
        // console.log(data.list[i].dt_txt.substring(11) )       
        }
        for ( let i=0 ; i<6 ; i++){
            let daily_weather = document.getElementById(`day-${[i]}`)
            daily_weather.firstElementChild.innerHTML=`${getDayOfWeek(data.list[i*7].dt_txt.substring(0,10))}` ;
            daily_weather.children[1].innerHTML = data.list[i*7].dt_txt.substring(0,10)
            daily_weather.children[2].innerHTML = data.list[i].main.temp_min
            daily_weather.children[3].innerHTML = data.list[i].main.temp_max
            // daily_weather.children[4].src=eval_images(data.list[i].weather[0].main)
            daily_weather.children[5].innerHTML = data.list[i].weather[0].main
              
        }
        
        
        
        window.externalConstVar = lats;
        window.externalConstVar = lons;
    
        
            
        

    }
    
    
    searchbtn.addEventListener("click" , ()=>{
        
        checkweather(searchbox.value);
        
    });

})