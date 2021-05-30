
import dynamic from 'next/dynamic';
import { useState } from 'react'
import CategoryDropDown from './CategoryDropdown'
import ImageInput from './ImageInput'
import style from '../../styles/blog/postCreate.module.scss';
// const RichTextEditor = dynamic(() => import('./RichTextEditorNEw/RichTextEditor'), {ssr: false})

const CkeditroEditor = dynamic(() => import('./ckeditor/Editor'), {ssr: false})
const CreateForm = ({ setTextEditorLoading, selectFileSrc, setCropperModalActive }) => {
    const [formState, setFormState] = useState({ 'title': "",category: "Select Category"  ,body: "", image: "" })
    const [formError, setFormError] = useState({title: "", image: "", status: ""})
    const onTitleChange = (e) => {
          setFormState(state => {
                return {...state, 'title': e.target.value}
          })
    }
    const onBodyChange = (data) => {
          setFormState(state => {
                return {...state, body: data}
          })
    }
    const onCategoryChange = (e) => {
            setFormState(state => {
                  return {...state, category: e.target.textContent}
            })
    }

    const onFormSubmit = (e) => {
          e.preventDefault()
          console.log(formState)
    }
    const handleFileChange = (e) => {
      const file = e.target.files[0]
      if (file.type === "image/jpeg" || file.type === "image/png") {
            const imageBlob = file
            let reader = new FileReader();
            reader.readAsDataURL(imageBlob)
            reader.onloadend = function(){
                selectFileSrc(reader.result)
                setCropperModalActive(true)
            }
      }
      else{
            setFormError(state => {
                  return {...state, status: "error", image: "Unsupported Image Format please Select JPG or PNG"}
            })
      }   
  }
    return (
        <form className="ui form huge" onSubmit={onFormSubmit}>
              {formError.status && <div class={`ui message mini ${formError.status === "error" ? "red" : "green"}`}>{formError.title || formError.image}</div>}
              <div className="field">
                  <div className="ui labeled input">
                  <div className="ui label">
                        Title
                  </div>
                        <input type="text" name="first-name" placeholder="Title" value={formState.title} onChange={onTitleChange}/>
                  </div>
              </div>
              <div style={style.category_and_image}>
                  <div className="field">
                        <CategoryDropDown value={formState.category} onCategoryChange={onCategoryChange}/>
                  </div>
                  <div className="field">
                        <ImageInput handleFileChange={handleFileChange}/>
                  </div>
              </div>
              <div className="field">
                    {/* <label>Body</label> */}
                    {/* <RichTextEditor /> */}
                    <CkeditroEditor setTextEditorLoading={setTextEditorLoading} value={formState.body} onBodyChange={onBodyChange}/>
              </div>
              <div className="action" style={{textAlign: 'right'}}>
                  <button className="ui secondary button large">
                        Create
                  </button>
              </div>
        </form>
    )
}

export default CreateForm