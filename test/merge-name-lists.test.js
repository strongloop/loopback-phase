// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-phase
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var mergePhaseNameLists = require('../').mergePhaseNameLists;
var expect = require('chai').expect;

describe('mergePhaseNameLists', function() {
  it('starts adding new phases from the start', function() {
    var result = mergePhaseNameLists(
      ['start', 'end'],
      ['first', 'end', 'last']);
    expect(result).to.eql(['first', 'start', 'end', 'last']);
  });

  it('prioritizes new phases before existing phases', function() {
    var result = mergePhaseNameLists(
      ['initial', 'session', 'auth'],
      ['initial', 'added', 'auth']);
    expect(result).to.eql(['initial', 'added', 'session', 'auth']);
  });

  it('merges arrays preserving the order', function() {
    var target = ['initial', 'session', 'auth', 'routes', 'files', 'final'];
    var result = mergePhaseNameLists(target, [
      'initial',
      'postinit', 'preauth', // add
      'auth', 'routes',
      'subapps', // add
      'final',
      'last' // add
    ]);

    expect(result).to.eql([
      'initial',
      'postinit', 'preauth', // new
      'session', 'auth', 'routes',
      'subapps', // new
      'files', 'final',
      'last' // new
    ]);
  });

  it('throws on conflicting order', function() {
    expect(function() { mergePhaseNameLists(['one', 'two'], ['two', 'one']); })
      .to.throw(/cannot add "one" after "two"/);
  });
});
