import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {
  }

  getRepository(owner: string, repositoryName: string, language: string, minSize: number, maxSize: number, minUpdatedDate: string, page: number,
                perPage: number) {
    let query = `q=`;
    if (owner) {
      query += `user:${owner}+`;
    }
    if (repositoryName) {
      query += `${repositoryName}+`;
    }
    if (language) {
      query += `language:${language}+`;
    }
    if (minUpdatedDate) {
      query += `pushed:>${minUpdatedDate}+`;
    }
    if (minSize || minSize.toString() === '0') {
      query += `size:${minSize}..${maxSize}+`;
    }
    query += `&page=${page}&per_page=${perPage}`;
    query += `&sort=updated&order=desc`;

    const url = `${this.apiUrl}/search/repositories?${query}`;
    return this.http.get(url);
    // return this.http.get(`https://api.github.com/search/repositories?q=${repositoryName}&sort=updated&order=desc`);
  }

  getLanguage() {
    return this.http.get(`${this.apiUrl}/languages`);
  }
}
