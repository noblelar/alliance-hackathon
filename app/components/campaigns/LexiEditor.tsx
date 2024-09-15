// import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin' // Import ListPlugin
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'

import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html'
import { ListItemNode, ListNode } from '@lexical/list'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getRoot, $insertNodes, EditorState, LexicalEditor } from 'lexical'
import { useEffect } from 'react'
import ToolbarPlugin from './plugins/ToolbarPlugin'

const placeholder = 'Enter some rich text...'

const editorConfig = {
  namespace: 'React.js Demo',
  nodes: [ListNode, ListItemNode],
  // Handling of errors during update
  onError(error: Error) {
    throw error
  },
  // The editor theme
}

function onChangeHandler(
  editorState: EditorState,
  editor: LexicalEditor,
  onChange?: (val: string) => void
) {
  editor.getEditorState().read(() => {
    const html = $generateHtmlFromNodes(editor)
    if (onChange) {
      onChange(html)
    }
  })
}

interface IEditorArea {
  initialData?: string
  onChange?: (val: string) => void
  isDisabled?: boolean
}

export default function MyLexicalEditor({ initialData, onChange, isDisabled }: IEditorArea) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <OurEditor initialData={initialData} onChange={onChange} isDisabled={isDisabled} />
    </LexicalComposer>
  )
}

function OurEditor({ initialData, onChange, isDisabled }: IEditorArea) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (initialData) {
      const currentContent = editor.getEditorState().read(() => $generateHtmlFromNodes(editor))

      if (currentContent !== initialData) {
        editor.update(() => {
          const parser = new DOMParser()
          const dom = parser.parseFromString(initialData, 'text/html')
          const nodes = $generateNodesFromDOM(editor, dom)

          const root = $getRoot()
          root.clear()
          root.select()
          $insertNodes(nodes)
        })
      }
    }
  }, [editor, initialData])

  useEffect(() => {
    editor.setEditable(!isDisabled)
  }, [editor, isDisabled])
  return (
    <div className="editor-container flex flex-col overflow-hidden !rounded-[10px] border">
      <ToolbarPlugin />
      <div className="editor-inner flex-1 overflow-y-scroll border-t px-3">
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="editor-input"
              aria-placeholder={placeholder}
              placeholder={<div className="editor-placeholder px-2">{placeholder}</div>}
              disabled={isDisabled}
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        {/* <AutoFocusPlugin /> */}
        <ListPlugin />
        <OnChangePlugin
          onChange={(editorState, editor) => {
            onChangeHandler(editorState, editor, onChange)
          }}
        />
      </div>
    </div>
  )
}
