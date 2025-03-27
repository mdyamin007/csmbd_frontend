export type User = {
  id?: string;
  username: string;
  email: string;
  bio?: string;
  website?: string;
};

export type Content = {
  id?: string;
  title: string;
  description?: string;
  youtubeLink: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
