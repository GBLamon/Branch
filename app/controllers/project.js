import Ember from 'ember';

export default Ember.Controller.extend({
  build: Ember.inject.controller('project.build'),
  store: Ember.inject.service(),

  actions: {
    transitionToExperience() {
      const swimlanes = this.get('build.model.swimlanes');
      const firstElement = swimlanes.get('firstObject.elements.firstObject');

      this.transitionToRoute('project.experience', firstElement.get('id'));
    }
  }
});
