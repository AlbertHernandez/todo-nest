export interface ErrorTrackerService {
  trackError: (error: Error) => void;
  configureScope: (callback: (scope: any) => void) => void;
}
