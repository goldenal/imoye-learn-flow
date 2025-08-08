import { useState } from "react";

export interface SessionData {
  title: string;
  description: string;
  tags: string[];
  goal: string;
  role: string;
  focusAreas: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  content: string;
  url: string;
  file: File | null;
}

export function useCreateSessionLogic(initialData: SessionData) {
  const [sessionData, setSessionData] = useState<SessionData>(initialData);
  const [loading, setLoading] = useState<null | "creating" | "finalising">(null);
  const [error, setError] = useState<string | null>(null);

  // File selection handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSessionData((prev) => ({ ...prev, file }));
  };

  // Validate session title
  const isSessionTitleValid = () => {
    return sessionData.title.trim().length > 0;
  };

  // Validate file (optional: type/size)
  const isFileValid = () => {
    if (!sessionData.file) return false;
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "text/plain",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.ms-powerpoint"
    ];
    return allowed.includes(sessionData.file.type);
  };

  // API: Create Corpus
  const createCorpus = async (): Promise<any> => {
    setLoading("creating");
    setError(null);
    try {
      const resp = await fetch("https://imoyeaibackend.onrender.com/rag/create_corpus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ corpus_name: sessionData.title })
      });
      if (!resp.ok) throw new Error("Failed to create corpus");
      const data = await resp.json();
      setLoading(null);
      return data;
    } catch (err: any) {
      setLoading(null);
      setError(err.message);
      throw err;
    }
  };

  // API: Upload Document
  const uploadDocument = async (corpusName: string): Promise<any> => {
    setLoading("finalising");
    setError(null);
    try {
      if (!sessionData.file) throw new Error("No file selected");
      const formData = new FormData();
      formData.append("corpus_name", corpusName);
      formData.append("file", sessionData.file);
      const resp = await fetch("https://imoyeaibackend.onrender.com/rag/upload_document", {
        method: "POST",
        body: formData
      });
      if (!resp.ok) throw new Error("Failed to upload document");
      const data = await resp.json();
      setLoading(null);
      return data;
    } catch (err: any) {
      setLoading(null);
      setError(err.message);
      throw err;
    }
  };

  // Personalisation handler (generic)
  const handlePersonalisationChange = (field: keyof SessionData, value: any) => {
    setSessionData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    sessionData,
    setSessionData,
    loading,
    error,
    handleFileChange,
    isSessionTitleValid,
    isFileValid,
    createCorpus,
    uploadDocument,
    handlePersonalisationChange
  };
}
