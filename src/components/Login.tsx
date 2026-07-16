import { useState, useEffect } from 'react';
import { t } from '../i18n';

interface LoginProps {
  onLogin: () => void;
}

const MOCK_ALBUMS = [
  {
    artist: 'Pink Floyd',
    album: 'The Dark Side of the Moon',
    imageUrl: 'https://en.wikipedia.org/wiki/Special:FilePath/Dark_Side_of_the_Moon.png'
  },
  {
    artist: 'Fleetwood Mac',
    album: 'Rumours',
    imageUrl: 'https://en.wikipedia.org/wiki/Special:FilePath/FMacRumours.PNG'
  },
  {
    artist: 'Michael Jackson',
    album: 'Thriller',
    imageUrl: 'https://en.wikipedia.org/wiki/Special:FilePath/Michael_Jackson_-_Thriller.png'
  },
  {
    artist: 'Sade',
    album: 'Love Deluxe',
    imageUrl: 'https://en.wikipedia.org/wiki/Special:FilePath/Sade_-_Love_Deluxe.png'
  },
  {
    artist: 'The Beatles',
    album: 'Abbey Road',
    imageUrl: 'https://en.wikipedia.org/wiki/Special:FilePath/The_Beatles_Abbey_Road_album_cover.jpg'
  },
  {
    artist: 'David Bowie',
    album: 'The Rise and Fall of Ziggy Stardust...',
    imageUrl: 'https://en.wikipedia.org/wiki/Special:FilePath/ZiggyStardust.jpg'
  },
  {
    artist: 'Prince and The Revolution',
    album: 'Purple Rain',
    imageUrl: 'https://en.wikipedia.org/wiki/Special:FilePath/Princepurplerain.jpg'
  },
  {
    artist: 'Nirvana',
    album: 'Nevermind',
    imageUrl: 'https://en.wikipedia.org/wiki/Special:FilePath/NirvanaNevermindalbumcover.jpg'
  },
  {
    artist: 'Marvin Gaye',
    album: "What's Going On",
    imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/c/c4/CapaMarvin_Gaye.jpg'
  },
  {
    artist: 'Daft Punk',
    album: 'Random Access Memories',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/7/76/Random_Access_Memories_capa.jpg'
  },
  {
    artist: 'Amy Winehouse',
    album: 'Back to Black',
    imageUrl: 'https://en.wikipedia.org/wiki/Special:FilePath/Amy_Winehouse_-_Back_to_Black_(album).png'
  },
  {
    artist: 'Led Zeppelin',
    album: 'Led Zeppelin IV',
    imageUrl: 'https://en.wikipedia.org/wiki/Special:FilePath/Zeppelin_IV.jpg'
  },
  {
    artist: 'Arctic Monkeys',
    album: 'AM',
    imageUrl: 'https://en.wikipedia.org/wiki/Special:FilePath/Arctic_Monkeys_-_AM.png'
  },
  {
    artist: 'Tame Impala',
    album: 'Currents',
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b2739e1cfc756886ac782e363d79'
  },
  {
    artist: 'Kendrick Lamar',
    album: 'To Pimp a Butterfly',
    imageUrl: 'https://en.wikipedia.org/wiki/Special:FilePath/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png'
  },
  {
    artist: 'The Strokes',
    album: 'The New Abnormal',
    imageUrl: 'https://en.wikipedia.org/wiki/Special:FilePath/The_Strokes_-_The_New_Abnormal.png'
  },
  {
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    imageUrl: 'https://en.wikipedia.org/wiki/Special:FilePath/Dua_Lipa_-_Future_Nostalgia_(Official_Album_Cover).png'
  },
  {
    artist: "Guns N' Roses",
    album: 'Appetite for Destruction',
    imageUrl: 'https://en.wikipedia.org/wiki/Special:FilePath/GunsnRosesAppetiteforDestructionalbumcover.jpg'
  },
  {
    artist: 'Bring Me the Horizon',
    album: 'Sempiternal',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW-QGRRlVOnE5m25N962urvE3AP56eyAvvlfkWxbPkhwZzcdA0A4GHMffx&s=10'
  }
];

export function Login({ onLogin }: LoginProps) {
  const [demoAlbum] = useState(() => {
    const randomIdx = Math.floor(Math.random() * MOCK_ALBUMS.length);
    return MOCK_ALBUMS[randomIdx];
  });
  
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaying(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hero-section">
      <div className="hero-text">
        <h1 className="hero-title">{t('heroTitle')}</h1>
        <p className="hero-subtitle">
          {t('heroSubtitle')}
        </p>
      </div>

      <div className="hero-visual">
        <div className="turntable-chassis">
          <div className="vinyl-wrapper placing">
            <div className={`vinyl-disk ${isPlaying ? 'spinning' : ''}`}>
              <div className="vinyl-label" style={{ backgroundImage: `url(${demoAlbum.imageUrl})` }}>
                <div className="vinyl-hole" />
              </div>
            </div>
          </div>

          <div className={`tonearm ${isPlaying ? 'playing' : ''}`}>
            <div className="tonearm-pivot"></div>
            <div className="tonearm-wand"></div>
            <div className="tonearm-head"></div>
          </div>

          <div className="pitch-control">
            <div className="pitch-knob"></div>
          </div>
        </div>

        <button onClick={onLogin} className="btn-primary login-btn">
          {t('connectButton')}
        </button>
      </div>
    </div>
  );
}