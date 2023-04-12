import { db } from "../firebase/config";
import { useState, useReducer, useEffect } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";


const initialState = {
  loading : false,
  error: false
}

const  insertReducer = (state, action) =>{

  switch(action.type){
    case 'LOADING':
      return{loading : true, error: false}
    case 'INSERTED_DOC':
      return{loading : false, error: false}
    case 'ERROR':
      return{loading : false, error: action.payload}
    default:
      return state
  }

}

export const useInsertDocument = (docCollection) =>{
  
  const [response, dispatch] = useReducer(insertReducer, initialState)

  // prevent memory leak

  const [cancelled, setCancelled] = useState(false)
  const [finished, setFinished] = useState(false)

  const checkCancellation = (action) =>{
    if(!cancelled) {
      return 
    } else {
      dispatch(action)
    }
  }

  const insertDocument = async (document) =>{
    checkCancellation({
      type : 'LOADING'
    })
    try {
      const newDocument = {...document, createdAt: Timestamp.now()}

      const insertedDoc = await addDoc(
        collection(db, docCollection),
        newDocument
      )

      checkCancellation({
        type: 'INSERTED_DOC',
        payload: insertedDoc
      })
      
      console.log('inserted doc')
      setFinished(true)
 
    } catch (error) {
      checkCancellation({
        type: 'ERROR',
        payload : error.message
      })
    }
  }

  useEffect(()=>setCancelled(true),[])

  return {insertDocument, response, finished}
}