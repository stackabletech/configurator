<script lang="ts">
  import TechnologyItem from "./TechnologyItem.svelte";

  interface Props {
    technologiesListData: Array<Technology>;
  }

  let { technologiesListData }: Props = $props();
</script>

<div class="technologies-list">
  {#each technologiesListData as technology (technology.id)}
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
