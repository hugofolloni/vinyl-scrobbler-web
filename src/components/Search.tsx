import type { SearchResultItem } from '../types';
import { t } from '../i18n';

interface SearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  loading: boolean;
  showDropdown: boolean;
  results: SearchResultItem[];
  onSelectAlbum: (artist: string, albumName: string) => void;
}

export function Search({ searchTerm, onSearchChange, loading, showDropdown, results, onSelectAlbum }: SearchProps) {
  return (
    <div className="search-wrapper">
      <h2>{t('searchTitle')}</h2>
      <input
        type="text"
        className="search-input"
        placeholder={t('searchPlaceholder')}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      
      {loading && <p className="search-loading">{t('searching')}</p>}

      {showDropdown && results.length > 0 && (
        <ul className="results-list">
          {results.map((album, idx) => (
            <li
              key={idx}
              className="result-item"
              onClick={() => onSelectAlbum(album.artist, album.name)}
            >
              <img src={album.imageUrl} alt="" className="result-image" />
              <span><strong>{album.name}</strong> — {album.artist}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}