export default class AddCaption {
  canvas: HTMLElement;
  constructor(item: HTMLDivElement) {
    this.canvas = document.querySelector('[jsname="main-canvas"]');
    const btn = this._format();
    item.appendChild(btn);

    btn.addEventListener('click', (e) => {
      item.nextElementSibling.remove();
      item.remove();
      this._countItem();
    });
  }

  private _format() {
    const item = document.createElement('div');
    item.classList.add('remove');
    //
    const icon = document.createElement('i');
    icon.classList.add('material-icons')
    icon.innerText = 'close';
    item.appendChild(icon);

    return item;
  }

  private _countItem() {
    const items = this.canvas.querySelectorAll('.item');
    if(items.length === 0) {
      const emptyMessage = document.querySelector('[jsname="empty-message"]');
      emptyMessage.classList.remove('is-hidden');
      const previewBtn = document.querySelector('[jsname="preview-file"]');
      previewBtn.setAttribute('disabled', 'disabled')
    }
  }
}
