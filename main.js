// Foursquare API Info
const clientId = "DFZIWTD3A3CRJ5BZD2QGHN0F3D3RTLNSLP45RTLH1ZJBOYHQ";
const clientSecret = "E1JVUXQ5KTP3JREA0MGRZHZ0DNDXGYZUSNBIVVR3HXGRXN2O";
const url = "https://api.foursquare.com/v2/venues/explore?near=";

// OpenWeather Info
const openWeatherKey = "3aa3aece2a183fc94664b5ad934c5732";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?";

// Page Elements
const $input = $("#city");
const $submit = $("#button");
const $destination = $("#destination");
const $container = $(".container");
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Add AJAX functions here:
const getVenues = async () => {
    const city = $input.val();
    const urlToFetch = url+city+'&limit=10&client_id='+clientId+'&client_secret='+clientSecret+'&v=20210610';
   
  try {
    const response = await fetch(urlToFetch);
    if(response.ok) {
      // console.log(response)
      const jsonResponse = await response.json();
      // console.log(jsonResponse)
      const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
      return venues;
      //  console.log(venues)
    }

  }
  
  catch(error) {
    console.log(error)
  }
};

const getForecast = async () => {
  const urlToFetch = weatherUrl + '&q=' + $input.val() + '&appid=' + openWeatherKey;
  try {
    const response = await fetch(urlToFetch);
    if(response.ok) {
      const jsonResponse = response.json();
      // console.log(jsonResponse);
      return jsonResponse;
    }
  }
  catch(error) {
    console.log(error)
  }
};

// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = venueIcon.prefix + 'bg_64' + venueIcon.suffix;
    
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
};


const renderForecast = (day) => {
  // Add your code here:
  
  let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
};

const executeSearch = () => {
  $venueDivs.forEach((venue) => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => {return renderVenues(venues)});
  getForecast().then(forecast => {return renderForecast(forecast)});
  return false;
};

$submit.click(executeSearch);