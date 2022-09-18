<script>
  import { partners, selectedPartner } from './partner-store';
  import {
    addPartner,
    updatePartner,
    deletePartner,
    getPartner,
    selectPartner,
  } from './partner-service';

  let editPartner;

  function selectPartnerEvent(id) {
    selectPartner(
      $selectedPartner && $selectedPartner.id === id
        ? undefined
        : getPartner(id)
    );
  }

  function editPartnerEvent(id) {
    editPartner = getPartner(id);
  }

  function updatePartnerEvent(id, newName) {
    updatePartner(id, newName);
    editPartner = undefined;
  }

  function deletePartnerEvent(id) {
    deletePartner(id);

    if (editPartner && editPartner.id === id) {
      editPartner = undefined;
    }
  }
</script>

<div>
  <ul style="border: solid 1px #ddd;min-height: 300px;min-width: 100px;">
    {#each $partners as partner (partner.id)}
      <li
        style={$selectedPartner && $selectedPartner.id === partner.id
          ? 'border:solid 1px orange;'
          : ''}
        on:click={() => selectPartnerEvent(partner.id)}
      >
        <span>{partner.name}</span>
        <button on:click={() => editPartnerEvent(partner.id)}>Edit</button>
        <button on:click={() => deletePartnerEvent(partner.id)}>Delete</button>
      </li>
    {/each}
  </ul>
  <button on:click={() => addPartner(`name-p${+new Date()}`)}>+</button>

  {#if editPartner}
    <div>
      <input type="text" bind:value={editPartner.name} />
      <button
        on:click={() => updatePartnerEvent(editPartner.id, editPartner.name)}
        >Submit</button
      >
    </div>
  {/if}
</div>

<style>
  ul {
    list-style: none;
    padding: 0;
  }

  li :hover {
    cursor: pointer;
  }
</style>
