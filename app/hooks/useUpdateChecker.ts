import { useState, useEffect, useCallback } from 'react';

interface Release {
  tag_name: string;
  name: string;
  html_url: string;
}

export function useUpdateChecker() {
  const [newVersion, setNewVersion] = useState<string | null>(null);
  const [releaseUrl, setReleaseUrl] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const compareVersions = (current: string, latest: string): boolean => {
    const currentParts = current.split('.').map(Number);
    const latestParts = latest.split('.').map(Number);

    for (let i = 0; i < Math.max(currentParts.length, latestParts.length); i++) {
      const curr = currentParts[i] || 0;
      const lat = latestParts[i] || 0;

      if (lat > curr) return true;
      if (lat < curr) return false;
    }

    return false;
  };

  const checkForUpdates = useCallback(async () => {
    try {
      setIsChecking(true);

      const response = await fetch(
        'https://api.github.com/repos/christophergouveia/anotai/releases/latest'
      );

      if (!response.ok) throw new Error('Erro ao verificar atualizações');

      const release: Release = await response.json();

      // Remove o "v" do tag_name se existir
      const latestVersion = release.tag_name.replace(/^v/, '');
      const currentVersion = '0.1.1';

      if (compareVersions(currentVersion, latestVersion)) {
        setNewVersion(latestVersion);
        setReleaseUrl(release.html_url);
      }
    } catch (error) {
      console.error('Erro ao verificar atualizações:', error);
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    // Verifica ao montar
    checkForUpdates();

    // Verifica a cada 6 horas
    const interval = setInterval(checkForUpdates, 6 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [checkForUpdates]);

  return { newVersion, releaseUrl, isChecking };
}
