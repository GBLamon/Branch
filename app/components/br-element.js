import Ember from 'ember';

const { get, set, computed } = Ember;

export default Ember.Component.extend({
  tagName: 'br-element',
  store: Ember.inject.service(),

  brElement: null,
  isGhost: false,
  laneReference: '',
  reference: '',

  availableElements: [],
  availableOptions: [],

  actions: {
    addOption(payload) {
      const newOption = this.get('store')
        .createRecord('option', {
          label: payload.label,
          pointsTo: payload.elements
        });

      this.get('brElement.options').pushObject(newOption);
      this.get('triggerRefresh')();
    },

    deleteMe() {
      this.sendAction('remove', this.get('brElement'));
    },

    // empty method, called in template
    // overridden in ghost element sub-class
    onFocusOut() {},

    unfocus() {
      this.$('input').blur();
    }
  }
});
