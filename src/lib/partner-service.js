import { partners, selectedPartner } from './partner-store';
import { get } from 'svelte/store';

export function addPartner(partnerName) {
  partners.update((partnerList) => [
    ...partnerList,
    { id: `id-${+new Date()}`, name: partnerName },
  ]);
}

export function updatePartner(id, newPartnerName) {
  const selectedPartnerIdx = get(partners).findIndex(
    (partner) => partner.id === id
  );
  partners.update(() => [
    ...get(partners).slice(0, selectedPartnerIdx),
    { id, name: newPartnerName },
    ...get(partners).slice(selectedPartnerIdx + 1),
  ]);
}

export function deletePartner(id) {
  const partnerIdx = get(partners).findIndex((partner) => partner.id === id);
  if (partnerIdx < 0) {
    return;
  }

  partners.update(() => [
    ...get(partners).slice(0, partnerIdx),
    ...get(partners).slice(partnerIdx + 1),
  ]);

  const selectedPartnerDt = get(selectedPartner);
  if (selectedPartnerDt && id === selectedPartnerDt.id) {
    selectPartner(undefined);
  }
}

export function getPartner(id) {
  return get(partners).find((partner) => partner.id === id);
}

export function selectPartner(partner) {
  selectedPartner.update(() => partner);
}
