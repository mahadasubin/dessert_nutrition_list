import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/react-hooks";
import { ADD, DELETE } from "../graphql/mutations";
import { uuidv4 } from "../redux/store";

const selectedDessert = [];
const NutritionList = ({ list }) => {
  let [count, setCount] = useState(0);
  const addRef = useRef();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    id: '',
    dessert: "",
    nutritionInfo: {
      fat: '',
      carb: '',
      protein: '',
      calories: ''
    }
  });
  

  const setSelection = (e: Event) => {
    const id = e.target.id;
    if (selectedDessert.indexOf(id) >= 0) {
      setCount(--count);
      selectedDessert.splice(selectedDessert.indexOf(id), 1);
    } else {
      setCount(++count);
      selectedDessert.push(id);
    }
  };
const toAdd = (e:Event) =>{
  setInput({
    ...input,
    [e.target.name]: e.target.value
  });
}
  const reset = (e: Event) => {
    e.preventDefault();
    //graphql
    /*reset();*/
    dispatch({ type: "RESET", payload: {} });
    setCount(0);
    selectedDessert.splice();
  };

  const [add, { data }] = useMutation(ADD);
  const [deleteDessert, { id }] = useMutation(DELETE);
  return (
    <div className="pa4">
      <div className="pa3">
        NUTRITION LIST{" "}
        <button
          className="f6 link dim br2 ph3 pv2 mb2 dib white bg-green"
          href="#0"
          onClick={reset}
        >
          RESET
        </button>
      </div>
      <div className="pa3 bt b--pink-10">
        <span>{count} selected</span>
        <button
          className="f6 link dim br2 ph3 pv2 mb2 dib white bg-green"
          href="#0"
          onClick={(e: Event) => {
            e.preventDefault();
            addRef.current.style.opacity = 1;
          }}
        >
          +
        </button>
        <button
          className="f6 link dim br2 ph3 pv2 mb2 dib white bg-red "
          href="#0"
          onClick={(e: Event) => {
            e.preventDefault();
            //Add this mutation in prod once connected to graphql
            /*deleteDessert({
              variables: selectedDessert
            });*/
            dispatch({ type: "DELETE", payload: selectedDessert });
            setCount(0);
          }}
        >
          DELETE
        </button>
      </div>
      <div className="">
        <table className="f6 w-100 mw8 center" cellSpacing="0">
          <thead>
            <tr className="stripe-dark">
              <th className="fw6 tl pa3 bg-white" />
              <th className="fw6 tl pa3 bg-white">Dessert(100g serving)</th>
              <th className="fw6 tl pa3 bg-white">Colories</th>
              <th className="fw6 tl pa3 bg-white">Fat(g)</th>
              <th className="fw6 tl pa3 bg-white">Carbs(g)</th>
              <th className="fw6 tl pa3 bg-white">Protein(g)</th>
            </tr>
          </thead>
          <tbody className="lh-copy">
            {list.nutritionList.map(d => (
              <tr className="stripe-dark" key={d.id}>
                <td className="pa3">
                  <div className="flex items-center mb2">
                    <input
                      className="mr2"
                      type="checkbox"
                      id={d.id}
                      onClick={setSelection}
                    />
                  </div>
                </td>
                <td className="pa3">{d.dessert}</td>
                <td className="pa3">{d.nutritionInfo.calories}</td>
                <td className="pa3">{d.nutritionInfo.fat}</td>
                <td className="pa3">{d.nutritionInfo.carb}</td>
                <td className="pa3">{d.nutritionInfo.protein}</td>
              </tr>
            ))}
            <tr className="stripe-dark" ref={addRef}>
              <td className="pa3">
                <div className="flex items-center mb2">
                  <button
                    className="f6 link dim br2 ph3 pv2 mb2 dib white bg-green"
                    href="#0"
                    onClick={(e: Event) => {
                      e.preventDefault();
                      setInput({
                        ...input,
                        id: uuidv4.uuid()
                      });
                      dispatch({ type: "ADD", payload: input });
                      setInput({id: '',
                          dessert: "",
                          nutritionInfo: {
                            fat: '',
                            carb: '',
                            protein: '',
                            calories: ''
                          }
                      });
                      //mutation through ql
                      /*add({
              variables: { input }
            });*/
                    }}
                  >
                    ADD
                  </button>
                </div>
              </td>
              <td className="pa3">
                <input type="text" class="add-input" name="dessert" value= {input.dessert} onChange={toAdd} />
              </td>
              <td className="pa3">
                <input type="text" class="add-input" name="calories" value={input.nutritionInfo.calories} onChange={toAdd} />
              </td>
              <td className="pa3">
                <input type="text" class="add-input"  name="fat" value={input.nutritionInfo.fat} onChange={toAdd} />
              </td>
              <td className="pa3">
                <input type="text" class="add-input"  name="carb" value={input.nutritionInfo.carb} onChange={toAdd} />
              </td>
              <td className="pa3">
                <input type="text" class="add-input"  name="protien" value={input.nutritionInfo.protien} onChange={toAdd} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NutritionList;
