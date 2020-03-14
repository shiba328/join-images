import htmlToImage from 'html-to-image';
import Dialog from './dialog';
import SaveFile from './save-file';

export default class PreviewFile {
  constructor() {
    // this.visitor = ua('UA-XXXX-XX');
    this._previewBtn();
    this._copyBtn();
    this._closeBtn();
  }

  private _closeBtn() {
    //閉じたら削除
    const closeBtns = document.querySelectorAll('[jsname="dialog_close_btn"]');
    closeBtns.forEach(element => {
      element.addEventListener('click', () => {
        const preview = <HTMLElement>document.querySelector('[jsname="preview-display"]');
        preview.querySelector('img').remove();
        preview.querySelector('.loading').classList.remove('is-hidden');
      });
    });
  }

  private _copyBtn() {
    const copyBtns = document.querySelector('[jsname="copy-sns-btn"]');
    copyBtns.addEventListener('click', () => {
      let t: HTMLInputElement = document.querySelector('[jsname="copy-sns-input"]') as HTMLInputElement;
      t.select();
      document.execCommand("copy");
    });
  }

  private _previewBtn() {
    const previewBtn = document.querySelector('[jsname="preview-file"]');
    previewBtn.addEventListener('click', (e) => {
      previewBtn.setAttribute('disabled', 'disabled');
      new Dialog().open('preview');
  
      const canvas = <HTMLElement>document.querySelector('[jsname="main-canvas"]');
      // this._exactSize(canvas, true);

      htmlToImage.toPng(canvas)
        .then((dataUrl) => {
          // this._exactSize(canvas, false);
          this._format(dataUrl);
          previewBtn.removeAttribute('disabled');
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', error);
        });
    })
  }

  private _format(dataUrl) {
    // img
    const img = new Image();
    img.addEventListener("load", (e) => {
      
      img.width = img.naturalWidth;
      img.height = img.naturalHeight;

      // scale
      const scale = <HTMLElement>document.querySelector('[jsname="preview-scale"]');
      scale.innerText = `サイズ: ${img.naturalWidth}px x ${img.naturalHeight}px`;

      preview.querySelector('.loading').classList.add('is-hidden');
      preview.appendChild(img);
    }, false);
    img.src = dataUrl;
    // 保存
    new SaveFile(img.src);
    //追加
    const preview = <HTMLElement>document.querySelector('[jsname="preview-display"]');
  }

  private _exactSize(canvas, flg) {
    const items = canvas.querySelectorAll('.item');
    items.forEach(element => {
      const e = <HTMLDivElement>element;
      if (flg) {
        e.style.width = 'auto';
      } else {
        e.removeAttribute('style');
      }
    })

    const parent = <HTMLElement>canvas.parentElement;
    if(flg) {
      parent.style.height = "99999px";
      parent.style.width = "99999px";
    } else {
      parent.removeAttribute('style');
    }
  }
}
