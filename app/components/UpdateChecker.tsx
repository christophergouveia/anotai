'use client';

import { useState } from 'react';
import { useUpdateChecker } from '@/app/hooks/useUpdateChecker';
import { Toast } from './Toast';

export function UpdateChecker() {
  const { newVersion, releaseUrl } = useUpdateChecker();
  const [dismissed, setDismissed] = useState(false);

  if (!newVersion || dismissed) return null;

  return (
    <Toast
      message={`Versão ${newVersion} disponível! 🎉`}
      action={{
        label: 'Ver detalhes',
        href: releaseUrl!,
      }}
      onClose={() => setDismissed(true)}
      duration={10000}
    />
  );
}
