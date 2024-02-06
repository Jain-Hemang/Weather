
const apiKey = "b385900f0547b145f469ef493cbf08ca" ;
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=delhi" ;

async function checkweather(){
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    var data = await response.json();
    console.log(data); 
    var currentTimeElement = document.getElementById('currentTime');
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

    var currentTimeString = year + '-' + month + '-' + day + ' ' +  hours + ':' + minutes + ':' + seconds;
    document.querySelector("#City").innerHTML=`City : ${data.city.name}` ;
    document.querySelector("#day").innerHTML=`Day : ${currentTimeString}` ;
    document.querySelector("#temp").innerHTML=`${data.list[0].main.temp}°C` ;
    document.querySelector("#feels_like").innerHTML=`Feels Like : ${data.list[0].main.feels_like}` ;
    document.querySelector("#humidity").innerHTML=`Humidity : ${data.list[0].main.humidity}%` ;
    document.getElementById("prec").innerHTML=`Pressure : ${data.list[0].main.pressure}` ;
}


checkweather();
