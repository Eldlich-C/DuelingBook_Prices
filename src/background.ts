import { test_getCardPrices, 
    waitForElementToBeNotNull,
    createTable } from './api_call'

const myCardName = "Blue-Eyes White Dragon";
console.log(myCardName);
console.log("Some Changes")

var promiseB = test_getCardPrices(myCardName).then((result: any) => {
    // do something with 
    console.log(result);
    return result;
});

console.log("Promise val")
console.log(promiseB)
console.log("Promise val")

//// Code to insert test image
// Create an image element
const img = document.createElement('img');

// Set the source of the image
img.src = chrome.runtime.getURL('image.png');

// Create a table element

const table = document.createElement('table');

promiseB.then((resolvedResult: any) => {
    const table = createTable("test", resolvedResult);

    console.log("MutationObserver")
    let prev_element = "";
    let observer = new MutationObserver(mutations => {
        const cardNameElement = document.querySelector('span.name_txt.selectable[style*="display: "]');
        const cardTextElement = document.querySelector('span.effect_txt') as HTMLElement;

        if (cardNameElement && cardTextElement) { 
            const textValue = cardNameElement.textContent?.trim() || "";
            // if (prev_element !== textValue) {

            cardTextElement.textContent = ""
            cardTextElement.style.fontSize = '30px'; // Change font size
            // cardTextElement.style.fontFamily = 'Arial, sans-serif'; // Change font family

            // Apply CSS styles to position the image on top of the span element
            table.style.position = 'sticky'; //vs. fixed
            table.style.top =  cardTextElement.style.top;
            table.style.bottom = cardTextElement.style.bottom//`100px`; // Convert to string with 'px' unit and set as bottom style
            table.style.left = '50px'; // Adjust left position as needed
            table.style.width = '100%'; // Set width to cover the entire width of the target element
            table.style.zIndex = '9999'; // Ensures the image is on top of other elements

            cardTextElement.append(table)

            console.log(cardNameElement);
            console.log(cardTextElement);
            // prev_element = textValue;
            // }
        }
    });

    const selector = 'span.name_txt.selectable[style*="display: "]';
    const interval = 1000; // milliseconds
    const maxAttempts = 1000;


    waitForElementToBeNotNull(selector, interval, maxAttempts)
        .then((cardNameElement) => {
            // Now you have cardNameElement, you can observe it
            observer.observe(cardNameElement, { childList: true, subtree: true });
        })
        .catch((error) => {
            console.error(error);
        });


});
