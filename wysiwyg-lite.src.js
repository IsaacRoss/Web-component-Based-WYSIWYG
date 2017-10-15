class WYSIWYGComponent extends HTMLElement {
    constructor() {
        super();
        this._value = null
        this._editor
        this._editorElm
        
    }

    connectedCallback(){
        this._editorElm = document.createElement("div")
        this._editorElm.classList = "pell"
        this.appendChild(this._editorElm)
        this._editor = pell.init({
            element: this._editorElm,
            onChange: html => {
              this.value = html
            },
            styleWithCSS: true,
            actions: [
              'bold',
              'underline',
              {
                name: 'italic',
                result: () => window.pell.exec('italic')
              },
              {
                name: 'image',
                result: () => {
                  const url = window.prompt('Enter the image URL')
                  if (url) window.pell.exec('insertImage', url)
                }
              },
              {
                name: 'link',
                result: () => {
                  const url = window.prompt('Enter the link URL')
                  if (url) window.pell.exec('createLink', url)
                }
              }
            ]
          })
          
          if (this.attributes.value) this.value = this.attributes.value.value    

          this.innerHTML = this.innerHTML + (`
            <style>
                .pell {
                    border-radius: 5px;
                    border: 1px solid rgba(10, 10, 10, 0.1);
                    box-sizing: border-box;
                    width: 100%; 
                }
                
                .pell-content {
                    box-sizing: border-box;
                    min-height: 300px;
                    outline: 0;
                    overflow-y: auto;
                    padding: 10px;
                    width: 100%; 
                }
                
                .pell-actionbar {
                    background-color: #FFF;
                    border-bottom: 1px solid rgba(10, 10, 10, 0.1);
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                    width: 100%; 
                }
                
                .pell-button {
                    background-color: transparent;
                    border: none;
                    cursor: pointer;
                    height: 30px;
                    outline: 0;
                    width: 30px; 
                }
            </style>
          `)
    }

    get value() {
        return this._value;
    }

    set value(v) {
        this._value = v
        if (this._editor.content.innerHTML != v) this._editor.content.innerHTML = v
        this.dispatchEvent(new Event("input"));
    }

    
}

customElements.define('wysiwyg-lite', WYSIWYGComponent);


(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.pell = {})));
}(this, (function (exports) { 'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var actions = {
  bold: {
    icon: '<b>B</b>',
    title: 'Bold',
    result: function result() {
      return exec('bold');
    }
  },
  italic: {
    icon: '<i>I</i>',
    title: 'Italic',
    result: function result() {
      return exec('italic');
    }
  },
  underline: {
    icon: '<u>U</u>',
    title: 'Underline',
    result: function result() {
      return exec('underline');
    }
  },
  strikethrough: {
    icon: '<strike>S</strike>',
    title: 'Strike-through',
    result: function result() {
      return exec('strikeThrough');
    }
  },
  heading1: {
    icon: '<b>H<sub>1</sub></b>',
    title: 'Heading 1',
    result: function result() {
      return exec('formatBlock', '<H1>');
    }
  },
  heading2: {
    icon: '<b>H<sub>2</sub></b>',
    title: 'Heading 2',
    result: function result() {
      return exec('formatBlock', '<H2>');
    }
  },
  paragraph: {
    icon: '&#182;',
    title: 'Paragraph',
    result: function result() {
      return exec('formatBlock', '<P>');
    }
  },
  quote: {
    icon: '&#8220; &#8221;',
    title: 'Quote',
    result: function result() {
      return exec('formatBlock', '<BLOCKQUOTE>');
    }
  },
  olist: {
    icon: '&#35;',
    title: 'Ordered List',
    result: function result() {
      return exec('insertOrderedList');
    }
  },
  ulist: {
    icon: '&#8226;',
    title: 'Unordered List',
    result: function result() {
      return exec('insertUnorderedList');
    }
  },
  code: {
    icon: '&lt;/&gt;',
    title: 'Code',
    result: function result() {
      return exec('formatBlock', '<PRE>');
    }
  },
  line: {
    icon: '&#8213;',
    title: 'Horizontal Line',
    result: function result() {
      return exec('insertHorizontalRule');
    }
  },
  link: {
    icon: '&#128279;',
    title: 'Link',
    result: function result() {
      var url = window.prompt('Enter the link URL');
      if (url) exec('createLink', url);
    }
  },
  image: {
    icon: '&#128247;',
    title: 'Image',
    result: function result() {
      var url = window.prompt('Enter the image URL');
      if (url) exec('insertImage', url);
    }
  }
};

var classes = {
  actionbar: 'pell-actionbar',
  button: 'pell-button',
  content: 'pell-content'
};

var exec = function exec(command) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  document.execCommand(command, false, value);
};

var preventTab = function preventTab(event) {
  if (event.which === 9) event.preventDefault();
};

var init = function init(settings) {
  settings.actions = settings.actions ? settings.actions.map(function (action) {
    if (typeof action === 'string') return actions[action];else if (actions[action.name]) return _extends({}, actions[action.name], action);
    return action;
  }) : Object.keys(actions).map(function (action) {
    return actions[action];
  });

  settings.classes = _extends({}, classes, settings.classes);

  var actionbar = document.createElement('div');
  actionbar.className = settings.classes.actionbar;
  settings.element.appendChild(actionbar);

  settings.element.content = document.createElement('div');
  settings.element.content.contentEditable = true;
  settings.element.content.className = settings.classes.content;
  settings.element.content.oninput = function (event) {
    event.stopPropagation()
    return settings.onChange(event.target.innerHTML);
  };
  settings.element.content.onkeydown = preventTab;
  settings.element.appendChild(settings.element.content);

  settings.actions.forEach(function (action) {
    var button = document.createElement('button');
    button.className = settings.classes.button;
    button.innerHTML = action.icon;
    button.title = action.title;
    button.onclick = action.result;
    actionbar.appendChild(button);
  });

  if (settings.styleWithCSS) exec('styleWithCSS');

  return settings.element;
};

var pell = { exec: exec, init: init };

exports.exec = exec;
exports.init = init;
exports['default'] = pell;

Object.defineProperty(exports, '__esModule', { value: true });

})));
