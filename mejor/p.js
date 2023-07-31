const { Subject, distinctUntilChanged } = require("rxjs");


function _createData(initialData) {
  if (typeof initialData === 'undefined') {
    console.warn('Initial data is not provided. Falling back to an empty object.');
    initialData = {};
  }

  let _data = initialData;
  let valueType = typeof initialData;
  let observers = [];

  function DataContainer(value) {
    this.value = value;
  }

  DataContainer.prototype.set = function (newValue, { silent } = { silent: false }) {
    if (typeof silent !== 'boolean') {
      console.error('silent option must be a boolean', `reset({ silent: Boolean<> })`);
      return;
    }

    this.value = newValue;
    if (!silent) {
      this.notifyObservers();
    }
  };

  DataContainer.prototype.update = function (callback, { silent } = { silent: false }) {
    if (typeof silent !== 'boolean') {
      console.error('silent option must be a boolean', `reset({ silent: Boolean<> })`);
      return;
    }
    if (typeof callback !== 'function') {
      console.error(`update() received an argument of type ${typeof callback}, expected a function`);
      return;
    }

    const newValue = callback(this.value);
    if (typeof newValue !== valueType) {
      console.error(`Callback in update() must return a value of type ${valueType}, got ${typeof newValue} instead`);
      return;
    }

    this.value = newValue;
    if (!silent) {
      this.notifyObservers();
    }
  };

  DataContainer.prototype.mutate = function (mutator, { silent } = { silent: false }) {
    if (typeof silent !== 'boolean') {
      console.error('silent option must be a boolean', `reset({ silent: Boolean<> })`);
      return;
    }
    if (typeof mutator === 'function') {
      this.value = mutator(this.value);
    } else if (Array.isArray(mutator)) {
      if (Array.isArray(this.value)) {
        this.value.push(...mutator);
      } else {
        console.error(`mutator() expected an array as mutator but got a type ${typeof mutator}`);
        return;
      }
    } else if (typeof mutator === 'object' && !Array.isArray(mutator)) {
      if (typeof this.value === 'object' && !Array.isArray(this.value)) {
        Object.assign(this.value, mutator);
      } else {
        console.error(`mutator() expected an object as mutator but got a type ${typeof mutator}`);
        return;
      }
    } else {
      console.error('Mutator must be a function, an array, or a non-array object, received ' + typeof mutator + ' instead');
      return;
    }

    if (silent) {
      return;
    }

    this.notifyObservers();
  };

  DataContainer.prototype.reset = function ({ silent } = { silent: false }) {
    if (typeof silent !== 'boolean') {
      console.error('silent option must be a boolean', `reset({ silent: Boolean<> })`);
      return;
    }

    this.value = _data;
    if (!silent) {
      this.notifyObservers();
    }
  };

  DataContainer.prototype.subscribe = function (nextCallback, errorCallback, completeCallback) {
    if (typeof nextCallback !== 'function') {
      console.error('Next callback must be a function');
      return;
    }
    if (errorCallback && typeof errorCallback !== 'function') {
      console.error('Error callback must be a function');
      return;
    }
    if (completeCallback && typeof completeCallback !== 'function') {
      console.error('Complete callback must be a function');
      return;
    }

    const observer = { next: nextCallback, error: errorCallback, complete: completeCallback };
    observers.push(observer);

    return () => {
      const index = observers.indexOf(observer);
      if (index !== -1) {
        observers.splice(index, 1);
      }
    };
  };

  DataContainer.prototype.notifyObservers = function () {
    for (const observer of observers) {
      try {
        observer.next(this.value);
      } catch (error) {
        if (observer.error) {
          observer.error(error);
        } else {
          console.error(error);
        }
      }
    }
  };

  DataContainer.prototype.error = function (error) {
    for (const observer of observers) {
      if (observer.error) {
        observer.error(error);
      } else {
        console.error(error);
      }
    }
  };

  DataContainer.prototype.complete = function () {
    for (const observer of observers) {
      if (observer.complete) {
        observer.complete();
      }
    }
  };

  Object.defineProperty(DataContainer.prototype, 'observers', {
    get: function () {
      return observers;
    },
  });

  const data = new DataContainer(initialData);

  const container = new Proxy(function DataContainer() {
    return data;
  }, {
    get(target, key) {
      return target()[key] || undefined;
    },
    set(target, key, value) {
      if (key !== 'value') return false;
      target()[key] = value;
      return true;
    },
    apply(target) {
      return target().value;
    },
  });
  
  container.subscribe(rr)

  return container;
}


const trackData = [];
const afterEffects = [];
const renderQue = [];
let current;
let idx = 0;
let ridx = 0;

function flush(a) {
  let c;
  while((c = a.shift())) {
    c();
  }
}

