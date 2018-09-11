import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	title: DS.attr('string'),
	desc: DS.attr('string'),
  swimlane: DS.belongsTo('swimlane', {async: false}),
  options: DS.hasMany('option', {async: false}),
  pointedFrom: DS.hasMany('option', {
    inverse: 'pointsTo'
  }),

  hasEnabledOption: Ember.computed('pointedFrom.@each.isActive', function() {
    const enablers = this.get('pointedFrom');
    if (!enablers || enablers.length === 0) {
      return false;
    }

    return enablers.isAny('isActive', true);
  }),

  addOption(option) {
    this.get('options').pushObject(option);
  }
});
