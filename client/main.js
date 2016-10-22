import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Router.route('/', function () {
    this.render('joblistings');
});

Template.joblistings.onCreated(function() {
  this.response = new ReactiveVar();
  Meteor.call("httpRequest", "http://jobs.github.com/positions.json", (error, result) => {
          let glow = JSON.parse(result.content);
          for (var i=0;i<glow.length;i++){
            glow[i].company_logo ="<a href='"+glow[i].company_url+"'><img class='logo-com' src='"+glow[i].company_logo+"'/></a>";
          }
          this.response.set(glow);
          console.log(glow);
  });
});

Template.joblistings.helpers({
  myDataIsReady: function() {
    const instance = Template.instance();
    let data = instance.response.get();
    if (data) return true;
    else return false;
  },
  showjobs: function() {
    const instance = Template.instance();
    return instance.response.get();
  },
  settings: function () {
        return {
            showFilter: true,
            fields: [
                { key: 'created_at', label: 'Created At'},
                { key: 'company', label: 'Company'},
                { key: 'company_logo', label: 'company logo', fn: function (value) { return new Spacebars.SafeString(value) }},
                { key: 'title', label: 'Title', fn: function (value) { return new Spacebars.SafeString(value) }},
                { key: 'description', label: 'Description', fn: function (value) { return new Spacebars.SafeString(value) }},
                { key: 'type', label: 'Type'},
                { key: 'how_to_apply', label: 'How To Apply', fn: function (value) { return new Spacebars.SafeString(value) }},
              ]
        };
    },

});
Template.joblistings.events({

});
