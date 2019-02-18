import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';

const STORAGE_KEY = 'ric_username';
@Injectable()
export class LocalStorageService {
  anotherTodolist = [];
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
  public storeOnLocalStorage(title: string): void {
    // insert updated string to local storage
    this.storage.set(STORAGE_KEY, title);
  }
  public getStorageData(): String {
    return this.storage.get(STORAGE_KEY) || '';
  }
  public clearStorage(): void {
    return this.storage.remove(STORAGE_KEY);
  }
}
