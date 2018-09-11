import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('br-ghost-element', 'Integration | Component | br ghost element', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{br-ghost-element}}`);
  assert.equal(this.$('br-element').length, 1, 'Has the br-element elemnt tag');
  assert.equal(this.$('br-element.--ghost').length, 1, 'Has the --ghost modifier class');
});
