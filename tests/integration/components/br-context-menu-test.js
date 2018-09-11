import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('br-context-menu', 'Integration | Component | br context menu', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#br-context-menu}}
      template block text
    {{/br-context-menu}}
  `);

  assert.equal(this.$('br-context-menu').length, 1, 'Renders with the br-context-menu element tag');
});

test('it opens when the ... trigger is clicked', function(assert) {
  this.render(hbs`
    {{#br-context-menu}}
      Text inside the context menu
    {{/br-context-menu}}
  `);

  assert.equal($('.br-context-menu__menu').length, 0, 'Context menu is not shown before clicking trigger');
  this.$('.br-context-menu__triger').click();
  assert.equal($('.br-context-menu__menu').length, 1, 'Context menu is shown after clicking trigger');
  assert.equal($('.br-context-menu__menu').text().trim(), 'Text inside the context menu', 'Context menu contains inner block contents');
});
