export function test_getCardPrices(cardName: string): any {
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
        console.log(json["data"][0]["card_prices"][0]);
        return json["data"][0]["card_prices"][0]; 
    });
}

export function waitForElementToBeNotNull(selector: string, interval: number, maxAttempts: number): Promise<Element> {
    // also called polling
    return new Promise((resolve, reject) => {
        let attempts = 0;

        const checkElement = () => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
            } else {
                attempts++;
                if (attempts >= maxAttempts) {
                    reject(new Error(`Element "${selector}" not found after ${attempts} attempts`));
                } else {
                    setTimeout(checkElement, interval);
                }
            }
        };

        checkElement();
    });
}

export function createTable(cardName: string, jsonObj: any): any {
    // Create a table element
    const table = document.createElement('table');

    let list = ["CardMarket:", "TcgPlayer:", "Ebay:", "Amazon:", "CoolStuffInc:"];
    // Loop to create rows
    for (let i = 0; i < 2; i++) {
        // Create a row element
        const row = document.createElement('tr');

        // Loop to create cells  
        for (let j = 0; j < 5; j++) {
            // Create a cell element
            const cell = document.createElement('td');

            // Apply CSS styles directly using the style property
            cell.style.border = '2px solid #0a0a0a';
            cell.style.textAlign = 'center';
            cell.style.padding = '8px';

            // Create a text node with content for the cell
            if(i == 0){
                const cellText = document.createTextNode(`${list[j]}`);

                // Append the text node to the cell
                cell.appendChild(cellText); 
            } else {
                var modifiedString = list[j].replace(":","_price").toLowerCase();
                console.log
                const cellText = document.createTextNode(`${jsonObj[modifiedString]}`);

                // Append the text node to the cell
                cell.appendChild(cellText);        
            }

            // Append the cell to the row
            row.appendChild(cell);
        }

        // Append the row to the table
        table.appendChild(row);

        // Apply background color for each of the two rows
        if (i % 2 === 1) {
            row.style.backgroundColor = '#bcbcbc';
        } 
        else {
            row.style.backgroundColor = '#ffffff';
        }
    }

    return table;
}

// Function to fetch data from API with caching
export async function fetchDataWithCache(url: string, params: any) {
    const cacheKey = generateCacheKey(url, params);
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        // Check if cached data is still valid
        if (isCacheValid(timestamp)) {
            return JSON.parse(data);
        } else {
            // Remove expired cache entry
            localStorage.removeItem(cacheKey);
        }
    }

    // Fetch data from API
    const response = await fetch(url);
    const newData = await response.json();

    // Cache the new data
    localStorage.setItem(cacheKey, JSON.stringify({ data: newData, timestamp: Date.now() }));

    return newData;
}

// Function to generate cache key
function generateCacheKey(url: string, params: any) {
    return `${url}-${JSON.stringify(params)}`;
}

// Function to check if cache is still valid
function isCacheValid(timestamp: number) {
    // Set expiration time, e.g., 10 minutes
    const expirationTime = 24 * 60 * 60 * 1000; // 1day  in milliseconds
    return (Date.now() - timestamp) < expirationTime;
}

// Example usage
const apiUrl = 'https://api.example.com/data';
const queryParams = { param1: 'value1', param2: 'value2' };

const urls = ["https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Kuriboh", 
            "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Visas Starfrost",
            "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Fissure"]

fetchDataWithCache(apiUrl, queryParams)
    .then(data => console.log(data))
    .catch(error => console.error(error));
