<template>
        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="addPatient">
                                <div class="form-group">
                                    <input type="text" 
                                    v-model='paciente.nombre'
                                    placeholder="Nombre" class="form-control">
                                </div>
                                <div class="form-group">
                                    <input type="text" v-model='paciente.apellido'
                                    placeholder="Apellido" class="form-control">
                                </div>
                                <div class="form-group">
                                    <input type="text" v-model='paciente.fecha_nac'
                                    placeholder="Fecha de nacimiento" class="form-control">
                                </div>
                                <div class="form-group">
                                    <input type="text" v-model='paciente.genero'
                                    placeholder="Género" class="form-control">
                                </div>
                                <div class="form-group">
                                    <input type="text" v-model='paciente.domicilio'
                                    placeholder="Domicilio" class="form-control">
                                </div>
                                <button class="btn btn-primary btn-block">Guardar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>

    <script>
        export default {
            data() {
                return {
                    paciente: {
                        nombre: '',
                        apellido: '',
                        fecha_nac: '',
                        genero: '',
                        domicilio: ''
                    }
                }
            },
            methods: {
                addPatient() {
                    console.log(this.paciente);
                }  
            }
        }
    </script>