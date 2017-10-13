import React from 'react'
import $ from 'jquery'
import simditor from 'simditor'
import 'simditor/styles/simditor.css'
class RSimditor extends React.Component{
    constructor(...props){
        super(...props)
        this.editor = false
    }

    componentDidMount(){
        this.editor = new simditor({
            textarea:$(this.ref)
        })
    }

    render(){
        return (<textarea placeholder="Text" ref={ref=>this.ref = ref}/>)
    }
}

export default RSimditor

