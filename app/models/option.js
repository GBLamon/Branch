import DS from 'ember-data';

export default DS.Model.extend({
	label: DS.attr('string'),
  isActive: DS.attr('boolean', { defaultValue: false}),

  pointsTo: DS.hasMany('element', {
    inverse: 'pointedFrom',
    async: false
  }),

  parent: DS.belongsTo('element', {
    inverse: 'options',
    async: false
  }),

  pointToElement(element) {
    this.get('pointsTo').pushObject(element);
  }
});
