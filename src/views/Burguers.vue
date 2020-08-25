<template>
  <div>
    <h1>Hamburguesas</h1>
    <table class="table">
        <thead>
          <tr>
            <th class="text-left">#</th>
            <th class="text-left">Nombre</th>
            <th class="text-left">Calorías</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <BurguerRow v-for="(burguer, index) in this.burguers" :key="burguer._id" :burguer="burguer" :counter="index+1" />
        </tbody>
    </table>
  </div>
</template>

<script>
import BurguerRow from '../components/BurguerRow.vue';

export default {
  name: 'Burguers',
  components: {
    BurguerRow,
  },

  data() {
    return {
      burguers: [],
    };
  },

  created() {
    this.getBurguers();
  },

  methods: {
    // Función que consulta a la API para obtener el listado de las hamburguesas.
    getBurguers() {
      this.$http.get('https://prueba-hamburguesas.herokuapp.com/burguer')
        .then(res => this.burguers = res.body);
    },
  },
};
</script>

<style>
</style>
