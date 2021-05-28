
import dynamic from 'next/dynamic';


const RichTextEditor = dynamic(() => import('./RichTextEditorNEw/RichTextEditor'), {ssr: false})

const CkeditroEditor = dynamic(() => import('./ckeditor/Editor'), {ssr: false})
const CreateForm = () => {
    return (
        <form className="ui form huge">
              <div className="field">
                    <label>Post Title</label>
                    <input type="text" name="first-name" placeholder="First Name" />
              </div>
              <div className="field">
                    <label>Post Body</label>
                    {/* <RichTextEditor /> */}
                    <CkeditroEditor />
              </div>
              <div className="action" style={{marginBottom: '70px'}}>
                  <button className="ui secondary button large" style={{float: 'right'}}>
                        Create
                  </button>
              </div>
        </form>
    )
}

export default CreateForm