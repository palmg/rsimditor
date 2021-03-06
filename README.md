# Rsimditor
基于simditor实现的React富文本编辑器。

---
## 使用

安装：

 - `$ npm install rsimditor --save`
 - `$ npm install jquery --save-dev`

编码：
```JavaScript
import React from 'react'
import {render} from 'react-dom'
import RSimditor from 'rsimditor'
import 'rsimditor/simditor.css' //样式，可以加载自定义的样式
render(<RSimditor onChange={()=>{}} options={{}} />,
    document.getElementById('root'))
```
可以直接使用源码中的例子：

 - `$ git clone https://github.com/palmg/rsimditor.git`
 - `$ npm install`
 - `$ npm run example`

启动完成后浏览器输入 http://localhost:8080/ 即可看到效果。

**使用注意：**

1. 如果使用webpack打包并引入css样式文件，请增加`file-loader`以处理simditor中的自定义文字。

 - 安装：`$ npm install file-loader --save-dev`
 - 配置：
    ```JavaScript
    module.rules：[{
        test:/\.(eot|woff|ttf)$/,
        use: ['file-loader']
    }]
    ```
2. `Rsimditor`需要`jQuery`，请根据项目需要安装`jQuery`。
3. 按照非受控组件的方式来使用`Rsimditor`组件。

## API

### initValue `string`
用以指定富文本编辑器的初始值，在组件被装载之后会被设定。

### focus `boolean`
当值改变时，会触发富文本编辑器聚焦或失去焦点的事件。默认为`undefined`。

### onChange `function`
当富文本编辑器的值发生改变时，会触发`onChange`方法。结构为：`(value)=>{return false}`。
当返回一个`string`类型的值时，会使用返回值设定富文本编辑器的内容，所以可以通过`onChange`来处理数据过滤。

### options `object`
富文本编辑器的控制参数：

