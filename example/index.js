import React from 'react'
import {render} from 'react-dom'
import RSimditor from '../lib/rsimditor'
import {upUtil} from './upUtil'
import $ from 'jquery'
import '../style/simditor.css'
import 'rsimditor-autosave'
import 'rsimditor-fullscreen'
import 'rsimditor-fullscreen/styles/simditor-fullscreen.css'

const options = {
    autosave: 'rsimditor-autosave-content', //html5 auto save future must be add rsimditor-autosave dependencies and import
    placeholder: 'Input text will auto save!',
    toolbar: ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', 'ol', 'ul', 'blockquote', 'code',
        'table', 'link', 'image', 'hr', 'indent', 'outdent', 'alignment', 'fullscreen']
}

function Form(fileServer, policy, accessid, signature, callback) {
    this.policy = policy
    this.accessid = accessid
    this.signature = signature
    this.callback = callback
    this.fileServer = fileServer
}

Form.prototype.generate = function (file, up, $) {
    const formData = new FormData(),
        key = upUtil.randKey()
    file.file_path = this.fileServer + key
    formData.append('name', file.name)
    formData.append('key', key)
    formData.append('policy', this.policy);
    formData.append('OSSAccessKeyId', this.accessid);
    formData.append('signature', this.signature);
    formData.append('success_action_status', '200');
    formData.append('callback', this.callback);
    formData.append('x:name', encodeURI(encodeURI(file.name)));
    formData.append('x:sys', JSON.stringify({extType: 'NaN'}));
    formData.append('x:cus', 'NaN');
    formData.append('Content-Disposition', 'filename=' + file.name);
    formData.append('file', file.obj);
    return formData
}


class App extends React.Component {
    constructor(...props) {
        super(...props)
        this.state = {upParams: false}
        this.onChange = this.onChange.bind(this)
    }

    onChange(value) {
        return -1 !== value.indexOf('[RISMDITOR-DEMO]') ? 'you are so beautiful' : false //when inputting contain '123', text will be change.
    }

    componentDidMount() {
        const _this = this
        $.getJSON('http://file.mahoooo.com/res/policy/get', {}, function (res) {
            _this.setState({upParams: res})
        })
    }

    render() {
        const {upParams} = this.state
        return (
            <div>
                {upParams &&
                (<RSimditor onChange={this.onChange}
                            options={Object.assign({
                                upload: {
                                    url: upParams.host,
                                    params: null,
                                    connectionCount: 3,
                                    leaveConfirm: 'Uploading is in progress, are you sure to leave this page?',
                                    formData: new Form(upParams.fileService, upParams.policy, upParams.accessid, upParams.signature, upParams.callback)
                                }
                            }, options)}/>)}
            </div>
        )
    }
}

/*$.getJSON('http://file.mlhang.com/res/policy/get', {}, (result) => {
    const upload = {
        url: result.host,
        params: null,
        fileKey: 'upload_file',
        connectionCount: 3,
        leaveConfirm: 'Uploading is in progress, are you sure to leave this page?'
    }
    render(<RSimditor/>, document.getElementById('root'))
})*/

render(<App/>, document.getElementById('root'))
