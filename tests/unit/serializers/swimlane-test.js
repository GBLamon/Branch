import { moduleForModel, test } from 'ember-qunit';

moduleForModel('swimlane', 'Unit | Serializer | swimlane', {
  // Specify the other units that are required for this test.
  needs: ['serializer:swimlane']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
