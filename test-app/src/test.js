import { createData, useFreezeCallback } from "@mejor";

const count = createData(0)
const obj = createData({});

// mutate only works on arrays and object
obj.mutate({ name: 'Oluwaferanmi' });


count.subscribe(n => obj.mutate({ c: n }));

export function Counter() {
  console.log(obj) /*
   * { name: "Oluwaferanmi", c: <whatever the current count is> }
  */
  
  const value = count.value
  
  const inc = useFreezeCallback(() => {
    count.update(c => c + 1)
  })
  
  const dec = useFreezeCallback(() => {
    count.set(value - 1)
  })
  
  if(value > 10) count.reset()
  
  return <h1>Count is: {value}</h1>
}