<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a href="#" class="navbar-brand">{{ brand }}</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to='/' class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to='/about' class="nav-link">About</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to='/contactos' class="nav-link">Contactos</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to='/pacientes' class="nav-link">Pacientes</router-link>
                    </li>
                    <li class="nav-item dropdown"  >
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" 
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Mantenimiento Datos
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <!-- <router-link to='/pacientes' class="nav-link">Pacientes</router-link> -->
                            <a class="dropdown-item" href="#">otro</a>
                                <!-- <router-link to='/pacientes' class="nav-link">Pacientes</router-link> -->
                            <a class="dropdown-item" href="#">Turnos</a>
                        </div>
                        
                    </li>
                </ul>
            </div>
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </nav>
        <!-- <hr> -->
        <router-view/> 
    </div>
</template>

<script>
    export default {
        data() {
            return {
                brand: 'KINESIS'
            }
        }  
    }
</script>