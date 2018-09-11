import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('br-option-connected-elements', 'Integration | Component | br option connected elements', {
  integration: true,
  beforeEach() {
    // debugger;
    this.sampleElements = ['elementA', 'element B', 'element C']
      .map(title => Ember.getOwner(this).lookup('service:store').createRecord('element', { title }));

    this.sampleOption = Ember.getOwner(this).lookup('service:store').createRecord('option');
  }
});

test('it renders', function(assert) {
  Ember.run(() => {
    this.sampleOption.set('pointsTo', this.sampleElements);
  });

  this.set('option', this.sampleOption);
  this.set('elements', this.sampleElements);
  this.set('updated', () => {});
  this.render(hbs`{{
    br-option-connected-elements
    option=option
    elements=elements
    selectedUpdated=updated
  }}`);

  this.$('.br-context-menu__triger').click();

  const checkedCount = Ember.$('.br-element-option__multiselect-checkboxes input:checked').length;
  const pointedToCount = this.sampleOption.get('pointsTo.length');
  assert.equal(checkedCount, pointedToCount, 'renders the same number of selected');
  this.sampleElements.forEach(element => {
    const listItemWithElementTitle = Ember.$(`.br-element-option__multiselect-checkboxes li:contains(${element.get('title')})`);
    assert.equal(listItemWithElementTitle.length, 1, `Contains rendered label ${element.get('title')}`);
  });
});

test('it triggers updated selected options', function(assert){

});
