export interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

// Example interface for the OAuth data
export interface OAuthUrlData {
  OAuthUrl: string;
}

export interface GoogleTokenResponse {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  refresh_token_expires_in: number;
  expiry_date: number;
}
