<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let operator: Operator;

  let itemActive: boolean = false;
  const dispatch = createEventDispatcher();

  function selectOperator(ope: Operator) {
    itemActive = !itemActive;
    dispatch("select-operator", { operator: ope });
  }
</script>

<div class="operator-item">
  <label>
    <input
      type="checkbox"
      class="default__check switchbox"
      bind:checked={operator.checked}
      value={operator.key}
      on:change={() => selectOperator(operator)}
    />
    <span class="custom__check" />
    {operator.name}
  </label>
</div>

<style lang="scss">
  label {
    display: flex;
    align-items: center;
    // column-gap: 6px;
    font-size: 14px;
    font-weight: 500;
    @media (max-width: 760px) {
      font-size: 13px;
    }
  }
  .default__check[type="checkbox"] {
    display: none;

    ~ .custom__check {
      display: flex;
      align-items: center;
      height: 28px;
      position: relative;
      transition: all 0.4s ease;
      cursor: pointer;
      background-color: rgba(#272e3a, 0.1);
      margin-right: 10px;

      &:after {
        content: "";
        display: inline-block;
        position: absolute;
        transition: all 0.4s ease;
      }
    }

    &.switchbox {
      + .custom__check {
        width: 48px;

        &:after {
          transform: scale(1.5);
          left: 8px;
        }
      }

      &:not(:checked) {
        ~ .custom__check {
          &:after {
            background-color: rgba(#272e3a, 0.2);
          }
        }
      }

      &:checked {
        ~ .custom__check {
          &:after {
            background-color: rgba(#ffffff, 0.5);
            left: 30px;
          }
        }
      }
    }

    &:disabled {
      ~ .custom__check {
        opacity: 0.3;
        cursor: not-allowed;
      }
    }

    &:checked {
      ~ .custom__check {
        background-color: #b90069;

        &:after {
          visibility: visible;
        }
      }
    }
  }

  .default__check[type="checkbox"].switchbox {
    ~ .custom__check {
      border-radius: 50rem;
      &:after {
        width: 11px;
        height: 11px;
        background-color: rgba(#272e3a, 0.2);
        border-radius: 50rem;
      }
    }
  }
</style>
