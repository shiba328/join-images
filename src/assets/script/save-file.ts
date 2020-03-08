export default class SaveFile {
  constructor(dataUrl) {
    // this.visitor = ua('UA-XXXX-XX');
    const link = document.createElement('a');
    link.download = `compile-image_${new Date().getTime()}.png`;
    link.href = dataUrl;
    link.click();
  }
}
