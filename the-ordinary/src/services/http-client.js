import { Http } from 'utiliti-js';

const client = new Http({
  retryDelay: 500,
  retryAttempt: 5
});

export default client;