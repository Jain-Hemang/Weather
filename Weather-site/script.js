document.addEventListener("DOMContentLoaded", function() {

    
    const apiKey = "b385900f0547b145f469ef493cbf08ca" ;
    const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=" ;
    const searchbox = document.getElementById("search-input") ;
    

    const searchbtn = document.getElementById("search-button") ;
    const weatherinfo = document.getElementById("image");
    
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
                console.log(data.list[i-1].dt_txt) ;
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
        
        // Example usage:
         // Format: YYYY-MM-DD
        
        
        
        
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
        

        if(evaltime.weather[0].main == "Clouds"){
            weatherinfo.src="images/clouds.png"
        }
        else if(evaltime.weather[0].main == "Clear"){
            weatherinfo.src="images/sunny.png"
        }
        else if(evaltime.weather[0].main == "Rain"){
            weatherinfo.src="images/isolated_thunderstorms.png"
        }
        else if(evaltime.weather[0].main == "Drizzle"){
            weatherinfo.src="images/rains.png"
        }
        else if(evaltime.weather[0].main == "Mist"){
            weatherinfo.src="images/periodic_clouds.png"
        }
        
        
            
        

    }
    
    
    searchbtn.addEventListener("click" , ()=>{
        
        checkweather(searchbox.value);
        
    });
// checkweather();

// checkweather();

})