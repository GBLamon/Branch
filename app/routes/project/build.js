import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),

  model: async function () {
    if (this.get('controller.model')) {
      return this.get('controller.model');
    }

    const store = this.get('store');
    const projects = await store.findAll('project');
    const project = projects.toArray()[0];

    if (project) {
      console.log('existing project found');
      return project;
    } else {
      console.log('scaffolding a new project');
      const project = this.scaffoldNewProject();
      project.save();
      return project;
    }
  },

  scaffoldNewProject() {
    const store = this.get('store');
    const initialElement = store.createRecord('element', {});

    const A = store.createRecord('swimlane', {
      label: 1,
      elements: [ initialElement ],
    });

    const B = store.createRecord('swimlane', {
      label: 2,
      elements: []
    });

    const project = store.createRecord('project');
    project.set('swimlanes', [A, B]);

    return project;
  },

  setupController(controller, model) {
    this._super(...arguments);
    const swimlanes = model.get('swimlanes');
    const swimlaneNumber = swimlanes.reduce((max, swimlane) => {
      return Math.max(max, swimlane.get('label'));
    }, 1);

    controller.set('currentSwimlane', swimlaneNumber);
  }
});
