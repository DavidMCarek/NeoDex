export enum ErrorType {
  HttpError,
  InternalError,
}

export interface ServiceResponse<TData> {
  hasError: boolean;
  errorType?: ErrorType;
  data?: TData;
}

export type PaginatedServiceResponse<TData> = ServiceResponse<TData> & {
  lastPage: number;
};
