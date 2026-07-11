import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Example from '../Example.vue'

describe('Example.vue', () => {
  it('renders properly and increments counter', async () => {
    const wrapper = mount(Example)
    expect(wrapper.text()).toContain('Привет, Vue 3 + Tailwind!')
    
    const buttons = wrapper.findAll('button')
    // Find the increment button
    const incrementBtn = buttons.find(b => b.text().includes('Увеличить счетчик'))
    expect(incrementBtn.exists()).toBe(true)
    
    expect(wrapper.text()).toContain('Счетчик: 0')
    await incrementBtn.trigger('click')
    expect(wrapper.text()).toContain('Счетчик: 1')
  })
  
  it('toggles invert class', async () => {
    const wrapper = mount(Example)
    const button = wrapper.findAll('button').find(b => b.text() === 'Нажми меня!')
    
    expect(button.classes()).not.toContain('invert')
    await button.trigger('click')
    expect(button.classes()).toContain('invert')
  })
})
