<template>
    <tr>
        <td class="text-left">{{ counter }}</td>
        <td class="text-left">{{ burguer.nombre }}</td>
        <td class="text-left">{{ burguer.calorias }}</td>
        <td>
            <!-- modal de ingredientes -->
            <b-modal :id="classModalIngredientes" hide-footer>
                <template v-slot:modal-title>
                    Ingredientes de {{ burguer.nombre }}
                </template>
                <div class="d-block text-center">
                    <ul class="list-group">
                        <li v-for="(ingrediente, index) in burguer.ingredientes" :key="index" class="list-group-item">
                            {{ ingrediente }}
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

            <button type="button" @click="$bvModal.show(classModalIngredientes)" class="btn btn-info btn-sm">
                Ver ingredientes
            </button>&nbsp;
            <button type="button" class="btn btn-primary btn-sm">
                Modificar
            </button>&nbsp;
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
        'deleteBurguer'
    ],

    data(){
        return {
            classModalIngredientes: 'bv-modal-ingredientes-' + this.counter,
            classModalConfirmacion: 'bv-modal-confirmacion-' + this.counter
        }
    }
};
</script>

<style scoped>
.modal-backdrop{
    opacity: 0.1 !important;
}
</style>
