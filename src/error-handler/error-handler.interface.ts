export interface ErrorHandler {
  handleError: (error: Error) => Promise<void>;
}
