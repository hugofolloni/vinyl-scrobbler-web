import { t } from '../i18n';

export function Footer() {
  return (
    <footer className='footer'>
      <a 
        href="https://github.com/hugofolloni" 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ 
          color: '#444', 
          textDecoration: 'none', 
          fontSize: '0.8rem' 
        }}
      >
        {t('footer')}
      </a>
    </footer>
  );
}