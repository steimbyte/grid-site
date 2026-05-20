/**
 * Toast notification system - replaces alert() calls
 */

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
  duration?: number;
  dismissible?: boolean;
}

const TOAST_ICONS: Record<ToastType, string> = {
  success: 'check-circle',
  error: 'alert-circle',
  info: 'info',
  warning: 'alert-triangle'
};

class ToastManager {
  private container: HTMLElement;

  constructor() {
    this.container = this.createContainer();
  }

  private createContainer(): HTMLElement {
    const existing = document.getElementById('toast-container');
    if (existing) return existing;

    const container = document.createElement('div');
    container.id = 'toast-container';
    container.setAttribute('role', 'alert');
    container.setAttribute('aria-live', 'polite');
    document.body.appendChild(container);
    return container;
  }

  show(message: string, type: ToastType = 'info', options: ToastOptions = {}): void {
    const { duration = 4000, dismissible = true } = options;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    // Icon
    const icon = document.createElement('i');
    icon.setAttribute('data-lucide', TOAST_ICONS[type]);
    icon.className = 'toast-icon';
    toast.appendChild(icon);

    // Message
    const msg = document.createElement('span');
    msg.className = 'toast-message';
    msg.textContent = message;
    toast.appendChild(msg);

    // Close button
    if (dismissible) {
      const close = document.createElement('button');
      close.className = 'toast-close';
      close.setAttribute('aria-label', 'Close');
      close.textContent = '\u00D7';
      toast.appendChild(close);
    }

    this.container.appendChild(toast);

    // Initialize Lucide icon if available
    if ((window as any).lucide) {
      (window as any).lucide.createIcons({ nodes: [toast] });
    }

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto dismiss
    const timeoutId = setTimeout(() => this.dismiss(toast), duration);

    // Manual dismiss
    if (dismissible) {
      toast.querySelector('.toast-close')?.addEventListener('click', () => {
        clearTimeout(timeoutId);
        this.dismiss(toast);
      });
    }
  }

  private dismiss(toast: HTMLElement): void {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 300);
  }

  success(message: string, options?: ToastOptions): void {
    this.show(message, 'success', options);
  }

  error(message: string, options?: ToastOptions): void {
    this.show(message, 'error', { ...options, duration: options?.duration ?? 6000 });
  }

  info(message: string, options?: ToastOptions): void {
    this.show(message, 'info', options);
  }

  warning(message: string, options?: ToastOptions): void {
    this.show(message, 'warning', options);
  }
}

// Global singleton instance
export const toast = new ToastManager();
