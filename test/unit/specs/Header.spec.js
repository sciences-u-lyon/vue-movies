import { mount } from 'vue-test-utils'
import Header from '@/components/Header.vue'

describe('Header.vue', () => {
  it('should render correct contents', () => {
    const wrapper = mount(Header)
    const vm = wrapper.vm
    const title = vm.$el.querySelector('h1.title')
    expect(title.textContent).toEqual('Vue Movies')
  })
})
