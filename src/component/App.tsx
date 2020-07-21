import React from "react";
//import { useQuery } from "react-apollo";
import {  useDispatch,shallowEqual, useSelector } from "react-redux";
import client from "../graphql/apollo";
import { GET_NUTRITION_LIST } from "../graphql/queries";
import NutritionList from './nutritionList'

import "./styles.css";


const App = ()=> {
  const dispatch = useDispatch();
 const data = useSelector((state: any) => state, shallowEqual);
      const fetchData = async ()=>{
     // const list= useQuery(GET_NUTRITION_LIST);
        const list = await client.query({query:GET_NUTRITION_LIST});
        if (!list || list.loading) {
          return <div>Loading ...</div>;
        }
        dispatch({ type: "INIT", payload: list.data });
      }
    
        React.useEffect(_=> {fetchData()}, []);
    return <NutritionList list={data} />;
};


  
export default App;
