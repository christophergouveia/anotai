'use client';

import { Alert, Snackbar } from '@mui/material';
import { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  action?: {
    label: string;
    href: string;
  };
  onClose?: () => void;
  duration?: number;
  severity?: 'success' | 'info' | 'warning' | 'error';
}

export function Toast({
  message,
  action,
  onClose,
  duration = 8000,
  severity = 'info',
}: ToastProps) {
  const [open, setOpen] = useState(true);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    setOpen(false);
    onClose?.();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{
          width: '100%',
          backgroundColor:
            severity === 'info'
              ? '#fff3a3'
              : severity === 'success'
                ? '#4caf50'
                : '#ff9800',
          color: severity === 'info' ? '#2b2a26' : '#fff',
          fontSize: '0.95rem',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          border: severity === 'info' ? '1.5px solid rgba(43, 42, 38, 0.2)' : 'none',
        }}
        action={
          action && (
            <a
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: severity === 'info' ? '#e8b14a' : '#fff',
                textDecoration: 'none',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.85rem',
                whiteSpace: 'nowrap',
                padding: '0.25rem 0.5rem',
              }}
            >
              {action.label}
            </a>
          )
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
