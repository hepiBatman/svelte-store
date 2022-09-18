import { get } from 'svelte/store';
import {
  activeCustomerList,
  activeCustomerListStore,
  customerListCollectionStore,
  activeCustomerListNameStore,
  getActiveCustomerListStoreForUpdate,
} from './global-store';

// function activeCustomerListStore() {
//   const activeCustomerListName = get(activeCustomerListNameStore);
//   return get(customerListCollectionStore).find((customerListStore) => {
//     return get(customerListStore).name === activeCustomerListName;
//   });
// }

// function activeCustomerList() {
//   return get(activeCustomerListStore);
// }

export function getCustomerList() {
  return activeCustomerList().customers;
}

export function getSelectedCustomer() {
  const { customers, selected } = activeCustomerList();
  return customers.find((customer) => customer.id === selected);
}

export function setSelectedCustomer(customer) {
  getActiveCustomerListStoreForUpdate().update(($customerListStore) => ({
    ...$customerListStore,
    selected: customer ? customer.id : undefined,
  }));
}

export function findCustomerIndex(customerId) {
  return activeCustomerList().customers.findIndex(
    (customer) => customer.id === customerId
  );
}

export function findCustomer(customerId) {
  return activeCustomerList().customers.find(
    (customer) => customer.id === customerId
  );
}

export function addToList(index, ...customerList) {
  spliceList.call(null, index, 0, ...customerList);
}

export function appendToList(...customerList) {
  spliceList.call(
    null,
    activeCustomerList().customers.length,
    0,
    ...customerList
  );
}

export function updateToList(index, ...customerList) {
  spliceList.call(null, index, 1, ...customerList);
}

export function deleteFromList(...indices) {
  getActiveCustomerListStoreForUpdate().update(($customerList) => {
    return {
      ...$customerList,
      customers: $customerList.customers
        .slice()
        .filter((_, index) => !indices.includes(index)),
    };
  });
}

export function spliceList(startIndex, deleteCount, customer) {
  getActiveCustomerListStoreForUpdate().update(($customerList) => {
    const newList = $customerList.customers.slice();
    newList.splice(startIndex, deleteCount, customer);

    return { ...$customerList, customers: newList };
  });
}
