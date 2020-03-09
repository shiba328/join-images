export default class Dialog {
  constructor () {
    const dialogOpenBtns = document.querySelectorAll('[jsname="dialog_open_btn"]');
    dialogOpenBtns.forEach(element => {
      this._openBtn(element);
    });
    const dialogCloseBtns = document.querySelectorAll('[jsname="dialog_close_btn"]');
    dialogCloseBtns.forEach(element => {
      this._closeBtn(element);
    });
  }

  _format(ref, element) {
    //
    // const body = document.querySelector('body');
    // body.classList.add('dialog-overlay');
    // 外枠
    const item = document.createElement("div");
    item.classList.add('dialog');
    item.setAttribute("jsname", "dialog");
    item.setAttribute("data-dialog-ref", ref);
    // インナー
    const inner = document.createElement("div");
    inner.classList.add('dialog-inner');
    item.appendChild(inner);
    // ヘッダー
    const header = document.createElement("div");
    header.classList.add('dialog-header');
    inner.appendChild(header);
    // close
    const headerCloseBtn = document.createElement('i');
    headerCloseBtn.classList.add('material-icons')
    headerCloseBtn.classList.add('close-btn');
    headerCloseBtn.setAttribute("jsname", "dialog_close_btn");
    headerCloseBtn.innerText = 'close';
    header.appendChild(headerCloseBtn);
    // content
    const content = document.createElement("div");
    content.classList.add('dialog-body');
    inner.appendChild(content);
    if(element) {
      content.appendChild(element);
    }
    // actions
    const actions = document.createElement("div");
    actions.classList.add('dialog-actions');
    inner.appendChild(actions);
    // close
    const actionsCloseBtn = document.createElement("button");
    actionsCloseBtn.classList.add('style-btn');
    actionsCloseBtn.setAttribute("jsname", "dialog_close_btn");
    actionsCloseBtn.innerText = '閉じる';
    actions.appendChild(actionsCloseBtn);
    this._closeBtn(actionsCloseBtn);

    // 返答
    return item;
  }

  _open(ref) {
    const dialogTarget = document.querySelector(`[data-dialog-ref="${ref}"]`);
    document.body.classList.add('dialog-overlay');
    dialogTarget.classList.add('dialog');
  }

  _openBtn(element) {
    element.addEventListener('click', () => {
      this._open(element.dataset.dialog);
    });
  }

  _closeBtn(element) {
    element.addEventListener('click', () => {
      const dialogTarget = document.querySelector(`[data-dialog-ref="${element.dataset.dialog}"]`);
      if(dialogTarget) {
        dialogTarget.classList.add('is-hidden');
      } else {
        element.closest('[jsname="dialog"]').classList.add('is-hidden');
      }
      //
      const body = document.querySelector('body');
      body.classList.remove('dialog-overlay');
    });
  }
}
