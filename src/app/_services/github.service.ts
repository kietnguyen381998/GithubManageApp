import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {
  }

  getRepository(owner: string, repositoryName: string, language: string, size: string, updatedDate: string, page: number,
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
    if (size) {
      query += `size:${size}+`;
    }
    if (updatedDate) {
      query += `pushed:>${updatedDate}+`;
    }
    query += `&page=${page}&per_page=${perPage}`;
    query += `&sort=updated&order=desc`;

    const url = `${this.apiUrl}/search/repositories?${query}`;
    return this.http.get(url);
    // return this.http.get(`https://api.github.com/search/repositories?q=${repositoryName}&sort=updated&order=desc`);
  }
}
