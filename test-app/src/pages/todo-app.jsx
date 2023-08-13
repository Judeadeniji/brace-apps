import { Component as box, reactive, createData } from "@mejor";
import { setLocalStorage, getLocalStorage } from "@mejor/browser";
//import { fade, slide } from "@app/animations";

export const Metadata = () => ({ title: "Simple Todo App" });

const savedTodos = getLocalStorage('totdos');

const todos = createData(savedTodos || []);

// silent flag to minimize unnecessary re-render
const todo = reactive('', { silent: true });
const completed = reactive(false);

function handleSubmit() {
  todos.mutate([{ id: crypto.randomUUID(), todo: todo.value, completed: false }]);
  todo.value = '';
}

function toggleCompleted({ isChecked, name }) {
  const todoId = name;
  todos.update(todos => todos.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, completed: isChecked };
      }
      return todo;
    }));
}

// the big gun 🤣
todos.subscribe(newTodos => {
  setLocalStorage('totdos', newTodos);
});

const TodoForm = box(() => (
  <form submit$preventDefault$={handleSubmit}>
    <input class="bg-gray-100 focus:outline-0 focus:bg-blue-50 text-black p-2 rounded-md w-full" type="text" required name="todo" sync:value={todo} />
  </form>
));

const TodoItem = box(({ todo }) => (
  <div key={todo.id} class="bg-gray-200 flex items-center gap-x-2 m-2 text-black p-2 rounded-md">
    <input checked={todo.completed} type="checkbox" name={todo.id} bind:checked={toggleCompleted} />
    <p class="text-md">{todo.todo}</p>
  </div>
));

export default () => (
  <main class="w-full" key="todo-app">
    <div class="w-[90%] h-[500px] mt-6 mx-auto border-2 rounded-2xl overflow-y-scroll">
      <div class="border-b-2 w-full p-2 pb-0">
        <TodoForm />

        <div class="flex px-2 justify-between items-center h-[50px] mt-2">
          <p class="text-md font-bold">Todos</p>

          <form class="flex items-center justify-between gap-x-3">
            <label for="completed" class="text-md font-bold">Show Completed</label>
            <input name="completed" type="checkbox" sync:checked={completed} />
          </form>
        </div>
      </div>

      <div key={{}} class="w-full px-1 gap-y-2">
        {(!completed.value ? todos.value : todos.value.filter(todo => todo.completed)).map(todo => (
          <TodoItem todo={todo} />
        ))}
        <div />
      </div>
    </div>
  </main>
);
