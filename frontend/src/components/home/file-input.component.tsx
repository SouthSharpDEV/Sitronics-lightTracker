import React from 'react'
import { MuiFileInput } from 'mui-file-input'

export const FileInput = () => {
  const [file, setFile] = React.useState(null)

  // @ts-ignore
  const handleChange = (newFile) => {
    setFile(newFile)
  }

  return (
    <MuiFileInput style={{ backgroundColor: '#760EDE', textEmphasisColor: 'white' }} value={file} onChange={handleChange} />
  )
}