选项 | 类型 | 说明
------------ | --------- | -------------
placeholder | `string` | 背景文字，富文本内容为空时会显示该文字。
toolbar | `array` | 富文本编辑器上方显示的工具栏。可以使用`"\|"`字符来分割。详细说明请看[工具栏说明](#工具栏说明)。
toolbarFloat | `boolean` | 当屏幕滚动时，设定上方的工具栏是否浮动。默认为`true`。
toolbarFloatOffset | `number` | 设定工具栏浮动的偏移量。默认为`0`。
toolbarHidden | `boolean` | 指定是否隐藏工具栏，`toolbarFloat`设定为`true`该配置不会生效。
defaultImage | `string` | 默认图片。当上传图片时，会有一个异步过程，通过指定`defaultImage`设定一个占位图片或gif加载效果，默认为`"images/image.png"`,如果图片不存在，直接显示上传文件的名称。
tabIndent | `boolean` | 设定是否支持table键盘缩进。默认为`truen`。
upload | `object` | 设定文件上传的方式和传输的服务器地址。默认为`false`，不上传图片，直接使用`base64`格式。请查看[图片上传说明](#图片上传说明)。
imageButton | `array` | `upload`启用时设定上传选项，可选值`upload`（本地上传）、`external`（外部链接）。两者都启用时，会呈现一个下拉菜单。默认为`['upload', 'external']`。
pasteImage | `boolean` | 标记是否支持通过剪切板粘贴图片，仅支持chrome和Firefox。默认`false`。
cleanPaste | `boolean` | 标记当用户从剪切板粘贴文字内容时是否清除样式。默认`false`。
allowedTags | `array` | [支持标签](#标签)。
allowedAttributes | `array` | [支持标签属性](#标签属性)。
allowedStyles | `array` | [支持标签样式](#标签样式)
codeLanguages | `array` | [支持格式化语言](#格式化语言)


### 工具栏说明
工具栏目是一个列表结构。
```JavaScript
var options = {
    toolbar: [
        'title',  //标题，<h1>～<h5>
        'bold',  //加粗，<b>test</b>
        'italic',  //斜体
        'underline',  //下划线
        'strikethrough',  //删除线
        'fontScale',  //文字大小
        'color',  //文字颜色
        'ol',  //有序列表
        'ul',  //无序列表
        'blockquote',  //引用
        'code',  //引入代码
        'table',  //引入表格
        'link',  //超链接
        'image',  //添加图片，图片分为上传和base64两种方式，默认使用base64添加到富文本中。
        'hr', //分割线
        'indent', //右缩进
        'outdent', //左缩进
        'alignment'] //水平对齐方式
}
```
[返回列表](#options-object)

### 图片上传说明
在options参数中通过upload配置来设定文件上传：
```JavaScript
var options = {
    upload:{
        url:'server path'
        connectionCount:3
        leaveConfirm:'Uploading is in progress, are you sure to leave this page?',
        base64:true,
        params: null,
        fileKey: 'upload_file'
        formData:function(file, up, $){}
    }
}
```
**url `string`**
文件上传目标服务器的地址。指定后，当文件上传时会向该地址发送xhr请求传递文件。启用后必须指定。

**connectionCount `number`**
同时上传图片的链接数。默认为3。

**leaveConfirm `string`**
当文件上传未完成时，用户关闭或刷新浏览器的提示内容。

**base64 `boolean`**
当文件向服务器传输失败后，是否使用base64格式添加到富文本编辑器中。默认为`false`。

**params `object`**
在上传文件时，向服务器发送的参数。会添加到FormData中。

**fileKey `string`**
向服务器传递的fileKey参数。同样使用FormData传递。

**formData `function` `object`**
`FormData`数据生成方法。当传递的参数比较复杂时可以自行设定`FormData`格式。formData参数可以传递一个方法，也可以传递一个实例（对象）。当传递实例时，必须实现`generate`方法。可以在`formData`方法中设定`file.file_path`来设定图片上传完成后的`src`路径。
*使用`function`设置：*
```JavaScript
var value = 'myValue'
function generate(file){
    var formData = new FormData();
    //示例代码
    formData.append(key:value);
    file.file_path = 'https://myDomain.com/filepath'
    //do something
    return formData;
}
<RSimditor options={upload:{formData: generate}}/>
```
*使用`object`设置：*
```JavaScript
function Form(value){
    this.value = value;
}
Form.prototype.generate = function(file) {
    var formData = new FormData();
    //示例代码
    file.file_path = 'https://myDomain.com/filepath'
    formData.append(key:this.value);
    //do something
    return formData;
}
<RSimditor options={upload:{formData: new Form('myValue')}}/>
```

**服务器返回信息**
上传完成后需要服务器告知组件是否上传成功。通常情况下，只要response返回200状态就认为上传文件成功，500等其状态码认为上传失败。
除此之外，在`stateCode == 200`的情况下还可以通过结构化信息标记上传结果：
```JavaScript
{
  "success": false,
  "msg": "error message",
  "file_path": "[real file path]"
}
```

选项 | 类型 | 说明
------------ | --------- | -------------
success | `boolean` | 上传成功标记。除了指定为`false`，其他情况都视为上传成功。
msg | `string` | 上传失败信息，只有在`success === false` 时生效。
file_path | `string` | `<img/>`标签的`src`属性数据。

> **图片网络位置设定**：除了通过服务器返回的`file_path`设定`src`。还可以在`formData`方法中通过设定`file.file_path`来设定`src`。

[返回列表](#options-object)

### 标签
该参数可以指定富文本编辑器支持的标签，默认为：
```JavaScript
    ['br', 'span', 'a', 'img', 'b', 'strong', 'i', 'strike', 'u', 'font', 'p', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'h1', 'h2', 'h3', 'h4', 'hr']
```
当用户设定新的标签列表时，会合并当默认列表中。

[返回列表](#options-object)

### 标签属性
设定每一个标签支持的属性(arrtibure)，默认为:
```JavaScript
{
    img: ['src', 'alt', 'width', 'height', 'data-non-image'],
    a: ['href', 'target'],
    font: ['color'],
    code: ['class'],
}
```
当用户设定新的标签列表时，会合并当默认列表中。

[返回列表](#options-object)

### 标签样式
标签支持的内联样式。
```JavaScript
{
    span: ['color', 'font-size'],
    b: ['color'],
    i: ['color'],
    strong: ['color'],
    strike: ['color'],
    u: ['color'],
    p: ['margin-left', 'text-align'],
    h1: ['margin-left', 'text-align'],
    h2: ['margin-left', 'text-align'],
    h3: ['margin-left', 'text-align'],
    h4: ['margin-left', 'text-align'],
}
```
当用户设定新的标签列表时，会合并当默认列表中。

[返回列表](#options-object)

### 格式化语言
富文本支持的格式化语言。
```JavaScript
[
  { name: 'Bash', value: 'bash' }
  { name: 'C++', value: 'c++' }
  { name: 'C#', value: 'cs' }
  { name: 'CSS', value: 'css' }
  { name: 'Erlang', value: 'erlang' }
  { name: 'Less', value: 'less' }
  { name: 'Sass', value: 'sass' }
  { name: 'Diff', value: 'diff' }
  { name: 'CoffeeScript', value: 'coffeescript' }
  { name: 'HTML,XML', value: 'html' }
  { name: 'JSON', value: 'json' }
  { name: 'Java', value: 'java' }
  { name: 'JavaScript', value: 'js' }
  { name: 'Markdown', value: 'markdown' }
  { name: 'Objective C', value: 'oc' }
  { name: 'PHP', value: 'php' }
  { name: 'Perl', value: 'parl' }
  { name: 'Python', value: 'python' }
  { name: 'Ruby', value: 'ruby' }
  { name: 'SQL', value: 'sql'}
]
```

[返回列表](#options-object)

### 接口方法
除了直接使用props参数，`Rsimditor`还支持直接使用`ref`特性获取组件实例来操作富文本编辑器的接口，比使用props传递参数更高效。
```
var editor;
<Rsimditor ref={ref=>{editor=ref}}
```

方法 | 说明
------------ | -------------
getValue | 获取富文本组件的值。是一个HTML结构的字符串。
setValue | 设定富文本组件中呈现的内容。
focus | 聚焦到富文本编辑器。
blur | 移除焦点。

## 应用扩展

目前支持HTML5规范的自动存储和全屏特性。

**自动存储**

`$ npm install rsimditor-autosave --save`
```JavaScript
//………………
import 'rsimditor-autosave' 引入包
<Rsimditor options={{autosave: 'rsimditor-autosave-content'}}/>
```
通过`autosave`参数指定自动保存的路径。当设定为`false`时关闭自动保存功能。

**编辑器全屏**

`$ npm install rsimditor-fullscreen --save`
```JavaScript
//………………
import 'rsimditor-fullscreen'
import 'rsimditor-fullscreen/styles/simditor-fullscreen.css' //全屏按钮的图标样式
<Rsimditor options={{toolbar: ['fullscreen']}}/>
```
`toolbar`参数标记全屏按钮出现的位置。