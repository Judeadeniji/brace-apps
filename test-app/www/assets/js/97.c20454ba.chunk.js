(self.webpackChunkBraceJs=self.webpackChunkBraceJs||[]).push([[97],{9097:(e,t,l)=>{"use strict";l.r(t),l.d(t,{Metadata:()=>o,default:()=>f});var a=l(7336),c=l(8168);const o=()=>({title:"Simple Todo App"}),n=(0,c.getLocalStorage)("totdos"),d=(0,a.createData)(n||[]),r=(0,a.reactive)("",{silent:!0}),s=(0,a.reactive)(!1);function m(){d.mutate([{id:crypto.randomUUID(),todo:r.value,completed:!1}]),r.value=""}function p({isChecked:e,name:t}){const l=t;d.update((t=>t.map((t=>t.id===l?{...t,completed:e}:t))))}d.subscribe((e=>{(0,c.setLocalStorage)("totdos",e)}));const u=(0,a.Component)((()=>createElement("form",{submit$preventDefault$:m},createElement("input",{class:"bg-gray-100 focus:outline-0 focus:bg-blue-50 text-black p-2 rounded-md w-full",type:"text",required:!0,name:"todo","sync:value":r})))),i=(0,a.Component)((({todo:e})=>createElement("div",{key:e.id,class:"bg-gray-200 flex items-center gap-x-2 m-2 text-black p-2 rounded-md"},createElement("input",{checked:e.completed,type:"checkbox",name:e.id,"bind:checked":p}),createElement("p",{class:"text-md"},e.todo)))),f=()=>createElement("main",{class:"w-full",key:"todo-app"},createElement("div",{class:"w-[90%] h-[500px] mt-6 mx-auto border-2 rounded-2xl overflow-y-scroll"},createElement("div",{class:"border-b-2 w-full p-2 pb-0"},createElement(u,null),createElement("div",{class:"flex px-2 justify-between items-center h-[50px] mt-2"},createElement("p",{class:"text-md font-bold"},"Todos"),createElement("form",{class:"flex items-center justify-between gap-x-3"},createElement("label",{for:"completed",class:"text-md font-bold"},"Show Completed"),createElement("input",{name:"completed",type:"checkbox","sync:checked":s})))),createElement("div",{key:{},class:"w-full px-1 gap-y-2"},(s.value?d.value.filter((e=>e.completed)):d.value).map((e=>createElement(i,{todo:e}))),createElement("div",null))))},8168:(e,t,l)=>{e.exports=l(3985)}}]);