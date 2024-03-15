export function getCardPrices(cardName: string): any {
    console.log("API about to get called on.");
    return fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${cardName}`, {
        method: 'GET'
    })
    .then((response) => {
        // console.log(response);
        console.log("API Details success!");
        return response.json(); // Parse the response as JSON
    })
    .then((json) => {
        console.log("API JSON success!");
        // console.log(json["data"][0]["card_prices"][0]["tcgplayer_price"]);
        return json["data"][0]["card_prices"][0]["tcgplayer_price"]; 
    });
}

export function waitForElm(selector: any) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}