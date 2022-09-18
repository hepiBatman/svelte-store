<script>
  import {
    transferCustomerToPartner,
    transferPartnerToCustomer,
  } from './transfer-service';
  import { selectedPartner } from './partner-store';

  export let activeCustomerListStore;
</script>

<div>
  <div>
    <button
      disabled={!$activeCustomerListStore || !$activeCustomerListStore.selected}
      on:click={() => transferCustomerToPartner()}>&gt;&gt;</button
    >
  </div>
  <div>
    <button
      disabled={!$activeCustomerListStore || !$selectedPartner}
      on:click={() => transferPartnerToCustomer()}>&lt;&lt;</button
    >
  </div>
</div>
