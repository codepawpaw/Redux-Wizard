import { createStore } from "redux";
import Reducer from "../reducer/reducer";

class Store {
  static create() {
    return createStore(Reducer.all());
  }
}
export default Store;