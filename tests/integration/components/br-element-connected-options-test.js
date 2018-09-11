import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('br-element-connected-options', 'Integration | Component | br element connected options', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{br-element-connected-options}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#br-element-connected-options}}
      template block text
    {{/br-element-connected-options}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
