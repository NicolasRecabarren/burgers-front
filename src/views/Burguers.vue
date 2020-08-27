<template>
    <div class="card">
        <BurguerHeader :throwNotification="throwNotification" />
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
                        :throwNotification="throwNotification"
                        :ingredientesBase="ingredientesBase"
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
            ingredientesBase: [
                {nombre: 'Aceitunas negras', imagen: '/ingredientes/aceitunas_negras.png', selected: false},
                {nombre: 'Aros de Cebolla', imagen: '/ingredientes/aros_de_cebolla.png', selected: false},
                {nombre: 'Atun', imagen: '/ingredientes/atun.png', selected: false},
                {nombre: 'Carne', imagen: '/ingredientes/carne.png', selected: false},
                {nombre: 'Cebolla', imagen: '/ingredientes/cebolla.png', selected: false},
                {nombre: 'Champiñones', imagen: '/ingredientes/champinones.png', selected: false},
                {nombre: 'Choclo', imagen: '/ingredientes/choclo.png', selected: false},
                {nombre: 'Choricillo', imagen: '/ingredientes/choricillo.png', selected: false},
                {nombre: 'Espárragos', imagen: '/ingredientes/esparragos.png', selected: false},
                {nombre: 'Queso', imagen: '/ingredientes/extra_queso.png', selected: false},
                {nombre: 'Jamón', imagen: '/ingredientes/jamon.png', selected: false},
                {nombre: 'Lechuga', imagen: '/ingredientes/lechuga.png', selected: false},
                {nombre: 'Lomito', imagen: '/ingredientes/lomito.png', selected: false},
                {nombre: 'Palmitos', imagen: '/ingredientes/palmitos.png', selected: false},
                {nombre: 'Pepperoni', imagen: '/ingredientes/pepperoni.png', selected: false},
                {nombre: 'Pimentón Verde', imagen: '/ingredientes/pimenton_verde.png', selected: false},
                {nombre: 'Pollo', imagen: '/ingredientes/pollo.png', selected: false},
                {nombre: 'Tocino', imagen: '/ingredientes/tocino.png', selected: false},
                {nombre: 'Tomate', imagen: '/ingredientes/tomate.png', selected: false}
            ]
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
                .catch( err => this.throwNotification('Ha ocurrido un problema al eliminar la hamburguesa.', 'danger', 'Error.') );
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
