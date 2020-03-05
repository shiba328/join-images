import AddCaption from './item-add-caption';
import RemoveItem from './item-remove';

export default class DropDrag {
  btn: HTMLElement;
  canvas: HTMLElement;
  emptyMessage: HTMLElement;
  fileCount: number;

  constructor() {
    this.btn = document.querySelector('[jsname="add-file"]');
    this.canvas = document.querySelector('[jsname="main-canvas"]');
    this.emptyMessage = document.querySelector('[jsname="empty-message"]');
    this.fileCount = 0;

    this._resistEventListener();
  }

  private _resistEventListener() {
    this.canvas.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    this.canvas.addEventListener('dragenter', (e) => {
      this.canvas.classList.add('dragover');
    });

    this.canvas.addEventListener('dragleave', (e) => {
      this.canvas.classList.remove('dragover');
    });
    
    this.canvas.addEventListener('drop', (e: Event & { dataTransfer?: DataTransfer }) => {
      e.preventDefault();
      this.canvas.classList.remove('dragover');
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
      this.canvas.appendChild(this._formatItem(file));

      const divider = document.createElement('div');
      divider.classList.add('divider');
      
      this.canvas.appendChild(divider);
    });
  }

  private _formatItem(file) {
    const item = document.createElement('div');
    item.classList.add('item');
    
    const blobURL = URL.createObjectURL(file);
    const img = document.createElement('img');
    img.setAttribute('src', blobURL);
    item.appendChild(img);

    new AddCaption(item);
    new RemoveItem(item);

    return item;
  }
}
