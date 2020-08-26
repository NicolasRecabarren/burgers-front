<template>
    <div class="card">
        <burguer-header/>
        <form>
            <div class="row">
                <div class="form-group col-md-3">
                    <label class="control-label">Nombre</label>
                    <input class="form-control" type="text" v-model="nombre" id="">
                </div>
                <div class="form-group col-md-3">
                    <label class="control-label">Calorías</label>
                    <input class="form-control" type="text" v-model="calorias" id="">
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-12">
                    <label class="control-label">Ingredientes</label>
                    <input class="form-control" type="text" v-model="nombre" id="">
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import BurguerHeader from '../components/Burguers/BurguerHeader.vue';

export default {
    components: {
        BurguerHeader
    },
    
    data() {
        return {
            nombre: '',
            calorias: 0,
            ingredientes: []
        }
    }
}
</script>

<style lang="scss" scoped>
    form{
        padding: 25px;
        text-align: left;
    }
</style>