function dispatchHook(index) {
  if (!current) throw new Error("You've broken the hooks law");

  if (!current.h) {
    current.h = [index];
  } else if (!current.h.includes(index)) {
    current.h.push(index);
  }
}



function use(effect) {
  dispatchHook(1)
  let data;
  let error;
  const dataIdx = idx;
  const errorIdx = idx + 1;

  const updateState = (newData, newError) => {
    data = newData;
    error = newError;
    idx = 0;
  };

  const executeEffect = async (effect) => {
    try {
      const result = typeof effect === "function" ? await effect() : await Promise.resolve(effect);
      trackData[dataIdx] = result;
      trackData[errorIdx] = null;
      updateState(result, null);
    } catch (err) {
      trackData[dataIdx] = null;
      trackData[errorIdx] = err;
      updateState(null, err);
    }
    current.dirty = true;
    rr();
  };
  
  const invalidate = (options) => {
    const {
      timeout = 5 * 60 * 1000 /* five minutes */,
      silent = true
    } = options;
    if(timeout === 0 && silent) {
      executeEffect(effect)
    } else if (timeout > 0 && silent) {
      const i = setInterval(() => {
        executeEffect(effect)
        setTimeout(function() {
          clearInterval(i);
        }, timeout);
      }, timeout)
    } else if (!silent) {
      trackData[dataIdx] = undefined;
      trackData[errorIdx] = null;
    }
    
  }


  if (typeof trackData[dataIdx] === 'undefined') {
    executeEffect(effect);
  } else {
    data = trackData[dataIdx];
    error = trackData[errorIdx];
  }

  idx += 2;
  return { data: data || null, error: error, invalidate };
}


function useData(data) {
  dispatchHook(2)
  const _idx = idx;
  const _data = trackData[_idx] || _createData(data);
  
  trackData[_idx] = _data;
  
  const didChange = _data != trackData[_idx];
  
  if(didChange) {
    current.dirty = true;
  }

  idx++;
  return _data;
}

function effect(effectCallback, dependency = []) {
  dispatchHook(3)
  let _idx = idx;
  let cleanup = afterEffects[ridx];
  const oldDependency = trackData[_idx];
  let didChange = true;

  if (oldDependency) {
    didChange = dependency.some((dependent, index) => !Object.is(dependent, oldDependency[index]));
  }
    
    
  // Store effect object for the new effect
  if (didChange) {
    afterEffects[ridx] = effectCallback();
    current.dirty = true;
    current.skipEff = false;
    current.args = dependency
  } else {
    current.skipEff = true
  }
  
  trackData[_idx] = dependency;
  idx++;
  ridx++;
}

// Utility function to simulate asynchronous data fetching with random data
function fetchData() {
  const randomData = Math.random(); // Generate a random number
  return new Promise((resolve) => {
    setTimeout(() => resolve(`data is here: ${randomData}`), 10000);
  });
}

// Main function to process data and handle side effects
function processAndLogData(p) {
  const data = useData(1);
  const fetchedData = use(fetchData);

  effect(() => {
    data.value++
  }, [data()]);
  
  effect(() => {
    if (fetchedData.data) {
      fetchedData.invalidate({
        silent: false
      })
    }
    return () => ({})
  }, [fetchedData.data])

  console.log(p, "processAndLogData", data(), fetchedData.data || fetchedData.error);
}
function processAndLogData2(p) {
  const data = useData(1);
  const fetchedData = use(fetchData);

  effect(() => {
    data.value++
  }, [data()]);
  
  effect(() => {
    if (fetchedData.data) {
      fetchedData.invalidate({
        timeout: 4000
      })
    }
    return () => ({})
  }, [fetchedData.data])

  console.log(p, data(), fetchedData.data || fetchedData.error);
}
function processAndLogData3(p) {
  const data = useData(1);
  const fetchedData = use(fetchData);

  effect(() => {
    data.value++
  }, [data()]);
  
  effect(() => {
    if (fetchedData.data) {
      fetchedData.invalidate({
        timeout: 3000
      })
    }
    return () => console.log("say yeah")
  }, [fetchedData.data])

  console.log(p, data(), fetchedData.data || fetchedData.error);
}

function cleanComponent() {
  useData()
  effect(() => {
    return () => {
      
    }
  }, ["4"])
}

function rr() {
  current = processAndLogData;
  enq()
  current = processAndLogData2;
  enq()
  current = cleanComponent;
  enq();
  current = processAndLogData3;
  enq();
  
  renderQue.length = 0; 
}

function enq() {
    current("--->")
  
  renderQue.forEach(c => {
    if (c?.h?.includes(3)) {
      flush(afterEffects)
    }
    
    if (c?.dirty && c?.skipEff) {
      console.log(`${c.name} is not dirty`)
    }
    if (c?.dirty && !c?.skipEff) {
      console.log(`${c.name} is dirty`)
    }
  })
}

rr()