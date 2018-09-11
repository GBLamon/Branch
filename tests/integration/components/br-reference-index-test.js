import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

moduleForComponent('br-reference-index', 'Integration | Component | br reference index', {
  integration: true
});

test('it renders', function(assert) {
  this.set('indexes', {
    'index title': [{ name: 'first' }, { name: 'second' }]
  });

  this.render(hbs`
    {{#br-reference-index indexes=indexes as |item toggleElement|}}
      <div className="name">{{item.name}}</div>
    {{/br-reference-index}}
  `);

  assert.equal(this.$('ul > li:contains(index title)').length, 1);
  assert.equal(this.$('ul > li > ul > li:contains(first)').length, 1);
  assert.equal(this.$('ul > li > ul > li:contains(second)').length, 1);
});

test('it tracks isChecked properties', function(assert) {
  this.set('indexes', {
    'MAIN INDEX': [
      {
        name: 'First',
        isChecked: false
      },
      {
        name : 'Second',
        isChecked: true
      }
    ]
  });

  const onUpdate = sinon.stub();
  this.set('onUpdate', onUpdate);

  this.render(hbs`
    {{#br-reference-index
      checkedProperty='isChecked'
      indexes=indexes
      onUpdate=onUpdate
    as |item toggleElement|}}
      <div {{action (action toggleElement)}} className="name">{{item.name}} {{item.isChecked}}</div>
    {{/br-reference-index}}
  `);

  assert.equal(this.$('ul > li > ul > li:contains("First false")').length, 1, 'first item isClicked is set to false');
  assert.equal(this.$('ul > li > ul > li:contains("Second true")').length, 1, 'second item isClicked is set to true');

  this.$('ul > li > ul > li:contains("First false") div').click();

  assert.equal(onUpdate.calledOnce, true);
  assert.equal(onUpdate.args[0][0].length, 2);
  assert.equal(this.$('ul > li > ul > li:contains("First true")').length, 1, 'first item isClicked is set to true');
});