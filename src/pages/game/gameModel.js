export default class GameModel {
  init(view) {
    this.view = view;
    this.isPFinBlock = null;
    this.pfList = [];
  }

  getPfList() {
    return this.pfList;
  }

  setPfinPfList(pf) {
    this.pfList.push(pf);
  }

  getIsPFinBlock() {
    return this.isPFinBlock;
  }

  setPFinBlock(pfDraggable) {
    this.isPFinBlock = pfDraggable;
    if (pfDraggable !== null) {
      this.view.makeDraggableCopyPF(pfDraggable);
      this.view.positionPFinBlock();
    }
  }
}
