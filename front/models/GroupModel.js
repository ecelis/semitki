'use strict'

let Group = Backbone.Model.extend({


  defaults: () => {
    return {
      "name": undefined,
      "description": undefined,
      "url": undefined
    }
  },

});
