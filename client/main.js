import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Router.route('/', function () {
    this.render('joblistings');
});

Template.joblistings.onCreated(function() {
  this.response = new ReactiveVar();
  Meteor.call("httpRequest", "https://jobs.github.com/positions.json", (error, result) => {
          const show = JSON.parse(result.content);
          let glow = JSON.parse(result.content);
          for (var i=0;i<show.length;i++){
            glow[i].company_logo = "<img src='"+glow[i].company_logo+"'/>";
          }
          this.response.set(show);
          console.log(glow);
  });
});

Template.joblistings.helpers({
  showjobs: function() {
    const instance = Template.instance();
    return instance.response.get();
  },
  settings: function () {
        return {
            showFilter: true,
            fields: ['created_at', 'company', 'title', 'type', 'how_to_apply']
        };
    }
});
Template.joblistings.events({

});
