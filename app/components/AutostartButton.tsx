'use client';

import { useAutostart } from '@/app/hooks/useAutostart';
import { useEffect, useState } from 'react';

export function AutostartButton() {
  const { isEnabled, loading, toggle } = useAutostart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <label className="autostart-checkbox">
      <input
        type="checkbox"
        checked={isEnabled}
        onChange={toggle}
        disabled={loading}
        aria-label="Inicialização automática com o sistema"
      />
      <span className="autostart-label">Inicialização automática com o sistema</span>
    </label>
  );
}
