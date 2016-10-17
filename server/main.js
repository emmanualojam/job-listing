import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});
Meteor.methods({
    httpRequest: function(url) {
        try {
          return HTTP.call('GET', url, {});
        } catch (error) {
          throw new Meteor.error('error', 'something bad happened')
        }
    }
});
