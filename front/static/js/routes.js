'use strict'

let SemitkiRouter = Backbone.Router.extend({
  routes: {
    "": "index",
    "scheduler": "scheduler",
    "dashboard": "dashboard"
  },
  index: () => {
    let view = new LoginView();
    view.render({el:"#container"});
  },
  scheduler: () => {
    let view = new SchedulerCreate();
    view.render({el:"#container"});
  },
  dashboard: () => {
    let view = new DashboardView();
    view.render({el:"#container"});
  }
});
