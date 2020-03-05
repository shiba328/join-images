export default class SortItem {
  constructor(Elements: Array<HTMLDivElement>) {

    const item = Elements[0];
    const divider = Elements[1];

    const prevBtn = this._format('navigate_before');
    item.appendChild(prevBtn);

    prevBtn.addEventListener('click', (e) => {
      const prevDivider = item.previousElementSibling;
      if(prevDivider) {
        const prevItem  = prevDivider.previousElementSibling;
        prevItem.insertAdjacentElement('beforebegin', item);
        item.insertAdjacentElement('afterend', divider);
      }
    });

    const nextBtn = this._format('navigate_next');
    item.appendChild(nextBtn);

    nextBtn.addEventListener('click', (e) => {
      const nextItem = divider.nextElementSibling;
      if(nextItem) {
        const nextDivider  = nextItem.nextElementSibling;
        nextDivider.insertAdjacentElement('afterend', item);
        item.insertAdjacentElement('afterend', divider);
      }
    });
  }

  private _format(type: string) {
    const item = document.createElement('div');
    item.classList.add(type);
    //
    const icon = document.createElement('i');
    icon.classList.add('material-icons')
    icon.innerText = type;
    item.appendChild(icon);

    return item;
  }
}
