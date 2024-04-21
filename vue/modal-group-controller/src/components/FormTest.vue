<script setup lang="ts">
import { Form, FormItem, type UiSize } from './Form'
import {ref} from 'vue'

const SIZE_LIST: UiSize[] = ['large', 'medium', 'small', 'tiny']
const size = ref<UiSize>('large')

const changeSize = () => {
  let index = SIZE_LIST.indexOf(size.value) + 1
  if (index >= SIZE_LIST.length) index = 0
  size.value = SIZE_LIST[index]
}
</script>

<template>
  <Form :size="size" margin-bottom="20">
    <button @click="changeSize">change form size</button>
    <FormItem>
      form size:
    </FormItem>
    <FormItem size="small">
      item size:
    </FormItem>
  </Form>
</template>

