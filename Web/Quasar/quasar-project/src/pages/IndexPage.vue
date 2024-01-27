<template>
  <div class="q-pa-md">
    <q-carousel
      animated
      v-model="slide"
      arrows
      navigation
      infinite
      style="max-width: 1500px; height: 600px; margin: 0 auto;"
    >
      <q-carousel-slide :name="1" img-src="Building07-scaled.jpg" />
      <q-carousel-slide :name="2" img-src="dd_201604030301_52fa16a8b85a7.jpg" />
      <q-carousel-slide :name="3" img-src="VIP2-room-Bangkok-Hospital-Phuket-en.webp" />
    
    </q-carousel>
    
  </div>
  
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'IndexPage',
  setup() {
    const slide = ref(1);

    return {
      slide,
    };
  },
};
</script>
