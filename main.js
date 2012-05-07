var app = {};

app.init = function() {

  app.messages = {
    el: $("#messages"),  
    add: function(msg) {
      if(this.el) {
        this.el.html(msg + "<br/>" + this.el.html());
        console.log(msg);
      }
    }
  };

  app.messages.add("init");

  $("#trigger").click(function() {
    app.ws.send("random");
  });

  if (app.ws != null) {
    app.ws.close();
    app.ws = null;
  }
  
  if (window["WebSocket"]) {
  
    try {
    
      app.ws = new WebSocket("ws://localhost:4000/ws");
      //app.ws = new WebSocket("ws://echo.websocket.org");      
    
      app.ws.onopen = function () {
        app.messages.add("opened");
      };
      
      app.ws.onmessage = function (e) {
        app.messages.add(e.data);
      };

      app.ws.onclose = function (e) {
        app.messages.add("closed");
      };
        
    } catch(exception) {
      app.messages.add(exception);
    }      
    
  } else {
    app.messages.add("Browser does not support web sockets.")
  }  
};
