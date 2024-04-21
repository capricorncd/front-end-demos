import type {VueBaseProps } from '@prop-styles/vue'

export type UiSize = 'large' | 'medium' | 'small' | 'tiny'

export interface FormProps extends VueBaseProps {
  size?: UiSize
}

export interface FormItemProps extends VueBaseProps{
  size?: UiSize
}
