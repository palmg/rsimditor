import React from 'react'
import $ from 'jquery'
import simditor from 'r-simditor'

/**
 * an editor for react.
 * 1)controlled or uncontrolled component.
 *   If onChange parameter (a function)is setting, RSimditor will be working as an controlled component.
 * you can return a value to reset data which show in the editor.if not be setting, an uncontrolled way be using.
 * You can use ref future to get instance and get the editor's value by getValue() function.
 *
 * @param {object} props {
 *    Options{
 *       {string} Placeholder: Use the placeholder attribute value of the textarea by default.
         {array} toolbar: Show toolbar buttons. Accpect an array of buttons that includes:
             ['title','bold','italic','underline','strikethrough','fontScale','color','ol','ul','blockquote','code',
              'table','link','image','hr','indent','outdent','alignment']
         {boolean} toolbarFloat: Fixed the toolbar on the top of the browser when scrolling.
         {number} toolbarFloatOffset: Top offset of the toolbar when fixed
         {boolean} toolbarHidden: Hide the toolbar. Can not work together with toolbarFloat.
         {string} defaultImage: Default image placeholder. Used when inserting pictures in Simditor.
         {boolean} tabIndent : Use 'tab' key to make an indent.

         {object} upload { //user to up file
             {string} url: up file server
             {object} params: Hash, if use default formData, specify extra params which will be sent to server with file data.
                 Can not work together with genformData
             {number} connectionCount: 3 by default, specify max number of upload connection that can exist simultaneously.
             {string} leaveConfirm: messages will be shown if one leave the page while file is being uploaded.
             {function} genformData: a function to create xhr form data (formData class).Must return an formData instance.
         }
         {boolean} pasteImage: Support uploading by pasting images from the clipboard.
              Work together with upload and only supported by Firefox and Chrome.
         {boolean} cleanPaste: Remove all styles in paste content automatically.
         {array} imageButton : Insert images by uploading from the local computer or external links.
                If both are enabled, Simditor will show a drop-down menu when click the image button.
                default: ['upload', 'external']
         {array} allowedTags: Tags that are allowed in Simditor.
                Default whitelist:['br', 'span', 'a', 'img', 'b', 'strong', 'i', 'strike', 'u', 'font', 'p', 'ul',
                        'ol', 'li', 'blockquote', 'pre', 'code', 'h1', 'h2', 'h3', 'h4', 'hr']
         {array} allowedAttributes: Whitelist of tag attributes. style attribute whitelist is defined in allowedStyles
         {array} allowedStyles: Inline style whitelist.
         {array} codeLanguages: A list of programming languages supported by code block.
 *    }
 *    {string} initValue: the init value of editor
 *    {boolean} focus: true|false. undefined means nothings
 *    {function} onChange: (value)=>{return false}
 *      is an function to handle value when modify.
 *      return false means nothing, return value will take place editor text when return a string type.
 * }
 */
class RSimditor extends React.Component {
    constructor(...props) {
        super(...props)
        this.editor = false //editor
        this.onChange = e => false //onChange Function

        //bind
        this.changeHandle = this.changeHandle.bind(this)
    }

    //interface
    /**
     * get value from editor
     */
    getValue() {
        return this.editor ? this.editor.getValue() : ''
    }

    /**
     * set editor value
     * @param {string} value editor value
     */
    setValue(value) {
        this.editor && this.editor.setValue(value)
        return this
    }

    focus() {
        this.editor && this.editor.focus()
        return this
    }

    blur() {
        this.editor && this.editor.blur()
        return this
    }

    //
    changeHandle(e) {
        const editor = this.editor,
            value = editor.getValue(),
            ret = this.onChange(value)
        ret && ret !== value && editor.setValue(ret)
    }

    componentDidMount() {
        const options = Object.assign({}, this.props.options),
            {initValue, onChange} = this.props
        options.textarea = $(this.ref)
        this.editor = new simditor(options)
        initValue && this.editor.setValue(initValue)
        onChange && (this.onChange = onChange)
        this.editor.on('valuechanged', this.changeHandle)
    }

    componentWillUnmount() {
        this.editor && this.editor.destroy()
    }

    componentWillReceiveProps(nextProps) {
        const props = this.props, editor = this.editor
        nextProps.onChange !== props.onChange && (this.onChange = nextProps.onChange)
        'boolean' === typeof nextProps.focus && nextProps.focus !== props.focus && (nextProps.focus ? this.focus() : this.blur())
    }

    shouldComponentUpdate(nextProps, nextState){
        return false
    }

    render() {
        return (<textarea placeholder="Text" ref={ref => this.ref = ref}/>)
    }
}

export default RSimditor

