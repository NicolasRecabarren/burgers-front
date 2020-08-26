<template>
    <div class="card">
        <burguer-header />
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
                <BurguerRow v-for="(burguer, index) in this.burguers" 
                        :key="burguer._id" 
                        :burguer="burguer" 
                        :counter="index+1" 
                        :deleteBurguer="deleteBurguer" 
                />
            </tbody>
        </table>
    </div>
</template>

<script>
import BurguerHeader from '../components/Burguers/BurguerHeader.vue';
import BurguerRow from '../components/Burguers/BurguerRow.vue';

export default {
    name: 'Burguers',
    components: {
        BurguerHeader,
        BurguerRow
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

        // Método que elimina una hamburguesa.
        deleteBurguer(idBurguer, classConfirmationModal) {
            this.$http.delete('https://prueba-hamburguesas.herokuapp.com/burguer/'+idBurguer)
                .then( res => {
                    
                    this.throwNotification('Hamburguesa eliminada correctamente.', 'success', 'Proceso terminado.');
                    this.$bvModal.hide(classConfirmationModal);

                    // Recargamos el listado de hamburguesas.
                    this.getBurguers();

                }, error => {
                    this.throwNotification('Ha ocurrido un problema al eliminar la hamburguesa.', 'danger', 'Error.');
                })
        },

        // Método que nos permite mostrar una notificación.
        throwNotification(bodyContent = '', color = null, title = null) {
            this.$bvToast.toast(bodyContent, {
                title: `${title || 'Notificación'}`,
                variant: color,
                solid: true
            })
        }
    },
};
</script>
