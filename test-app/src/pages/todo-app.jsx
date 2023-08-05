import { Component as box, reactive, createData } from "@mejor";
import { fade, slide } from "@app/animations";


export function Metadata () {
  
  return {
    title: "Simple Todo App"
  }
}


const todos = createData([]);

const todo = reactive('');

const completed = reactive(false);

function handleSubmit({ target }) {
  todos.mutate([
    {
      todo: todo.value,
      completed: false
    }
  ]);
  
  target.reset();
}

function toggleCompleted({ isChecked, name }) {
  const i = Number(name);
  
  todos.update(todos => {
    const target = todos[i];
     isChecked ? (target.completed = true) :
      (target.completed = false);
    return [...todos];
  });
}


const TodoForm = () => {
  return (
    <form submit$preventDefault$={handleSubmit}>
      <input class="bg-gray-100 focus:outline-0 focus:bg-blue-50 text-black p-2 rounded-md w-full" type="text" required name="todo" sync:value={todo} />
    </form>
  )
}

const TodoItem = box(({ todo, _key }) => (
  <div use:animation={[fade, slide]} key={_key} class="bg-gray-200 flex items-center gap-x-2 m-2 text-black p-2 rounded-md">
      <input checked={todo.completed} type="checkbox" name={`${_key}`} bind:checked={toggleCompleted} />
      <p class="text-md">{todo.todo}</p>
  </div>
))

export default () => (
  <main class="w-full" key="todo-app">
    <div class="w-[90%] h-[500px] mt-6 mx-auto border-2 rounded-2xl overflow-y-scroll">
      <div class="border-b-2 w-full p-2 pb-0">
        <TodoForm />
        
        <div class="flex px-2 justify-between items-center h-[50px] mt-2">
          <p class="text-md font-bold">
            Todos
          </p>
          
          <form class="flex items-center justify-between gap-x-3">
            <label for="completed" class="text-md font-bold">
              Show Completed
            </label>
            <input name="completed" type="checkbox" sync:checked={completed} />
          </form>
        </div>
      </div>
      
      <div class="w-full px-1 h-full gap-y-2">
        {
          (!completed.value ? todos.value :  todos.value.filter(todo => todo.completed)).map((todo, i) => (
            <TodoItem _key={i} todo={todo} />
          ))
       }
       <div/>
      </div>
    </div>
  </main>
)