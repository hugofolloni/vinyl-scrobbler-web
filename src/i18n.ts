const translations = {
  pt: {
    loggedInAs: "Logado como:",
    signOut: "Sair",
    heroTitle: "O ritual do vinil no seu Last.fm",
    heroSubtitle: "Encontre o seu disco na nossa base, desça a agulha e deixe o vinylscrobbler registrar automaticamente sua audição analógica no seu perfil digital.",
    connectButton: "Conectar com Last.fm",
    searchTitle: "Qual vinil você vai ouvir agora?",
    searchPlaceholder: "Busque pelo título do álbum...",
    searching: "Buscando no banco de dados...",
    tracklistTitle: "Tracklist",
    unknownTrack: "Faixa Desconhecida",
    playButton: "Tocar Disco",
    cancelButton: "Cancelar",
    successMsg: "Álbum registrado no Last.fm",
    viewProfile: "Ver no Perfil",
    scrobbleAnother: "Scrobblar outro disco",
    errDetails: "Não foi possível carregar os detalhes:",
    errScrobble: "Falha ao registrar scrobble:"
  },
  en: {
    loggedInAs: "Logged in as:",
    signOut: "Sign out",
    heroTitle: "The vinyl ritual on your Last.fm",
    heroSubtitle: "Find your record in our database, drop the needle, and let vinylscrobbler automatically log your analog listening to your digital profile.",
    connectButton: "Connect with Last.fm",
    searchTitle: "Which vinyl are you spinning next?",
    searchPlaceholder: "Search for the album title...",
    searching: "Searching database...",
    tracklistTitle: "Tracklist",
    unknownTrack: "Unknown Track",
    playButton: "Play Record",
    cancelButton: "Cancel",
    successMsg: "Album logged on Last.fm",
    viewProfile: "View on Profile",
    scrobbleAnother: "Scrobble another record",
    errDetails: "Could not load details:",
    errScrobble: "Failed to scrobble:"
  }
};

export type Language = 'pt' | 'en';

export const getLanguage = (): Language => {
  const lang = navigator.language.toLowerCase();
  return lang.startsWith('pt') ? 'pt' : 'en';
};

export const t = (key: keyof typeof translations.pt) => {
  const lang = getLanguage();
  return translations[lang][key];
};