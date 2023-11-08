//Ev. lägga till högsta och lägsta temp?? 
//HOVER EFFEKT PÅ SEARCHBAR
//Fixa ny fontfamily. 
//Städa kod 

//JOHAN. 
//1. ERRORHANTERING. VART OCH VAD MER? paja url:n med flit 


const apiKey = "72c683fa486d6d0335603532705a98ff";
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}`

// variabel for the toggle-function.
let isCelsius = true; 

const h2 = document.querySelector('.h2');
const h1 = document.querySelector('.h1');
const firstH3 = document.querySelector('.h3-1');
const secondH3 = document.querySelector('.h3-2'); //Används ej just nu
const icon = document.querySelector('.icon');

//Function for checking the unit. 
function getUnit() {
    return isCelsius ? 'metric' : 'imperial';
}

//Function connected to the search-btn. 
async function checkWeather() {
    h1.innerHTML = "";
    h2.innerHTML = "";
    icon.style.display = 'none'; 
    document.querySelector('.wikipedia-content').innerHTML="";

    const inputCity = document.getElementById('search-bar').value;
    //Calling getUnit in the url to get the accurate unitvalue. 
    const weatherUrl = `${baseUrl}&units=${getUnit()}&q=${inputCity}`
    const fetchedData = await fetchData(weatherUrl);

    //If fetch went through - call the wikipedia-fetch. 
    if (fetchedData) {
    const wikipediaSummary = await fetchData(`https://sv.wikipedia.org/api/rest_v1/page/summary/${inputCity}`)
    printResult(fetchedData);
    printSummary(wikipediaSummary);
    }
    else{
        printError()
        console.error("something went wrong.");
    }
}

//fetchfunction
async function fetchData(url) {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.error("API request failed:", response.status);
        return null; 
    }
}
//Function for printing results. 
const printResult = (dataInput) => {
    document.querySelector('.error').innerHTML = "";
    document.querySelector('.box2').style.borderRight = '2px solid transparent';
    document.querySelector('.box1').style.borderRight = '2px solid transparent';

    const inputCity = document.getElementById('search-bar').value;
    if (dataInput){
        console.log(dataInput)
        firstH3.innerHTML = "Vädret i ";
        h2.innerHTML = inputCity;

        const temperature = Math.round(dataInput.main.temp);
        const unit = isCelsius ? '°C' : '°F';
        h1.innerHTML = `${temperature}${unit}`;

        //Make the borders visable. 
        document.querySelector('.box1').style.borderRight = '2px solid rgb(218, 218, 218)';
        document.querySelector('.box2').style.borderRight = '2px solid rgb(218, 218, 218)';

        //Adding icons depending on the description
        const weatherIcon = document.querySelector('.icon');
        if (dataInput.weather[0].description.includes('snow')){
            weatherIcon.src = "IMG/snow.png";
        }
        else if (dataInput.weather[0].description.includes('rain')||
                dataInput.weather[0].description.includes('drizzle')){
                weatherIcon.src = "IMG/rain.png";
        }
        else if (dataInput.weather[0].description.includes('cloud')){
                weatherIcon.src = "IMG/clouds.png";
        }
        else if (dataInput.weather[0].description.includes('fog')||
                dataInput.weather[0].description.includes('mist')){
                weatherIcon.src = "IMG/clouds.png";
        }
        else if (dataInput.weather[0].description.includes('clear')){
                weatherIcon.src = "IMG/sun.png";
        }
        weatherIcon.style.display = 'block';
    }
}
//Function for switching between celsius and fahrenheit.
async function changeMetric() {
    console.log('funkar detta?')

    const imgElement = document.querySelector('.toggle-icon');
    imgElement.src = isCelsius ? "IMG/toggle_off.png" : "IMG/toggle_on.png";
    
    isCelsius = !isCelsius; // Toggle the value true/false

    const inputCity = document.getElementById('search-bar').value;
    const weatherUrl = `${baseUrl}&units=${getUnit()}&q=${inputCity}`
    const fetchedData = await fetchData(weatherUrl);
    printResult(fetchedData);
}

//Function for printing out wikipedia-fetch
function printSummary(wikipediaSummary){
    document.querySelector('.wikipedia-content').style.display='block';
    document.querySelector('.wikipedia-content').innerHTML=(wikipediaSummary.extract);
 }

 function printError(){
    document.querySelector('.error').innerHTML = "Kunde inte hitta det du sökte efter. Försök igen."
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.box1').style.borderRight = '2px solid transparent';
    document.querySelector('.box2').style.borderRight = '2px solid transparent';
    document.querySelector('.h3-1').innerHTML="";
 }


 //JOHAN EXEMPEL await fetch('https://url').then(yay, nooo)
// const yay = (data) => {
//     console.log(data)
// }

// const nooo = (error) => {
//     console.error(':(')
// }