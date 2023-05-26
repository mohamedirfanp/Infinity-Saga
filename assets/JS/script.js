// Home
let currentBox = 1;
function showBoxes() {
	const boxes = document.querySelectorAll('.box-info');
	let delay = 8000;

	for(let i=1;i< boxes.length;i++)
	{
		const box = boxes[i];
		setTimeout(() => {
		boxes[currentBox - 1].remove('active-own');
		currentBox++;
		if(currentBox !== boxes.length && currentBox !== boxes.length-1)
		{
			box.classList.add('active-own');

		}
		else if(currentBox === boxes.length - 1)
		{
			console.log('here');
			box.style.display = 'block';
			box.style.opacity = 1;
			box.style.backgroundImage = 'url("./assets/images/marvel-intro.gif")';
			box.style.backgroundSize = 'cover';
			box.style.backgroundPosition = 'center';
		}
		else
		{
			console.log(box.childNodes)
			box.style.display = 'flex';
			box.style.opacity = 1;
			
		}
		
		}, delay);
		delay += 8000;
	}


}

if(window.location.href.includes("index.html"))
{
  document.addEventListener('DOMContentLoaded', ()=>{
  showBoxes();
  })
}








// Map 
var stoneLocations = [
  { name: 'Soul Stone', coordinates : [143.8807,-34.6978], icon: 'assets/images/soulStone-nobg.gif' }, // Australia
  { name: 'Mind Stone',coordinates: [-95.9982,71.2391], icon: 'assets/images/mindStone-nobg.gif' }, // N- America
  { name: 'Space Stone', coordinates:[78.9734, 22.6569], icon: 'assets/images/spaceStone-nobg.gif' }, // India
  { name: 'Time Stone', coordinates: [-70.5364, -50.9292], icon: 'assets/images/timeStone-nobg.gif' }, // S- America
  { name: 'Reality Stone', coordinates:[97.3468,80.1304], icon: 'assets/images/realityStone-nobg.gif' }, // Russia
  { name: 'Power Stone',coordinates:[ 2.3522, 48.8566], icon: 'assets/images/powerStone-nobg.gif' }, // France
];
let map;
let thanosMarker;

function placeThanos()
{
  var stone = stoneLocations[Math.floor(Math.random() * stoneLocations.length)];
  let longitude = stone.coordinates[0];
  let latitude = stone.coordinates[1];
  let thanosCoordinates = getRandomCoordinates(latitude,longitude);
  var plot = {
	coordinates : thanosCoordinates,
	id : 'thanos',
	icon: 'assets/images/thanos.jpg'
  }
  console.log(stone)
  console.log(plot)
  plotInMap(plot)
  // Move To Thanos()
  MoveThanos(thanosCoordinates, stone.coordinates, stone)
}


function plotInMap(plot)
{
  // create a DOM element for the marker
  var el = document.createElement('div');
	el.className = plot.id;
	el.id = plot.id;
	el.style.backgroundImage =
	  `url(${plot.icon})`;
	el.style.backgroundPosition = 'center';
	el.style.backgroundSize = 'contain';
	el.style.width = '30px';
	el.style.height ='30px';
	el.style.borderRadius = '50%';
  // add marker to map
  thanosMarker  = new maptilersdk.Marker(el)
	  .setLngLat(plot.coordinates)
	  .addTo(map);

  return
}

function MoveThanos(thanosCoordinates, stoneCoordinates, stone)
{
  let delay = 5000;

	const myInterval = setInterval(()=> {
	  thanosMarker.remove();
	  thanosCoordinates = moveThanosToStone(stoneCoordinates[1],stoneCoordinates[0], thanosCoordinates[1],thanosCoordinates[0],500)

	  let distanceBetween = Math.floor(getDistance(stoneCoordinates[1],stoneCoordinates[0], thanosCoordinates[1],thanosCoordinates[0]))
	  if(distanceBetween <= 2000)
	  {
		alert('Avengers Alert\n'+`Thanos heading to ${stone.name} and he away ${distanceBetween} Miles`)

	   
		clearInterval(myInterval);
	  }

	  plotInMap({
		coordinates : thanosCoordinates,
		id : 'thanos',
		icon: 'assets/images/thanos.jpg'
	  })
	}, delay)
}


