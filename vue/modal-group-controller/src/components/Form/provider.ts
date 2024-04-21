import { provide, inject, computed } from 'vue'
import type { FormProps } from './types'

const FORM_PROVIDE_KEY = Symbol('form-provide')

export interface FormProvider {
  size?: string;
}

export function initFormProvider(props: FormProps) {

  const size = computed(() => props.size ?? 'large' )

  provide<FormProvider>(FORM_PROVIDE_KEY, {
    get size() {
      return size.value
    },
  })
}

export function useFormProvider() {
  return inject<FormProvider>(FORM_PROVIDE_KEY, { size: 'large' })
}


