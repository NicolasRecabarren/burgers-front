<template>
    <div class="card">
        <BurguerHeader :backButton="true" />
        <form @submit="validaFormulario">
            <div class="row">
                <div class="col-md-12">
                    <ul v-if="errores.length" class="alert alert-danger">
                        <li v-for="(error, index) in errores" :key="index">{{error}}</li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-3">
                    <label class="control-label">Nombre</label>
                    <input class="form-control" type="text" v-model="nombre" placeholder="Escriba aquí">
                </div>
                <div class="form-group col-md-3">
                    <label class="control-label">Calorías</label>
                    <input class="form-control" type="number" v-model="calorias">
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-12">
                    <label><u>Ingredientes:</u></label>
                    <ul class="ingredients-list">
                        <li v-for="(ingrediente, index) in ingredientesBase" :key="index">
                            <svg v-if="!ingrediente.selected" @click="changeSelected(index, true)" width="22px" height="22px" viewBox="0 0 16 16" class="bi bi-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            </svg>
                            <svg v-if="ingrediente.selected" @click="changeSelected(index, false)" width="22px" height="22px" viewBox="0 0 16 16" class="bi bi-check-square-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </svg>
                            <img :src="ingrediente.imagen"> {{ingrediente.nombre}}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <button type="submit" class="btn btn-primary btn-block">
                        Guardar
                    </button>
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

    props: ['throwNotification'],

    data() {
        return {
            nombre: '',
            calorias: 0,
            ingredientes: [],
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
            ],
            errores: []
        }
    },

    mounted() {

        // Si estmos modificando una hamburguesa, seteamos los valores por defecto de los campos y los ingredientes.
        if( this.$route.params.burguer){
            this.nombre = this.$route.params.burguer.nombre;
            this.calorias = this.$route.params.burguer.calorias;
            this.ingredientes = this.$route.params.burguer.ingredientes;

            // Modificamos el listado de los ingredientes para que salgan checkeados en el listado.
            this.$route.params.burguer.ingredientes.forEach(element => {
                let index = this.ingredientesBase.findIndex( e => e.nombre == element );
                if( index !== -1 ){
                    this.ingredientesBase[index].selected = true;
                } else {
                    this.ingredientesBase.push({
                        nombre: element,
                        imagen: '',
                        selected: true
                    });
                }
            });
        }
    },

    methods: {

        changeSelected(ingrediente, nuevoValor){
            this.ingredientesBase[ingrediente].selected = nuevoValor;

            // Agregamos el ingrediente al array "ingredientes".
            if(nuevoValor){
                this.ingredientes.push(this.ingredientesBase[ingrediente].nombre);
            } else {
                // Cuando quiten un ingrediente lo debemos quitar del arreglo "ingredientes".
                this.ingredientes = this.ingredientes.filter( ingredienteSeleccionado => this.ingredientesBase[ingrediente].nombre != ingredienteSeleccionado);
            }
        },

        // Método que valida los datos ingresados en el formulario.
        validaFormulario(e) {
            this.errores = [];
            if( !this.nombre )
                this.errores.push("Debe ingresar el nombre de la hamburguesa.");

            if( this.ingredientes.length == 0)
                this.errores.push("Debe escoger por lo menos un ingrediente.");
            
            
            if( !this.calorias )
                this.errores.push("Debe ingresar la cantidad de calorías.");
            else if( this.calorias < 0)
                this.errores.push("Las calorías no pueden ser inferiores a uno.");
            
            if( !this.errores.length ){
                return !this.$route.params.burguer ? this.saveBurguer() : this.updateBurguer() ;
            }

            e.preventDefault();
        },

        // Método que crea la hamburguesa. 
        saveBurguer() {
            this.$http.post('https://prueba-hamburguesas.herokuapp.com/burguer',{
                    nombre: this.nombre,
                    calorias: this.calorias,
                    ingredientes: this.ingredientes
                })
                .then( res => {
                    this.throwNotification("Hamburguesa guardada correctamente.", "success", "Proceso correcto.")
                    this.$router.push('/hamburguesas');
                })
                .catch(error => this.throwNotification("Ha ocurrido un problema al guardar la hamburguesa.", "danger", "Error."));
        },

        // Método que actualiza una
        updateBurguer() {
            this.$http.put('https://prueba-hamburguesas.herokuapp.com/burguer/'+this.$route.params.burguer._id,{
                    nombre: this.nombre,
                    calorias: this.calorias,
                    ingredientes: this.ingredientes
                })
                .then( res => {
                    this.$route.params.throwNotification("Hamburguesa guardada correctamente.", "success", "Proceso correcto.")
                    this.$router.push('/hamburguesas');
                })
                .catch(error => this.$route.params.throwNotification("Ha ocurrido un problema al guardar la hamburguesa.", "danger", "Error."));
        }
    }
}
</script>

<style lang="scss" scoped>
    form{
        padding: 25px;
        text-align: left;
        .row:nth-child(2) {
            border-bottom: 1px solid #eee;
        }
        .row:nth-child(3) {
            margin-top: 20px;
        }
        ul.ingredients-list {
            margin: 0;
            padding: 0;
            list-style: none;
            li {
                margin-top: 15px;
                padding: 5px;
                width: 301px;
                display: inline-block;
                cursor: pointer;
                font-size: 14px;
                svg{
                    color: green;
                }
            }
            li:hover{
                background-color: #F2F2F2;
            }
        }
    }
</style>