function getRandomCoordinates(latitude, longitude) {
  // Convert latitude and longitude to radians
  const latRad = latitude * (Math.PI / 180);
  const lonRad = longitude * (Math.PI / 180);

  // Earth's radius in miles
  const earthRadius = 3958.8;

  // Generate a random angle between 0 and 2π (360 degrees)
  const randomAngle = Math.random() * 2 * Math.PI;

  const randomDistance = 3000;

  // Calculate the new latitude and longitude
  const newLatitude = Math.asin(Math.sin(latRad) * Math.cos(randomDistance / earthRadius) + Math.cos(latRad) * Math.sin(randomDistance / earthRadius) * Math.cos(randomAngle));
  const newLongitude = lonRad + Math.atan2(Math.sin(randomAngle) * Math.sin(randomDistance / earthRadius) * Math.cos(latRad), Math.cos(randomDistance / earthRadius) - Math.sin(latRad) * Math.sin(newLatitude));

  // Convert new latitude and longitude back to degrees
  const newLatDeg = newLatitude * (180 / Math.PI);
  const newLonDeg = newLongitude * (180 / Math.PI);

  return [newLonDeg,newLatDeg];
}

// Function to calculate the distance between two coordinates using the Haversine formula
function getDistance(stoneLat, stoneLong, thanosLat, thanosLong) {
  // Convert degrees to radians
  const stoneLatRad = stoneLat * (Math.PI / 180);
  const stoneLongRad = stoneLong * (Math.PI / 180);
  const thanosLatRad = thanosLat * (Math.PI / 180);
  const thanosLongRad = thanosLong * (Math.PI / 180);

  // Earth radius in kilometers
  const earthRadius = 6371;

  // Calculate distance between Thanos and the stone using Haversine formula
  const distance = 2 * earthRadius * Math.asin(
	Math.sqrt(
	  Math.sin((stoneLatRad - thanosLatRad) / 2) ** 2 +
	  Math.cos(stoneLatRad) * Math.cos(thanosLatRad) * Math.sin((stoneLongRad - thanosLongRad) / 2) ** 2
	)
  );
  return distance;
}

function moveThanosToStone(stoneLat, stoneLong, thanosLat, thanosLong, maxDistance) {
  // Convert degrees to radians
  const stoneLatRad = stoneLat * (Math.PI / 180);
  const stoneLongRad = stoneLong * (Math.PI / 180);
  const thanosLatRad = thanosLat * (Math.PI / 180);
  const thanosLongRad = thanosLong * (Math.PI / 180);

  // Earth radius in kilometers
  const earthRadius = 6371;

  // Calculate distance between Thanos and the stone using Haversine formula
  const distance = 2 * earthRadius * Math.asin(
	Math.sqrt(
	  Math.sin((stoneLatRad - thanosLatRad) / 2) ** 2 +
	  Math.cos(stoneLatRad) * Math.cos(thanosLatRad) * Math.sin((stoneLongRad - thanosLongRad) / 2) ** 2
	)
  );

  // Check if distance is within the maximum allowed distance
  if (distance <= maxDistance) {
	// Thanos reaches the stone, return the stone's latitude and longitude as new coordinates for Thanos
	return { newLat: stoneLat, newLong: stoneLong };
  } else {
	// Calculate the bearing angle from Thanos to the stone
	const bearing = Math.atan2(
	  Math.sin(stoneLongRad - thanosLongRad) * Math.cos(stoneLatRad),
	  Math.cos(thanosLatRad) * Math.sin(stoneLatRad) - Math.sin(thanosLatRad) * Math.cos(stoneLatRad) * Math.cos(stoneLongRad - thanosLongRad)
	);

	// Calculate the new latitude and longitude for Thanos based on the bearing angle and maximum distance
	const newLat = Math.asin(
	  Math.sin(thanosLatRad) * Math.cos(maxDistance / earthRadius) +
	  Math.cos(thanosLatRad) * Math.sin(maxDistance / earthRadius) * Math.cos(bearing)
	) * (180 / Math.PI);

	const newLong = (thanosLongRad + Math.atan2(
	  Math.sin(bearing) * Math.sin(maxDistance / earthRadius) * Math.cos(thanosLatRad),
	  Math.cos(maxDistance / earthRadius) - Math.sin(thanosLatRad) * Math.sin(newLat * (Math.PI / 180))
	)) * (180 / Math.PI);

	// Return the new latitude and longitude of Thanos
	return [newLong,newLat];
  }
}




