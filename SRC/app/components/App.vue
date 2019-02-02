<template>
    <div class="container">
        <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a href="#" class="navbar-brand">KINESIS</a>
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
            </ul>
        </nav>
        <hr>
        <router-view/> 
        </div>
    </div>
</template>