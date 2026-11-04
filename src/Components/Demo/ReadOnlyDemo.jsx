import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function DemoBanner() {
  const { isDemo, user, logout } = useAuth();
  if (!isDemo) return null;
  return <aside className="container my-3 p-3 border rounded bg-light" aria-label="Demo de solo lectura">
    <strong>Superadmin demo · Solo lectura</strong>
    <p className="mb-2">{user.email} · Podés recorrer los dashboards y consultar datos ficticios. Guardar, subir archivos, eliminar y cancelar reservas están deshabilitados.</p>
    <div className="d-flex flex-wrap gap-3 align-items-center"><Link to="/profileSuperAdmin">Dashboard demo</Link><button className="btn btn-outline-secondary btn-sm" type="button" onClick={async () => { await logout(); window.location.assign('/login'); }}>Salir del demo</button></div>
  </aside>;
}

// Central compatibility boundary for the original group's legacy forms.
// Selectors and navigation stay usable so visitors can inspect existing records.
// The API independently rejects all writes; this boundary is only presentation.
export default function ReadOnlyDemo({ children }) {
  const root = useRef(null);
  useLayoutEffect(() => {
    const container = root.current;
    const lock = () => {
      container.querySelectorAll('input, textarea').forEach(input => {
        if (input.type === 'file' || input.type === 'checkbox' || input.type === 'radio') {
          if (!input.disabled) input.disabled = true;
        } else if (!input.readOnly) input.readOnly = true;
      });
      container.querySelectorAll('button').forEach(button => {
        // Link buttons open forms for inspection; they do not save anything.
        if (button.closest('a[href]')) return;
        const action = button.textContent.trim();
        if ((button.closest('form') && button.type === 'submit') || /^(delete|remove|block|unlock|cancel|update|save|submit|upload|create|modify|register|grant|confirm|x\b)/i.test(action)) {
          if (!button.disabled) button.disabled = true;
          button.title = 'Demo de solo lectura';
        }
      });
    };
    lock();
    const observer = new MutationObserver(lock);
    observer.observe(container, { childList: true, subtree: true, attributes: true, attributeFilter: ['disabled'] });
    return () => observer.disconnect();
  }, []);
  return <div ref={root} onSubmitCapture={event => { event.preventDefault(); event.stopPropagation(); }} onDropCapture={event => { event.preventDefault(); event.stopPropagation(); }}>{children}</div>;
}
