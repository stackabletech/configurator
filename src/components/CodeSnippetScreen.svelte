<script lang="ts">
  import { afterUpdate } from "svelte";
  import { inview } from "svelte-inview";
  import Typewriter from "svelte-typewriter";

  export let selectedTechnologies: Array<String>;
  export let selectedOperators: Array<String>;
  export let config: Config;

  let codeSnippetCommandsDefaults: Array<String> = [];
  $: codeSnippetCommandsDefaults = [config.command, config.script];

  let codeSnippetCommandsList: Array<String> = [];
  $: codeSnippetCommandsList = [];

  let codeSnippetText: string;
  $: codeSnippetText;

  afterUpdate(() => {
    codeSnippetCommandsList = [
      ...codeSnippetCommandsDefaults,
      ...selectedTechnologies,
      ...selectedOperators,
    ];
    codeSnippetText = codeSnippetCommandsList.join(" ");
  });

  let copied: boolean;
  $: copied = false;

  const copyToClipboard = async (str: string) => {
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 1000);
  };

  // Typewriter

  let isInView;
  let hideTypes = true;
  const typeWriterDone = () => {
    setTimeout(() => {
      hideTypes = false;
    }, 2000);
  };
</script>

<div
  class="snippet-screen"
  use:inview={{ unobserveOnEnter: true, rootMargin: "-20%" }}
  on:change={({ detail }) => {
    isInView = detail.inView;
  }}
>
  {#if isInView}
    {#if hideTypes}
      <Typewriter on:done={() => typeWriterDone()} interval={80}>
        <span> {codeSnippetText} </span>
      </Typewriter>
    {:else}
      <span> {codeSnippetText} </span>
    {/if}
    <div
      class={copied === true ? "text-copied-layer show" : "text-copied-layer"}
    >
      <span class="text-copied"> Copied </span>
    </div>
  {/if}
  <div class="copy-icon" on:click={() => copyToClipboard(codeSnippetText)}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
      <path
        d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
      />
    </svg>
  </div>
</div>

<!-- <div class="copy-button">
  <button on:click={() => copyToClipboard(codeSnippetText)}>
    Copy code snippet
  </button>
</div> -->
<style lang="scss">
  .snippet-screen {
    padding: 35px 40px;
    background: #272e3a;
    border-radius: 4px;
    color: white;
    font-family: "Roboto Mono";
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 40px;
    margin-bottom: 20px;
    position: relative;
    min-height: 310px;
    @media (max-width: 760px) {
      font-size: 16px;
      line-height: 20px;
      min-height: auto;
    }
  }

  .copy-icon {
    position: absolute;
    right: 5px;
    bottom: -3px;
    width: 20px;
    cursor: pointer;
    @media (max-width: 760px) {
      right: 5px;
      bottom: 4px;
    }
  }

  .copy-button {
    button {
      text-align: center;
      padding: 16px 32px;
      background: #0080bd;
      border-radius: 4px;
      padding: 20px;
      color: white;
      text-transform: uppercase;
      border-color: #0080bd;
      cursor: pointer;
      box-shadow: none;
      border: 0;
      outline: none;

      font-family: "Titillium Web", Sans-serif;
      font-size: 14px;
      font-weight: 600;
      font-style: normal;
      text-decoration: none;
      line-height: 1.5em;
      letter-spacing: 0.5px;

      &:hover,
      &:focus {
        background: #000;
      }

      &:focus {
        outline: 1px solid rgba(#000, 0.9);
        outline-offset: -4px;
      }

      &:active {
        transform: scale(0.99);
      }
    }
    @media (max-width: 760px) {
      text-align: center;
    }
  }

  .text-copied-layer {
    background-color: rgba(#272e3a, 0.5);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s;

    &.show {
      opacity: 1;
      z-index: 1000;
      transition: opacity 0.4s;
    }
  }
  .text-copied {
    background-color: rgba(#b90069, 1);
    color: white;
    border-radius: 5px;
    font-size: 11px;
    text-align: center;
    padding: 0px 15px;
    text-transform: uppercase;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: block;
    transition: all 0.7s ease-in-out;
  }
</style>
