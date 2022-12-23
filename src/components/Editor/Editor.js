import React, { Component, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyUploadAdapter from './MyuploadAdaptor';
import { useDispatch } from 'react-redux';
import { uploadPostImage } from '../../store/reducer/websiteSlice';
import { Form } from 'react-router-dom';


const Ckeditor =({setBody})=> {
    const dispatch=useDispatch()
    const allowDrop = (ev) => {
        ev.preventDefault();
      }
      const drop = (ev) => {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
      }
      const uploadPostContent=(loader)=>{
        return{
            upload:()=>{
                return new Promise((resolve,reject)=>{
                    try {
                        loader.file.then((file)=>{
                            let formData=new FormData()
                            console.log("file",file);
                            formData.append("image",file)
                            dispatch(uploadPostImage(formData)).then((res)=>{
                                console.log("res edit", res.payload.file.filename);
                                resolve({
                                    default:"http://localhost:2500/images/"+ res.payload.file.filename
                                  });
                            }).catch((err)=>{
                                reject(err)
                            })
                        })
                    } catch (error) {
                        reject(error)
                    }
                })
            }
        }
      }
const hello=(loader)=>{
    return{
      upload:()=>{
        return new Promise((resolve,reject)=>{
            try {
                loader.file.then((file)=>{
                    let document = "";
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                document = reader.result;
                resolve({default:reader.result})
            }
            reader.onerror = function (error) {
                console.log('Error: ', error);
            }
                })
            } catch (error) {
                reject(error)
            }
         
        })
    }
}
      }
    
    const textareaRef = useRef(); 
  
        return (
            <div className="ckeditor dropzone">
                <h2>Using CKEditor 5 build in React</h2>
                <CKEditor
                id="div2" onDrop={drop} onDragOver={allowDrop}
                ref={textareaRef}
                className="dropzone"
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        // console.log( 'Editor is ready to use!', editor );
                    } }

                
                      config={{
                        extraPlugins:[function(editor) {editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
                            // return new MyUploadAdapter(loader); 
                           return uploadPostContent(loader); 
                            }}],
                        toolbar: [
                          "selectAll",
                          "undo",
                          "redo",
                          "bold",
                          "italic",
                          "blockQuote",
                          "ckfinder",
                          "imageTextAlternative",
                          "imageUpload",
                          "heading",
                          "imageStyle:full",
                          "imageStyle:side",
                          "indent",
                          "outdent",
                          "link",
                          "numberedList",
                          "bulletedList",
                          "mediaEmbed",
                          "insertTable",
                          "tableColumn",
                          "tableRow",
                          "mergeTableCells",
                          "fontBackgroundColor",
                          "fontColor"
                        ],
                        // image: {
                        //   // Configure the available styles.
                        //   styles: ["alignLeft", "alignCenter", "alignRight"],
                        //   sizes: ["50%", "75%", "100%"],
              
                        //   // Configure the available image resize options.
                        //   resizeOptions: [
                        //     {
                        //       name: "imageResize:original",
                        //       label: "Original",
                        //       value: null
                        //     },
                        //     {
                        //       name: "imageResize:50",
                        //       label: "50%",
                        //       value: "50"
                        //     },
                        //     {
                        //       name: "imageResize:75",
                        //       label: "75%",
                        //       value: "75"
                        //     }
                        //   ],
              
                        //   // You need to configure the image toolbar, too, so it shows the new style
                        //   // buttons as well as the resize buttons.
                        //   toolbar: [
                        //     "imageStyle:alignLeft",
                        //     "imageStyle:alignCenter",
                        //     "imageStyle:alignRight",
                        //     "|",
                        //     "imageResize",
                        //     "|",
                        //     "imageTextAlternative"
                        //   ]
                        // }
                      }}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log("daa",data);
                       setBody(data)

                    } }
                    onBlur={ ( event, editor ) => {
                        // console.log( 'Blur.', editor );
                       
                    } }
                    onFocus={ ( event, editor ) => {
                        // console.log( 'Focus.', editor );
                    } }
                />
            </div>
        );
    
}

export default Ckeditor;

// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
// import { CKEditor } from '@ckeditor/ckeditor5-react';


// const Ckeditor =()=> {
//   let editor=null
  
//         return (
//             <>
//             <div className="App">
//                 <h2>CKEditor 5 using a custom build - decoupled editor</h2>
//                 <CKEditor
//                     onReady={ editor => {
//                         console.log( 'Editor is ready to use!', editor );

//                         // Insert the toolbar before the editable area.
//                         editor.ui.getEditableElement().parentElement.insertBefore(
//                             editor.ui.view.toolbar.element,
//                             editor.ui.getEditableElement()
//                         );

//                         this.editor = editor;
//                     } }
//                     onError={ ( error, { willEditorRestart } ) => {
//                         // If the editor is restarted, the toolbar element will be created once again.
//                         // The `onReady` callback will be called again and the new toolbar will be added.
//                         // This is why you need to remove the older toolbar.
//                         if ( willEditorRestart ) {
//                             this.editor.ui.view.toolbar.element.remove();
//                         }
//                     } }
//                     onChange={ ( event, editor ) => console.log( { event, editor } ) }
//                     editor={ DecoupledEditor }
//                     data="<p>Hello from CKEditor 5's decoupled editor!</p>"
//                     // config={ }
//                 />
//                 </div>
//                 </>
//         );
    
// }

// export default Ckeditor;

