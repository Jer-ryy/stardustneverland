/// ///////////////////////////////////////////////////
// INCLUDES
/// ///////////////////////////////////////////////////
const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');
const format = require('pg-format');
const pool = require('../db'); // Import from db.js

// Seed order matters: later tables reference ids from earlier ones
const seeds = [
    { csv: 'images.csv', sql: 'INSERT INTO image (imageurl, imagename, imagesorter) VALUES %L' },
    { csv: 'floors.csv', sql: 'INSERT INTO floors (floorname, imageid) VALUES %L' },
    { csv: 'items.csv', sql: 'INSERT INTO items (itemname, cost, levelreq, imageid, damage, speed, durability, critrate) VALUES %L' },
    { csv: 'users.csv', sql: 'INSERT INTO users (role, username, password, imageid, equippeditem, floorid, plotid, userstatus, lastloggedin) VALUES %L' },
    { csv: 'npc.csv', sql: 'INSERT INTO npc (npcname, imageid, floorid, rewarditemid) VALUES %L' },
    { csv: 'inventory.csv', sql: 'INSERT INTO inventory (userid, itemid, quantity) VALUES %L' },
    { csv: 'game.csv', sql: 'INSERT INTO game (gamename, npcid) VALUES %L' },
    { csv: 'dialogue.csv', sql: 'INSERT INTO dialogue (dialoguedesc, npcid, plotid, stateid) VALUES %L' },
    { csv: 'currency.csv', sql: 'INSERT INTO currency (quantity, userid) VALUES %L' },
    { csv: 'post.csv', sql: 'INSERT INTO postboard (postdesc, userid) VALUES %L' },
    { csv: 'boss.csv', sql: 'INSERT INTO boss (bossname, bosshealth, bossreward, imageid) VALUES %L' },
    { csv: 'game_play_duration.csv', sql: 'INSERT INTO gameplayduration (gameid, timestart, timeend, duration, userid, attempt) VALUES %L' },
    { csv: 'spin.csv', sql: 'INSERT INTO spinwheel (itemid, imageid, rowcount) VALUES %L' },
];

// Read a CSV file into an array of rows, dropping the header line
const readCsv = (file) => new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(path.join(__dirname, file))
        .pipe(fastcsv.parse())
        .on('data', (row) => rows.push(row))
        .on('error', reject)
        .on('end', () => resolve(rows.slice(1)));
});

const seed = async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const { csv, sql } of seeds) {
        // eslint-disable-next-line no-await-in-loop
        const rows = await readCsv(csv);
        // eslint-disable-next-line no-await-in-loop
        const result = await pool.query(format(sql, rows));
        console.log(`${csv}: inserted ${result.rowCount} rows`);
    }
};

seed()
    .then(() => console.log('Database seeded'))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(() => pool.end());
