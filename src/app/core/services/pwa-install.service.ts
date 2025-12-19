import { Injectable, signal } from '@angular/core';

/**
 * Service for handling PWA installation prompt.
 *
 * Shows install prompt when app is not installed (not in standalone mode).
 */
@Injectable({ providedIn: 'root' })
export class PwaInstallService {
  private deferredPrompt: BeforeInstallPromptEvent | null = null;

  /**
   * Signal indicating whether the app can be installed.
   * True when: not in standalone mode AND beforeinstallprompt was received.
   */
  readonly canInstall = signal(false);

  /**
   * Signal indicating if running as installed PWA.
   */
  readonly isInstalled = signal(this.checkIsInstalled());

  constructor() {
    if (!this.isInstalled()) {
      this.initInstallPrompt();
    }
  }

  /**
   * Checks if the app is running in standalone mode (installed).
   */
  private checkIsInstalled(): boolean {
    // Check for standalone display mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    // Check for iOS standalone mode
    const isIOSStandalone = (navigator as NavigatorWithStandalone).standalone === true;
    return isStandalone || isIOSStandalone;
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
      // Show install button since we're not installed
      this.canInstall.set(true);
    });

    // Listen for successful installation
    window.addEventListener('appinstalled', () => {
      this.canInstall.set(false);
      this.isInstalled.set(true);
      this.deferredPrompt = null;
    });

    // Listen for display mode changes
    window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => {
      if (e.matches) {
        this.isInstalled.set(true);
        this.canInstall.set(false);
      }
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

    if (outcome === 'accepted') {
      this.deferredPrompt = null;
      this.canInstall.set(false);
    }

    return outcome === 'accepted';
  }

  /**
   * Hides the install prompt temporarily (for current session only).
   */
  dismiss(): void {
    this.canInstall.set(false);
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

/**
 * Navigator with iOS standalone property.
 */
interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}
