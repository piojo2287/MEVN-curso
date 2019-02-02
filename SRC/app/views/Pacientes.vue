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
                                    <input type="text" 
                                    v-model='paciente.apellido'
                                    placeholder="Apellido" class="form-control">
                                </div>
                                <div class="form-group">
                                    <datepicker  placeholder="Fecha de nacimiento" 
                                        v-model='paciente.fecha_nac'>
                                    </datepicker>
                                </div>
                                <div class="form-group">
                                    <input type="text" 
                                    v-model='paciente.genero'
                                    placeholder="Género" class="form-control">
                                </div>
                                <div class="form-group">
                                    <input type="text" 
                                    v-model='paciente.domicilio'
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
        import Datepicker from 'vuejs-datepicker';
    
        class Paciente {
            constructor(nombre, apellido, fecha_nac, genero, domicilio){
                this.nombre = nombre;
                this.apellido = apellido;
                this.fecha_nac = fecha_nac;
                this.genero = genero;
                this.domicilio = domicilio;
            }
        }
    
        export default {
            components: {
                Datepicker
            },
            data() {
                return {
                    paciente: new Paciente()
                }
            },
            methods: {
                addPatient() {
                    fetch('/api/pacientes', {
                        method: 'POST',
                        body: JSON.stringify(this.paciente),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => console.log(data));
                    this.paciente = new Paciente();
                },
                getPatients(){
                    fetch('/api/pacientes')
                }
            }
        }
    </script>