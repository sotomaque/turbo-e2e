export interface LoginMutationResponse extends Response {
  data?: {
    access: string;
    refresh: string;
  };
}
