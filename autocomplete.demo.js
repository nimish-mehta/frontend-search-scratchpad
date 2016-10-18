const lunr = require('lunr');
const   fs = require('fs');
const path = require('path');
const AutoComplete = require('triesearch');
const autoComplete = new AutoComplete();

let config = function() {
  this.field('title');
  this.field('body');
};

let addToCompletion = function(token) {
  autoComplete.addElement(token);
  return token;
};

let autoCompleteIndexBuilder = function (config, autoCompletePipelineStep) {
  var idx = new lunr.Index;
  idx.pipeline.add(
    lunr.trimmer,
    lunr.stopWordFilter,
    autoCompletePipelineStep,
    lunr.stemmer
  );
  config.call(idx, idx);
  return idx;
};

let idex = autoCompleteIndexBuilder(config, addToCompletion);

idex.add({id: 1, title: 'foobar'});
idex.add({id: 2, title: 'bar'});
idex.add({id: 3, title: 'foo'});
idex.add({id: 4, title: 'abc'});
idex.add({id: 5, title: 'fork and spoons'});
idex.add({id: 6, title: 'form; containing random,, punctuation'});
idex.add({id: 7, title: 'apple'});
idex.add({id: 8, title: 'Apples'});
idex.add({id: 9, title: 'App-Store'});

console.log(idex);
console.log('cleans up the punctuation in corpus tokens');
console.log(idex.corpusTokens);
console.log(autoComplete);
console.log("Suggestion based on key: fo");
console.log(autoComplete.search('fo').map((el) => el.value));
console.log("Suggestion based on key: Fo"); // Handle capitalization
console.log(autoComplete.search('Fo').map((el) => el.value));
console.log(autoComplete.search('App').map((el) => el.value));
