export default class LayoutTools {
  canvas: HTMLElement;
  justifyInputList: NodeListOf<HTMLInputElement>;
  alignInputList: NodeListOf<HTMLInputElement>;
  wrapVoid: HTMLInputElement;
  wrapInput: HTMLSelectElement;
  paddingInput: HTMLInputElement;
  fontsizeInput: HTMLInputElement;
  colorVoid: HTMLInputElement;
  colorInput: HTMLInputElement;
  backgroundVoid: HTMLInputElement;
  backgroundInput: HTMLInputElement;
  canvassizeVoid: HTMLInputElement;
  canvassizeInput: HTMLInputElement;


  constructor() {
    this.canvas = document.querySelector('[jsname="main-canvas"]');
    this.justifyInputList = document.querySelectorAll<HTMLInputElement>('[jsname="justify-select"]');
    this._justify();
    this.alignInputList = document.querySelectorAll<HTMLInputElement>('[jsname="align-select"]');
    this._align();
    this.wrapVoid = document.querySelector('[jsname="wrap-void"]');
    this.wrapInput = document.querySelector('[jsname="wrap-select"]');
    this._wrap();
    this.paddingInput = document.querySelector('[jsname="padding-select"]');
    this._padding();
    this.fontsizeInput = document.querySelector('[jsname="fontsize-select"]');
    this._fontsize();
    this.colorVoid = document.querySelector('[jsname="color-void"]');
    this.colorInput = document.querySelector('[jsname="color-select"]');
    this._color();
    this.backgroundVoid = document.querySelector('[jsname="background-void"]');
    this.backgroundInput = document.querySelector('[jsname="background-select"]');
    this._bg();
    this.canvassizeVoid = document.querySelector('[jsname="canvassize-void"]');
    this.canvassizeInput = document.querySelector('[jsname="canvassize-select"]');
    this._size();
  }

  private _justify() {
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
  }

  private _align() {
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

  }

  private _wrap() {
    this.wrapVoid.addEventListener('click', (e: Event & { target: HTMLInputElement }) => {
      if(e.target.value === 'on') {
        e.target.value = 'off';
        this.canvas.classList.add('wrap');
      } else {
        e.target.value = 'on';
        this.canvas.classList.remove('wrap');
      }
      console.log(e.target.value)
    });
    this.wrapInput.addEventListener('change', (e: Event & { target: HTMLInputElement }) => {
      this.canvas.classList.forEach((str) => {
        if(str.indexOf('column-') === 0) {
          this.canvas.classList.remove(str);
        }
      });
      this.canvas.classList.add(`column-${e.target.value}`)
    });
  }

  private _padding() {
    // 
    this.paddingInput.addEventListener('change', (e: Event & { target: HTMLInputElement }) => {
      this.canvas.classList.forEach((str) => {
        if(str.indexOf('padding-') === 0) {
          this.canvas.classList.remove(str);
        }
      });
      this.canvas.classList.add(`padding-${e.target.value}`)
    });
  }

  private _fontsize() {
    // fontsize
    this.fontsizeInput.addEventListener('change', (e: Event & { target: HTMLInputElement }) => {
      this.canvas.classList.forEach((str) => {
        if(str.indexOf('fontsize-') === 0) {
          this.canvas.classList.remove(str);
        }
      });
      this.canvas.classList.add(`fontsize-${e.target.value}`)
    });
  }

  private _color() {
    // 
    this.colorVoid.addEventListener('click', (e: Event & { target: HTMLInputElement }) => {
      if(e.target.value === 'on') {
        e.target.value = 'off';
        this.canvas.style.color =  this.colorInput.value;
      } else {
        e.target.value = 'on';
        this.canvas.style.color = "inherit"
      }
      console.log(e.target.value)
    });
    this.colorInput.addEventListener('change', (e: Event & { target: HTMLInputElement }) => {
      this.canvas.style.color = e.target.value
    });
  }

  private _bg() {
    // 
    this.backgroundVoid.addEventListener('click', (e: Event & { target: HTMLInputElement }) => {
      if(e.target.value === 'on') {
        e.target.value = 'off';
        this.canvas.style.backgroundColor = this.backgroundInput.value;
      } else {
        e.target.value = 'on';
        this.canvas.style.backgroundColor = "inherit"
      }
      console.log(e.target.value)
    });
    this.backgroundInput.addEventListener('change', (e: Event & { target: HTMLInputElement }) => {
      this.canvas.style.backgroundColor = e.target.value;
    });
  }

  private _size() {
    // 
    this.canvassizeVoid.addEventListener('click', (e: Event & { target: HTMLInputElement }) => {
      if(e.target.value === 'on') {
        e.target.value = 'off';
        this.canvas.style.width = `${this.canvassizeInput.value}px`;
      } else {
        e.target.value = 'on';
        this.canvas.style.width = "auto"
      }
      console.log(e.target.value)
    });
    this.canvassizeInput.addEventListener('change', (e: Event & { target: HTMLInputElement }) => {
      this.canvas.style.width = `${e.target.value}px`
    });
  }
}
