import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  swimlanes: DS.hasMany('swimlane', {async: true})
});
