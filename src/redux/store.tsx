import { createStore } from "redux";
import { uuid } from "uuidv4";
const initialState = {
  nutritionList: [
    {
      id: uuid(),
      dessert: "Oreo",
      nutritionInfo: {
        calories: 437,
        fat: 18,
        carb: 63,
        protein: 4
      }
    },
    {
      id: uuid(),
      dessert: "Nougat",
      nutritionInfo: {
        calories: 360,
        fat: 19,
        carb: 9,
        protein: 37
      }
    }
  ]
};

const reducer = (state = initialState, action: any) => {
  if (action.type === "INIT") {
    state = action.payload;
    return state;
  }
  if (action.type === "ADD") {
    //alert("action dispatched " + action.payload.nutritionInfo);
    return Object.assign( state, {
      nutritionList: state.nutritionList.concat(action.payload)
    });
  } else if (action.type === "DELETE") {
    return Object.assign({}, state, {
      nutritionList: state.nutritionList.filter(
        d => action.payload.indexOf(d.id) === -1
      )
    });
  } else {
    return initialState;
  }
  //return state;
};

const store = createStore(reducer);

export const uuidv4 = { uuid };
export default store;
