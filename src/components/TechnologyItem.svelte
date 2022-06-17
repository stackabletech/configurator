<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const imagesBaseUrl = process.env.IMAGES_BASE_URL;

  export let technology: Technology;
  let itemActive: boolean = false;
  const dispatch = createEventDispatcher();

  function selectTechnology(id: number) {
    itemActive = !itemActive;
    dispatch("select-technology", { id: technology.id });
  }
</script>

<div class="technology-item">
  <button
    class="technology-item-button"
    class:item-active={itemActive}
    on:click={() => selectTechnology(technology.id)}
  >
    <div class="itm-logo-container">
      <span class="item-logo">
        <img src={imagesBaseUrl + technology.img} alt={technology.name} />
      </span>
      <span class="item-logo active">
        <img src={imagesBaseUrl + technology.imgActive} alt={technology.name} />
      </span>
    </div>
  </button>
</div>

<style lang="scss">
  .technology-item {
    text-align: center;
  }

  .technology-item-button {
    border: none;
    background: #e7e8eb;
    border-radius: 4px;
    text-align: center;
    padding: 12px 16px;
    display: inline-block;
    width: 100%;
    transition: all 0.3s;
    cursor: pointer;
    min-height: 70px;
    margin: 0;

    @media (hover: hover) {
      &:hover {
        background: rgb(39, 46, 58);
  
        .item-logo {
          opacity: 0;
          visibility: hidden;
  
          &.active {
            opacity: 1;
            visibility: visible;
          }
        }
        &.item-active {
          background: #b90069;
        }
      }
      
    }

    &.item-active {
      background: #b90069;
      .item-logo {
        opacity: 0;
        visibility: hidden;

        &.active {
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }

  .itm-logo-container {
    position: relative;
  }
  .item-logo {
    opacity: 1;
    visibility: visible;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.3s;
    img {
      max-width: 100%;
    }
    &.active {
      position: absolute;
      opacity: 0;
      visibility: hidden;
    }
  }

</style>
