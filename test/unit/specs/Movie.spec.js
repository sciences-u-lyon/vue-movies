import { mount } from 'vue-test-utils'
import { createRenderer } from 'vue-server-renderer'
import Movie from '@/components/Movie.vue'

describe('Movie.vue', () => {
  it('should render Movie with correct contents', () => {
    const wrapper = mount(Movie, {
      propsData: {
        poster: '/poster.jpg',
        title: 'A movie title',
        subtitle: 'A movie subtitle',
        abstract: 'Lorem Ipsum'
      },
      slots: {
        default: '<button>14:00</button>'
      }
    })
    const vm = wrapper.vm

    const renderer = createRenderer()
    renderer.renderToString(vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })
})
