import Cookies = require("js-cookie");
import Dialog from './dialog';

export default class FirstAccess {
  constructor () {
    Cookies.set('FirstAccess', "1");
    const dialog = new Dialog();
    dialog.open('first-access');
  }
}
