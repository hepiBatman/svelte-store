import {
  getCustomerList,
  getSelectedCustomer,
  setSelectedCustomer,
  findCustomerIndex,
  appendToList,
  updateToList,
  deleteFromList,
} from './customer-store';

export function addCustomer(customerName) {
  appendToList({
    id: `id-${+new Date()}`,
    name: customerName,
  });
}

export function updateCustomer(id, newCustomerName) {
  const selectedCustomerIdx = findCustomerIndex(id);
  updateToList(selectedCustomerIdx, {
    id,
    name: newCustomerName,
  });
}

export function deleteCustomer(id) {
  const toDeleteCustomerIdx = findCustomerIndex(id);
  if (toDeleteCustomerIdx < 0) {
    return;
  }

  const selectedCustomerDt = getSelectedCustomer();
  deleteFromList(toDeleteCustomerIdx);

  if (selectedCustomerDt && id === selectedCustomerDt.id) {
    selectCustomer(undefined);
  }
}

export function getCustomer(id) {
  return getCustomerList().find((customer) => customer.id === id);
}

export function selectCustomer(customer) {
  setSelectedCustomer(customer);
}
