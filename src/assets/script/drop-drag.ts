import AddCaption from './item-add-caption';
import RemoveItem from './item-remove';
import SortItem from './item-sort';

export default class DropDrag {
  btn: HTMLElement;
  wrap: HTMLElement;
  canvas: HTMLElement;
  emptyMessage: HTMLElement;
  fileCount: number;

  constructor() {
    this.btn = document.querySelector('[jsname="add-file"]');
    this.wrap = document.querySelector('[jsname="wrap-canvas"]');
    this.canvas = document.querySelector('[jsname="main-canvas"]');
    this.emptyMessage = document.querySelector('[jsname="empty-message"]');
    this.fileCount = 0;

    this._resistEventListener();
  }

  private _resistEventListener() {
    this.wrap.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    this.wrap.addEventListener('dragenter', (e) => {
      this.wrap.classList.add('dragover');
    });

    this.wrap.addEventListener('dragleave', (e) => {
      this.wrap.classList.remove('dragover');
    });
    
    this.wrap.addEventListener('drop', (e: Event & { dataTransfer?: DataTransfer }) => {
      e.preventDefault();
      this.wrap.classList.remove('dragover');
      this._filesManage(e.dataTransfer.files);
      this.emptyMessage.classList.add('is-hidden');
    });

    this.btn.addEventListener('change', (e: Event & { target?: HTMLInputElement & EventTarget }) => {
      e.preventDefault();
      this._filesManage(e.target.files);
      this.emptyMessage.classList.add('is-hidden');
    });
  }

  private _filesManage(files: FileList) {
    this.fileCount += files.length;

    Array.from(files).forEach(file => {
      if (!file || file.type.indexOf('image/') < 0) {
        return;
      }

      const item = this._formatItem(file);
      this.canvas.appendChild(item);

      const divider = document.createElement('div');
      divider.classList.add('divider');
      this.canvas.appendChild(divider);

      new SortItem([ item, divider ]);
    });
  }

  private _formatItem(file) {
    const item = document.createElement('div');
    item.classList.add('item');
    
    const blobURL = URL.createObjectURL(file);
    const img = document.createElement('img');
    img.setAttribute('draggable', 'false');
    img.setAttribute('src', blobURL);
    item.appendChild(img);

    new AddCaption(item);
    new RemoveItem(item);

    return item;
  }
}
