'use babel';

import packageConfig from './config-schema.json';
import devToolsServer from './conn';
import toolbar from './toolbar'
import { CompositeDisposable } from 'atom';

export default {
  config: packageConfig,
  subscriptions: null,
  server: null,
  selfAppName: null,
  autoreloadPaused: true,
  chrerToolbar: null,
  pauseAutoreloadButton: null,

  activate(state) {
    this.selfAppName = 'Chrer';

    this.server = new devToolsServer(
      this.selfAppName, atom.config.get('Chrer.ip'),
      atom.config.get('Chrer.port')
    );
    this.server.onClosedConnection = () => {
      this.autoreloadPaused = true;
      this.chrerToolbar.clearToolbar();
    };

    this.chrerToolbar = new toolbar();
    this.chrerToolbar.addControl({
      icon: 'sync',
      label: 'Manual reload',
      action: () => {
        this.reloadBrowser();
      }
    });
    this.pauseAutoreloadButton = this.chrerToolbar.addControl({
      icon: 'history',
      label: 'Pause autoreload',
      action: () => {
        this.toggleAutoreload(this.chrerToolbar.controls[1]);
      }
    });
    this.pauseAutoreloadButton.classList.add('text-success');
    this.chrerToolbar.addControl({
      icon: 'x',
      label: 'Disconnect',
      action: () => {
        this.disconnect();
      }
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(
      atom.workspace.observeTextEditors(editor => {
        const savedSubscription = editor.onDidSave(event => this.handleDidSave());
        this.subscriptions.add(savedSubscription);
        this.subscriptions.add(editor.onDidDestroy(() => savedSubscription.dispose()));
     }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'Chrer:Connect': () => this.connect()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'Chrer:Disconnect': () => this.disconnect()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'Chrer:Toggle autoreload': () => this.toggleAutoreload(this.pauseAutoreloadButton)
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'Chrer:Manual reload': () => this.reloadBrowser()
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

  reloadBrowser(){
    if(this.server.chromeWindow != null){
      var appNames = [
        atom.config.get('Chrer.appNames')
      ];
      this.server.reloadExtensions(
        appNames,
        atom.config.get('Chrer.tabRefresh'),
        atom.config.get('Chrer.refreshAll')
      );
    }
    else{
      atom.notifications.addWarning("Warning", {
        detail: 'No active connection.'
      });
    }
  },

  handleDidSave() {
    if (!this.autoreloadPaused) {
      this.reloadBrowser();
    }
  },

  toggleAutoreload(autoreloadButton){
    if(this.server.chromeWindow != null){
      if (this.autoreloadPaused) {
        autoreloadButton.classList.remove('icon-triangle-right');
        autoreloadButton.classList.remove('text-error');
        autoreloadButton.classList.add('icon-history');
        autoreloadButton.classList.add('text-success');
        autoreloadButton.innerHTML = 'Pause autoreload';
        this.autoreloadPaused = false;
        atom.notifications.addSuccess("Success", {
          detail: "Autoreload resumed."
        })
      } else {
        autoreloadButton.classList.remove('icon-history');
        autoreloadButton.classList.remove('text-success');
        autoreloadButton.classList.add('icon-triangle-right');
        autoreloadButton.classList.add('text-error');
        autoreloadButton.innerHTML = 'Resume autoreload';
        this.autoreloadPaused = true;
        atom.notifications.addSuccess("Success", {
          detail: "Autoreload in pause."
        })
      }
    }
    else{
      atom.notifications.addWarning("Warning", {
        detail: 'No active connection.'
      });
    }
  },

  connect(){
    this.server.connect().then(() => {
      this.chrerToolbar.renderToolbar();
      if (this.autoreloadPaused) {
        this.toggleAutoreload(this.pauseAutoreloadButton);
      }
      atom.notifications.addSuccess("Success", {
        detail: "Connection established."
      });
    }).catch(
      function(error) {
        atom.notifications.addError("Error", {
          detail: error
        });
      }
    );
  },

  disconnect(){
    if(this.server.chromeWindow != null){
      this.server.disconnect();
      this.chrerToolbar.clearToolbar();
    }
    else{
      atom.notifications.addWarning("Warning", {
        detail: 'No active connection.'
      });
    }
  }

};
