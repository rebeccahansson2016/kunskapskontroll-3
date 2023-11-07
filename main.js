// FÖBÄTTRING: HÄMTA ALLA KÄLLOR SOM BEHÖVS FÖRST. 
//ONCHANGE - för att ge förslag medan man skriver?
//Se till att felmeddelandet försvinner när fetchen går bra igen

//En överraska mig knapp som genererar en random stad? 

//Få Ändra-knappen att endast synas efter man sökt en gång. 


//Jämföra graderna mellan två ställen?
//Lägga till description fog.  


//JOHAN. 
//1. ERRORHANTERING. VART OCH VAD MER?
//2. BUGG - Beror på units. Måste skickas med från början. 
//3. HJÄLP??????


const apiKey = "72c683fa486d6d0335603532705a98ff";
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}`

// variabel för att kunna toggla functionen. 
let isCelsius = true; 

const h2 = document.querySelector('.h2');
const h1 = document.querySelector('.h1');
const icon = document.querySelector('.icon');
const fahrBtn = document.querySelector('#fahrenheit-btn');
const searchBox = document.querySelector('.search');

function getUnit() {
    return isCelsius ? 'metric' : 'imperial';
}
async function checkWeather() {
    h1.innerHTML = "";
    h2.innerHTML = "";
    icon.style.display = 'none'; 

    const inputCity = document.getElementById('search-bar').value;
    const weatherUrl = `${baseUrl}&units=${getUnit()}&q=${inputCity}`
    //const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${inputCity}&appid=${apiKey}`;
    const fetchedData = await fetchData(weatherUrl);

    const wikipediaSummary = await fetchData(`https://sv.wikipedia.org/api/rest_v1/page/summary/${inputCity}`)
    console.log(wikipediaSummary);
    printSummery(wikipediaSummary);
    // document.querySelector('body').appendChild(
    //     document.createTextNode(wikipediaSummary.extract)
    // )

    printResult(fetchedData);
}

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

const printResult = (dataInput) => {
    document.querySelector('.error').innerHTML = "";
    if (dataInput) {
        console.log(dataInput)

        h2.innerHTML = "Vädret i " + dataInput.name + " är:"
        // h1.innerHTML = Math.round(dataInput.main.temp) + "°C";

        const temperature = Math.round(dataInput.main.temp);
        const unit = isCelsius ? '°C' : '°F';
        h1.innerHTML = `${temperature}${unit}`;

        //Här kan man lägga till ikoner på väder om man vill. 
        //Lägger till en ikon för varje beskrivning som innehåller ordet snow. 
        if (dataInput.weather[0].description.includes('snow')) {
            document.querySelector('.icon').src = "IMG/snow.png";
            document.querySelector('.icon').style.display = 'block';
         }
         else if (dataInput.weather[0].description.includes('rain')) {
            document.querySelector('.icon').src = "IMG/rain.png";
            document.querySelector('.icon').style.display = 'block';
         }
         else if (dataInput.weather[0].description.includes('clouds')) {
            document.querySelector('.icon').src = "IMG/clouds.png";
            document.querySelector('.icon').style.display = 'block';
         }
         else if (dataInput.weather[0].description.includes('sun')) {
            document.querySelector('.icon').src = "IMG/sun.png";
            document.querySelector('.icon').style.display = 'block';
         }

    } else {
        console.log("Something went wrong.");
        document.querySelector('.error').innerHTML = "<br>Kunde inte hitta det du sökte efter. Försök igen."
        document.querySelector('.error').style.display = 'block';
    }
}

async function changeMetric() {
    console.log('funkar detta?')
    isCelsius = !isCelsius; // Toggle the value

    const inputCity = document.getElementById('search-bar').value;
    const weatherUrl = `${baseUrl}&units=${getUnit()}&q=${inputCity}`
    //const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=${units}&q=${inputCity}&appid=${apiKey}`;
    const fetchedData = await fetchData(weatherUrl);

    printResult(fetchedData);


    //Ändra text beroende på om isCelsius is true/false. 
    fahrBtn.innerText = isCelsius ? 'Change to Fahrenheit' : 'Change to Celsius';
}

function printSummery(wikipediaSummary){
    document.querySelector('.wikipedia-content').innerHTML=(wikipediaSummary.extract);
 }



 //JOHAN EXEMPEL await fetch('https://url').then(yay, nooo)
// const yay = (data) => {
//     console.log(data)
// }

// const nooo = (error) => {
//     console.error(':(')
// }