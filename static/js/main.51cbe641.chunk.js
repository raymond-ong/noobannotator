(this.webpackJsonpnoobannotator=this.webpackJsonpnoobannotator||[]).push([[0],{161:function(e,t,n){},162:function(e,t,n){},259:function(e,t,n){},278:function(e,t,n){},279:function(e,t,n){},280:function(e,t,n){},282:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),r=n(35),i=n.n(r),l=(n(161),n(14)),c=(n(162),n(6)),s=n(10),d="documents",u=function(e,t,n){var o={name:t,docContent:n},a=e.findIndex((function(e){return null!==e&&e.name===t}));-1!==a?e[a]=o:e.push(o)},g=n(71),m={blocks:[{key:"8b1se",text:"Fried Rice Restaurant Style",type:"header-one",depth:0,inlineStyleRanges:[],entityRanges:[{offset:0,length:27,key:0}],data:{}},{key:"63pjm",text:"A quick fried rice like you get at your favorite Chinese restaurant. A couple of eggs, baby carrots, peas and soy sauce is all you need.\ud83d\udc4d",type:"blockquote",depth:0,inlineStyleRanges:[],entityRanges:[{offset:123,length:14,key:1}],data:{}},{key:"fkd93",text:"Ingredients",type:"header-two",depth:0,inlineStyleRanges:[],entityRanges:[{offset:0,length:11,key:2}],data:{}},{key:"59v0r",text:"2 cups enriched white rice",type:"unordered-list-item",depth:0,inlineStyleRanges:[],entityRanges:[],data:{}},{key:"16l17",text:"4 cups water ",type:"unordered-list-item",depth:0,inlineStyleRanges:[],entityRanges:[],data:{}},{key:"8opa4",text:"\u2154 cup chopped baby carrots \ud83e\udd55",type:"unordered-list-item",depth:0,inlineStyleRanges:[],entityRanges:[],data:{}},{key:"4dm01",text:"\xbd cup frozen green peas ",type:"unordered-list-item",depth:0,inlineStyleRanges:[],entityRanges:[{offset:0,length:23,key:3}],data:{}},{key:"1qvbb",text:"2 tablespoons vegetable oil ",type:"unordered-list-item",depth:0,inlineStyleRanges:[],entityRanges:[],data:{}},{key:"57kfu",text:"2 eggs ",type:"unordered-list-item",depth:0,inlineStyleRanges:[],entityRanges:[],data:{}},{key:"1ta0",text:"soy sauce to taste ",type:"unordered-list-item",depth:0,inlineStyleRanges:[],entityRanges:[],data:{}},{key:"3pedd",text:"2 tablespoons sesame oil, to taste",type:"unordered-list-item",depth:0,inlineStyleRanges:[],entityRanges:[],data:{}},{key:"9s7t7",text:"Directions",type:"header-two",depth:0,inlineStyleRanges:[],entityRanges:[],data:{}},{key:"4ps02",text:"Step 1 ",type:"header-four",depth:0,inlineStyleRanges:[{offset:0,length:7,style:"BOLD"}],entityRanges:[{offset:0,length:6,key:4}],data:{}},{key:"a8fm7",text:"In a saucepan, combine rice and water. Bring to a boil. Reduce heat, cover, and simmer for 20 minutes.",type:"unstyled",depth:0,inlineStyleRanges:[],entityRanges:[],data:{}},{key:"7bi9d",text:"Step 2",type:"header-four",depth:0,inlineStyleRanges:[{offset:0,length:6,style:"BOLD"}],entityRanges:[],data:{}},{key:"1l419",text:"In a small saucepan, boil carrots in water about 3 to 5 minutes. Drop peas into boiling water, and drain.",type:"unstyled",depth:0,inlineStyleRanges:[],entityRanges:[],data:{}},{key:"1aedr",text:"Step 3",type:"header-four",depth:0,inlineStyleRanges:[{offset:0,length:6,style:"BOLD"}],entityRanges:[],data:{}},{key:"ru3r",text:"Heat wok over high heat. Pour in oil, then stir in carrots and peas; cook about 30 seconds. Crack in eggs, stirring quickly to scramble eggs with vegetables. Stir in cooked rice. Shake in soy sauce, and toss rice to coat. Drizzle with sesame oil, and toss again.",type:"unstyled",depth:0,inlineStyleRanges:[{offset:5,length:4,style:"BOLD"}],entityRanges:[],data:{}}],entityMap:{0:{type:"COMMENT",mutability:"MUTABLE",data:{comment:"THIS IS A SAMPLE CONTENT.\nYou can save documents to the browser's local storage by typing in a name in the dropdown above and click the Create <doc name> option.",color:"green"}},1:{type:"COMMENT",mutability:"MUTABLE",data:{comment:'You can modify the color of this comment by clicking on this comment and setting a CSS color in the field above, e.g. "darkblue", "#11F" or "#123456"',color:"darkblue"}},2:{type:"COMMENT",mutability:"MUTABLE",data:{comment:"To add a comment, highlight some text, then click the Comment button.",color:"red"}},3:{type:"COMMENT",mutability:"MUTABLE",data:{comment:"I don't like green peas, so I will skip this.\nI will add spring onions instead.\nMaybe throw in some garlic too.",color:"blue"}},4:{type:"COMMENT",mutability:"MUTABLE",data:{comment:"Use rice cooker instead",color:"magenta"}}}},p=function e(){Object(g.a)(this,e)};p.getInitialContent=function(e){return e.docs&&e.docs.length>0?(console.log("EditorHelper.getInitialContent()...",e.docs[e.docs.length-1].name),{content:Object(s.convertFromRaw)(e.docs[e.docs.length-1].docContent),fileName:e.docs[e.docs.length-1].name}):null},p.convertToRawContent=s.convertToRaw,p.setContent=function(e,t){if(e.docs&&!(e.docs.length<=0)){var n=e.docs.find((function(e){return e.name===t}));n&&(e.editorContent=Object(s.convertFromRaw)(n.docContent))}},p.createDemoContent=function(){return Object(s.convertFromRaw)(m)};var b=n(2),y=function(){var e={docs:[],editorContent:null,editorDirty:!1,isDocNameNew:!1,docCurreFileName:null};if(e.docs=function(){var e=localStorage.getItem(d);return null===e?[]:JSON.parse(e)}(),e.docs.length>0){var t=p.getInitialContent(e),n=t.content,o=t.fileName;e.editorContent=n,e.docCurreFileName=o}else e.editorContent=p.createDemoContent();return e}(),f=Object(o.createContext)(y),h=f.Provider,j=function(e){var t=e.children,n=Object(o.useReducer)((function(e,t){switch(t.type){case"save":console.log("[reducer] save");var n=Object(c.a)({},e),o=t.data.newFileName?t.data.newFileName:e.docCurreFileName,a=function(e,t){if("undefined"===typeof Storage)return console.error("localSaveLayout: browser does not supoort Local Storage"),[];var n=[],o=localStorage.getItem(d);return null!==o&&(n=JSON.parse(o)),u(n,t,e),localStorage.setItem(d,JSON.stringify(n)),console.log("localSaveLayout"),n}(p.convertToRawContent(e.editorContent),o);return n.docs=a,n.docCurreFileName=o,n;case"editorStateChanged":console.log("[reducer] editorStateChanged");var r=Object(c.a)({},e);return r.editorContent=t.data,r;case"selectedDocChanged":var i=t.data;console.log("[reducer] selectedDocChanged",i);var l=Object(c.a)({},e);return l.docCurreFileName=i,p.setContent(l,i),l;case"delete":var s=t.data,g=Object(c.a)({},e);console.log("[reducer] Doc to be deleted",s);var m=function(e){var t=[],n=localStorage.getItem(d);null!==n&&(t=JSON.parse(n));var o=t.findIndex((function(t){return t.name===e}));return o>=0&&t.splice(o,1),localStorage.setItem(d,JSON.stringify(t)),t}(s);return g.docs=m,g.docCurreFileName===s&&(g.docCurreFileName=null,g.editorContent=null),g;default:throw new Error}}),y),a=Object(l.a)(n,2),r=a[0],i=a[1];return Object(b.jsx)(h,{value:{state:r,dispatch:i},children:t})},C=(n(258),n(69),n(135)),F=n(143),v=n(141),O=(n(259),n(26)),x=n(27),E=function(e){Object(F.a)(n,e);var t=Object(v.a)(n);function n(){var e;return Object(g.a)(this,n),(e=t.call(this)).onToggle=function(t){t.preventDefault(),e.props.onToggle(e.props.style)},e}return Object(C.a)(n,[{key:"render",value:function(){var e="RichEditor-styleButton";return this.props.active&&(e+=" RichEditor-activeButton"),this.props.isDisabled&&(e+=" RichEditor-disabledButton"),Object(b.jsxs)("span",{className:e,onMouseDown:this.onToggle,title:this.props.title,children:[this.props.icon&&Object(b.jsx)(O.a,{icon:x[this.props.icon]}),(this.props.showIconAndLabel||!this.props.icon)&&"   ".concat(this.props.label)]})}}]),n}(a.a.Component),k=n(136),S=[{label:"Normal",style:"normal"},{label:"Blockquote",style:"blockquote",icon:"faQuoteLeft"},{label:"Bulleted",style:"unordered-list-item",icon:"faListUl"},{label:"Numbered",style:"ordered-list-item",icon:"faListOl"},{label:"Code Block",style:"code-block",icon:"faCode"},{label:"Header 1",style:"header-one"},{label:"Header 2",style:"header-two"},{label:"Header 3",style:"header-three"},{label:"Header 4",style:"header-four"},{label:"Header 5",style:"header-five"},{label:"Header 6",style:"header-six"}],B={option:function(e,t){return Object(c.a)(Object(c.a)({},e),{},{color:t.isSelected?"darkgray":"gray"})},container:function(e){return Object(c.a)(Object(c.a)({},e),{},{fontSize:"14px",width:"160px",fontFamily:"Arvo-Bold"})},control:function(e){return Object(c.a)(Object(c.a)({},e),{},{minHeight:"30px"})},valueContainer:function(e){return Object(c.a)(Object(c.a)({},e),{},{paddingTop:"0px",paddingBottom:"0px",height:"100%"})},singleValue:function(e){return Object(c.a)(Object(c.a)({},e),{},{marginTop:"0px",marginBottom:"0px"})},indicatorsContainer:function(e){return Object(c.a)({},e)},indicatorSeparator:function(e){return Object(c.a)(Object(c.a)({},e),{},{height:"100%",marginTop:"0px",marginBottom:"0px"})},clearIndicator:function(e){return Object(c.a)(Object(c.a)({},e),{},{marginTop:"0px",marginBottom:"0px",paddingTop:"0px",paddingBottom:"0px"})},dropdownIndicator:function(e){return Object(c.a)(Object(c.a)({},e),{},{paddingTop:"0px",paddingBottom:"0px",marginTop:"0px",marginBottom:"0px"})},input:function(){return{margin:"0px"}},menu:function(e){return Object(c.a)(Object(c.a)({},e),{},{zIndex:9999})}},R=function(e){switch(e.getType()){case"blockquote":return console.log("blockquote!"),"RichEditor-blockquote";default:return null}},D=function(e,t){e.value;var n=e.label,o=e.icon;return Object(b.jsxs)("div",{style:{display:"flex",alignItems:"center",height:"100%"},children:[o&&Object(b.jsx)(O.a,{style:{marginRight:"5px"},icon:x[o]}),Object(b.jsx)("div",{children:n})]})},A=function(e){var t=e.editorState,n=t.getSelection(),o=t.getCurrentContent().getBlockForKey(n.getStartKey()).getType(),a=function(e){var t=r.findIndex((function(t){return t.value===e}));return t<0?null:r[t]},r=S.map((function(e){return{value:e.style,label:e.label,icon:e.icon}})),i=a("unstyled"===o?"normal":o);return console.log("BlockStyleControls",o,i,n.isCollapsed()),Object(b.jsx)("div",{className:"RichEditor-controls",children:Object(b.jsx)(k.a,{options:r,styles:B,formatOptionLabel:D,value:i,onChange:function(t,n){"select-option"===n.action&&e.onToggle(t.value)}})})},w=[{label:"Bold",style:"BOLD",icon:"faBold",title:"Bold"},{label:"Italic",style:"ITALIC",icon:"faItalic",title:"Italicize"},{label:"Underline",style:"UNDERLINE",icon:"faUnderline",title:"Underline"},{label:"{ }",style:"CODE",title:"Monospace"}],N=function(e){var t=e.editorState.getCurrentInlineStyle();return Object(b.jsx)("div",{className:"RichEditor-controls",children:w.map((function(n){return Object(b.jsx)(E,Object(c.a)({active:t.has(n.style),onToggle:e.onToggle},n),n.label)}))})},T=(n(271),n(140)),I=n(137),M=function(e,t){if(!e)return"rgba(0, 0, 0, ".concat(t,")");var n=e,o=e.toLowerCase();o in L&&(n=L[o]);var a=U(n);return a?"rgba(".concat(a.r,", ").concat(a.g,", ").concat(a.b,", ").concat(t,")"):"rgba(0, 0, 0, ".concat(t,")")},L={aliceblue:"#F0F8FF",antiquewhite:"#FAEBD7",aqua:"#00FFFF",aquamarine:"#7FFFD4",azure:"#F0FFFF",beige:"#F5F5DC",bisque:"#FFE4C4",black:"#000000",blanchedalmond:"#FFEBCD",blue:"#0000FF",blueviolet:"#8A2BE2",brown:"#A52A2A",burlywood:"#DEB887",cadetblue:"#5F9EA0",chartreuse:"#7FFF00",chocolate:"#D2691E",coral:"#FF7F50",cornflowerblue:"#6495ED",cornsilk:"#FFF8DC",crimson:"#DC143C",cyan:"#00FFFF",darkblue:"#00008B",darkcyan:"#008B8B",darkgoldenrod:"#B8860B",darkgray:"#A9A9A9",darkgrey:"#A9A9A9",darkgreen:"#006400",darkkhaki:"#BDB76B",darkmagenta:"#8B008B",darkolivegreen:"#556B2F",darkorange:"#FF8C00",darkorchid:"#9932CC",darkred:"#8B0000",darksalmon:"#E9967A",darkseagreen:"#8FBC8F",darkslateblue:"#483D8B",darkslategray:"#2F4F4F",darkslategrey:"#2F4F4F",darkturquoise:"#00CED1",darkviolet:"#9400D3",deeppink:"#FF1493",deepskyblue:"#00BFFF",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1E90FF",firebrick:"#B22222",floralwhite:"#FFFAF0",forestgreen:"#228B22",fuchsia:"#FF00FF",gainsboro:"#DCDCDC",ghostwhite:"#F8F8FF",gold:"#FFD700",goldenrod:"#DAA520",gray:"#808080",grey:"#808080",green:"#008000",greenyellow:"#ADFF2F",honeydew:"#F0FFF0",hotpink:"#FF69B4",indianred:"#CD5C5C",indigo:"#4B0082",ivory:"#FFFFF0",khaki:"#F0E68C",lavender:"#E6E6FA",lavenderblush:"#FFF0F5",lawngreen:"#7CFC00",lemonchiffon:"#FFFACD",lightblue:"#ADD8E6",lightcoral:"#F08080",lightcyan:"#E0FFFF",lightgoldenrodyellow:"#FAFAD2",lightgray:"#D3D3D3",lightgrey:"#D3D3D3",lightgreen:"#90EE90",lightpink:"#FFB6C1",lightsalmon:"#FFA07A",lightseagreen:"#20B2AA",lightskyblue:"#87CEFA",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#B0C4DE",lightyellow:"#FFFFE0",lime:"#00FF00",limegreen:"#32CD32",linen:"#FAF0E6",magenta:"#FF00FF",maroon:"#800000",mediumaquamarine:"#66CDAA",mediumblue:"#0000CD",mediumorchid:"#BA55D3",mediumpurple:"#9370DB",mediumseagreen:"#3CB371",mediumslateblue:"#7B68EE",mediumspringgreen:"#00FA9A",mediumturquoise:"#48D1CC",mediumvioletred:"#C71585",midnightblue:"#191970",mintcream:"#F5FFFA",mistyrose:"#FFE4E1",moccasin:"#FFE4B5",navajowhite:"#FFDEAD",navy:"#000080",oldlace:"#FDF5E6",olive:"#808000",olivedrab:"#6B8E23",orange:"#FFA500",orangered:"#FF4500",orchid:"#DA70D6",palegoldenrod:"#EEE8AA",palegreen:"#98FB98",paleturquoise:"#AFEEEE",palevioletred:"#DB7093",papayawhip:"#FFEFD5",peachpuff:"#FFDAB9",peru:"#CD853F",pink:"#FFC0CB",plum:"#DDA0DD",powderblue:"#B0E0E6",purple:"#800080",rebeccapurple:"#663399",red:"#FF0000",rosybrown:"#BC8F8F",royalblue:"#4169E1",saddlebrown:"#8B4513",salmon:"#FA8072",sandybrown:"#F4A460",seagreen:"#2E8B57",seashell:"#FFF5EE",sienna:"#A0522D",silver:"#C0C0C0",skyblue:"#87CEEB",slateblue:"#6A5ACD",slategray:"#708090",slategrey:"#708090",snow:"#FFFAFA",springgreen:"#00FF7F",steelblue:"#4682B4",tan:"#D2B48C",teal:"#008080",thistle:"#D8BFD8",tomato:"#FF6347",turquoise:"#40E0D0",violet:"#EE82EE",wheat:"#F5DEB3",white:"#FFFFFF",whitesmoke:"#F5F5F5",yellow:"#FFFF00",yellowgreen:"#9ACD32"},U=function(e){e=e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(function(e,t,n,o){return t+t+n+n+o+o}));var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:null},K=function(e,t,n,o,a){t.style.border="2px solid ".concat(M(a,.5)),n.style.stroke=M(a,.5),o.style.stroke=M(a,.5),e.style.border="2px solid ".concat(M(a,.5))},q=function(e,t,n,o,a){t.style.border="2px solid rgba(50, 50, 50, 0.1)",n.style.stroke=M(a,.15),o.style.stroke=M(a,.15),e.style.border="0px"},H=function(e,t,n,o,a,r){var i=a.color,l=document.getElementById("comment-div-".concat(t));l&&(r?K(l,e.current,n.current,o.current,i):q(l,e.current,n.current,o.current,i))},z=function(e,t,n,o){var a=document.getElementById("comment-span-".concat(t)),r=document.getElementById("svg-line1-".concat(t)),i=document.getElementById("svg-line2-".concat(t));a&&r&&i&&(o?K(e.current,a,r,i,n):q(e.current,a,r,i,n))},V={link:{border:"2px solid rgba(50, 50, 50, 0.1)",backgroundColor:"rgba(0, 0, 255, 0.1)",borderRadius:"5px",cursor:"pointer",transform:"rotate(-1deg)",lineHeight:"1.7"}},J=[{label:"Comment",style:"Comment",icon:"faCommentDots",showIconAndLabel:!0,title:"Highlight text to add Comments",requiresSelection:!0},{label:"Yes",style:"Yes",icon:"faCheck",showIconAndLabel:!0,title:"Add Check Mark",requiresSelection:!1},{label:"No",style:"No",icon:"faTimes",showIconAndLabel:!0,title:"Add X Mark",requiresSelection:!1},{label:"Emoji",style:"Emoji",popup:!0,icon:"faGrin",showIconAndLabel:!0,title:"Add Emoji",requiresSelection:!1}];function P(e,t,n){e.findEntityRanges((function(e){var t=e.getEntity();return t&&console.log("findLinkEntities",t,n.getEntity(t).getType()),null!==t&&"COMMENT"===n.getEntity(t).getType()}),t)}var W=function(e){console.log("NEW LINKK!!!!",e);var t=Object(o.useRef)(null),n=Object(o.useRef)(null),a=Object(o.useRef)(null);return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("span",{id:"comment-span-"+e.entityKey,style:V.link,ref:t,onMouseOver:function(){return H(t,e.entityKey,n,a,e.contentState.getEntity(e.entityKey).getData(),!0)},onMouseOut:function(){return H(t,e.entityKey,n,a,e.contentState.getEntity(e.entityKey).getData(),!1)},children:e.children}),Object(b.jsxs)("svg",{id:"svg-span-"+e.entityKey,style:{position:"absolute",width:"calc(100% + 100px)",height:"500px",left:"0",cursor:"default",zIndex:"100",marginRight:"-200px",display:"float",pointerEvents:"none"},children:[Object(b.jsx)("line",{id:"svg-line1-"+e.entityKey,x1:"0",y1:"0",x2:"0",y2:"0",stroke:"rgba(0, 0, 255, 0.4)",strokeWidth:"2",ref:n}),Object(b.jsx)("line",{id:"svg-line2-"+e.entityKey,x1:"0",y1:"0",x2:"0",y2:"0",stroke:"rgba(0, 0, 255, 0.4)",strokeWidth:"2",ref:a})]})]})},Y=function(e){var t=e.editorState,n=t.getSelection(),a=(new s.CompositeDecorator([{strategy:P,component:W}]),function(n){console.log("[AnnotatorControls] onClick",n),"Yes"===n?r("\u2705"):"No"===n?r("\u274c"):"Comment"===n&&function(){if(console.log("confirmLink start"),t.getSelection().isCollapsed())console.log("confirmLink: no selection is made. Exiting function.");else{d();var n=t.getCurrentContent().createEntity("COMMENT","MUTABLE",{comment:"",color:"green",isNew:!0,parentMouseOver:e.parentMouseOverLink,parentMouseOut:e.parentMouseOutLink}),o=n.getLastCreatedEntityKey(),a=s.EditorState.set(t,{currentContent:n});a=s.RichUtils.toggleLink(a,a.getSelection(),o),e.onChange(a),e.parentRerender(),console.log("confirmLink after onChange")}}()}),r=function(n){var o=t.getSelection(),a=t.getCurrentContent(),r=s.EditorState.createEmpty();if(o.isCollapsed()){var i=s.Modifier.insertText(a,o,n);r=s.EditorState.push(t,i,"insert-characters")}else{var l=s.Modifier.replaceText(a,o,n);r=s.EditorState.push(t,l,"insert-characters")}e.onChange(r)},i=function(e){console.log("onEmojiSelect",e),r(e.native)},d=function(){var t=e.editorState.getCurrentContent();console.log(Object(s.convertToRaw)(t))},u=Object(o.useState)(!1),g=Object(l.a)(u,2),m=g[0],p=g[1];return Object(b.jsx)("div",{className:"RichEditor-controls",children:J.map((function(e){return"Emoji"===e.label?Object(b.jsx)(I.Popover,{isOpen:m,positions:["bottom"],onClickOutside:function(){return p(!1)},containerStyle:{zIndex:9999},content:Object(b.jsx)(T.a,{onSelect:i,title:"Select Emoji"}),children:Object(b.jsx)("span",{onClick:function(){console.log("Popover trigger clicked"),p(!0)},children:Object(b.jsx)(E,Object(c.a)(Object(c.a)({},e),{},{onToggle:a}))})},e.label):Object(b.jsx)(E,Object(c.a)(Object(c.a)({},e),{},{onToggle:a,isDisabled:e.requiresSelection&&n.isCollapsed()}),e.label)}))})},$=n(284),G=n(142),Q=(n(278),function(e){var t=Object(o.useState)(!e.isNew),n=Object(l.a)(t,2),a=n[0],r=n[1],i=Object(o.useState)(!!e.isNew),c=Object(l.a)(i,2),s=c[0],d=c[1],u=Object(o.useState)(e.color),g=Object(l.a)(u,2),m=g[0],p=g[1],y=Object(o.useState)(e.comment),f=Object(l.a)(y,2),h=f[0],j=f[1],C=Object(o.useRef)(null),F=Object(o.useRef)(null),v=(Object(o.useRef)(0),{color:"".concat(m)}),E={backgroundColor:M(m,.15)};Object(o.useEffect)((function(){function t(t){console.log("[commentComponent][handleClickOutside]",h,"isEditMode",s,F.current&&!F.current.contains(t.target)),F.current&&!F.current.contains(t.target)&&(a?s&&(d(!1),e.parentRerender(),console.log("[commentComponent][handleClickOutside] processing for non-new components done")):(C.current.focus(),r(!0),console.log("[commentComponent][handleClickOutside] processing for new components done")))}return document.addEventListener("mousedown",t),function(){document.removeEventListener("mousedown",t)}}),[F,s,a]);var k=function(t){p(t.target.value),e.parentRerender();var n={comment:h,color:t.target.value};e.parentUpdateComment(e.entityKey,n)},S=function(){e.parentDeleteComment(e.entityKey,e.blockKey)};return console.log("[commentComponent render]",h,"isEditMode",s),Object(b.jsxs)("div",{id:"comment-div-"+e.entityKey,className:"CommentContainer",style:{},onFocus:function(){console.log("[commentComponent] Focused comment",h),d(!0),e.parentRerender()},onMouseOver:function(){return z(F,e.entityKey,m,!0)},onMouseOut:function(){return z(F,e.entityKey,m,!1)},ref:F,children:[function(e){return e?Object(b.jsxs)("div",{className:"CommentHeader",children:[Object(b.jsx)("div",{className:"CommentHeaderCaption",children:"Edit Comment"}),Object(b.jsxs)("div",{className:"CommentHeaderColor",children:[Object(b.jsxs)("div",{className:"ColorField",title:"Input CSS Color (e.g. #f00, red)",children:[Object(b.jsx)("input",{className:"CommentHeaderColorInput",placeholder:"Color",onChange:k,defaultValue:m}),Object(b.jsx)($.a,{style:v,name:"square"})]}),Object(b.jsx)("div",{className:"deleteCommentBtn",onClick:S,title:"Delete Comment",children:Object(b.jsx)(O.a,{icon:x.faTimesCircle})})]})]}):null}(s),Object(b.jsx)("div",{className:"CommentBody",style:E,children:Object(b.jsx)(G.a,{className:"CommentTextArea",value:h,onChange:function(t){j(t.target.value),e.parentRerender();var n={comment:t.target.value,color:m};e.parentUpdateComment(e.entityKey,n)},ref:C,placeholder:"Comments...",spellCheck:!1,style:{backgroundColor:"rgba(0,0,0,0)"},autoFocus:s})})]})}),X=function(){var e=Object(o.useContext)(f),t=e.state,n=e.dispatch,r=function(){var e=Object(o.useState)([0,0]),t=Object(l.a)(e,2),n=t[0],a=t[1];return Object(o.useLayoutEffect)((function(){function e(){a([window.innerWidth,window.innerHeight])}return window.addEventListener("resize",e),e(),function(){return window.removeEventListener("resize",e)}}),[]),n}(),i=Object(l.a)(r,2),d=i[0],u=i[1];console.log("MainEditor render",t);var g=new s.CompositeDecorator([{strategy:P,component:W}]),m=function(){return null===t.editorContent?(console.log("[MainEditor] getInitialState, createEmpty"),s.EditorState.createEmpty(g)):(console.log("[MainEditor] getInitialState",Object(s.convertToRaw)(t.editorContent)),s.EditorState.createWithContent(t.editorContent,g))};Object(o.useEffect)((function(){console.log("useEffect for file name changes:",t.docCurreFileName),E(m())}),[t.docCurreFileName]);var p=Object(o.useState)(0),y=Object(l.a)(p,2),h=y[0],j=y[1],C=function(e,t){var n=x.getCurrentContent();n.replaceEntityData(e,t),s.EditorState.set(x,{currentContent:n}),j((function(e){return e+1})),S(x)},F=function(e,t){x.getCurrentContent().getBlockForKey(t).findEntityRanges((function(t){var n=t.getEntity();return!(!n||n!==e)}),(function(e,n){console.log("found entity yo remove",e,n);var o=s.SelectionState.createEmpty(t).merge({focusOffset:n,anchorOffset:e}),a=s.RichUtils.toggleLink(x,o,null);console.log("new state after delete",Object(s.convertToRaw)(a.getCurrentContent())),S(a)}))},v=Object(o.useState)((function(){return m()})),O=Object(l.a)(v,2),x=O[0],E=O[1];console.log("MainEditor",Object(s.convertToRaw)(x.getCurrentContent()));var k=function(){var e=x.getCurrentContent(),t=e.getBlockMap(),n=(e.getAllEntities(),[]);return t.forEach((function(t){var o=t.key;t.findEntityRanges((function(t){var a=t.getEntity();if(a){var r=e.getEntity(a);if(null!==a&&"COMMENT"===e.getEntity(a).getType()){console.log("[getComments by block]",r);var i={key:a,entity:r,blockKey:o,div:Object(b.jsx)(Q,Object(c.a)({entityKey:a,entity:r,blockKey:o,parentRerender:function(){return j((function(e){return e+1}))},parentUpdateComment:C,parentDeleteComment:F},r.data),a)};n.push(i)}}}),null)})),n}();Object(o.useEffect)((function(){var e=k;console.log("===========UseEffect for All comments Start...===========","entities count",e.length);var t=document.getElementById("RichEditor-editor"),n=t.firstChild,o=t.getBoundingClientRect(),a=n.getBoundingClientRect();e.forEach((function(e){var n=e.key,r=e.entity,i=document.getElementById("comment-span-".concat(n)),l=document.getElementById("comment-span-".concat(n)).parentElement,c=document.getElementById("svg-line1-".concat(n)),s=document.getElementById("svg-line2-".concat(n)),d=document.getElementById("comment-div-".concat(n)),u=document.getElementById("svg-span-".concat(n)),g=r.data.color;if(i)if(d){console.log("===========UseEffect for comments Start...===========",r.data.comment);var m=d.getBoundingClientRect(),p=i.getBoundingClientRect(),b=l.getBoundingClientRect(),y=u.getBoundingClientRect();console.log("svg orig top",y.top),u.style.top="".concat(o.top-b.top,"px"),console.log("svg supposed top",o.top-p.top,u.style.top),u.style.height=o.height-20;var f=t.getBoundingClientRect().right;console.log("editorRect",o.top),console.log("editorChildRect",a.top),console.log("spanRect",p.top),console.log("svgRect",y.top),m.left;var h=y.left-a.left-2,j=p.top-o.top;c.setAttribute("x1",p.right-15-h),c.setAttribute("x2",f-35-h),c.setAttribute("y1",2.5+j),c.setAttribute("y2",2.5+j);var C=m.height/2;s.setAttribute("x1",f-35-h),s.setAttribute("x2",f-35+24-h),s.setAttribute("y1",2.5+j),s.setAttribute("y2",m.top-o.top+C),c.setAttribute("stroke",M(g,.15)),s.setAttribute("stroke",M(g,.15)),i.style.backgroundColor=M(g,.15)}else console.log("[UseEffect] div iter",n,r.data.comment,"not found");else console.log("[UseEffect] span iter",n,r.data.comment,"not found")})),console.log("===========UseEffect for comments End...===========")}),[h,x,d,u]);var S=function(e){E(e),n({type:"editorStateChanged",data:e.getCurrentContent()})},B=a.a.useRef(null),D="RichEditor-editor",w=x.getCurrentContent();return w.hasText()||"unstyled"!==w.getBlockMap().first().getType()&&(D+=" RichEditor-hidePlaceholder"),Object(b.jsxs)("div",{className:"RichEditor-root",children:[Object(b.jsxs)("div",{className:"draftToolBar",children:[Object(b.jsx)("div",{className:"blockInlineContainer",children:Object(b.jsx)(Y,{editorState:x,onChange:E,parentRerender:function(){return j(!h)}})}),Object(b.jsxs)("div",{className:"blockInlineContainer",children:[Object(b.jsx)(N,{editorState:x,onToggle:function(e){S(s.RichUtils.toggleInlineStyle(x,e))}}),Object(b.jsx)(A,{editorState:x,onToggle:function(e){S(s.RichUtils.toggleBlockType(x,e))}})]})]}),Object(b.jsxs)("div",{className:"EditorAndCommentContainer",children:[Object(b.jsx)("div",{className:D,onClick:function(){B.current.focus()},id:D,children:Object(b.jsx)(s.Editor,{blockStyleFn:R,customStyleMap:{CODE:{backgroundColor:"rgba(0, 0, 0, 0.05)",fontFamily:'"Inconsolata", "Menlo", "Consolas", monospace',fontSize:16,padding:2}},editorState:x,handleKeyCommand:function(e){var t=s.RichUtils.handleKeyCommand(x,e);return!!t&&(E(t),!0)},onChange:S,onTab:function(e){E(s.RichUtils.onTab(e,x,4))},placeholder:"Write Something...",ref:B,spellCheck:!0})}),Object(b.jsx)("div",{className:"CommentAreaContainer",children:k.map((function(e){return e.div}))})]})]})},Z=(n(279),n(280),n(139)),_={option:function(e,t){return Object(c.a)(Object(c.a)({},e),{},{color:t.isSelected?"darkgray":"gray"})},container:function(e){return Object(c.a)(Object(c.a)({},e),{},{fontSize:"14px",fontFamily:"Arvo-Bold"})},control:function(e){return Object(c.a)(Object(c.a)({},e),{},{minHeight:"30px"})},valueContainer:function(e){return Object(c.a)(Object(c.a)({},e),{},{paddingTop:"0px",paddingBottom:"0px",height:"100%"})},singleValue:function(e){return Object(c.a)(Object(c.a)({},e),{},{marginTop:"0px",marginBottom:"0px"})},indicatorsContainer:function(e){return Object(c.a)({},e)},indicatorSeparator:function(e){return Object(c.a)(Object(c.a)({},e),{},{height:"100%",marginTop:"0px",marginBottom:"0px"})},clearIndicator:function(e){return Object(c.a)(Object(c.a)({},e),{},{marginTop:"0px",marginBottom:"0px",paddingTop:"0px",paddingBottom:"0px"})},dropdownIndicator:function(e){return Object(c.a)(Object(c.a)({},e),{},{paddingTop:"0px",paddingBottom:"0px",marginTop:"0px",marginBottom:"0px"})},input:function(){return{margin:"0px"}}},ee=function(e){console.log("[FileManager3] render");var t,n=Object(o.useContext)(f),a=n.state,r=n.dispatch,i=Object(o.useState)(!1),c=Object(l.a)(i,2),s=c[0],d=c[1],u=Object(o.useState)(!1),g=Object(l.a)(u,2),m=g[0],p=g[1],y=Object(o.useRef)(null),h=(t=a.docs,console.log("getDocumentListOptions",t),t.map((function(e,t){return{value:e.name,label:e.name}}))),j=Object(o.useState)(h),C=Object(l.a)(j,2),F=C[0],v=C[1],E=Object(o.useState)(h&&h.length>0?h[h.length-1]:null),k=Object(l.a)(E,2),S=k[0],B=k[1];console.log("File Current Value:",S);var R="SaveButton";return S||(R+=" btnDisabled"),Object(b.jsxs)("div",{className:"FileManagerContainer",children:[Object(b.jsx)(Z.a,{placeholder:"Select an item or type in a new file...",isClearable:!0,className:"selectDropdown",options:F,styles:_,onChange:function(e,t){if(console.group("Value Changed"),console.log(e),console.log("action: ".concat(t.action)),console.groupEnd(),s)return d(!1),void console.log("handleChange detected deletedItem...returning early");"create-option"===t.action?(F.push(e),v(F),B(e),r({type:"save",data:{newFileName:e.value}})):"select-option"===t.action?(B(e),p(!1),y.current.blur(),r({type:"selectedDocChanged",data:e.value})):"clear"===t.action&&B(null)},onInputChange:function(e,t){},formatOptionLabel:function(e,t){var n=e.value,o=e.label,a=t.inputValue&&t.inputValue.length>0&&n!==o;return Object(b.jsxs)("div",{style:{display:"flex"},children:[!a&&Object(b.jsx)(O.a,{icon:x.faFileAlt,style:{marginRight:"8px",marginTop:"2px"}}),Object(b.jsx)("div",{children:o}),"menu"===t.context&&!a&&Object(b.jsx)("div",{style:{marginLeft:"auto",color:"white",backgroundColor:"rgba(255,0,0,0.8)",fontSize:"11px",borderRadius:"3px",padding:"3px",cursor:"pointer",fontFamily:"Segoe UI"},onMouseDown:function(e){return function(e,t){console.log("Trying to delete ",t);var n=F.findIndex((function(e){return e.value===t}));n<0||(S&&S.value===t&&(console.log("set value to null as deleting selected item"),B(null)),F.splice(n,1),v(F),d(!0),r({type:"delete",data:t}),console.log("Done removing",t))}(0,n)},children:"Delete"}),"menu"===t.context&&a&&Object(b.jsx)("div",{style:{marginLeft:"auto",color:"white",backgroundColor:"rgba(50,150,50,0.8)",fontSize:"11px",borderRadius:"3px",padding:"3px",fontFamily:"Segoe UI"},children:"New"})]})},closeMenuOnSelect:!1,value:S,menuIsOpen:m,onBlur:function(){p(!1)},blurInputOnSelect:!1,onFocus:function(){p(!0)},ref:y,defaultValue:S}),Object(b.jsx)("div",{className:R,onClick:S&&function(){console.log("onSaveClicked"),r({type:"save",data:{}})},title:"Save to Local Storage",children:Object(b.jsx)(O.a,{icon:x.faSave})})]})};n(281);var te=function(){var e=Object(o.useState)(!1),t=Object(l.a)(e,2),n=t[0],a=t[1],r="hamburger",i="bar-hamburger",c="SettingsArea";return n&&(r+=" hamburger-active",i+=" bar-hamburger-active",c+=" SettingsArea-active"),Object(b.jsx)(j,{children:Object(b.jsxs)("div",{className:"App",children:[Object(b.jsxs)("div",{className:"AppHeader",children:[Object(b.jsxs)("div",{className:"AppTitleArea",children:[Object(b.jsx)(O.a,{icon:x.faCommentDots}),Object(b.jsx)("span",{className:"AppTitleText",children:"Noob Annotator"})]}),Object(b.jsx)("div",{className:"DocTitleArea"}),Object(b.jsx)("div",{className:c,children:Object(b.jsx)(ee,{})}),Object(b.jsxs)("div",{className:r,onClick:function(){return a(!n)},children:[Object(b.jsx)("span",{className:i}),Object(b.jsx)("span",{className:i}),Object(b.jsx)("span",{className:i})]})]}),Object(b.jsx)(X,{})]})})};i.a.render(Object(b.jsx)(a.a.StrictMode,{children:Object(b.jsx)(te,{})}),document.getElementById("root"))},69:function(e,t,n){}},[[282,1,2]]]);
//# sourceMappingURL=main.51cbe641.chunk.js.map