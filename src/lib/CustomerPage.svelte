<script>
  import {
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomer,
    selectCustomer,
  } from './customer-service';
  import { activeCustomerListNameStore } from './global-store';

  export let customerListStore;

  let editCustomer;

  function selectCustomerEvent(id) {
    const isSelect = $customerListStore.selected !== id;
    selectCustomer(isSelect ? getCustomer(id) : undefined);
  }

  function editCustomerEvent(id) {
    editCustomer = getCustomer(id);
  }

  function updateCustomerEvent(id, newName) {
    updateCustomer(id, newName);
    editCustomer = undefined;
  }

  function deleteCustomerEvent(id) {
    deleteCustomer(id);

    if (editCustomer && editCustomer.id === id) {
      editCustomer = undefined;
    }
  }
</script>

{#if $customerListStore.name === $activeCustomerListNameStore}
  <div>
    <ul style="border: solid 1px #ddd;min-height: 300px;min-width: 100px;">
      {#if $customerListStore.customers}
        {#each $customerListStore.customers as customer (customer.id)}
          <li
            style={$customerListStore.selected &&
            $customerListStore.selected === customer.id
              ? 'border:solid 1px orange;'
              : ''}
            on:click={() => selectCustomerEvent(customer.id)}
          >
            <span>{customer.name}</span>
            <button on:click={() => editCustomerEvent(customer.id)}>Edit</button
            >
            <button on:click={() => deleteCustomerEvent(customer.id)}
              >Delete</button
            >
          </li>
        {/each}
      {/if}
    </ul>
    <button on:click={() => addCustomer(`name-c${+new Date()}`)}>+</button>

    {#if editCustomer}
      <div>
        <input type="text" bind:value={editCustomer.name} />
        <button
          on:click={() =>
            updateCustomerEvent(editCustomer.id, editCustomer.name)}
          >Submit</button
        >
      </div>
    {/if}
  </div>
{/if}

<style>
  ul {
    list-style: none;
    padding: 0;
  }

  li :hover {
    cursor: pointer;
  }
</style>
