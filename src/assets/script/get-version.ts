declare var CONST: any;

export default class GetVersion {
  constructor () {
    this._getMessage()
      .then((data) => {
        const item = <HTMLElement>document.querySelector('[jsname="version"]');
        const date = new Date(data.lastUpdate * 1000);
        item.innerText = date.toLocaleDateString();
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
