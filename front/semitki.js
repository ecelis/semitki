'use strict'


let S = {

  initialize: function() {
    Backbone.history.start();                         // Initialize Backbone web browser history support
    this.router = new SemitkiRouter();                // Initialize Backbone routes
    let navTemplate = Handlebars.compile($("#navigation-template").html());
    let footerTemplate = Handlebars.compile($("#footer-template").html());
    Handlebars.registerPartial('navigation', navTemplate);
    Handlebars.registerPartial('footer', footerTemplate);
    // Select boxes default settings
    $.fn.select2.defaults.set("theme", "bootstrap");
    $.fn.select2.defaults.set("allowClear", true);
    $.fn.select2.defaults.set("placeholder", "search...");
    this.jwtheader = "JWT ";                          // Token prefix for authorization custom header
    this.jwtoken = undefined;                         // JSON Web Token
    // BackBone collection instances
    // Heil ES6 Map!
    this.collection = new Map ();                     // System catalogs colection
    // Collections == Catalogs
    this.collection.set("campaigns", new Campaigns());
    this.collection.set("phases", new Phases());
    this.collection.set("buckets", new Buckets());
    this.collection.set("accounts", new Accounts());
    this.collection.set("groups", new Groups());
    this.collection.set("account_group", new AccountGroups());
    this.collection.set("posts", new Posts());
    this.user = new UserModel();                      // Signed in user
    this.users = new Users();                         // User collection
    this.static_pages = new StaticPages();
    this.static_pages.fetch(() => {                   // Get custom static content
      return {
        headers: {'X-CSRFToken': Cookies.get("CSRFToken")}
      }
    });
    this.lang = "en-EN"                                  // UX language
    S.initPolyglot(this);                                // Initialize internationalization

    return this;
  },

  // VAriables
  log: {
    info: "bg-info",
    success: "bg-succes",
    error: "bg-danger"
  },


  addAuthorizationHeader: () => {
    return {
      headers: {'Authorization': S.jwtheader.concat(S.jwtoken)}
    }
  },


  api: (resource) => {
    // Builds the api url of a given resource
    if(SEMITKI_CONFIG.api_port == undefined) {
      return "//" + SEMITKI_CONFIG.api_url + "/" + resource + "/";
    } else {
      return "//" + SEMITKI_CONFIG.api_url + ":" + SEMITKI_CONFIG.api_port + "/" + resource + "/";
    }
  },


  logger: (level, text) => {
    // TODO use level to determine the classes
    let divmsg = $("#messages");
    divmsg.empty()
      .removeClass(() => {
      return S.log.info + " " + S.log.success + " " + S.log.error
    })
      .addClass(level);

    divmsg.html("<h3>"+text+"</h3>")
      .fadeIn(400, () => { $("#messages").fadeOut(4000); });
  },


  fetchCollections: () => {
    for (let [key, value] of S.collection) {
      value.fetch(S.addAuthorizationHeader());
    }
  },


  fbStatusChangeCallback: (response) => {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      S.fb_token = response.authResponse.accessToken;
      return true;
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      console.log('loged in fb but not in app');
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      console.log('loginto fb');
    }
  },


  fbGetLoginStatus: () => {
    FB.getLoginStatus((response) => {
      S.fbStatusChangeCallback(response);
    });
  },


  initPolyglot: (semitki) => {
    let phrases = $.get("i18n/"+semitki.lang+".json", {
      dataType: "json"
    });
    phrases.done((xhr) => {
      semitki.polyglot = new Polyglot({phrases: xhr});
    });
  },


  refreshToken: (secureFunction) => {
    let is_valid = new Promise((resolve, reject) => {
      $.ajax(S.api("api-token-refresh"),
      {
        data: {
          "token": S.jwtoken
        },
        method: "POST"
      }).done(resolve).fail(reject);
    });

    is_valid.then((result) => {
      S.jwtoken = result.token;
      secureFunction.call();
    }, (err) => {
      S.logger(err.responseText);
    });
  },


  sessionDestroy: () => {
    // TODO Broken, it needs to be fixed for whatever we do the login work
    let url = apiBuilder("rest-auth/logout")
  //    let csrftoken = Cookies.get("csrftoken");
    $.ajax(url,
     {
        method: "POST",
        dataType: "JSON"
      }).done((data) => {
        console.log(data);
     });

    S.jwtoken = undefined;
    S.user.clear();
    S.router.index();
  },

};

// Launch the JavaScript client side app
$(() => {
  S.initialize();
  //// Check for a valid JWToken and route the user accordingly
  //// TODO this is very weak, we need a solid authorization mechanism
  if(S.jwtoken == undefined) {
    S.router.index();
  } else {
    S.router.dashboard();
  }
});
