<script lang="ts">
  import TechnologyItem from "./TechnologyItem.svelte";
  import OperatorCheckBox from "./OperatorCheckBox.svelte";

  export let technologiesListData: Array<Technology>;
  export let operatorsListData: Array<Operator>;
</script>

<div class="technologies-list">
  {#each technologiesListData as technology}
    <TechnologyItem {technology} on:select-technology />
  {/each}
</div>

<style lang="scss">
  .technologies-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px 10px;
    @media (max-width: 760px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
