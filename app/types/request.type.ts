export type RegisterReqType = {
  username: string;
  email: string;
  password: string;
};

export type LoginReqType = {
  email: string;
  password: string;
};

export type ContentReqType = {
  title: string;
  description: string;
  youtubeLink: string;
};
