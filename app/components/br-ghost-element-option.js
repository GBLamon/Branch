import Ember from 'ember';
import ElementOption from './br-element-option';

export default ElementOption.extend({
  elementAttachedTo: null,
  optionName: '',
  selectedElements: [],
  classNames: ['--ghost'],

  expanded: false,

  click() {
    this.set('expanded', true);
    Ember.run.schedule('afterRender', this, ()=> {
      this.$('input').focus();
    })
  },

  actions: {
    addOption() {
      this.sendAction('addOption', {
        label: this.get('optionName'),
        elements: this.get('selectedElements')
      });

      this.set('expanded', false);
      this.set('optionName', '');
      this.set('selectedElements', []);
      this.get('triggerRefresh')();
    },

    selectedElementsUpdated(elements) {
      this.set('selectedElements', elements);
    },

    collapse() {
      this.set('expanded', false);
      if (this.get('optionName')) {
        this.actions.addOption.call(this);
      }
    }
  }
});
