import { moduleFor, test } from 'ember-qunit';
import { make, manualSetup }  from 'ember-data-factory-guy';

moduleFor('controller:project.experience', 'Unit | Controller | project experience', {
  needs: [
    'model:element',
    'model:option',
  ],

  beforeEach: function () {
    manualSetup(this.container);
  }
});

test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it pushes new decisions on the stack', function(assert) {
  let baseDecision, optionTwo, optionTwoElement;

  Ember.run(() => {
    // base element
    const baseElement = make('element');
    // has two options
    const optionOne = make('option');
    optionTwo = make('option');
    baseElement.get('options').pushObject(optionOne, optionTwo);

    optionTwoElement = make('element');
    optionTwoElement.get('pointedFrom').pushObject(optionTwo);

    baseDecision = {
      elements: [ baseElement ]
    };
  });

  const controller = this.subject();
  controller.set('decisions', [ baseDecision ]);
  assert.equal(controller.get('decisions.length'), 1, 'initial decision length is 1');

  // make a decision with baseDecision, choosing optionTwo
  controller.send('makeDecision', baseDecision, optionTwo);

  assert.equal(controller.get('decisions.length'), 2, 'controller has two decisions after one is made');
  assert.equal(controller.get('decisions')[0], baseDecision, 'the first decision is still the base decision');
  const madeDecision = controller.get('decisions')[1];
  assert.equal(madeDecision.elements.contains(optionTwoElement), true, 'new decision contains elements based on the option chosen');
});

test('it rolls back from second decision to first decision if a different option is chosen from first decision', function(assert) {
  let baseElement, optionOne, optionOneElement, optionTwo, optionTwoElement;

  Ember.run(() => {
    // base element
    const baseElement = make('element');

    // has two options
    optionOne = make('option');
    optionOneElement = make('element');
    optionOneElement.get('pointedFrom').pushObject(optionOne);

    optionTwo = make('option');
    optionTwoElement = make('element');
    optionTwoElement.get('pointedFrom').pushObject(optionTwo);

    baseElement.get('options').pushObject(optionOne, optionTwo);
  });

  const decisionOne = {
    elements: [ baseElement ]
  };

  const decisionTwo = {
    elements: [ optionTwoElement ]
  }

  const controller = this.subject();
  controller.set('decisions', [ decisionOne, decisionTwo ]);
  assert.equal(controller.get('decisions.length'), 2, 'the controller starts with two decisions');
  assert.equal(controller.get('decisions')[1], decisionTwo, 'double-check the second decision is decisionTwo');

  // make a decision with decisionOne, choosing optionOne
  controller.send('makeDecision', decisionOne, optionOne);

  assert.equal(controller.get('decisions.length'), 2, 'the controller still with two decisions');
  const newDecisionMade = controller.get('decisions')[1];
  assert.equal(newDecisionMade.elements.contains(optionOneElement), true, 'the second decision is now contains first option element');
});

test('it rolls back from third decision to first decision if an option is chosen from the first decision', function(assert) {
  let baseElement, element1, element2;
  let option1, option2;

  Ember.run(() => {
    // base element
    baseElement = make('element');

    // base:option1 -> element1
    option1 = make('option');
    baseElement.addOption(option1);
    element1 = make('element');
    option1.pointToElement(element1);

    // element1:option2 -> element2
    option2 = make('option');
    element1.addOption(option2);
    element2 = make('element');
    option2.pointToElement(element2);
  });

  const decision1 = {
    elements: [ baseElement ]
  };

  const controller = this.subject();
  controller.set('decisions', [ decision1 ]);
  assert.equal(controller.get('decisions.length'), 1, 'starts with one decision');

  // make two decisions to get to element 3
  controller.send('makeDecision', decision1, option1);
  const decision2 = controller.get('decisions')[1];
  controller.send('makeDecision', decision2, option2);
  debugger;
  assert.equal(controller.get('decisions.length'), 3, 'three decisions made');

  // make a decision on element 1
  controller.send('makeDecision', decision1, option1);
  assert.equal(controller.get('decisions.length'), 2, 'only two decisions after rollback');
  const newDecision2 = controller.get('decisions')[1];
  assert.notEqual(newDecision2, decision2, 'new decision 2 does not equal previous decision 2');
});
