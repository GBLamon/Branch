import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),

  model(params) {
    const elementId = params.elementId;
    const element = this.get('store').findRecord('element', elementId)
    return element;
  },

  setupController(controller, model) {
    const element = model;
    const decisions = [{
      elements: [ element ]
    }];
    controller.set('decisions', decisions);
  },

  actions: {
    error() {
      this.transitionTo('project.build');
    }
  }
});
