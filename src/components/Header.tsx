interface HeaderProps {
  username: string | null;
  onLogout: () => void;
}

export function Header({ username, onLogout }: HeaderProps) {
  return (
    <header className="header-wrapper">
      <div className="brand-logo">vinylscrobbler</div>
      <div className="user-info">
        <span>Logado como: <strong>{username}</strong></span>
        <button className="btn-logout" onClick={onLogout}>Sair</button>
      </div>
    </header>
  );
}