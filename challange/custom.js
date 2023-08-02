/*
Asynchronous JavaScript
Coding Challenge #1
In this challenge you will build a function 'whereAmI' which renders a country 
only based on GPS coordinates. For that, you will use a second API to geocode 
coordinates. So in this challenge, you’ll use an API on your own for the first time �
Your tasks:
PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat') 
and a longitude value ('lng') (these are GPS coordinates, examples are in test 
data below).
2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means 
to convert coordinates to a meaningful location, like a city and country name. 
Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call 
will be done to a URL with this format: 
https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and 
promises to get the data. Do not use the 'getJSON' function we created, that 
is cheating �
3. Once you have the data, take a look at it in the console to see all the attributes 
that you received about the provided location. Then, using this data, log a 
message like this to the console: “You are in Berlin, Germany”
4. Chain a .catch method to the end of the promise chain and log errors to the 
console
5. This API allows you to make only 3 requests per second. If you reload fast, you 
will get this error with code 403. This is an error with the request. Remember, 
fetch() does not reject the promise in this case. So create an error to reject 
the promise yourself, with a meaningful error message
PART 2
6. Now it's time to use the received data to render a country. So take the relevant 
attribute from the geocoding API result, and plug it into the countries API that 
we have been using.
7. Render the country and catch any errors, just like we have done in the last 
lecture (you can even copy this code, no need to type the same code)
The Complete JavaScript Course 31
Test data:
§ Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
§ Coordinates 2: 19.037, 72.873
§ Coordinates 3: -33.933, 18.474
GOOD LUCK 😍

*/

// function whereAmI(latitude, longitude) {
//   return fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok) throw new Error(`Wrong latitue ${response.status}`);

//       return response.json();
//     })
//     .then(data => renderCity(data))
//     .catch(error => console.log(`Ooops something went wrong! ${error}`));
// }

const whereAmI = async function (latitude, longitude) {
  const res = await fetch(
    `https://geocode.xyz/${latitude},${longitude}?geoit=json`
  );

  if (!res.ok) throw new Error(`Wrong latitue ${res.status}`);

  const data = await res.json();
  renderCity(data);
};

function renderCity(data) {
  console.log(data);
  console.log(`You are in ${data.city}, ${data.region}`);
}

//Getting the coords from the browser  api
const getPosition = async function () {
  try {
    const location = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        postion => resolve(postion),
        err => reject(err)
      );
    });

    const { latitude, longitude } = location.coords;
    const dataGeo = await fetch(
      `https://geocode.xyz/${latitude},${longitude}?geoit=json`
    );

    console.log(dataGeo);
    if (!dataGeo.ok) throw new Error(`Wrong latitue ${dataGeo.status}`);

    const data = await dataGeo.json();
    renderCity(data);
  } catch (err) {
    console.error(`Oops problem occures ${err}`);
  }
};

getPosition();

// getPosition().then(pos => {
//   let coords = pos.coords;
//   return fetch(
//     `https://geocode.xyz/${coords.latitude},${coords.longitude}?geoit=json`
//   )
//     .then(response => {
//       console.log(response);
//       if (!response.ok) throw new Error(`Wrong latitue ${response.status}`);

//       return response.json();
//     })
//     .then(data => renderCity(data))
//     .catch(error => console.log(`Ooops something went wrong! ${error}`));
// });

// const pos = await getPosition();
// let { latitude, longitude } = pos.coords;
// const dataGeo = await fetch(
//   `https://geocode.xyz/${coords.latitude},${coords.longitude}?geoit=json`
// );

// console.log(dataGeo);
// if (!dataGeo.ok) throw new Error(`Wrong latitue ${dataGeo.status}`);

// const data = await dataGeo.json();
// renderCity(data);
// .catch(error => console.log(`Ooops something went wrong! ${error}`));

//Render Country

// whereAmI(52.508, 13.381);

// whereAmI(19.037, 72.873);

// whereAmI(-33.933, 18.474);

// console.log('Begining of the test');
// setTimeout(() => console.log('Logged after 0 second'), 0);
// Promise.resolve('Promise creation').then(res => console.log(res));
// console.log('End of the test');

// const lotteryPromise = new Promise((resolve, reject) => {
//   console.log(`Lottery is happinging now `);
//   setTimeout(() => {
//     if (Math.random() >= 0.5) resolve(`You win 💵`);
//     else reject(`You lost 💩`);
//   }, 3000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// const wait = function (seconds) {
//   return new Promise(resolve => {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log(`1 second passed`);
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 seconds passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 seconds passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('4 seconds passed');
//     return wait(1);
//   });
