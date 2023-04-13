export type User = {
  name: string;
  avatar_url: string;
  public_repos: number;
  created_at: string;
};

export type Repository = {
  name: string;
  html_url: string;
  updated_at: string;
  description?: string;
  languages: {
    [key: string]: number
  }
};
