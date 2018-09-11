import Ember from 'ember';
import Element from './br-element';
import layout from '../templates/components/br-element';

const { get, set, isEmpty } = Ember;

export default Element.extend({
  layout,
  brElement: null,
  classNames: ['--ghost'],
  isGhost: true,

  didReceiveAttrs() {
    this._super();

    if (!get(this, 'brElement')) {
      set(this, 'brElement', this.getNewElement());
    }
  },

  getNewElement() {
    return get(this, 'store').createRecord('element');
  },

  actions: {
    onFocusOut() {
      const element = get(this, 'brElement');
      const didEdit = this._elementHasChanges(element);

      if (didEdit) {
        this._createNewElementFromGhost();
      }
    },

    addOption() {
      this._super(...arguments);
      this._createNewElementFromGhost();
    }
  },

  _createNewElementFromGhost() {
    const element = get(this, 'brElement');
    // create an element based on what has been filled in
    get(this, 'addElement')(element);
    // set this ghost element to a fresh element
    this.set('brElement', this.getNewElement());
  },

  _elementHasChanges(element) {
    const changedAttributes = element.changedAttributes();
    const hasChanges = Object.values(changedAttributes).any(item => isEmpty(item[0]) !== isEmpty(item[1]));

    return hasChanges;
  }
});
