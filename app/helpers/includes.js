import Ember from 'ember';

export function includes([array, searchElement]) {
  return array.includes(searchElement);
}

export default Ember.Helper.helper(includes);
