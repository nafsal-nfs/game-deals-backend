const fs = require('fs');

async function getDeals() {
  try {
    // Fetch live freebies from GamerPower
    const gamerPowerRes = await fetch('https://www.gamerpower.com/api/giveaways?type=game');
    const freeGames = await gamerPowerRes.json();

    // Fetch top deals from CheapShark (includes historical low data)
    const cheapSharkRes = await fetch('https://www.cheapshark.com/api/1.0/deals?onSale=1');
    const sales = await cheapSharkRes.json();

    // Combine into our "database"
    const database = {
      lastUpdated: new Date().toISOString(),
      freeGames: freeGames,
      sales: sales
    };

    // Write to local JSON file
    fs.writeFileSync('deals.json', JSON.stringify(database, null, 2));
    console.log('Successfully updated deals.json');

  } catch (error) {
    console.error('Error fetching deals:', error);
    process.exit(1);
  }
}

getDeals();
