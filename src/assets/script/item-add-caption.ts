export default class AddCaption {
  canvas: HTMLElement;
  constructor(item: HTMLDivElement) {
    item.appendChild(this._format());
  }

  private _format() {
    const item = document.createElement('div');
    item.classList.add('caption');
    //
    const textarea = document.createElement('textarea');
    textarea.classList.add('caption-input');
    item.appendChild(textarea);
    //
    const dummy = document.createElement('div');
    dummy.classList.add('caption-dummy');
    item.appendChild(dummy);
    //
    textarea.addEventListener('keyup', (e: Event & { target: HTMLInputElement }) => {
      dummy.innerText = '';
      dummy.innerText = e.target.value;
    });

    return item;
  }
}
