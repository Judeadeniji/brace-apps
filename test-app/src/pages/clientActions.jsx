import { Component as box, reactive } from "@mejor";
import Form from "@app/c/form";
import { store } from "@app/store";

export function Metadata () {
  return {
    title: "Testing Client Side Actions"
  };
}

function mUrl(path) {
  return () => ({
    m: import("@app/" + path),
    p: path
  });
}

const ResponseBox = () => {
  const formResponse = Object.entries(store.getState().value);
  
  if(!formResponse.length) return (
    <p class="mt-3 font-semibold text-center text-md">
      No Response Yet
    </p>
   );
  
  return (
    <div class="border h-full w-full rounded-md">
      <div class="mb-3 mt-2 ml-2">
        <h1 class="text-2xl font-bold text-black">Response</h1>
        <div class="w-[96%] mt-2 mx-auto border h-full rounded-md">
          <table class="table-auto w-full">
            <tbody class="divide-y">
              {formResponse.map(([key, value]) => (
                <tr key={key} class="py-1 divide-x">
                  <td class="text-xl font-semibold p-1 text-center">{key}</td>
                  <td class="p-2 text-center">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


const inputs = reactive({
  "Field 1": ""
})

export default (() => {
  const fields = Object.entries(inputs.value);
  return (
    <div class="flex flex-col gap-y-4 items-center justify-center mx-2">
      <Form type="reset" method="POST" action={mUrl("actions/client-server")} _key="test-form" class="border mt-2 w-full rounded-md px-2 py-3">
        <div class="mb-3">
          <h1 class="text-2xl font-bold text-black">
            Client Side Form
          </h1>
        </div>
        {
          fields.map(([key, value]) => (
            <div class="w-full" key={key}>
              <label class="font-semibold text-md mb-1 ml-1" for="field_1">{key}</label>
              <input name={key} type="text" class="rounded border h-[40px] w-full mb-3 px-1 focus:border-2 focus:border-black focus:outline-0" />
            </div>
          ))
        }
        <button type="submit" class="border border-black h-[40px] w-[100px] rounded bg-[#000] mr-2 text-white font-semibold">
          Submit
        </button>
        <button type="button" class="border border-black h-[40px] w-[100px] rounded bg-white font-semibold" click$={() => {
          const l = fields.length;
          inputs.value = {
            ...inputs.value,
            [`Field ${l + 1}`]: ""
          }
        }}>
          + Add Input
        </button>
      </Form>
      <ResponseBox />
    </div>
  );
});