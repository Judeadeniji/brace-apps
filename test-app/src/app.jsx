import { useSignal, useEffect, Component, reactive } from '@mejor';
import { ErrorBoundary } from '@mejor/router';

export function Metadata() {
  return {
    title: "My Test App"
  };
}

const data = reactive(["Item 0"])
const loading = reactive(false);

// Function to generate fake data using JavaScript for loops
const generateFakeData = () => {
  const newData = [];
  for (let i = 0; i < 2; i++) {
    newData.push(`Item ${data.value.length + i + 1}`);
  }
  return newData;
};

// Simulate API call or data fetching
const fetchData = async () => {
  loading.value = true

  // Simulating a delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const newData = generateFakeData(); // Generate fake data using JavaScript for loops
  
  data.value = [...data.value, ...newData]
  
  loading.value = false;
}

const FakeData = (() => {

  const handleScroll = () => {
    if (
      window.innerHeight + window.pageYOffset >=
      document.documentElement.offsetHeight
    ) {
      // Reached the bottom of the page
      fetchData();
    }
  };


  useEffect(async () => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(fetchData, [])

  return (
    <div key="no bish">
    <div>
      {
        data.value.map(i => <h1 class="text-2xl my-1 h-screen w-full bg-yellow-100" key={i}>{i}</h1>)
      }
    </div>
    <div class:bg-amber-300>
       {loading.value ? <div key="loader">Loading more data...</div> : <comment />}
    </div>
    </div>
  );
});

function Fallback({ error }) {
  return <h1>Error: {error.message} {error.stack}</h1>;
}

const App = (props) => {
  return (
    <div className="main" key="root">
      <h1 className="text-4xl">Hello</h1>
      <ErrorBoundary fallback={(e) => <Fallback error={e} />}>
        <FakeData />
      </ErrorBoundary>
    </div>
  );
};

export default App;
