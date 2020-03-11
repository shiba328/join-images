import 'normalize.css';
import './style.css';

import Cookies = require("js-cookie");

import FirstAccess from './assets/script/first-access';
import DropDrag from './assets/script/drop-drag';
import LayoutTools from './assets/script/layout-tools';
import PreviewFile from './assets/script/preview-file';
import Dialog from './assets/script/dialog';

if(!Cookies.get('FirstAccess')) {
  new FirstAccess();
}

const help = <HTMLInputElement>document.querySelector('[jsname="open_help_btn"]');
help.addEventListener('click', (e: Event & { target: HTMLInputElement }) => {
  const dialog = new Dialog();
  dialog.open('first-access');
});


new DropDrag();
new LayoutTools();
new PreviewFile();
