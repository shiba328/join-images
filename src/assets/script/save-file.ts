import htmlToImage from 'html-to-image';
import Dialog from './dialog';

export default class SaveFile {
  constructor() {
    const saveBtn = document.querySelector('[jsname="save-file"]');

    saveBtn.addEventListener('click', (e) => {
      const node = <HTMLElement>document.querySelector('[jsname="main-canvas"]');
      // node.setAttribute("style", "width: 640px; height:480px;");

      htmlToImage.toPng(node)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'join-images.png';
        link.href = dataUrl;
        link.click();
        node.removeAttribute("style");
      });
    })

    const previewBtn = document.querySelector('[jsname="preview-file"]');

    previewBtn.addEventListener('click', (e) => {
      const node = <HTMLElement>document.querySelector('[jsname="main-canvas"]');

      node.style.background = "#fff";

      htmlToImage.toPng(node)
      .then(function (dataUrl) {
        node.style.background = "transparent";

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

        const scale = document.createElement('div');
        alert.appendChild(scale);
        scale.classList.add('scale');
        scale.innerText = "倍率: 80%";

        var img = new Image();
        alert.appendChild(img);
        
        img.width = node.offsetWidth;
        img.height = node.offsetHeight;

        img.addEventListener("load", (e) => {
        }, false);
        img.src = dataUrl;

        const dialog = new Dialog();
        const format = dialog._format('preview', alert);
        format.classList.add('preview');

        document.body.appendChild(format);
        //閉じたら削除
        const closeBtns = format.querySelectorAll('[jsname="dialog_close_btn"]');
        closeBtns.forEach(element => {
          element.addEventListener('click', () => {
            format.remove();
            //
            document.body.classList.remove('dialog-overlay');
          });
        });
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
    })
  }
}
