import LFSerializer from 'ember-localforage-adapter/serializers/localforage';
import DS from 'ember-data';

export default LFSerializer.extend(
  DS.EmbeddedRecordsMixin, {
    attrs: {
      elements: { embedded: 'always' }
    }
  }
);
