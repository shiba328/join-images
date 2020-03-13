declare var CONST: any;

export default class GetVersion {
  constructor () {
    this._getMessage()
      .then((data) => {
        console.log('s', data)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  private _getMessage() {
    const res = fetch(CONST.getVerJsonUrl);
    return res
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  }
}
