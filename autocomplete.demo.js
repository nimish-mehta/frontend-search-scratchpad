const lunr = require('lunr');
const   fs = require('fs');
const path = require('path');
const AutoComplete = require('triesearch');
const autoComplete = new AutoComplete();


let idex = lunr(function() {
  this.field('title');
  this.field('body');
});

idex.add({id: 1, title: 'foobar'});
idex.add({id: 2, title: 'bar'});
idex.add({id: 3, title: 'foo'});
idex.add({id: 4, title: 'abc'});
idex.add({id: 5, title: 'fork and spoons'});
idex.add({id: 6, title: 'form; containing random,, punctuation'});
console.log(idex);
console.log('cleans up the punctuation in corpus tokens');
console.log(idex.corpusTokens);
console.log(autoComplete);
idex.corpusTokens.forEach((tok) => autoComplete.addElement(tok));
console.log("Suggestion based on key: fo");
console.log(autoComplete.search('fo').map((el) => el.value));
console.log("Suggestion based on key: Fo"); // Handle capitalization
console.log(autoComplete.search('Fo').map((el) => el.value));
