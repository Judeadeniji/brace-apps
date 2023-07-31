import { useReactive, reactive, createData, Component, useEffect as effect } from "@mejor"
import { ErrorBoundary } from "@mejor/router"

export function Metadata() {
  return {
    title: "My Test App || 😏 😏",
    charset: 'utf-8',
    lang: "en-GB"
  }
}

const c = reactive(0)
const c_1 = createData(0)

const Counter = () => {
  const r = useReactive({
    count: 0
  });
  
  effect(() => {
    const i = setInterval(function() {
      c.value++
      c_1.update(_ => _ + 1)
      r.count++
    throw new Error("🔴")
    }, 1000);
    
    
    return () => {
      clearInterval(i)
    }
  }, [r.count, c.value, c_1.value])
  
  return (
    <ErrorBoundary fallback={e => <p>{e.message}</p>}>
    <h1 touchend$={() => {
      c.value++
      r.count++
      c_1.update(_ => _ + 1)
    }}>
    {r.count}
    {" -> "}
    {c.value}
    {" -> "}
    {c_1.value}
    </h1>
   </ErrorBoundary>
  )
}

export default (() => {
  return (
    <Counter />
  )
})