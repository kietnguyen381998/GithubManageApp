import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private searchHistory: any[] = [];

  getHistory(): string[] {
    return this.searchHistory;
  }

  addToHistory(query: string, owner: string, repositoryName: string, language: string, maxSize: any, date: any): void {
    this.searchHistory = this.searchHistory.filter(item => item !== query);
    this.searchHistory.unshift({
      query,
      owner,
      repositoryName,
      language,
      maxSize,
      date
    });
    if (this.searchHistory.length > 5) {
      this.searchHistory = this.searchHistory.slice(0, 5);
    }
  }
}
