const lunr = require('lunr');
const   fs = require('fs');


const INDEX_FILE = 'guidesIndex';

function initIndexFromFile(file = INDEX_FILE) {
  let fileData = fs.readFileSync(file, 'utf8');
  return lunr.Index.load(JSON.parse(fileData));
}

let index = initIndexFromFile();
let searchResults = index.search('installer');
console.log(searchResults);
console.log(`${searchResults.length} documents found.`);
// console.log(searchResults[0].ref);
console.log(index.tokenStore.expand('instal'));
// console.log(index.tokenStore.get('chapter'));
