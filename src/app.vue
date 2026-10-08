<script setup>
  import { computed, h, ref, watch } from 'vue'
  import Eruda from './eruda.vue'
  import { getAndAttachEventButtonMappings } from './lib/button-mappings.js'
  import { parseExpression } from './lib/expression.js'
  import { createButtonsHandler } from './lib/handler.js'
  
  const useScientific = ref(false)
  
  const { handler, input } = createButtonsHandler(() => {
    useScientific.value = !useScientific.value
  })
  const mappings = getAndAttachEventButtonMappings(handler, useScientific)
  const parsed = computed(() => parseExpression(input))
  
  console.log(parsed)
</script>

<template>
  <div class="container">
    <div class="container-result">
      <div class="container-result-inner">
        <p class="container-result-inner-input">{{ input }}</p>
      </div>
    </div>
    <div
      :class="[
        'container-buttons',
        useScientific && 'use-scientific'
      ]"
    >
      <button
        v-for="button of mappings"
        :aria-label="button.label"
        :class="button?.className"
        :key="button.code"
        @click="event => button.handle(event)"
      >
        <span v-if="typeof button.value === 'string'">
          {{ button.value }}
        </span>
        <component
          v-else
          :is="button.value"
        />
      </button>
    </div>
  </div>
  <Eruda />
</template>

<style scoped>
  .container {
    display: flex;
    position: fixed;
    padding: 1rem;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    flex-direction: column;
    gap: 2rem;
    overflow: hidden;
    
    > .container-result {
      display: flex;
      min-height: 0;
      flex: 1;
      flex-direction: column;
      justify-content: flex-end;
      overflow: hidden;

      > .container-result-inner {
        width: 100%;
        max-height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        text-align: right;
        overflow-wrap: anywhere;
        
        > .container-result-inner-input {
          font-size: 32px;
        }
      }
    }
    
    > .container-buttons {
      display: grid;
      gap: 0.5rem;
      grid-template-rows: repeat(5, 1fr);
      grid-template-columns: repeat(4, 1fr);
      
      &.use-scientific {
        grid-template-rows: repeat(6, 1fr);
        grid-template-columns: repeat(5, 1fr);
      }
      
      > button {
        padding: 1rem;
        background-color: #fff;
        border-radius: 8px;
        
        &.button-accent {
          color: white;
          background-color: #27e;
        }
        
        &.button-subtle {
          color: white;
          background-color: #9ab;
        }

        &.button-extra {
          color: #789;
        }
      }
    }
  }
</style>
