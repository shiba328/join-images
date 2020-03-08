import htmlToImage from 'html-to-image';
import Dialog from './dialog';
import SaveFile from './save-file';

export default class PreviewFile {
  constructor() {
    // this.visitor = ua('UA-XXXX-XX');
    this._resistEventListener();
  }

  private _resistEventListener() {
    let previewFlag = false;
    const previewBtn = document.querySelector('[jsname="preview-file"]');
    if(!previewFlag) {
      previewBtn.addEventListener('click', (e) => {
        previewFlag = true;
  
        const node = <HTMLElement>document.querySelector('[jsname="main-canvas"]');

        const parent = <HTMLElement>node.parentElement;
        parent.style.width = "99999px";
        console.log(node.offsetWidth)
  
        htmlToImage.toPng(node)
          .then((dataUrl) => {
            parent.removeAttribute('style');
            const dialog = new Dialog();
            const format = dialog._format('preview', this._format(dataUrl));
  
            format.classList.add('preview');
  
            document.body.appendChild(format);
            //閉じたら削除
            const closeBtns = format.querySelectorAll('[jsname="dialog_close_btn"]');
            closeBtns.forEach(element => {
              element.addEventListener('click', () => {
                format.remove();
                //
                document.body.classList.remove('dialog-overlay');
                previewFlag = false;
              });
            });
          })
          .catch(function (error) {
            console.error('oops, something went wrong!', error);
          });
      })

    }
  }

  private _format(dataUrl) {
    const scale = document.createElement('div');
    scale.classList.add('scale');
    
    var img = new Image();
    img.addEventListener("load", (e) => {
      img.width = img.naturalWidth;
      img.height = img.offsetHeight;
      scale.innerText = `倍率: 80%　サイズ: ${img.naturalWidth} x ${img.offsetHeight}`;
    }, false);
    img.src = dataUrl;

    const alert = document.createElement('div');
    alert.classList.add('dialog-alert');

    const attention = document.createElement('div');
    alert.appendChild(attention);
    attention.classList.add('attention');
    attention.innerText = "※画像が表示されない場合は「閉じる」を押して再度保存してください。 ※SP版では元の画像の合計が大きいと画像が生成されない場合があいります。"

    const announce = document.createElement('div');
    alert.appendChild(announce);
    announce.classList.add('announce');
    announce.innerText = "画像を長押しで「写真」に保存";
    
    alert.appendChild(scale);
    alert.appendChild(img);

    const saveBtn =  document.createElement('button');
    alert.appendChild(saveBtn);
    saveBtn.classList.add('save');
    saveBtn.innerText = "保存";
    saveBtn.addEventListener('click', (e) => {
      new SaveFile(img.src);
    })

    return alert;
  }
}
