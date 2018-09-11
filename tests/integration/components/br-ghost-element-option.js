import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('br-ghost-element-option', 'Integration | Component | br ghost element option', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{br-ghost-element-option}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#br-ghost-element-option}}
      template block text
    {{/br-ghost-element-option}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
