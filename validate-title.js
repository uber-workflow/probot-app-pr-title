/** Copyright (c) 2017 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const nlp = require('compromise');

module.exports = function isValidTitle(text) {
  const parsed = nlp(text);
  return isValidSentence(parsed) && firstTermIsValidVerb(parsed);
};

// Validate text is a single sentence with no end punctuation
function isValidSentence(parsed) {
  const sentences = parsed.sentences();
  // must be one and only one sentence
  if (sentences.length !== 1) {
    return false;
  }
  // must be at least two words long
  if (parsed.terms().length < 2) {
    return false;
  }
  // must not have any end punctuation
  if (sentences.list[0].endPunctuation() !== null) {
    return false;
  }
  return true;
}

// The following verbs starting with `re` are categorized as singular nouns
// See: https://github.com/nlp-compromise/compromise/issues/412
const nounWhitelist = new Set([
  'introduce',
  'repeat',
  'rebuild',
  'reconcile',
  'record',
  'redefine',
  'recover',
  'reset',
  'restructure',
  'resolve',
  'expose',
  'upgrade',
]);

// Validate first word is a capitalized imperative mood verb
function firstTermIsValidVerb(parsed) {
  const term = parsed.terms().data()[0];
  return isValidVerb(term) && isCapitalized(term);
}

function isValidVerb(term) {
  return nounWhitelist.has(term.normal) || isInfinitiveVerb(term);
}

function isInfinitiveVerb(term) {
  return term.tags.includes('Verb') && term.tags.includes('Infinitive');
}

function isCapitalized(term) {
  return term.tags.includes('TitleCase');
}
