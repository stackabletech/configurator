<script lang="ts">
  let {
    selectedTechnologies,
    selectedOperators,
    config
  } = $props();

  let codeSnippetCommandsDefaults: Array<string> = $derived([config.command, config.script]);
  let codeSnippetCommandsList: Array<string> = $derived([...codeSnippetCommandsDefaults, ...selectedTechnologies, ...selectedOperators,]);
  let codeSnippetText: string = $derived(codeSnippetCommandsList.join(" "));
  let copied: boolean = $state(false);

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
</script>

<div
  class="snippet-screen"
>
  <span> {codeSnippetText} </span>
  <div class={copied === true ? "text-copied-layer show" : "text-copied-layer"}>
    <span class="text-copied"> Copied </span>
  </div>
  <button class="copy-icon" aria-label="Copy to clipboard" onclick={() => copyToClipboard(codeSnippetText)}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 20 20"
      fill="white"
    >
      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
      <path
        d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
      />
    </svg>
  </button>
</div>

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
    background: none;
    border: none;
    padding: 0;
    z-index: 1001; /* Ensure it's above other elements */
    @media (max-width: 760px) {
      right: 5px;
      bottom: 4px;
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
