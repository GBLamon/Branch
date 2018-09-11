import Ember from 'ember';

export default Ember.Component.extend({
  elementModel: null,
  availableOptions: [],
  showDelete: false,

  connectableOptions: Ember.computed('availableOptions', function() {
    const elementModel = this.get('elementModel');
    const filteredOptions = this.get('availableOptions').filter(option => {
      return elementModel.get('options').toArray().includes(option) === false;
    });

    return filteredOptions;
  }),

  actions: {
    updateElementOptions(options) {
      this.set('elementModel.pointedFrom', options);
      this.get('triggerRefresh')();
    }
  },

  filteredOptions: Ember.computed('availableOptions', function() {
    const availableOptions = this.get('availableOptions');
    const elementOptions = this.get('elementModel.options');

    return availableOptions
      .filter(option => !elementOptions.includes(option));
  }),

  actions: {
    toggleOption(option) {
      const pointedFrom = this.get('elementModel.pointedFrom');
      if (pointedFrom.includes(option)) {
        pointedFrom.removeObject(option);
      } else {
        pointedFrom.pushObject(option);
      }

      this.get('triggerRefresh')();
    },

    deleteElement() {
      this.get('elementModel')
        .destroyRecord();

      this.get('triggerRefresh')();
    }
  }
});
