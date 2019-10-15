'use babel';

export default class toolbar{
  constructor(){
    this.container = null;
    this.controls = [];
  }

  addControl(controlOptions){
    // icon, label, action
    this.controls.push( document.createElement('div') );
    this.controls[this.controls.length - 1].className = 'inline-block chrer-toolbar-button' +
    (controlOptions.icon != undefined ? ' icon-' + controlOptions.icon : '');
    this.controls[this.controls.length - 1].innerHTML = controlOptions.label;
    if (controlOptions.action != null) {
      this.controls[this.controls.length - 1].onclick = controlOptions.action;
    }
    return this.controls[this.controls.length - 1];
  }

  renderToolbar(){
    if (this.controls.length > 0) {
      if (this.container == null) {
        var toolbar = document.createElement('status-bar');
        toolbar.className = 'status-bar';
        this.container = atom.workspace.addFooterPanel({
          item: toolbar,
          visible: true,
          priority: -100
        });
        for (var i = 0; i < this.controls.length; i++) {
          this.container.element.firstChild.appendChild(this.controls[i]);
        }
      }
      else{
        this.container.show();
      }
    }
  }

  clearToolbar(){
    if (this.container != null) {
      this.container.hide();
    }
  }
}
