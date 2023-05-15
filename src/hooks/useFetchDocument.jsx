import { db } from "../firebase/config";
import { useState, useEffect } from "react";
import {
  collection,
  doc, getDoc
} from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(false);

  // deal with memory leak

  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      setLoading(true);

      try {

        const docRef = await doc(db, docCollection, id)
        const docSnap = await getDoc(docRef)

        setDocument(docSnap.data())
        
      } catch (error) {
        setFetchError(error.message)
      }
      
      setLoading(false);
    }

    loadData();
  }, [docCollection, id]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { document, loading, fetchError };
};
