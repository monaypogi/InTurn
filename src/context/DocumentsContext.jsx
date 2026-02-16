import { createContext, useContext, useState, useEffect } from "react";
import { internAPI } from "../services/api";

const DocumentsContext = createContext();


// export custom hook
export const useDocuments = () => {
  const context = useContext(DocumentsContext);
  if (!context) {
    throw new Error("useDocuments must be used within a DocumentsProvider");
  }
  return context;
};
export const DocumentsProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await internAPI.getMyDocuments();
      // Accessing the 'tasks' key from your InternController response
      setDocuments(response.data.tasks || []);
    } catch (error) {
      console.error("Error fetching documents", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <DocumentsContext.Provider value={{ documents, fetchDocuments, loading }}>
      {children}
    </DocumentsContext.Provider>
  );
};