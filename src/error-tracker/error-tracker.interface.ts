export interface ErrorTracker {
  trackError: (error: Error) => void;
  configureScope: (callback: (scope: any) => void) => void;
}
