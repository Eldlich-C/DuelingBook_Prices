import {getCardPrices, waitForElm} from './api_call'

const myCardName = "Blue-Eyes White Dragon";
console.log(myCardName);
console.log("Some Changes")

var promiseB = getCardPrices(myCardName).then(function(result: any) {
    // do something with 
    console.log(result);
 });

waitForElm('.name_txt.selectable').then((elm) => {
    console.log('Element was found');
    console.log((elm as HTMLElement).textContent);
});


//// Code to insert test image
// Create an image element
const img = document.createElement('img');

// Set the source of the image
img.src = chrome.runtime.getURL('image.png');

// Append the image to the body of the page
document.body.appendChild(img);