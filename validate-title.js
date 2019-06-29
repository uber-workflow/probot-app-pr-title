/** Copyright (c) 2017 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const nlp = require('compromise');

module.exports = function validateTitle(text) {
  const parsed = nlp(text);
  return [...validateSentence(parsed), ...validateFirstTerm(parsed)];
};

// Validate text is a single sentence with no end punctuation
function validateSentence(parsed) {
  const sentences = parsed.sentences();
  return [
    !isSingleSentence(sentences) ? 'Must be one and only one sentence.' : null,
    !isNotTooShort(parsed) ? 'Must be at least two words long.' : null,
    !isNotPunctuated(sentences) ? 'Must not have any end punctuation.' : null,
  ].filter(Boolean);
}

// Validate first word is a capitalized imperative mood verb
function validateFirstTerm(parsed) {
  const term = parsed.terms().data()[0];
  return [
    !isValidVerb(term) ? 'First word must be imperative verb.' : null,
    !isCapitalized(term) ? 'First word must be capitalized.' : null,
  ].filter(Boolean);
}

// The following imperative verbs are not categorized as such
// See: https://github.com/nlp-compromise/compromise/issues/448
const nounWhitelist = new Set([
  'configure',
  'disable',
  'enforce',
  'implement',
  'log',
  'pin',
  'rename',
  'reset',
  'set',
  'skip',
  'sync',
  'track',
  'run',
  'clean',
  'restore',
  'preserve',
  'omit',
  'instrument',
  'throw',
  'emit',
  'audit',
]);

function isSingleSentence(sentences) {
  return sentences.length === 1;
}

function isNotTooShort(parsed) {
  return parsed.terms().length >= 2;
}

function isNotPunctuated(sentences) {
  const endPunctuation = sentences.list[0].endPunctuation();
  return endPunctuation === null || endPunctuation === '';
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
