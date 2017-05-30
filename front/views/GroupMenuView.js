'use strict'

let GroupMenuView = Backbone.View.extend({

  tagName: "div",

  className: "panel-body",

  initialize: function() {
    let groups = S.collection.get("groups").toJSON();

    this.accounts = groups.map((group) => {
      let account = {
        "group": group.name
      };
      group.related.forEach((a) => {
        account.id = a.social_account_url.id;
        account.text = a.social_account_url.username;
        account.bucket = a.social_account_url.bucket;
        account.image = a.social_account_url.image;
      });

      return account;
    });

    return this;
  },


  render: function() {
    let template = $("#account-menu-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled());
    $("#account-menu").html(this.$el);

    $(".account-select").select2({
      data: this.accounts
    });

    return this;
  }

});