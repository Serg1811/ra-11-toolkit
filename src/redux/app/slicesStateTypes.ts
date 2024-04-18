export interface AppSliceState {
  name: string;
  films: Film[];
}

export interface Film {
  imdbID: string;
  Title: string;
  Type: string;
  Year: string;
}
