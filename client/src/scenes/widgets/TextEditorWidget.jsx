import React,{useState,useRef,useEffect,useMemo} from 'react'
import {Box} from '@mui/material'
import JoditEditor from 'jodit-react'

function TextEditorWidget({content, setChange}) {
    const editor = useRef(null);


	const config = 
		{
			readonly: false, 
			placeholder:  ' helo Start typings...',
        
	showCharsCounter: false,
	showWordsCounter: false,
	showXPathInStatusbar: false,
	toolbarAdaptive: false,
	askBeforePasteFromWord: false,
	askBeforePasteHTML: false,
    buttons:["font","fontsize","bold","italic","brush","underline","ul","ol","paragraph","align"]
		}
		
	

	return (
		<Box margin='1rem'>		<JoditEditor
			ref={editor}
			value={content}
			config={config}
			tabIndex={1} // tabIndex of textarea
			onBlur={(newContent) => setChange(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={(newContent) => {}}
		/>
		
		</Box>

	);
}

export default TextEditorWidget

/*'font',
'fontsize',

'link',

'brush',
'paragraph',
'align',

'hr',
'copyformat',
'fullsize',

'undo',
'redo',

'dots'
*/