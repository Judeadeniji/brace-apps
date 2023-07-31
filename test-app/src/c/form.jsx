
async function handleSubmission({ target }, method, action,type) {
  const formdata = new FormData(target);
  const actions = await action().m;
  const _method = matchMethod(method, actions);
  
  if(typeof _method != "function") return;
  
  await _method(new Request(action().p, { method: method, body: formdata }));
  
  if (type == "reset") target.reset();
}

function matchMethod(method, actions) {
  return actions[method];
}

export default function Form({ _key, action, method, type, children, ...props }) {
  return (
    <form {...props} method={method} key={_key || "component-form"} submit$preventDefault$={(ev) => handleSubmission(ev, method, action, type)}>
      {children}
    </form>
  )
}