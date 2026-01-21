import { createContext, useContext, useState, useEffect } from 'react'
import contentData from '../content/content.json'

const ContentContext = createContext()

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(contentData)
  const [isLoading, setIsLoading] = useState(false)

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
    content,
    isLoading,
    brand: content?.brand,
    navigation: content?.navigation,
    cta: content?.cta,
    home: content?.home,
    basics: content?.basics,
    classicTechniques: content?.classicTechniques,
    advancedTechniques: content?.advancedTechniques,
    shaders: content?.shaders,
    exams: content?.exams,
    studyAbroad: content?.studyAbroad,
    scholarships: content?.scholarships,
    reviews: content?.reviews,
  }

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = () => {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return context
}

export default ContentContext
