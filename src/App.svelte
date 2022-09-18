<script>
  import CustomerLists from './lib/CustomerLists.svelte';
  import CustomerPage from './lib/CustomerPage.svelte';
  import TransferPage from './lib/TransferPage.svelte';
  import PartnerPage from './lib/PartnerPage.svelte';
  import {
    customerListCollectionStore,
    activeCustomerListStore,
  } from './lib/global-store';
</script>

<main>
  <div style="display: inline-block;">
    <CustomerLists />
    {#if $customerListCollectionStore.length}
      {#each $customerListCollectionStore as customerListStore}
        <CustomerPage {customerListStore} />
      {/each}
    {:else}
      <ul style="border: solid 1px #ddd;min-height: 300px;min-width: 100px;" />
      <button />
    {/if}
  </div>
  <div style="display: inline-block;">
    <TransferPage activeCustomerListStore={$activeCustomerListStore} />
  </div>
  <div style="display: inline-block;">
    <PartnerPage />
  </div>
</main>
