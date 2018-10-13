# Code Editor

Code editor with syntax coloring

# Supported syntax

- HTML
- Javascript
- CSS

# Themes

    monokai     =   attr-theme="monokai"
    White       =   attr-theme="white"

### custom theme

    attr-themecustom="URL_THEME"

    After, insert attr-theme="FILE_CSS_NAME"

#### Example

    attr-themecustom="http://localhost/mytheme.css"

    After, insert attr-theme="mytheme"

# Syntaxes

    HTML        =   attr-syntax="html"
    Javascript  =   attr-syntax="javascript"
    CSS         =   attr-syntax="css"

## Interact

### Insert HTML
    
    CONTROLLER.insertHTML(HTML_CODE);

#### Example

    CONTROLLER.insertHTML('<h2>heading</h2>');

### Set content

    CONTROLLER.content("content HTML");

### Get content

    var contentEditor = CONTROLLER.content();

### Get number lines

    {{CONTROLLER.numberlines}}   

### Get syntax current

    {{CONTROLLER.syntax}}

### Set syntax current

    this.setSyntax('SYNTAX_NAME');

### Get theme current

    {{CONTROLLER.theme}}

### Set theme 

    this.setTheme('THEME_NAME');

### Get List of syntaxes

    this.syntaxList


# Attributes

    attr-theme              =   string      =   set theme 
    attr-syntax             =   string      =   set language of syntax 
    attr-spellcheck         =   boolean     =   set spellcheck 
    attr-editable           =   boolean     =   set ediction 
    attr-headerbar          =   boolean     =   show header bar
    attr-footerbar          =   boolean     =   show footer bar
    attr-numberlines        =   boolean     =   show number lines
    attr-height             =   pixel/porcentage/auto            =   size height of editor
    attr-nointerpolation    =   boolean     =   define content is interpolable
    attr-filename           =   string      =   openfile ex: "example1/example-js.html"
 
# Example of use component

<raiz-component name="component::codeeditor" raiz-controller="editor1" attr-theme="monokay" attr-syntax="html">
    &lt;p> paragraph &lt;p>
</raiz-component>    