// TODO: double check this, i dont think we get back a data object
export interface LoginMutationResponse extends Response {
  data?: {
    access: string;
    refresh: string;
  };
}

export interface MeQueryResponse extends Response {
  data?: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
}
