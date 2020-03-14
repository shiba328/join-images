export default class SaveFile {
  constructor(src) {
    const saveBtn =  <HTMLElement>document.querySelector('[jsname="save-btn"]');
    // this.visitor = ua('UA-XXXX-XX');
    const f = (e) => {
      saveBtn.setAttribute('disabled', 'disabled');
      const link = document.createElement('a');
      link.download = `compile-image_${new Date().getTime()}.png`;
      link.href = src;
      link.click();
      saveBtn.removeAttribute('disabled');
    }
    saveBtn.addEventListener('click', f);
    //閉じたら削除
    const closeBtns = document.querySelectorAll('[jsname="dialog_close_btn"]');
    closeBtns.forEach(element => {
      element.addEventListener('click', () => {
        saveBtn.removeEventListener('click', f);
      });
    });
  }
}
