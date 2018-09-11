import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('br-swimlane', 'Integration | Component | br swimlane', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{br-swimlane}}`);
  assert.equal(this.$('br-swimlane').length, 1, 'Has the br-swimlane element tag');
});
