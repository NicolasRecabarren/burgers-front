<template>
    <div class="card-header-2">
        <img src="burguer-bkg.png">
        <div class="overlay"></div> 
        <h1>Hamburguesas</h1>
        <router-link v-if="!backButton" :to="{name: 'hamburguesas-form', params: {throwNotification}}" class="btn btn-warning">Nueva hamburguesa</router-link>
        <router-link v-if="backButton" to="/hamburguesas" class="btn btn-light">Volver</router-link>
    </div>
</template>

<script>
export default {
    props: ['backButton','throwNotification']
}
</script>

<style lang="scss" scoped>
    .card-header-2{
        position: relative;
        img{
            width: 100%;
        }
        h1, .overlay{
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 70px;
        }
        h1{
            text-align: left;
            padding: 10px 15px;
            margin-bottom: 0;
            color: #FFF;
        }
        .overlay{
            background: #000;
            opacity: 0.3;
            height: 100%;
        }
        .btn.btn-warning, .btn.btn-light{
            position: absolute;
            float: right;
            bottom: 15px;
            right: 15px
        }
    }
</style>