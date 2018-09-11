import Ember from 'ember';
import { computed } from 'ember-decorators/object';

const { get } = Ember;

export default Ember.Component.extend({
  tagName: 'br-swimlane',
  store: Ember.inject.service(),

  swimlane: null,
  availableElements: [],
  availableOptions: [],

  @computed('swimlane.elements')
  elements(elements) {
    elements.forEach((element, i) => {
      element.set('reference', String.fromCharCode('A'.charCodeAt(0) + i));
    });

    return elements;
  },

  actions: {
    addElement(element) {
      this.get('swimlane.elements').pushObject(element);
      this.triggerRefresh();
    },

    removeSwimlane() {
      this.sendAction('removeSwimlane', this.get('swimlane'));
    }
  }
});
