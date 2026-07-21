import { useState, useEffect } from 'react';
import { enable, disable, isEnabled } from '@tauri-apps/plugin-autostart';

export function useAutostart() {
  const [isEnabledState, setIsEnabledState] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAutostart();
  }, []);

  const checkAutostart = async () => {
    try {
      setLoading(true);
      const enabled = await isEnabled();
      setIsEnabledState(enabled);
    } catch (error) {
      console.error('Erro ao verificar autostart:', error);
    } finally {
      setLoading(false);
    }
  };

  const enableAutostart = async () => {
    try {
      setLoading(true);
      await enable();
      setIsEnabledState(true);
    } catch (error) {
      console.error('Erro ao ativar autostart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const disableAutostart = async () => {
    try {
      setLoading(true);
      await disable();
      setIsEnabledState(false);
    } catch (error) {
      console.error('Erro ao desativar autostart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const toggle = async () => {
    if (isEnabledState) {
      await disableAutostart();
    } else {
      await enableAutostart();
    }
  };

  return { isEnabled: isEnabledState, loading, enable: enableAutostart, disable: disableAutostart, toggle };
}
