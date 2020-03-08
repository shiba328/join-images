import 'normalize.css';
import './style.css';

import Cookies = require("js-cookie");

import FirstAccess from './assets/script/first-access';
import DropDrag from './assets/script/drop-drag';
import LayoutTools from './assets/script/layout-tools';
import PreviewFile from './assets/script/preview-file';

// if(!Cookies.get('FirstAccess')) {
  new FirstAccess();
// }
new DropDrag();
new LayoutTools();
new PreviewFile();
