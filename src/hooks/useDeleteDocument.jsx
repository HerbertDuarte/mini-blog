import { db } from "../firebase/config";
import { useState, useReducer, useEffect } from "react";
import { doc, deleteDoc} from "firebase/firestore";


const initialState = {
  loading : false,
  error: false
}

const  deleteReducer = (state, action) =>{

  switch(action.type){
    case 'LOADING':
      return{loading : true, error: false}
    case 'DELETED_DOC':
      return{loading : false, error: false}
    case 'ERROR':
      return{loading : false, error: action.payload}
    default:
      return state
  }

}

export const useDeleteDocument = (docCollection) =>{
  
  const [response, dispatch] = useReducer(deleteReducer, initialState)

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

  const deleteDocument = async (id) =>{
    checkCancellation({
      type : 'LOADING'
    })
    try {
      const deletedDocument = await deleteDoc(doc(db, docCollection, id))

      checkCancellation({
        type: 'DELETED_DOC',
        payload: deletedDocument
      })
      
      console.log('deleted doc')
      setFinished(true)
 
    } catch (error) {
      checkCancellation({
        type: 'ERROR',
        payload : error.message
      })
    }
  }

  useEffect(()=>setCancelled(true),[])

  return {deleteDocument, response, finished}
}