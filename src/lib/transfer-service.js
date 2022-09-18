import { get } from 'svelte/store';
import {
  getCustomerList,
  appendToList,
  getSelectedCustomer,
} from './customer-store';
import { partners, selectedPartner } from './partner-store';
import { deleteCustomer } from './customer-service';
import { deletePartner } from './partner-service';

export function transferCustomerToPartner() {
  const { id, ...othCustomerProps } = getCustomerList().find(
    (customer) => customer.id === getSelectedCustomer().id
  );
  partners.update(() => [
    ...get(partners),
    { id: `id-${+new Date()}`, ...othCustomerProps },
  ]);
  deleteCustomer(id);
}

export function transferPartnerToCustomer() {
  const { id, ...othPartnerProps } = get(partners).find(
    (partner) => partner.id === get(selectedPartner).id
  );

  appendToList({
    id: `id-${+new Date()}`,
    ...othPartnerProps,
  });
  deletePartner(id);
}
