import { db } from "../firebase/config";
import { useState, useReducer, useEffect } from "react";
import { updateDoc, doc } from "firebase/firestore";

const initialState = {
  loading: false,
  error: false
};

const updateReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { loading: true, error: false };
    case 'UPDATED_DOC':
      return { loading: false, error: false };
    case 'ERROR':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useUpdateDocument = (docCollection) => {
  const [response, dispatch] = useReducer(updateReducer, initialState);
  const [cancelled, setCancelled] = useState(false);
  const [finished, setFinished] = useState(false);

  const checkCancellation = (action) => {
    if (!cancelled) {
      return;
    } else {
      dispatch(action);
    }
  };

  const updateDocument = async (id, data) => {
    checkCancellation({ type: 'LOADING' });

    try {
      const docRef = doc(db, docCollection, id);
      const updatedDocument = await updateDoc(docRef, data);

      checkCancellation({
        type: 'UPDATED_DOC',
        payload: updatedDocument
      });

      console.log('updated doc');
      setFinished(true);
    } catch (error) {
      checkCancellation({
        type: 'ERROR',
        payload: error
      });
    }
  };

  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  }, []);

  return { updateDocument, response, finished };
};
