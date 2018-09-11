import Ember from 'ember';

export default Ember.Controller.extend({
  decisions: [],

  actions: {
    makeDecision(parentDecision, optionChosen) {
      let decisions = this.get('decisions');

      const parentDecisionIndex = decisions.indexOf(parentDecision);
      if (parentDecisionIndex !== decisions.length -1) {
        // rollback previous decision and move on from there
        decisions = decisions.slice(0, parentDecisionIndex + 1);
      }

      decisions.pushObject({
        elements: optionChosen.get('pointsTo')
      });

      this.set('decisions', decisions);
    }
  }
});
