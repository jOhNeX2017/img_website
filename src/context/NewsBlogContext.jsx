import { createContext, useContext, useState } from "react";
import newsBlogData from "../content/news_blog.json";

const NewsBlogContext = createContext();

export const NewsBlogProvider = ({ children }) => {
  const [newsBlogContent, setNewsBlogContent] = useState(newsBlogData);
  const [newsBlogIsLoading, setNewsBlogIsLoading] = useState(false);

  // This can be extended to fetch from an API in the future
  // useEffect(() => {
  //   setIsLoading(true)
  //   fetch('/api/content')
  //     .then(res => res.json())
  //     .then(data => {
  //       setContent(data)
  //       setIsLoading(false)
  //     })
  // }, [])

  const value = {
    newsBlogContent,
    newsBlogIsLoading,
  };

  return (
    <NewsBlogContext.Provider value={value}>
      {children}
    </NewsBlogContext.Provider>
  );
};

export const useNewsBlog = () => {
  const context = useContext(NewsBlogContext);
  if (!context) {
    throw new Error("useNewsBlog must be used within a NewsBlogProvider");
  }
  return context;
};

export default NewsBlogContext;
