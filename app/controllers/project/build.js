import Ember from 'ember';
import _array from 'lodash/array';
import _flatMap from 'lodash/flatMap';

export default Ember.Controller.extend({
  currentSwimlane: 1,
  store: Ember.inject.service(),
  model: null,
  swimlanes: Ember.computed.alias('model.swimlanes'),

  allElements: Ember.computed('swimlanes', 'swimlanes.[]', 'swimlanes.@each.elements', function() {
    const swimlanes = this.get('swimlanes');
    const elements = swimlanes.map(swimlane => swimlane.get('elements').toArray());

    return _array.flatten(elements);
  }),

  allOptions: Ember.computed('allElements', 'allElements.@each.options', function() {
    const allElements = this.get('allElements');
    const options = allElements.map(element => element.get('options').toArray());

    return _array.flatten(options);
  }),

  takeSwimlane() {
    return this.set('currentSwimlane', this.get('currentSwimlane') + 1);
  },

  actions: {
    addSwimlane(atIndex) {
      const swimlane = this.get('store').createRecord('swimlane', {
        label: this.takeSwimlane()
      });

      this.get('swimlanes').insertAt(atIndex, swimlane);
    },
    removeSwimlane(swimlane) {
      this.get('swimlanes').removeObject(swimlane);
      swimlane.destroyRecord();
    },
    removeElement(element) {
      element.destroyRecord();
    },
    triggerChanges() {
      this.notifyPropertyChange('model.swimlanes');
      this.notifyPropertyChange('allElements');
      this.notifyPropertyChange('allOptions');
    },
    saveAll() {
      const project = this.get('model');
      const saveReduce = (modelArr, props) => {
        // needed for leaf models with no last prop to traverse
        // otherwise reduce ends early
        props.push('');
        props.reduce((modelArr, prop) => {
          return _flatMap(modelArr, model => {
            model.save();
            return model.get(prop) ? model.get(prop).toArray() : null;
          });
        }, modelArr);
      };

      saveReduce([project], ['swimlanes', 'elements', 'options']);
    }
  }
});
