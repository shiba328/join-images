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
      node.setAttribute("style", "background: #fff;");

      htmlToImage.toJpeg(node)
      .then(function (dataUrl) {
        var img = new Image();
        img.addEventListener("load", function() {
          // drawImage を実行する文をここに置く
        }, false);
        img.src = dataUrl;

        const dialog = new Dialog();
        const format = dialog._format('preview', img);
        document.body.appendChild(format);
        //閉じたら削除
        const closeBtns = format.querySelectorAll('[jsname="dialog_close_btn"]');
        closeBtns.forEach(element => {
          element.addEventListener('click', () => {
            format.remove();
          });
        });
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
    })
  }
}