//  Calling Map On Load
if (window.location.href.includes("map.html")) {
  document.addEventListener("DOMContentLoaded", function () {
	maptilersdk.config.apiKey = 'THs8bVGaHmNA0oz3r2pO';
	map = new maptilersdk.Map({
	  container: 'map', // container's id or the HTML element to render the map
	  style: maptilersdk.MapStyle.HYBRID,
	  center: [12.550343, 40.665957], // starting position [lng, lat]
	//   zoom: 1
	});


	stoneLocations.forEach(function (marker) {
	  // create a DOM element for the marker
	  var el = document.createElement('div');
	  el.className = 'marker';
	  el.id = marker.name.split(' ')[0];
	  el.style.backgroundImage =
		  `url(${marker.icon})`;
		el.style.backgroundPosition = 'center';
		el.style.backgroundSize = 'contain';
		  el.style.width = '40px';
	  el.style.height ='40px';

	  // add marker to map
	  new maptilersdk.Marker(el)
		  .setLngLat(marker.coordinates)
		  .addTo(map);
	});

	placeThanos();

  })
}


// Map Section Ends

// Avengers
const baseUrl = "https://gateway.marvel.com/v1/public";
const publicKey = "95c0cafca94966e9dcb4decea816c8b3";
const privateKey = "8fcffe2dbf2531d56fe9d9fbfe2e13e907449b85"




function generateHash(publicKey,privateKey)
{
  const key = 123;
  const hash = CryptoJS.MD5(`${key}${privateKey}${publicKey}`).toString();
  return hash;
}


// Calling Teams on Loading Page
if (window.location.href.includes('avengers.html'))
{
  document.addEventListener("DOMContentLoaded", () => {
	const hash = "f00b2e5379ea0ff6ad82adcf65b5466a";
	// https://gateway.marvel.com/v1/public/events/29/characters?limit=99&ts=1&apikey=6bc0b96963497989d6bb1b0a089669f2&hash=324b8547eb8de98efc0f67195618e426
	axios.get(`${baseUrl}/comics/32477/characters?ts=1&apikey=${publicKey}&hash=${hash}`)
	.then((response) => {
	  const avengers = response.data.data.results;
	  const row = document.getElementById('avengers');
	  const common_description = ", the embodiment of bravery and selflessness, rise above adversity to protect the vulnerable and inspire hope in the hearts of all. With unwavering determination, they face formidable challenges, wielding their unique abilities to vanquish evil and restore balance to the world.";
	  avengers.forEach((character) => {
		const path = character.thumbnail.path
		let column = `<div class="col d-flex justify-content-center">
		<article class="card_own">
			<div class="img" style="background-image: url('${path}.${character.thumbnail.extension}')">
			</div>
		<div class="card_content_own">
			<span class="card_title">${character.name}</span>
			<span class="card_subtitle">${character.description.length >= 1?character.description.slice(0,35) + '...': character.name+common_description.substring(0,35)+'...'}</span>
			<p class="card_description">${character.description.length >= 1?character.description.substring(0,280) : character.name+common_description}</p>
		</div>
		</article>
	</div>`
		row.innerHTML += column;
	  })


	})
	.catch((error) => {
	  console.error(error);
	})
  })
}