import { moduleForModel, test } from 'ember-qunit';

moduleForModel('swimlane', 'Unit | Model | swimlane', {
  // Specify the other units that are required for this test.
  needs: ['model:element']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
