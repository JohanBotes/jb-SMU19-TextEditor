import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Export a function we will use to POST to the database.
export const postDb = async (name, home, cell, email)  => {
  console.log('Post to the database');

  // Create a connection to the database database and version we want to use.
  const jateDB = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDB.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .add() method on the store and pass in the content.
  const request = store.add({ name: name, home_phone: home, cell_phone: cell, email: email });

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};
;

// Export a function we will use to GET to the database.
export const getDb = async (content) => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const jateDB = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDB.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  const request = store.get({id: 1, content:content });

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result.value;
};

export const putDb = async (content) => { 
  console.log('PUT to the database');
    const jateDB = await openDB('jate', 1);
    const text = jateDB.transaction('jate', 'readwrite');
    const store = text.objectStore('jate');
    const request = store.put({ id: 1, content: content });
    const result = await request;
    console.log('Jate info data saved to the database', result);
  };

// Export a function we will use to DELETE to the database.
export const deleteDb = async (id) => {
  console.log('DELETE from the database', id);

  // Create a connection to the database database and version we want to use.
  const jateDB = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDB.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .delete() method to get all data in the database.
  const request = store.delete(id);

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

// Start the database.
initdb();
