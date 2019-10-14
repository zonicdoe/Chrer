'use babel';

class commandStructure{
  commandStructure(){
    this.method = '';
    this.params = null;
  }
}

export default class devToolsServer{
  constructor(clientApp, ip, port){
    this.onClosedConnection = null;
    this.command = new commandStructure();
    this.connection = null; // WebSockets
    this.clientApp = clientApp;
    this.ip = ip;
    this.port = port;
    this.chromeWindow = null;
  }

  destroy(){
    this.disconnect();
  }

  getWebSocketURL(clientApp, ip, port) {
    return new Promise(
      (resolve, reject) => {
        var response;
        var conn = new XMLHttpRequest();
        conn.open('GET', 'http://' + ip + ':' + port + '/json');
        conn.send();

        conn.onreadystatechange = function(){
          if(this.readyState == 4){
            if(this.status == 200){
              response = JSON.parse(conn.responseText);

              if(response.length > 0){
                var app = null;
                response.forEach(
                  function(item) {
                    if(item.title.indexOf(clientApp) > -1 && item.type.indexOf('background_page') > -1){
                      app = item;
                    }
                  }
                );

                if (app != null) {
                  resolve(app);
                } else {
                  reject('App not found.');
                }
              }
              else{
                reject('No apps fetched.');
              }
            }
            else{
              // An error ocurred while fetching server data.
              reject('Server responded with status code ' + this.status + '.');
            }
          }
        };
      }
    );
  }

  setupConnection (url) {
    return new Promise(
      function(resolve, reject) {
        var socket = new WebSocket(url);
        socket.onopen = function() {
          resolve(socket);
        };
        socket.onmessage= function(s) {
          console.log('Received message:');
          console.log(s);
          console.log(JSON.parse(s.data));
        };
      }
    );
  }

  connect(){
    return new Promise(
      (resolve, reject) => {
        this.chromeWindow = require("child_process").spawn(
          atom.config.get('Chrer.baseCommand'),
          [
            '--remote-debugging-port=' + atom.config.get('Chrer.port'),
            '--user-data-dir=Chrer',
            '--no-first-run',
            '--no-default-browser-check',
            '--load-extension=' + atom.packages.loadedPackages.Chrer.path + '/ext',
            atom.config.get('Chrer.homeURL')
          ]
        );

        this.chromeWindow.on("close", () => {
          this.disconnect();
        });

        setTimeout(() => {
          // Gets websocket URL and info for Chreer's extension background page:
          this.getWebSocketURL(this.clientApp, this.ip, this.port).then(
            (data) => {
              /*Establishes connection with the remote developerTools server
                 via the websocket */
              this.setupConnection(data.webSocketDebuggerUrl).then(
                (connection) => {
                  // connection is a reference to a WebSocket object
                  this.connection = connection;
                  resolve();
                }
              ).catch(
                function(error) {
                  reject(error);
                }
              );
            }
          ).catch(
            function(error) {
              reject(error);
            }
          );
        }, atom.config.get('Chrer.delay') * 1000);
      }
    );
  }

  disconnect(){
    if (this.chromeWindow != null) {
      if(this.connection.readyState == 1){
        var raw = {
          id: 1,
          method: 'Browser.close',
          params: {
          }
        };
        var request = JSON.stringify(raw);
        this.direct(request);
        this.connection.close();
      }
      this.chromeWindow = null;
      if (this.onClosedConnection != null) {
        this.onClosedConnection();
      }
      //console.log('Chrer: Connection closed.');
      atom.notifications.addSuccess("Success", {
        detail: "Connection closed."
      });
    }
  }

  direct(request){
    this.connection.send(request);
  }

  send(payload){
    var raw = {
      id: 1,
      method: 'Runtime.evaluate',
      params: {
        expression: payload,
        objectGroup: "console",
        awaitPromise: false,
        generatePreview: true,
        includeCommandLineAPI: true,
        returnByValue: true,
        silent: false,
        userGesture: true
      }
    };

    var request = JSON.stringify(raw);
    this.direct(request);
  }

  reloadExtensions(extensionNames, tabRefresh, refreshAll){
    this.command.method = 'REFRESH';
    this.command.params = {
      appNames: extensionNames,
      tabRefresh: tabRefresh,
      refreshAll: refreshAll
    };
    var payload = 'execute(\'' + JSON.stringify(this.command) + '\');';

    this.send( payload );
  }
}
