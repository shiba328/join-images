import Cookies = require("js-cookie");
import Dialog from './dialog';

export default class FirstAccess {
  constructor () {
    Cookies.set('FirstAccess', 'true');
    const dialog = new Dialog();
    dialog._open('first-access');
  }
}
