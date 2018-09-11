import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('project', { path: '/' }, function() {
    this.route('build', { path: '/' });
    this.route('experience', { path: '/experience/:elementId' });
  });
});

export default Router;
