<template>
    <nav id="nav" class="navbar navbar-expand-lg navbar-light bg-dark">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/hamburguesas" class="nav-link">Hamburguesas</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style lang="scss">
    #nav {
        ul.navbar-nav{
            li{
                a.nav-link{
                    color: #FFF;
                }
                a.nav-link:hover{
                    color: #429D5B;
                }
            }
        }
    }
</style>