/** For this challenge you will actually have to watch the video! Then, build the image 
loading functionality that I just showed you on the screen.
Your tasks:
Tasks are not super-descriptive this time, so that you can figure out some stuff by 
yourself. Pretend you're working on your own �
PART 1
1. Create a function 'createImage' which receives 'imgPath' as an input. 
This function returns a promise which creates a new image (use 
document.createElement('img')) and sets the .src attribute to the 
provided image path
2. When the image is done loading, append it to the DOM element with the 
'images' class, and resolve the promise. The fulfilled value should be the 
image element itself. In case there is an error loading the image (listen for 
the'error' event), reject the promise
3. If this part is too tricky for you, just watch the first part of the solution
PART 2
4. Consume the promise using .then and also add an error handler
5. After the image has loaded, pause execution for 2 seconds using the 'wait'
function we created earlier
6. After the 2 seconds have passed, hide the current image (set display CSS 
property to 'none'), and load a second image (Hint: Use the image element 
returned by the 'createImage' promise to hide the current image. You will 
need a global variable for that �)
7. After the second image has loaded, pause execution for 2 seconds again
8. After the 2 seconds have passed, hide the current image
Test data: Images in the img folder. Test the error handler by passing a wrong 
image path. Set the network speed to “Fast 3G” in the dev tools Network tab, 
otherwise images load too fast
GOOD LUCK 



***/
const wait = function (seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    let imgEl = document.createElement('img');
    imgEl.src = imgPath;

    imgEl.addEventListener('load', function () {
      imgContainer.appendChild(imgEl);
      resolve(imgEl);
      console.log(imgEl);
    });

    imgEl.addEventListener('error', function () {
      reject(new Error(`Image not found`));
    });
  });
};

// createImage('./img-1.jpg')
//   .then(img => {
//     console.log(img);
//     return wait(1);
//   })
//   .then(() => {
//     imgEl.style.display = 'none';
//     return createImage('./img-2.jpg');
//   })
//   .then(img => {
//     console.log(img);
//     return wait(1);
//   })
//   .then(() => {
//     imgEl.style.display = 'none';
//     return createImage('./img-3.jpg');
//   })
//   .then(img => {
//     console.log(img);
//     return wait(1);
//   })

//   .catch(error => console.log(error)).then;

// function hideImage(image) {
//   image.style.display = 'none';
// }

// const loadinPuse = async function () {
//   try {
//     let img = await createImage('./img-1.jpg');
//     await wait(1);
//     hideImage(img);

//     img = await createImage('./img-2.jpg');
//     await wait(1);
//     hideImage(img);

//     img = await createImage('./img-3.jpg');
//     await wait(1);
//   } catch (err) {
//     console.log(`Ooops image not found ${err}`);
//   }
// };

// loadinPuse();

/*************
 *
 * part 2 of the exercise
 *
 ****************/

const loadAll = async function (images) {
  try {
    const imgs = images.map(async img => await createImage(img));

    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    // imgsEl.forEach(image => (image.style.display = 'block'));
  } catch (err) {
    console.log(`Oops image not found ${err}`);
  }
};

loadAll(['./img-1.jpg', './img-2.jpg', './img-3.jpg']);
