import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { getOwner } = Ember;

moduleForComponent('br-element-option', 'Integration | Component | br element option', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{br-element-option}}`);
  assert.equal(this.$('br-element-option').length, 1, 'Component has the br-element-option element tag');
});

test('it contains the available elements passed in', function(assert) {
  const store = getOwner(this).lookup('service:store');

  Ember.run(() => {
    const parentElement = store.createRecord('element', {
      title: 'Parent Element Title',
      laneReference: '1',
      desc: 'Parent Element Description'
    });
    this.set('parentElement', parentElement);

    const elementA = store.createRecord('element', {
      title: 'Element A',
      laneReference: '2',
      desc: 'Parent Element A Description'
    });

    const elementB = store.createRecord('element', {
      title: 'Element B',
      laneReference: '2',
      desc: 'Element B Description'
    });

    const elementC = store.createRecord('element', {
      title: 'Element C',
      laneReference: '3',
      desc: 'Element C Description'
    });

    const availableElements = [parentElement, elementA, elementB, elementC];
    this.set('availableElements', availableElements);

    const thisOption = store.createRecord('option', {
      label: 'This option is beautiful',
      parent: parentElement
    });
    this.set('option', thisOption);
  });

  this.render(hbs`{{br-element-option
    option=option
    elementAttachedTo=parentElement
    availableElements=availableElements
  }}`);

  this.$('.br-context-menu__triger').click();
  assert.equal($('.br-context-menu__menu:contains(Parent Element Title)').length, 0, 'Does not contain parent element in list');
  assert.equal($('.br-context-menu__menu:contains(Element A)').length, 1, 'Contains Element A in context menu');
  assert.equal($('.br-context-menu__menu:contains(Element B)').length, 1, 'Contains Element B in context menu');
  assert.equal($('.br-context-menu__menu:contains(Element C)').length, 1, 'Contains Element C in context menu');
});
