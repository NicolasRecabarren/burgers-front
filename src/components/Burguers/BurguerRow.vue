<template>
    <tr>
        <td class="text-left">{{ counter }}</td>
        <td class="text-left">{{ burguer.nombre }}</td>
        <td class="text-left">{{ burguer.calorias }}</td>
        <td>
            <!-- modal de ver detalle -->
            <b-modal :id="classModalIngredientes" hide-footer>
                <template v-slot:modal-title>
                    {{ burguer.nombre }} ({{burguer.calorias}} kcal)
                </template>
                <div class="d-block text-center">
                    <ul class="list-group">
                        <li v-for="(ingrediente, index) in ingredientes" :key="index" class="list-group-item">
                            <img :src="ingrediente.imagen" v-if="ingrediente.imagen"> {{ ingrediente.nombre }}
                        </li>
                    </ul>
                </div>
                <b-button class="mt-3" block @click="$bvModal.hide(classModalIngredientes)">
                    Cerrar
                </b-button>
            </b-modal>

            <!-- modal de confirmación al eliminar -->
            <b-modal :id="classModalConfirmacion" hide-footer>
                <template v-slot:modal-title>
                    ¿Está seguro(a) de querer eliminar la hamburguesa "{{ burguer.nombre }}"?
                </template>
                <b-button class="mt-3 btn-danger" block @click="deleteBurguer(burguer._id, classModalConfirmacion)">
                    Confirmar
                </b-button>
                <b-button class="mt-3" block @click="$bvModal.hide(classModalConfirmacion)">
                    Cancelar
                </b-button>
            </b-modal>

            <!-- Botón ver detalle -->
            <button type="button" @click="$bvModal.show(classModalIngredientes)" class="btn btn-info btn-sm">
                Ver detalle
            </button>&nbsp;
            <!-- Botón modificar -->
            <router-link :to="{name: 'hamburguesas-form', params: {burguer, throwNotification}}"
                        class="btn btn-primary btn-sm">Modificar
            </router-link>&nbsp;
            <!-- Botón eliminar -->
            <button type="button" @click="$bvModal.show(classModalConfirmacion)" class="btn btn-danger btn-sm">
                Eliminar
            </button>
        </td>
    </tr>
</template>

<script>
export default {
    props: [
        'burguer',
        'counter',
        'deleteBurguer',
        'ingredientesBase',
        'throwNotification'
    ],

    data(){
        return {
            classModalIngredientes: 'bv-modal-ingredientes-' + this.counter,
            classModalConfirmacion: 'bv-modal-confirmacion-' + this.counter,
            ingredientes: []
        }
    },

    mounted() {
        
        this.burguer.ingredientes.forEach(element => {
            let index = this.ingredientesBase.findIndex( e => e.nombre == element );
            
            this.ingredientes.push({
                nombre: element,
                imagen: (index !== -1) ? this.ingredientesBase[index].imagen : false
            })
        });
    }
};
</script>

<style scoped>
.modal-backdrop{
    opacity: 0.1 !important;
}
</style>
