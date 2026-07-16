export interface Track {
  name: string;
  durationInSeconds: number;
}

export interface AlbumDetails {
  album: string;
  artist: string;
  imageUrl: string;
  tracks: Track[];
}

export interface SearchResultItem {
  name: string;
  artist: string;
  imageUrl: string;
}

export type AppState = 'UNAUTHENTICATED' | 'SEARCHING' | 'CONFIRMING' | 'SCROBBLING' | 'FINISHED';