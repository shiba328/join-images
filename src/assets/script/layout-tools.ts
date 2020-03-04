export default class LayoutTools {
  canvas: HTMLElement;
  justifyInputList: NodeListOf<HTMLInputElement>;
  alignInputList: NodeListOf<HTMLInputElement>;
  paddingInput: HTMLInputElement;
  columnInput: HTMLInputElement;
  fontsizeInput: HTMLInputElement;
  wrapInput: HTMLInputElement;

  constructor() {
    this.canvas = document.querySelector('[jsname="main-canvas"]');
    this.justifyInputList = document.querySelectorAll<HTMLInputElement>('[jsname="justify-select"]');
    this.alignInputList = document.querySelectorAll<HTMLInputElement>('[jsname="align-select"]');
    this.paddingInput = document.querySelector('[jsname="padding-select"]');
    this.fontsizeInput = document.querySelector('[jsname="fontsize-select"]');
    this.wrapInput = document.querySelector('[jsname="wrap-select"]');
    this.columnInput = document.querySelector('[jsname="column-select"]');

    this._resistEventListener();
  }

  private _resistEventListener() {
    Array.from(this.justifyInputList).forEach((input) => {
      input.addEventListener('click', (e) => {
        this.canvas.classList.forEach((str) => {
          if(str.indexOf('justify-') === 0) {
            this.canvas.classList.remove(str);
          }
        });
        this.canvas.classList.add('justify-' + input.value);
      });
    });

    Array.from(this.alignInputList).forEach((input) => {
      input.addEventListener('click', (e) => {
        this.canvas.classList.forEach((str) => {
          if(str.indexOf('align-') === 0) {
            this.canvas.classList.remove(str);
          }
        });
        this.canvas.classList.add('align-' + input.value);
      });
    });

    this.paddingInput.addEventListener('change', (e: Event & { target: HTMLInputElement }) => {
      this.canvas.classList.forEach((str) => {
        if(str.indexOf('padding-') === 0) {
          this.canvas.classList.remove(str);
        }
      });
      this.canvas.classList.add(`padding-${e.target.value}`)
    });

    this.wrapInput.addEventListener('click', (e: Event & { target: HTMLInputElement }) => {
      if(e.target.value === 'on') {
        e.target.value = 'off';
        this.canvas.classList.add('wrap');
      } else {
        e.target.value = 'on';
        this.canvas.classList.remove('wrap');
      }
      console.log(e.target.value)
      // this.canvas.classList.forEach((str) => {
      //   if(str.indexOf('wrap') === 0) {
      //     this.canvas.classList.remove('wrap');
      //   }
      // });
      // this.canvas.classList.add('wrap');
    });

    this.columnInput.addEventListener('change', (e: Event & { target: HTMLInputElement }) => {
      this.canvas.classList.forEach((str) => {
        if(str.indexOf('column-') === 0) {
          this.canvas.classList.remove(str);
        }
      });
      this.canvas.classList.add(`column-${e.target.value}`)
    });

    this.fontsizeInput.addEventListener('change', (e: Event & { target: HTMLInputElement }) => {
      this.canvas.classList.forEach((str) => {
        if(str.indexOf('fontsize-') === 0) {
          this.canvas.classList.remove(str);
        }
      });
      this.canvas.classList.add(`fontsize-${e.target.value}`)
    });

  }
}