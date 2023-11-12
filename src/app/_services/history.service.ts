import {Injectable} from '@angular/core';
import {ItemHistory} from "../_models/history.model";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private searchHistory: ItemHistory[] = [];

  getHistory(): ItemHistory[] {
    return this.searchHistory;
  }

  addToHistory({query, repositoryName, owner, language, minSize, maxSize, date, page, perPage}: ItemHistory): void {
    this.searchHistory = this.searchHistory.filter(item => item.repositoryName !== repositoryName
      || item.owner !== owner || item.language !== language || item.minSize !== minSize || item.maxSize !== maxSize || item.date !== date);
    this.searchHistory.unshift({
      query,
      repositoryName,
      owner,
      language,
      minSize,
      maxSize,
      date,
      page,
      perPage
    });
    if (this.searchHistory.length > 5) {
      this.searchHistory = this.searchHistory.slice(0, 5);
    }
  }
}
