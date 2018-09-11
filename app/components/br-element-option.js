import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'br-element-option',

  elementAttachedTo: null,
  availableElements: [],

  // models/option
  option: null,

  actions: {
    stopEditingLabel() {
      this.$('input').blur();
    },
  }
});
