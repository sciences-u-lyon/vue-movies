<template>
  <section class="section">
    <div class="container">
      <Header />

      <Week />

      <div class="columns is-variable">
        <div class="column is-three-quarters">
          <section class="section has-full-width movies">

            <Movie
              :poster="require('@/assets/img/avengers.jpg')"
              title="Avengers: Infinity War"
              subtitle="4 May 2018 / Action, Adventure, Fantasy / USA"
              abstract="The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.">

              <Ticket time="14:00" />
              <Ticket time="18:00" />
              <Ticket time="20:00" />
              <Ticket time="22:00" />
            </Movie>

            <Movie
              :poster="require('@/assets/img/baywatch.jpg')"
              title="Baywatch"
              subtitle="25 May 2017 / Action, Comedy, Crime / USA"
              abstract="Devoted lifeguard Mitch Buchannon butts heads with a brash new recruit, as they uncover a criminal plot that threatens the future of the bay.">

              <Ticket time="14:00" />
              <Ticket time="18:00" />
            </Movie>

            <Movie
              :poster="require('@/assets/img/black-panther.jpg')"
              title="Black Panther"
              subtitle="16 February 2018 / Action, Adventure, Sci-Fi / USA"
              abstract="T'Challa, after the death of his father, the King of Wakanda, returns home to the isolated, technologically advanced African nation to succeed to the throne and take his rightful place as king.">

              <Ticket time="14:00" />
              <Ticket time="18:00" />
              <Ticket time="20:00" />
            </Movie>

            <Movie
              :poster="require('@/assets/img/bridget-jones-baby.jpg')"
              title="Bridget Jones Baby"
              subtitle="16 September 2016 / Comedy, Romance / USA"
              abstract="Bridget's focus on single life and her career is interrupted when she finds herself pregnant, but with one hitch ... she can only be fifty percent sure of the identity of her baby's father.">

              <Ticket time="14:00" />
              <Ticket time="16:00" />
              <Ticket time="18:00" />
            </Movie>

            <Movie
              :poster="require('@/assets/img/coco.jpg')"
              title="Coco"
              subtitle="21 November 2017 / Animation, Adventure, Comedy / USA"
              abstract="Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.">

              <Ticket time="14:00" />
              <Ticket time="17:00" />
            </Movie>

            <Movie
              :poster="require('@/assets/img/dallas-buyers-club.jpg')"
              title="Dallas Buyers Club"
              subtitle="22 November 2013 / Biography, Drama / USA"
              abstract="In 1985 Dallas, electrician and hustler Ron Woodroof works around the system to help AIDS patients get the medication they need after he is diagnosed with the disease.">

              <Ticket time="20:00" />
              <Ticket time="22:00" />
            </Movie>

            <Movie
              :poster="require('@/assets/img/inception.jpg')"
              title="Inception"
              subtitle="16 July 2010 / Action, Adventure, Sci-Fi / USA"
              abstract="A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.">

              <Ticket time="18:00" />
              <Ticket time="20:00" />
              <Ticket time="22:00" />
            </Movie>

            <Movie
              :poster="require('@/assets/img/intouchable.jpg')"
              title="Intouchables"
              subtitle="2 November 2011 / Biography, Comedy, Drama / France"
              abstract="After he becomes a quadriplegic from a paragliding accident, an aristocrat hires a young man from the projects to be his caregiver.">

              <Ticket time="16:00" />
              <Ticket time="18:00" />
            </Movie>

            <Movie
              :poster="require('@/assets/img/jurassic-world.jpg')"
              title="Jurassic World: Fallen Kingdom"
              subtitle="22 June 2018 / Action, Adventure, Sci-Fi / USA"
              abstract="When the island's dormant volcano begins roaring to life, Owen and Claire mount a campaign to rescue the remaining dinosaurs from this extinction-level event.">

              <Ticket time="20:00" />
              <Ticket time="22:00" />
              <Ticket time="23:00" />
            </Movie>

            <Movie
              :poster="require('@/assets/img/the-last-jedi.jpg')"
              title="Star Wars: The Last Jedi"
              subtitle="15 December 2017 / Action, Adventure, Fantasy / USA"
              abstract="Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.">

              <Ticket time="14:00" />
              <Ticket time="16:00" />
              <Ticket time="18:00" />
              <Ticket time="20:00" />
              <Ticket time="22:00" />
            </Movie>

            <Movie
              :poster="require('@/assets/img/toy-story.jpg')"
              title="Toy Story 3"
              subtitle="18 June 2010 / Animation, Adventure, Comedy / USA"
              abstract="The toys are mistakenly delivered to a day-care center instead of the attic right before Andy leaves for college, and it's up to Woody to convince the other toys that they weren't abandoned and to return home.">

              <Ticket time="14:00" />
              <Ticket time="16:00" />
            </Movie>

            <Movie
              :poster="require('@/assets/img/train-to-busan.jpg')"
              title="Train To Busan"
              subtitle="17 August 2016 / Action, Drama, Horror / South Korea"
              abstract="While a zombie virus breaks out in South Korea, passengers struggle to survive on the train from Seoul to Busan.">

              <Ticket time="20:00" />
              <Ticket time="22:00" />
            </Movie>

          </section>
        </div>

        <div class="column">
          <section class="section has-full-width filters">
            <h1 class="title">Find movies</h1>

            <TimeFilter />
            <GenreFilter />
            <CountryFilter />

          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Header from '@/components/Header.vue'
import Week from '@/components/Week.vue'
import Movie from '@/components/Movie.vue'
import Ticket from '@/components/Ticket.vue'
import TimeFilter from '@/components/TimeFilter.vue'
import GenreFilter from '@/components/GenreFilter.vue'
import CountryFilter from '@/components/CountryFilter.vue'

export default {
  components: {
    Header,
    Week,
    Movie,
    Ticket,
    TimeFilter,
    GenreFilter,
    CountryFilter
  }
}
</script>
