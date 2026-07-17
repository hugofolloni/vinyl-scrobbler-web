import { useEffect, useState } from 'react';
import type { AlbumDetails, AppState } from '../types';
import { t } from '../i18n';

interface VinylPlayerProps {
  album: AlbumDetails | null;
  appState: AppState;
  isPlaying: boolean;
  currentTrackIndex: number;
  username: string | null;
  onStartScrobble: () => void;
  onReset: () => void;
}

export function VinylPlayer({
  album, appState, isPlaying, currentTrackIndex, username, onStartScrobble, onReset
}: VinylPlayerProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying || !album || appState !== 'SCROBBLING') return;

    const updateProgress = () => {
      const startStr = localStorage.getItem('lastfm_scrobble_start');
      if (!startStr) return;

      const startTime = parseInt(startStr, 10);
      let previousTracksMs = 0;
      
      for (let i = 0; i < currentTrackIndex; i++) {
        previousTracksMs += album.tracks[i].durationInSeconds * 1000;
      }

      const trackStartTime = startTime + previousTracksMs;
      const now = Date.now();
      const elapsedMs = now - trackStartTime;
      const totalMs = album.tracks[currentTrackIndex].durationInSeconds * 1000;

      const percentage = Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));
      setProgress(percentage);
    };

    updateProgress();
    const interval = setInterval(updateProgress, 1000);
    
    return () => {
      clearInterval(interval);
      setProgress(0);
    };
  }, [isPlaying, currentTrackIndex, album, appState]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`player-layout ${album ? 'split' : 'centered'}`}>
      <div className="vinyl-container">
        <div className="turntable-chassis">
          
          <div className="turntable-platter">
            <div className="platter-pin"></div>
          </div>

          {album && (
            <div className="vinyl-wrapper placing">
              <div className={`vinyl-disk ${isPlaying ? 'spinning' : ''}`}>
                <div className="vinyl-label" style={{ backgroundImage: `url(${album.imageUrl})` }}>
                  <div className="vinyl-hole" />
                </div>
              </div>
            </div>
          )}

          <div className={`tonearm ${isPlaying ? 'playing' : ''}`}>
            <div className="tonearm-pivot"></div>
            <div className="tonearm-wand"></div>
            <div className="tonearm-head"></div>
          </div>

          <div className="pitch-control">
            <div className="pitch-knob"></div>
          </div>
        </div>

        {album && (
          <div className="album-info-container">
            <p className="album-title-wrapper">
              <strong>{album.album}</strong><br />
              <span className="album-artist-name">{album.artist}</span>
            </p>

            {appState === 'CONFIRMING' && (
              <div className="action-buttons-container">
                <button onClick={onStartScrobble} className="btn-primary">{t('playButton')}</button>
                <button onClick={onReset} className="btn-secondary">{t('cancelButton')}</button>
              </div>
            )}

            {appState === 'FINISHED' && (
              <div className="action-buttons-container">
                <p className="success-message">{t('successMsg')}</p>
                <button onClick={() => window.open(`https://www.last.fm/user/${username}`, '_blank')} className="btn-secondary border-accent text-white">
                  {t('viewProfile')}
                </button>
                <button onClick={onReset} className="btn-secondary">
                  {t('scrobbleAnother')}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {album && (
        <div className="tracklist-container">
          <h3 className="tracklist-title">Tracklist</h3>
          <ul className="tracklist">
            {album.tracks.map((track, idx) => {
              const trackName = track.name || t('unknownTrack');
              const duration = track.durationInSeconds || 0;
              let isCurrent = false;
              let trackStatusClass = 'track-upcoming';

              if (appState === 'CONFIRMING') {
                trackStatusClass = 'track-confirming';
              } else if (appState === 'FINISHED' || idx < currentTrackIndex) {
                trackStatusClass = 'track-played';
              } else if (idx === currentTrackIndex && isPlaying) {
                trackStatusClass = 'track-current';
                isCurrent = true;
              }

              return (
                <li key={idx} className={`track-row ${trackStatusClass} ${isCurrent ? 'active' : ''}`}>
                  {isCurrent && (
                    <div className="track-progress" style={{ width: `${progress}%` }} />
                  )}
                  <div className="track-info">
                    {isCurrent && (
                      <div className="playing-gif">
                        <span></span><span></span><span></span>
                      </div>
                    )}
                    <span className="track-name">{trackName}</span>
                  </div>
                  <span>{formatTime(duration)}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}