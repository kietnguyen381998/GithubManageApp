import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {
  }

  getRepository(query: string) {
    const url = `${this.apiUrl}/search/repositories?${query}`;
    return this.http.get(url);
  }

  getRepositoryURL(owner: string, repo: string) {
    const url = `${this.apiUrl}/repos/${owner}/${repo}`;
    return this.http.get(url);
  }

  getLanguage() {
    return this.http.get(`${this.apiUrl}/languages`);
  }
}
