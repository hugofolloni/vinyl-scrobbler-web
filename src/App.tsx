import { useState, useEffect } from 'react';
import axios from 'axios';
import type { AppState, AlbumDetails, SearchResultItem } from './types';
import { Login } from './components/Login';
import { Header } from './components/Header';
import { Search } from './components/Search';
import { VinylPlayer } from './components/VinylPlayer';
import { Footer } from './components/Footer'
import './index.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5010';

export default function App() {
  const [sessionKey, setSessionKey] = useState<string | null>(() => {
    const skFromUrl = new URLSearchParams(window.location.search).get('sk');
    return skFromUrl || localStorage.getItem('lastfm_sk');
  });

  const [username, setUsername] = useState<string | null>(() => {
    const userFromUrl = new URLSearchParams(window.location.search).get('username');
    return userFromUrl || localStorage.getItem('lastfm_username');
  });

  const getInitialPlaybackState = () => {
    const savedAlbumStr = localStorage.getItem('lastfm_current_album');
    const savedStartStr = localStorage.getItem('lastfm_scrobble_start');

    if (!savedAlbumStr || !savedStartStr) return null;

    try {
      const album = JSON.parse(savedAlbumStr) as AlbumDetails;
      const startTime = parseInt(savedStartStr, 10);
      const now = Date.now();
      let elapsedMs = now - startTime;

      for (let i = 0; i < album.tracks.length; i++) {
        const trackMs = album.tracks[i].durationInSeconds * 1000;
        if (elapsedMs < trackMs) {
          return { album, index: i, state: 'SCROBBLING' as AppState };
        }
        elapsedMs -= trackMs;
      }

      return { album, index: album.tracks.length - 1, state: 'FINISHED' as AppState };
    } catch {
      return null;
    }
  };

  const [initialPlayback] = useState(() => getInitialPlaybackState());

  const [appState, setAppState] = useState<AppState>(() => {
    const hasCredentials = new URLSearchParams(window.location.search).get('sk') || localStorage.getItem('lastfm_sk');
    if (!hasCredentials) return 'UNAUTHENTICATED';
    if (initialPlayback) return initialPlayback.state;
    return 'SEARCHING';
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumDetails | null>(initialPlayback?.album || null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(initialPlayback?.index || 0);
  const [isPlaying, setIsPlaying] = useState(initialPlayback?.state === 'SCROBBLING');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sk = queryParams.get('sk');
    const user = queryParams.get('username');

    if (sk && user) {
      localStorage.setItem('lastfm_sk', sk);
      localStorage.setItem('lastfm_username', user);
      window.history.replaceState({}, document.title, '/');
    }
  }, []);

  const fetchSearchResults = async (query: string) => {
    setLoadingSearch(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/album/search?q=${encodeURIComponent(query)}`);
      setSearchResults(response.data);
      setShowDropdown(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSearch(false);
    }
  };

  useEffect(() => {
    if (searchTerm.trim().length < 3 || appState === 'SCROBBLING') return;

    const delayDebounce = setTimeout(() => {
      fetchSearchResults(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, appState]);

  useEffect(() => {
    if (!isPlaying || !selectedAlbum || appState !== 'SCROBBLING') return;

    const currentTrack = selectedAlbum.tracks[currentTrackIndex];
    const startTime = parseInt(localStorage.getItem('lastfm_scrobble_start') || Date.now().toString(), 10);

    let previousTracksMs = 0;
    for (let i = 0; i < currentTrackIndex; i++) {
      previousTracksMs += selectedAlbum.tracks[i].durationInSeconds * 1000;
    }

    const trackEndTime = startTime + previousTracksMs + (currentTrack.durationInSeconds * 1000);
    const now = Date.now();
    const waitTimeMs = Math.max(0, trackEndTime - now); 

    const isLastTrack = currentTrackIndex === selectedAlbum.tracks.length - 1;

    const timer = setTimeout(() => {
      if (isLastTrack) {
        setIsPlaying(false);
        setAppState('FINISHED');
        localStorage.removeItem('lastfm_current_album');
        localStorage.removeItem('lastfm_scrobble_start');
      } else {
        setCurrentTrackIndex((prev) => prev + 1);
      }
    }, waitTimeMs);

    return () => clearTimeout(timer);
  }, [isPlaying, currentTrackIndex, selectedAlbum, appState]);

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    if (val.trim().length < 3) {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const handleSelectAlbum = async (artist: string, albumName: string) => {
    setShowDropdown(false);
    setSearchTerm('');
    
    try {
      const response = await axios.get(`${API_BASE_URL}/api/album/info?artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(albumName)}`);
      setSelectedAlbum(response.data);
      setCurrentTrackIndex(0);
      setIsPlaying(false);
      setAppState('CONFIRMING');
    } catch (err) {
      alert(err);
    }
  };

  const handleStartScrobble = async () => {
    if (!selectedAlbum || !sessionKey) return;
    try {
      await axios.post(`${API_BASE_URL}/api/webscrobbler/scrobble`, {
        artist: selectedAlbum.artist, 
        album: selectedAlbum.album, 
        sessionKey
      });
      
      localStorage.setItem('lastfm_current_album', JSON.stringify(selectedAlbum));
      localStorage.setItem('lastfm_scrobble_start', Date.now().toString());

      setAppState('SCROBBLING');
      setIsPlaying(true);
      setCurrentTrackIndex(0);
    } catch (err) {
      alert(err);
    }
  };

  const handleLogin = () => {
    window.location.href = `${API_BASE_URL}/api/auth/web/login`;
  };

  const handleLogout = () => {
    localStorage.clear();
    setSessionKey(null);
    setUsername(null);
    setSearchTerm('');
    setSelectedAlbum(null);
    setIsPlaying(false);
    setAppState('UNAUTHENTICATED');
  };

  const handleReset = () => {
    localStorage.removeItem('lastfm_current_album');
    localStorage.removeItem('lastfm_scrobble_start');
    setSearchTerm('');
    setSelectedAlbum(null);
    setIsPlaying(false);
    setAppState('SEARCHING');
  };

  return (
    <div className="app-container">
      {appState === 'UNAUTHENTICATED' ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Header username={username} onLogout={handleLogout} />
          
          {appState !== 'SCROBBLING' && (
            <Search 
              searchTerm={searchTerm} 
              onSearchChange={handleSearchChange}
              loading={loadingSearch}
              showDropdown={showDropdown}
              results={searchResults}
              onSelectAlbum={handleSelectAlbum}
            />
          )}

          <VinylPlayer 
            album={selectedAlbum}
            appState={appState}
            isPlaying={isPlaying}
            currentTrackIndex={currentTrackIndex}
            username={username}
            onStartScrobble={handleStartScrobble}
            onReset={handleReset}
          />
        </>
      )}

      <Footer/>
    </div>
  );
}