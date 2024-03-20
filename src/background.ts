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

// // Apply CSS styles to adjust width and height
// img.style.width = '10%';
// img.style.height = '10%';
// img.style.objectFit = 'cover'; // Ensures the image covers its container without distortion

// // Append the image to the body of the page
// document.body.appendChild(img);



// Figure out how to make this content reactive to any changes to the spanElement
// Check if the span element has content
const spanElement = document.querySelector('span.name_txt.selectable[style*="display: "]');
console.log("spanElement?")
console.log(spanElement)
if (spanElement) {
    // // Check if the span element has content
    // if (spanElement.textContent?.trim() !== '') {
    //     // Apply CSS styles to position the image on top of the span element
    //     img.style.position = 'absolute';
    //     img.style.top = spanElement.getBoundingClientRect().top + 'px';
    //     img.style.left = spanElement.getBoundingClientRect().left + 'px';
    //     img.style.zIndex = '9999'; // Ensures the image is on top of other elements

    //     // Append the image to the body of the page
    //     document.body.appendChild(img);
    // }
}

console.log("MutationObserver")
let prev_element = "";
let observer = new MutationObserver(mutations => {
    const spanElement = document.querySelector('span.name_txt.selectable[style*="display: "]');
    if (spanElement) {
        const textValue = spanElement.textContent?.trim() || "";
        if (prev_element !== textValue){
            console.log(spanElement);
            prev_element = textValue;
        }
    }
 });

observer.observe(document, { childList: true, subtree: true });
