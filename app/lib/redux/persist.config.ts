import storage from "./storage";

export const userPersistConfig = {
  key: "user",
  storage,
};

export const rootPersistConfig = {
  key: "root",
  storage: storage,
};
