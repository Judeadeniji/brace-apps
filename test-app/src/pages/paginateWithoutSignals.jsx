import { use, useEffect, useRef, Component, useData } from "@mejor";
import { Link } from "@mejor/router"

export const cache = false;

export function Metadata() {
  return {
    title: "Test App For use() Hook",
    description: "Testing the use() hook in Mejor Framework",
  };
}

const totalItems = 27; // Total number of items in the data

// Mock data for fetchData function with pagination
function fetchData(page = 1) {
  const itemsPerPage = 5; // Number of items per page

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const data = [];

  for (let i = startIndex; i < endIndex; i++) {
    data.push({
      id: i + 1,
      title: `Item ${i + 1}`,
      description: `Description for Item ${i + 1}`,
    });
  }

  return new Promise((resolve, reject) => {
    const e = Math.floor(Math.random() * 10)
    setTimeout(function () {
      // if (e > 5) reject('Failed to Fetch')
      resolve({
        items: data,
        currentPage: page,
        totalPages: Math.ceil(totalItems / itemsPerPage),
      });
    }, 900);
  });
}

// Data component for handling data and pagination
function DataComponent() {
  const currentPage = useData(1);
  console.log(currentPage)
  alert(`current page ${currentPage}`)
  const { data, error, invalidate } = use(fetchData(currentPage?.value || 1));

  const invalidateRef = useRef(invalidate);
  useEffect(() => {
    invalidateRef.current = invalidate;
  }, [invalidate]);

  const handleRefresh = () => {
    invalidateRef.current({
      silent: false,
    });
  };

  useEffect(() => currentPage?.subscribe ? currentPage.subscribe(handleRefresh) : undefined , [currentPage?.value || 1]);

  const handleNextPage = () => {
    currentPage.update((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    currentPage.update((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div class="grid gap-4 mt-4">
      {data ? (
          <div class="rounded border h-[500px]" key="data">
            {data.items.map((item) => (
              <div key={item.id} class="m-1 p-4 rounded">
                <h1 class="text-xl font-bold">{item.title}</h1>
                <p class="mt-2">{item.description}</p>
              </div>
            ))}
          </div>
      ) : error ? (
        <div class="border p-4 rounded text-red-500 flex font-semibold justify-center items-center text-md h-[500px]">{error}</div>
      ) : (
        <div class="border flex justify-center items-center text-md p-4 rounded h-[500px]">Loading...</div>
      )}
      <p class="text-center">Current Page: {currentPage?.value || 1}</p>
      <p class="text-center">Total Pages: {totalItems}</p>
      
      <Buttons {...{
        handleRefresh,
        handlePrevPage,
        handleNextPage,
        data
      }} />
    </div>
  );
}

function Buttons({
  handleRefresh,
  handlePrevPage,
  handleNextPage,
  data
}) {
  return (
    <div class="flex items-center justify-between flex-nowrap mt-4">
      <button
        class="border border-gray-300 rounded p-2 disabled:opacity-50"
        on:click={handlePrevPage}
        disabled={!data?.currentPage || data?.currentPage === 1}
      >
        Previous Page
      </button>
      <button
        class="border border-gray-300 rounded p-2 disabled:opacity-50"
        on:click={handleNextPage}
        disabled={data?.currentPage === data?.totalPages}
      >
        Next Page
      </button>
      <button
        class="border border-gray-300 rounded p-2 disabled:opacity-50"
        on:click={handleRefresh}
      >
        Refresh Data
      </button>
    </div>
  )
}

export default Component(function App() {
  return (
    <div key="App" class="mx-auto max-w-3xl px-4">
      <h1 class="text-3xl font-bold mt-3">Mock Data List</h1>
      <Link to="/page-with-signal">
        Try with Signals
      </Link>
      <DataComponent />
    </div>
  );
})
