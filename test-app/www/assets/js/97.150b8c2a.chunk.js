"use strict";(self.webpackChunkBraceJs=self.webpackChunkBraceJs||[]).push([[97,34],{1759:(e,t,a)=>{a.r(t),a.d(t,{fade:()=>l,slide:()=>c});const l={keyframes:[{opacity:.1},{opacity:1}],options:{duration:250,fill:"forwards"}},c={keyframes:[{transform:"translateY(30px)"},{transform:"translateY(0)"}],options:{duration:300,fill:"forwards",iteration:1}}},9097:(e,t,a)=>{a.r(t),a.d(t,{Metadata:()=>n,default:()=>u});var l=a(7336),c=a(1759);function n(){return{title:"Simple Todo App"}}const o=(0,l.createData)([]),r=(0,l.reactive)(""),s=(0,l.reactive)(!1);function d({target:e}){o.mutate([{todo:r.value,completed:!1}]),e.reset()}function m({isChecked:e,name:t}){const a=Number(t);o.update((t=>(t[a].completed=!!e,[...t])))}const i=()=>createElement("form",{submit$preventDefault$:d},createElement("input",{class:"bg-gray-100 focus:outline-0 focus:bg-blue-50 text-black p-2 rounded-md w-full",type:"text",required:!0,name:"todo","sync:value":r})),p=(0,l.Component)((({todo:e,_key:t})=>createElement("div",{"use:animation":[c.fade,c.slide],key:t,class:"bg-gray-200 flex items-center gap-x-2 m-2 text-black p-2 rounded-md"},createElement("input",{checked:e.completed,type:"checkbox",name:`${t}`,"bind:checked":m}),createElement("p",{class:"text-md"},e.todo)))),u=()=>createElement("main",{class:"w-full",key:"todo-app"},createElement("div",{class:"w-[90%] h-[500px] mt-6 mx-auto border-2 rounded-2xl overflow-y-scroll"},createElement("div",{class:"border-b-2 w-full p-2 pb-0"},createElement(i,null),createElement("div",{class:"flex px-2 justify-between items-center h-[50px] mt-2"},createElement("p",{class:"text-md font-bold"},"Todos"),createElement("form",{class:"flex items-center justify-between gap-x-3"},createElement("label",{for:"completed",class:"text-md font-bold"},"Show Completed"),createElement("input",{name:"completed",type:"checkbox","sync:checked":s})))),createElement("div",{class:"w-full px-1 h-full gap-y-2"},(s.value?o.value.filter((e=>e.completed)):o.value).map(((e,t)=>createElement(p,{_key:t,todo:e}))),createElement("div",null))))}}]);