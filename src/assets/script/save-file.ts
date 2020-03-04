import htmlToImage from 'html-to-image';

export default class SaveFile {
  constructor() {
    const btn = document.querySelector('[jsname="save-file"]');

    btn.addEventListener('click', (e) => {
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
  }
}
