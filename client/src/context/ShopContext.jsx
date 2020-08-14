import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";

import { STATUS, setState, setCurrentUser } from "./actions";
import { shopReducer } from "./reducers";
import firebase from "../firebase/firebase";

// Create the shop context
const ShopContext = createContext();

// Create the initial state
const initialState = {
  status: STATUS.LOADING,
  items: null,
  companies: null,
  categories: null,
  category: "All",
  itemIds: [],
  cart: [],
  currentUser: null,
};

// Custom hook for providing the ShopContext
export const useShopContext = () => useContext(ShopContext);

// This context provider will wrap the app
export const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);
  const [category, setCategory] = useState(null);
  console.log("categories", category);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from Firebase database through Node
        const items = await (await fetch(`/products`)).json();
        const companies = await (await fetch(`/companies`)).json();
        const categoriesObj = await (await fetch(`/categories`)).json();
        const categories = Object.keys(categoriesObj);
        const itemIds = Object.keys(items);

        // Assign a state listenner for firebase user
        firebase.auth().onAuthStateChanged((firebaseUser) => {
          if (firebaseUser) {
            console.log(firebaseUser);
            dispatch(setCurrentUser(firebaseUser));
          } else {
            console.log("Not logged in.");
          }
        });

        if (category) {
          itemIds = itemIds.filter((itemId) => {
            return items[itemId].category === category;
          });
        }
        // Create a new state
        const newState = {
          status: STATUS.IDLE,
          items,
          companies,
          categories,
          itemIds,
        };

        // Pass the new state to the dispatch
        dispatch(setState(newState));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [category]);

  console.count("ShopContext");
  console.log(state);

  return (
    <ShopContext.Provider value={{ state, dispatch, category, setCategory }}>
      {children}
    </ShopContext.Provider>
  );
};
