import { getCardPrices, waitForElm } from './api_call'

const myCardName = "Blue-Eyes White Dragon";
console.log(myCardName);
console.log("Some Changes")

var promiseB = getCardPrices(myCardName).then(function (result: any) {
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
    const cardNameElement = document.querySelector('span.name_txt.selectable[style*="display: "]');
    const cardTextElement = document.querySelector('span.effect_txt') as HTMLElement;

    // for (let mutation of mutations) {
    //     if (mutation.type === 'childList') {
    //         img.style.top = cardTextElement.style.top;
    //         img.style.left = '50px'; // Adjust left position as needed
    //         img.style.width = '88%'; // Set width to cover the entire width of the target element
    //         img.style.height = '226px';
    //         img.style.zIndex = '9999'; // Ensures the image is on top of other elements

    //         cardTextElement.append(img)
    //         console.log(cardNameElement);
    //         console.log(cardTextElement);
    //     }
    // }

    if (cardNameElement && cardTextElement) { 
        const textValue = cardNameElement.textContent?.trim() || "";
        if (prev_element !== textValue) {
            // Apply CSS styles to position the image on top of the span element
            img.style.position = 'fixed';
            // img.style.top = cardTextElement.getBoundingClientRect().top + 'px';
            // img.style.left = cardTextElement.getBoundingClientRect().left + 'px';
            img.style.top = cardTextElement.style.top;
            img.style.left = '50px'; // Adjust left position as needed
            img.style.width = '88%'; // Set width to cover the entire width of the target element
            img.style.height = '226px';
            img.style.zIndex = '9999'; // Ensures the image is on top of other elements

            // cardNameElement.insertBefore(img, cardTextElement.firstChild);
            // cardTextElement.style.visibility = "hidden";
            cardTextElement.append(img)
            console.log(cardNameElement);
            console.log(cardTextElement);
            prev_element = textValue;
        }
    }
});

observer.observe(document, { childList: true, subtree: true });


// document.addEventListener('DOMContentLoaded', () => {
//     // Get the target element you want to observe
//     const targetElement = document.querySelector('.effect_txt');

//     if (targetElement) {
//         // Create a new MutationObserver instance
//         const observer = new MutationObserver((mutationsList, observer) => {
//             // Callback function to handle mutations
//             mutationsList.forEach(mutation => {
//                 // Perform actions based on the mutation
//                 console.log('Mutation type:', mutation.type);
//                 console.log('Changed element:', mutation.target);
//                 console.log('New content:', mutation.target.textContent);
//                 // You can add your logic here to react to mutations
//             });
//         });

//         // Configuration of the observer:
//         const config = { attributes: true, childList: true, subtree: true };

//         // Start observing the target node for configured mutations
//         observer.observe(targetElement, config);
//     }
// });
