import { Injectable, signal } from '@angular/core';

/**
 * Service for handling PWA installation prompt.
 *
 * Captures the `beforeinstallprompt` event and provides methods
 * to check installability and trigger the install prompt.
 */
@Injectable({ providedIn: 'root' })
export class PwaInstallService {
  private readonly DISMISSED_KEY = 'pwaInstallDismissed';
  private deferredPrompt: BeforeInstallPromptEvent | null = null;

  /**
   * Signal indicating whether the app can be installed.
   */
  readonly canInstall = signal(false);

  /**
   * Signal indicating whether the user has dismissed the prompt.
   */
  readonly isDismissed = signal(this.wasDismissed());

  constructor() {
    this.initInstallPrompt();
  }

  /**
   * Initializes the install prompt listener.
   */
  private initInstallPrompt(): void {
    window.addEventListener('beforeinstallprompt', (event: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      event.preventDefault();
      // Store the event for later use
      this.deferredPrompt = event as BeforeInstallPromptEvent;
      // Update the signal to show install button
      if (!this.wasDismissed()) {
        this.canInstall.set(true);
      }
    });

    // Listen for successful installation
    window.addEventListener('appinstalled', () => {
      this.canInstall.set(false);
      this.deferredPrompt = null;
    });
  }

  /**
   * Triggers the install prompt.
   */
  async install(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false;
    }

    // Show the install prompt
    this.deferredPrompt.prompt();

    // Wait for the user's response
    const { outcome } = await this.deferredPrompt.userChoice;

    // Clear the deferred prompt
    this.deferredPrompt = null;
    this.canInstall.set(false);

    return outcome === 'accepted';
  }

  /**
   * Dismisses the install prompt (user clicked "later").
   */
  dismiss(): void {
    localStorage.setItem(this.DISMISSED_KEY, 'true');
    this.isDismissed.set(true);
    this.canInstall.set(false);
  }

  /**
   * Checks if the prompt was previously dismissed.
   */
  private wasDismissed(): boolean {
    return localStorage.getItem(this.DISMISSED_KEY) === 'true';
  }
}

/**
 * Type definition for the BeforeInstallPromptEvent.
 */
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
  prompt(): Promise<void>;
}
