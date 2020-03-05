export default class AddCaption {
  canvas: HTMLElement;
  constructor(item: HTMLDivElement) {
    const btn = this._format();
    item.appendChild(btn);

    btn.addEventListener('click', (e) => {
      item.nextElementSibling.remove();
      item.remove();
    });
  }

  private _format() {
    const item = document.createElement('div');
    item.classList.add('remove');
    //
    const icon = document.createElement('i');
    icon.classList.add('material-icons')
    icon.innerText = 'highlight_off';
    item.appendChild(icon);

    return item;
  }
}
