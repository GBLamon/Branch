import Ember from 'ember';

export default Ember.Component.extend({
  option: null,
  availableElements: [],
  showDelete: false,

  connectableElements: Ember.computed('availableElements', function() {
    const elements = this.get('availableElements');
    return elements
      .toArray()
      .filter(element => this.get('option.parent') !== element);
  }),

  actions: {
    toggleElement(element) {
      const option = this.get('option');
      const pointedFrom = element.get('pointedFrom');

      if (pointedFrom.includes(option)) {
        pointedFrom.removeObject(option);
      } else {
        pointedFrom.pushObject(option);
      }

      this.get('triggerRefresh')();
    },

    deleteOption() {
      this.get('option').deleteRecord();
      this.get('triggerRefresh')();
    }
  },
});
