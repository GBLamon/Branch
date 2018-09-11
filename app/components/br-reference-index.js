import Ember from 'ember';

const { get, set, computed, isArray, Component } = Ember;

export default Component.extend({
  indexes: null,
  checkedProperty: 'checked',

  init() {
    this._super(...arguments);
  },

  elements: computed('indexes', function() {
    return Object.values(this.get('indexes'))
      .reduce((accumulated, current) => accumulated.concat(current), []);
  }),

  checkedElements: computed('elements', function() {

    const elements = get(this, 'elements');

    if (!isArray(elements)) {
      return [];
    }

    return elements.filterBy(get(this, 'checkedProperty'), true);
  }),

  actions: {
    toggleElement(element) {
      const checkedProperty = get(this, 'checkedProperty');
      set(element, checkedProperty, !get(element, checkedProperty));
      this.notifyPropertyChange('elements');
      this.notifyPropertyChange('checkedElements');

      const checkedElements = this.get('checkedElements');
      get(this, 'onUpdate')(checkedElements);
    },
  }
 });
