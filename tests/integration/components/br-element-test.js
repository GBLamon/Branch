import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('br-element', 'Integration | Component | br element', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{br-element}}`);
  assert.equal(this.$('br-element').length, 1, 'it contains `br-element` root element');
  assert.equal(this.$('br-element .br-element__title').length, 1, 'it has element title');
  assert.equal(this.$('br-element .br-element__descr').length, 1, 'it has element description');
  assert.equal(this.$('br-element .br-element__options').length, 1, 'it has element options container');
});

test('it can read the title from the element model', function(assert) {
  const elementModel = {
    title: 'Some Element Title'
  };
  this.set('element', elementModel);

  this.render(hbs`{{br-element brElement=element}}`);
  assert.equal(this.$('br-element .br-element__title').text().trim(), 'Some Element Title', 'it reads element title from the model');

  Ember.run(() => Ember.set(elementModel, 'title', 'Updated Title'));
  assert.equal(this.$('br-element .br-element__title').text().trim(), 'Updated Title', 'it reads updated element title from the model');
});

test('it can write the title to the element model', function(assert) {
  const elementModel = {
    title: 'Some Element Title'
  };
  this.set('element', elementModel);

  this.render(hbs`{{br-element brElement=element}}`);
  assert.equal(this.$('br-element .br-element__title').text().trim(), elementModel.title, 'Initial value is set from model');

  const title = this.$('br-element .br-element__title').first();

  title.trigger('click');
  assert.equal(title.attr('contenteditable'), "true", 'Clicking triggered [contenteditable=true]');

  title.text('New title');
  title.trigger('focusout');

  assert.equal(title.attr('contenteditable'), "false", 'focusout triggered [contenteditable=false]');
  assert.equal(elementModel.title, 'New title', 'Element title was updated after focusout');
});
