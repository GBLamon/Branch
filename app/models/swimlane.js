import DS from 'ember-data';

export default DS.Model.extend({
  label: DS.attr('string'),
  project: DS.belongsTo('project', {async: true}),
  elements: DS.hasMany('element', {async: false}),

  destroyRecord() {
    this.get('elements').forEach(element => element.destroyRecord());
    this._super();
  }
});
