'use babel';

import packageConfig from './config-schema.json';
import devToolsServer from './conn';
import { CompositeDisposable } from 'atom';

export default {
  config: packageConfig,
  subscriptions: null,
  server: null,
  selfAppName: null,

  activate(state) {
    this.selfAppName = 'Chrer';

    this.server = new devToolsServer(
      this.selfAppName, atom.config.get('Chrer.ip'),
      atom.config.get('Chrer.port')
    );

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(
      atom.workspace.observeTextEditors(editor => {
        const savedSubscription = editor.onDidSave(event => this.handleDidSave());
        this.subscriptions.add(savedSubscription);
        this.subscriptions.add(editor.onDidDestroy(() => savedSubscription.dispose()));
     }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'Chrer:connect': () => this.connect()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'Chrer:disconnect': () => this.disconnect()
    }));

    if(
      (process.platform == 'win32' || process.platform == "win64") &&
      atom.config.get('Chrer.baseCommand') == 'google-chrome'
    ){
      atom.config.set('Chrer.baseCommand', 'chrome');
    }
  },

  deactivate() {
    this.subscriptions.dispose();
    this.server.destroy();
  },

  handleDidSave() {
    var appNames = [
      atom.config.get('Chrer.appNames')
    ];
    if(this.server.chromeWindow != null){
      this.server.reloadExtensions(
        appNames,
        atom.config.get('Chrer.tabRefresh'),
        atom.config.get('Chrer.refreshAll')
      );
    }
  },

  connect(){
    this.server.connect().then(() => {
      atom.notifications.addSuccess("Success", {
        detail: "Connection established."
      })
      //console.log('Chreer: Connection ready.');
    }).catch(
      function(error) {
        atom.notifications.addError("Error", {
          detail: error
        })
        //console.log('Error: ' + error);
      }
    );
  },

  disconnect(){
    this.server.disconnect();
  }

};
