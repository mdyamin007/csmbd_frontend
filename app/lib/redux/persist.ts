import { persistReducer } from "redux-persist";
import { rootReducer } from "./rootReducer";
import { rootPersistConfig } from "./persist.config";

export default persistReducer(rootPersistConfig, rootReducer);
