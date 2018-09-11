import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'br-context-menu',

  isOpened: false,

  actions: {
    toggleOpen() {
      this.toggleProperty('isOpened');
    },
    close() {
      this.set('isOpened', false);
    }
  }
});
