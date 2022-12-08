/*
 * @Author: djw
 * @Description: 富文本编辑器
 */
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { postUrl } from '../../config/config'
interface IProps {
  html:string,
  setHtml:Function
}
function MyEditor({ html, setHtml }:IProps) {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法

  // 编辑器内容
  //const [html, setHtml] = useState('<p>hello</p>')

  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    setTimeout(() => {
      setHtml('')
    }, 1500)
  }, [])

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}  // TS 语法

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {    // TS 语法
    placeholder: '请输入内容...',
    MENU_CONF: {}
  }
  // 
  editorConfig.MENU_CONF = {
    //配置上传图片
    uploadImage:{
      server: `${postUrl}/article/common/upload`,
      fieldName: 'file'
    }
  }
  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])
  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={editor => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: '500px', overflowY: 'hidden' }}
        />
      </div>
    </>
  )
}

export default MyEditor
