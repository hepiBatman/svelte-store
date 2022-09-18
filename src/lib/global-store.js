import { writable, derived } from 'svelte/store';
import { get } from 'svelte/store';

export const customerListCollectionStore = writable([]);
export const activeCustomerListNameStore = writable(null);

function getActiveCustomerListStore(
  activeCustomerListName = get(activeCustomerListNameStore)
) {
  return get(customerListCollectionStore).find((customerListStore) => {
    return get(customerListStore).name === activeCustomerListName;
  });
}

export const customerListCollection = derived(
  customerListCollectionStore,
  ($customerListCollection) => {
    return $customerListCollection.map((customerListStore) =>
      get(customerListStore)
    );
  }
);

export const activeCustomerListStore = derived(
  activeCustomerListNameStore,
  ($activeCustomerListNameStore) => {
    console.log('asdf');
    return getActiveCustomerListStore($activeCustomerListNameStore);
  }
);

export function activeCustomerList() {
  return get(get(activeCustomerListStore));
}

let activeCustomerListStoreForUpdate;
export function getActiveCustomerListStoreForUpdate() {
  if (
    !activeCustomerListStoreForUpdate ||
    get(get(activeCustomerListStore)).name !==
      get(activeCustomerListStoreForUpdate).name
  ) {
    const activeCustomerListName = get(activeCustomerListNameStore);
    return (activeCustomerListStoreForUpdate = get(
      customerListCollectionStore
    ).find((customerListStore) => {
      return get(customerListStore).name === activeCustomerListName;
    }));
  }

  return activeCustomerListStoreForUpdate;
}

export function newCustomerListStore() {
  const customerListName = `Customer List ${
    get(customerListCollectionStore).length + 1
  }`;

  const newCustomerListStore = writable({
    name: customerListName,
    customers: [],
    selected: null,
  });
  appendToCustomerListCollection(newCustomerListStore);
  setActiveCustomerListName(customerListName);
}

export function setActiveCustomerListName(customerListName) {
  activeCustomerListNameStore.update(() => customerListName);
}

export function getActiveCustomerListName() {
  return get(activeCustomerListNameStore);
}

export function appendToCustomerListCollection(newCustomerListStore) {
  customerListCollectionStore.update(($customerListCollection) => [
    ...$customerListCollection,
    newCustomerListStore,
  ]);
}

export function getCustomerListCollection() {
  return get(customerListCollectionStore);
}
