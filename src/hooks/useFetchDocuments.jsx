import { db } from "../firebase/config";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, seach = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(false);

  // deal with memory leak

  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      setLoading(true);

      const collectionRef = collection(db, docCollection);

      try {
        let q;
        // busca
        // dashboard

        q = await query(collectionRef, orderBy("createdAt", "desc"));

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() };
            })
          );
        });
      } catch (error) {
        setFetchError(error.message);
        console.log(error);
      }

      setLoading(false);
    }

    loadData();
  }, [docCollection, seach, uid, cancelled]);

  useEffect(()=>{
    return () => setCancelled(true)
  },[])


  return {documents, loading, fetchError}

};
