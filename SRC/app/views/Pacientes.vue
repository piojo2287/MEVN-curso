<template>
        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="sendPatient">
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
                                <template v-if="edit === false">
                                    <button class="btn btn-primary btn-block">Guardar</button>
                                </template>
                                <template v-else>
                                    <button class="btn btn-primary btn-block">Actualizar</button>
                                </template>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <th>Apellido</th>
                            <th>Nombre</th>
                        </thead>
                        <tbody v-for="paciente of pacientes">
                            <td>{{paciente.apellido}}</td>
                            <td>{{paciente.nombre}}</td>
                            <td>
                                <button @click="disablePatient(paciente._id)" class="btn btn-danger">
                                    Borrar
                                </button>
                                <button @click="editPatient(paciente._id)" class="btn btn-secondary">
                                    Editar
                                </button>
                            </td>
                        </tbody>
                    </table>
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
                    paciente: new Paciente(),
                    pacientes: [],
                    edit: false,
                    patientToEdit: ''
                }
            },
            created(){
                this.getPatient();
            },
            methods: {
                sendPatient() {
                    if (this.edit === false){
                        fetch('/api/pacientes', {
                            method: 'POST',
                            body: JSON.stringify(this.paciente),
                            headers: {
                                'Accept': 'application/json',
                                'Content-type': 'application/json'
                            }
                        })
                        .then(res => res.json())
                        .then(data => {
                            this.getPatient();
                        });
                    }else{
                        fetch('/api/pacientes/' + this.patientToEdit, {
                            method: 'PUT',
                            body: JSON.stringify(this.paciente),
                            headers: {
                                'Accept': 'application/json',
                                'Content-type': 'application/json'
                            }
                        })
                        .then (res => res.json())
                        .then (data => {
                            this.getPatient();
                            this.edit = false;
                        })
                    }

                    this.paciente = new Paciente();
                },
                getPatient(){
                    fetch('/api/pacientes')
                        .then(res => res.json())
                        .then(data => {
                            this.pacientes = data
                            console.log(this.pacientes)
                        });
                },
                disablePatient(id) {
                    fetch('api/pacientes/' + id, {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.getPatient();
                    });
                },
                editPatient(id) {
                    fetch('api/pacientes/' + id)
                    .then(res => res.json())
                    .then(data => {
                        this.paciente = new Paciente(data.nombre, data.apellido,
                            data.fecha_nac, data.genero,
                            data.domicilio);
                        this.patientToEdit = data._id;
                        this.edit = true;
                    });
                }
            }
        }
    </script>