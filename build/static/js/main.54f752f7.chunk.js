(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(14),l=t.n(c),u=t(4),o=t(2),i=function(e){return r.a.createElement("h1",null,e.text)},d=function(e){return r.a.createElement("input",{type:e.type,placeholder:e.placeholder,onChange:e.handleOnChange,id:e.id})},m=function(e){return r.a.createElement("div",null,"Filter by Name: ",r.a.createElement(d,{placeholder:"Name..",handleOnChange:e.handleFilterOnChange}))},f=function(e){return r.a.createElement("button",{onClick:e.handleClick,type:e.type},e.text)},h=function(e){return r.a.createElement("h2",null,e.text)},s=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(h,{text:"Add New Contact"}),r.a.createElement("form",null,r.a.createElement("div",null,"Name: ",r.a.createElement(d,{placeholder:"Name..",handleOnChange:e.handleAddOnChange,id:"nameInput0"}),r.a.createElement("br",null),"Number: ",r.a.createElement(d,{placeholder:"Number..",handleOnChange:e.handleAddNumberOnChange,id:"numberInput0"})),r.a.createElement("div",null,r.a.createElement(f,{type:"submit",handleClick:e.handleAddClick,text:"Add"}))))},p=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(h,{text:"Numbers"}),e.personsToShow.map((function(n,t){return r.a.createElement("div",{key:t},n.name," ",n.number," ",r.a.createElement(f,{text:"delete",handleClick:function(){return e.handleDeleteClick(n.id,n.name)}}))})))},b=t(3),E=t.n(b),g="/api/persons",v=function(){return E.a.get(g).then((function(e){return e.data}))},O=function(e){return E.a.post(g,e).then((function(e){return e.data}))},C=function(e,n){return E.a.put("".concat(g,"/").concat(e),n).then((function(e){return e.data}))},y=function(e){return E.a.delete("".concat(g,"/").concat(e)).then((function(e){return e}))},j=function(e){var n=e.message,t=e.notClassName;return null===n?null:r.a.createElement("div",{className:t},n)},w=(t(37),function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],l=Object(a.useState)(""),d=Object(o.a)(l,2),f=d[0],h=d[1],b=Object(a.useState)(""),E=Object(o.a)(b,2),g=E[0],w=E[1],N=Object(a.useState)(t),k=Object(o.a)(N,2),x=k[0],A=k[1],I=Object(a.useState)(null),S=Object(o.a)(I,2),D=S[0],F=S[1],B=Object(a.useState)(null),T=Object(o.a)(B,2),J=T[0],L=T[1];Object(a.useEffect)((function(){v().then((function(e){c(e),A(e)})).catch((function(e){P("Error caught: ".concat(e),"error")}))}),[]);var M=function(){h(""),w(""),document.getElementById("nameInput0").value="",document.getElementById("numberInput0").value=""},P=function(e,n){F(e),L(n),setTimeout((function(){F(null),L(null)}),5e3)};return r.a.createElement("div",null,r.a.createElement(i,{text:"Phonebook"}),r.a.createElement(j,{message:D,notClassName:J}),r.a.createElement(m,{handleFilterOnChange:function(e){var n=t.filter((function(n){return n.name.toLowerCase().includes(e.target.value.toLowerCase())}));A(n)}}),r.a.createElement(s,{handleAddOnChange:function(e){h(e.target.value)},handleAddNumberOnChange:function(e){w(e.target.value)},handleAddClick:function(e){if(e.preventDefault(),""===f)alert("Input Name");else if(""===g)alert("Input Number");else{var n={name:f,number:g};if(t.some((function(e){return e.name===f}))){var a="".concat(f," is already in the phonebook. Do you want to replace the old number with a new one?");if(window.confirm(a)){var r=t.find((function(e){return e.name===f})),l=Object(u.a)(Object(u.a)({},r),{},{number:g});C(r.id,l).then((function(e){c(t.map((function(n){return n.id!==r.id?n:e}))),A(t.map((function(n){return n.id!==r.id?n:e}))),M(),P("Updated ".concat(f),"success")})).catch((function(e){console.log(e),console.log(r.id),c(t.filter((function(e){return e.id!==r.id}))),A(t.filter((function(e){return e.id!==r.id}))),P("".concat(f," has already been removed from the server"),"error")}))}}else console.log("step0"),O(n).then((function(e){c(t.concat(e)),A(t.concat(e)),M(),P("Added ".concat(f),"success")})).catch((function(e){console.log(e.response.data),P("".concat(e.response.data.error),"error")}))}}}),r.a.createElement(p,{personsToShow:x,handleDeleteClick:function(e,n){var a="Do you really want to delete ".concat(n,"?");window.confirm(a)&&y(e).then((function(n){c(t.filter((function(n){return n.id!==e}))),A(t.filter((function(n){return n.id!==e})))})).catch((function(e){P("".concat(n," has already been removed from the server"),"error")}))}}))});l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null)),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.54f752f7.chunk.js.map