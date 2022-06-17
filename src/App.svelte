<script lang="ts">
  import TechnologiesList from "./components/TechnologiesList.svelte";
  import CodeSnippetScreen from "./components/CodeSnippetScreen.svelte";
  import OperatorCheckBox from "./components/OperatorCheckBox.svelte";

  import { onMount } from "svelte";

  let getConfiguratorData;
  const apiUrl = process.env.API_URL;

  onMount(async () => {
    const response = await fetch(apiUrl);
    getConfiguratorData = await response.json();
  });

  let selectedTechnologiesIds: Array<number>;
  $: selectedTechnologiesIds = [];

  let selectedOperators: Array<Operator>;
  $: selectedOperators = [];

  let getSelectedTechnologiesData: Array<String>;
  $: getSelectedTechnologiesData = [];

  let getSelectedOperatorsData: Array<String>;
  $: getSelectedOperatorsData = [];

  const selectTechnology = (e: any) => {
    const index = selectedTechnologiesIds.indexOf(e.detail.id);
    if (index > -1) {
      selectedTechnologiesIds.splice(index, 1);
    } else {
      selectedTechnologiesIds.push(e.detail.id);
    }
    generateArrayCommand(selectedTechnologiesIds);
  };

  const generateArrayCommand = (selectedArray: Array<number>) => {
    let filteredTechnologies = getConfiguratorData.technologies.filter(
      (item) => selectedArray.indexOf(item.id) > -1
    );

    getSelectedTechnologiesData = filteredTechnologies.map(
      (technology) => technology.command
    );
  };

  const selectOperator = (e: any) => {
    // selectedOperators.push(e.detail.operator);
    const objIndex = selectedOperators.findIndex(
      (obj) => obj.key == e.detail.operator.key
    ); 

    if (objIndex > -1) {
      selectedOperators[objIndex] = e.detail.operator;
    } else {
      selectedOperators.push(e.detail.operator);
    }

    let filteredOperators = selectedOperators.filter(
      (item) => item.checked === true
    );

    getSelectedOperatorsData = filteredOperators.map(
      (technology) => technology.command
    );
    console.log(getSelectedOperatorsData);
  };
</script>

<div class="configurator-container">
  {#if getConfiguratorData?.technologies}
    <div class="row">
      <div class="col technologies-col">
        <TechnologiesList
          technologiesListData={getConfiguratorData.technologies}
          operatorsListData={getConfiguratorData.operators}
          on:select-technology={selectTechnology}
          on:select-operator={selectOperator}
        />
      </div>
      <div class="col code-snippet-col">
        <div class="code-snippet-container">
          <CodeSnippetScreen
            config={getConfiguratorData.config}
            selectedTechnologies={getSelectedTechnologiesData}
            selectedOperators={getSelectedOperatorsData}
          />
        </div>
      </div>
      <div class="clearfix" />
      <div class="operators-checkboxes">
        <div class="check__item">
          {#each getConfiguratorData.operators as operator}
            <OperatorCheckBox {operator} on:select-operator={selectOperator} />
          {/each}
        </div>
      </div>
    </div>
  {:else}
    <p>Configurator Loading...</p>
  {/if}
</div>

<style lang="scss">
  .configurator-container {
    max-width: 1050px;
    margin: 20px auto;
  }

  .row {
    overflow: hidden;
    @media (max-width: 760px) {
      display: flex;
      flex-flow: column;
      .technologies-col {
        order: 1;
      }
      .code-snippet-col {
        order: 3;
        margin-bottom: 30px;
      }
      .operators-checkboxes {
        order: 2;
        
      }
    }
  }
  .col {
    width: 50%;
    float: left;
    padding: 10px;
    box-sizing: border-box;
    @media (max-width: 760px) {
      float: none;
      width: 100%;
    }
  }

  .operators-checkboxes {
    padding-top: 20px;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 20px;
  }
  .check__item {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px 10px;
    @media (max-width: 760px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .clearfix {
    float: none;
    clear: both;
  }
</style>
