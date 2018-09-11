import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'br-decision',

  actions: {
    optionClicked(decision, option) {
      this.get('optionChosen')(decision, option);
    }
  }
});
