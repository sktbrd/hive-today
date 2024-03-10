async function updatePrice() {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=hive&vs_currencies=usd");
    if (response.ok) {
        const data = await response.json();
        chrome.action.setBadgeBackgroundColor({ color: [255, 255, 0, 255] });
        chrome.action.setBadgeText({ text: data['hive'].usd.toString() });
    }
}

updatePrice();
setInterval(updatePrice, 60000);
