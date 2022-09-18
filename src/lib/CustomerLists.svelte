<script>
  import {
    newCustomerListStore,
    customerListCollection,
    getActiveCustomerListName,
    setActiveCustomerListName,
  } from './global-store';
</script>

<select on:change={(ev) => setActiveCustomerListName(ev.target.value)}>
  <option>Pick one</option>
  {#each $customerListCollection as customerList}
    <option
      selected={customerList.name === getActiveCustomerListName()}
      value={customerList.name}>{customerList.name}</option
    >
  {/each}
</select>

<button on:click={() => newCustomerListStore()}>+</button>
