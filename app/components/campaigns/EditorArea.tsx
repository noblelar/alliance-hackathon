import { useRef } from 'react'

import { Editor } from '@tinymce/tinymce-react'

interface IEditorArea {
  initialData?: string
  onChange?: (val: string) => void
  isDisabled?: boolean
}

export default function EditorArea({
  initialData,
  onChange,
  isDisabled,
}: IEditorArea) {
  const editorRef = useRef<any>(null)

  return (
    <Editor
      onInit={(evt, editor) => (editorRef.current = editor)}
      apiKey={'5k6tlg4kwxmtwg4ioembmoyc7k3kia7uvtjvycnmi8ff3opm'}
      value={initialData}
      init={{
        height: 300,
        menubar: false,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'help',
          'wordcount',
        ],
        resize: false,
        content_css: [
          'https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,700;0,800;1,500;1,600&family=Raleway:wght@100;200;300;400;500;600;700;800&display=swap',
        ],
        toolbar:
          'undo redo | casechange blocks | bold italic | ' +
          ' aligncenter  alignjustify | ' +
          'bullist numlist outdent indent',
        content_style:
          "body { font-family:'Raleway',Helvetica,Arial,sans-serif; font-size:14px }",
      }}
      onEditorChange={(e) => {
        onChange && onChange(editorRef.current.getContent())
      }}
      disabled={isDisabled}
    />
  )
}
