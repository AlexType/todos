import { makeAutoObservable } from 'mobx';
import type { TaskFilterType } from '@/models/task/TaskFilterType';

class FilterStore {
  private _filter: TaskFilterType = 'all';

  get filter() {
    return this._filter;
  }

  constructor() {
    makeAutoObservable(this);
  }

  setFilter = (type: TaskFilterType) => {
    this._filter = type;
  };
}

const filterStore = new FilterStore();

export default filterStore;
