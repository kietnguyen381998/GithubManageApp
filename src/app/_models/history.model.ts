export interface ItemHistory {
  query: string,
  owner: string,
  repositoryName: string,
  language: string,
  minSize: number | null,
  maxSize: number | null,
  date: string,
  [key: string]: any;
}
