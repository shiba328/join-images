export default class SaveFile {
  constructor(src) {
    const saveBtn =  <HTMLElement>document.querySelector('[jsname="save-btn"]');
    // this.visitor = ua('UA-XXXX-XX');
    saveBtn.addEventListener('click', (e) => {
      saveBtn.setAttribute('disabled', 'disabled');
      const link = document.createElement('a');
      link.download = `compile-image_${new Date().getTime()}.png`;
      link.href = src;
      link.click();
      saveBtn.removeAttribute('disabled');
    })
  }
}
