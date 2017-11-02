'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _rSimditor = require('r-simditor');

var _rSimditor2 = _interopRequireDefault(_rSimditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var RSimditor = function (_React$Component) {
    _inherits(RSimditor, _React$Component);

    function RSimditor() {
        var _ref;

        _classCallCheck(this, RSimditor);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = RSimditor.__proto__ || Object.getPrototypeOf(RSimditor)).call.apply(_ref, [this].concat(props)));

        _this.editor = false; //editor
        _this.onChange = function (e) {
            return false;
        }; //onChange Function

        //bind
        _this.changeHandle = _this.changeHandle.bind(_this);
        return _this;
    }

    //interface
    /**
     * get value from editor
     */


    _createClass(RSimditor, [{
        key: 'getValue',
        value: function getValue() {
            return this.editor ? this.editor.getValue() : '';
        }

        /**
         * set editor value
         * @param {string} value editor value
         */

    }, {
        key: 'setValue',
        value: function setValue(value) {
            this.editor && this.editor.setValue(value);
            return this;
        }
    }, {
        key: 'focus',
        value: function focus() {
            this.editor && this.editor.focus();
            return this;
        }
    }, {
        key: 'blur',
        value: function blur() {
            this.editor && this.editor.blur();
            return this;
        }

        //

    }, {
        key: 'changeHandle',
        value: function changeHandle(e) {
            var editor = this.editor,
                value = editor.getValue(),
                ret = this.onChange(value);
            ret && ret !== value && editor.setValue(ret);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var options = Object.assign({}, this.props.options),
                _props = this.props,
                initValue = _props.initValue,
                onChange = _props.onChange;

            options.textarea = (0, _jquery2.default)(this.ref);
            this.editor = new _rSimditor2.default(options);
            initValue && this.editor.setValue(initValue);
            onChange && (this.onChange = onChange);
            this.editor.on('valuechanged', this.changeHandle);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.editor && this.editor.destroy();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var props = this.props,
                editor = this.editor;
            nextProps.onChange !== props.onChange && (this.onChange = nextProps.onChange);
            'boolean' === typeof nextProps.focus && nextProps.focus !== props.focus && (nextProps.focus ? this.focus() : this.blur());
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return false;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement('textarea', { placeholder: 'Text', ref: function ref(_ref2) {
                    return _this2.ref = _ref2;
                } });
        }
    }]);

    return RSimditor;
}(_react2.default.Component);

exports.default = RSimditor;