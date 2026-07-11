import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NotFoundView from '../../views/NotFoundView.vue'

describe('NotFoundView', () => {
  it('renders properly', () => {
    const wrapper = mount(NotFoundView)
    expect(wrapper.text()).toContain('404')
  })
})
