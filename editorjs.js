import React, { useState,useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';

function App() {
  const editorInstance = useRef(null);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [savedData, setSavedData] = useState(null);

  const data={"title":"TITRE","paragraph":["para1","para2"]}

  useEffect(() => {
    console.log(savedData)
    if(!editorInstance.current){
      editorInstance.current = new EditorJS({
        holder: 'editorjs',
        readOnly:isReadOnly,
        data:savedData,
        tools: {
          header: Header,
          paragraph: Paragraph,
        },
      });
    console.log('trigger')
    }
    return () => {
      if (editorInstance.current && editorInstance.current.destroy) {
        editorInstance.current.destroy();
      }
    };
  }, [isReadOnly]);

  const handleSave = () => {
    if (editorInstance.current) {
      editorInstance.current.save().then((outputData) => 
      {
        console.log(outputData)
        console.log(outputData)
        convert_data_to_json(outputData)
      });
    }
  };

  const handleStartEdit = async () => { 
    if(!isReadOnly)
    {
    const savedContent = await editorInstance.current.save(); 
    setSavedData(savedContent);
  }
    setIsReadOnly((prev) => !prev);
    if (editorInstance.current && editorInstance.current.destroy) {
        editorInstance.current.destroy();
        editorInstance.current=null;
    }
  };

  const convert_data_to_json = (dataToSave) => {
    dataToSave.blocks.forEach((element) => {
    console.log(element?.data?.text);
    });
  }

  return (
    <div className="App">
      <div id="editorjs"></div>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleStartEdit}>        {isReadOnly ? 'Enable Editing' : 'Disable Editing'}
</button>
    </div>
  );
}

export default App;
