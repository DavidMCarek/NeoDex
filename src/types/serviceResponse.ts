export enum ErrorType {
  HttpError,
  InternalError,
}

export interface ServiceResponse<TData> {
  hasError: boolean;
  errorType?: ErrorType;
  data?: TData;
}
