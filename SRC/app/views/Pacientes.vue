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
                                    <div class="form-control">
                                        <datepicker input-class="datepicker" 
                                            :language='es' :format="customFormatter" 
                                            placeholder="Fecha de nacimiento" 
                                            v-model='paciente.fecha_nac'>
                                        </datepicker>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input list="lista_genero" type="text" 
                                    v-model='paciente.genero'
                                    placeholder="Género" class="form-control">
                                    <datalist id="lista_genero">
                                        <option value="Femenino"></option>
                                        <option value="Masculino"></option>
                                    </datalist>
                                    <!-- <input type="text" 
                                    v-model='paciente.genero'
                                    placeholder="Género" class="form-control"> -->
                                </div>
                                <div class="form-group">
                                    <input type="text" 
                                    v-model='paciente.domicilio'
                                    placeholder="Domicilio" class="form-control">
                                </div>
                                <div class="form-group">
                                    <input type="mail" v-model='paciente.correo'
                                    placeholder="Correo" class="form-control">
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
                    <table id="mdtable" class="table table-striped table-bordered table-sm" cellspacing="0" 
                            width="100%" data-pagination="true" data-page-size="7">
                        <thead>
                            <th>Apellido</th>
                            <th>Nombre</th>
                        </thead>
                        <tbody v-for="(paciente,index) of datos" v-bind:key="index">
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
                    <div class="overflow-auto">
                        <div class="mt-3 text-right">
                            <b-pagination v-model="currentPage" :total-rows="totalRows"
                                              :per-page="perPage"
                                              v-on:input="changePage"/>                 
                        </div>
                        <div class="mt-3">Pagina Actual: {{ currentPage }}</div>
                    </div>
                </div>
            </div>
        </div>
    </template>

    <script>
        import Datepicker from 'vuejs-datepicker'; 
        import {en,es} from 'vuejs-datepicker/dist/locale';
        import BPagination from 'bootstrap-vue/es/components/pagination/pagination'
        import moment from 'moment';
        
        class Paciente {
            constructor(nombre, apellido, fecha_nac, genero, domicilio, correo){
                this.nombre = nombre;
                this.apellido = apellido;
                this.fecha_nac = fecha_nac;
                this.genero = genero;
                this.domicilio = domicilio;
                this.correo = correo;
            }
        }
    
        export default {
            components: {
                Datepicker,
                BPagination,
                moment
            },
            data() {
                return {
                    paciente: new Paciente(),
                    pacientes: [],
                    datos: [],
                    edit: false,
                    patientToEdit: '',
                    perPage: 5,
                    totalRows: 0,
                    currentPage: 1,
                    fechaFormato: '',
                    es: es,
                    en: en
                }
            },
            created(){
                this.getTotalPages();
                this.getPatient(this.currentPage);
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
                            this.getTotalPages();
                            //this.getPatient(this.currentPage);
                            console.log("Alta - array pacientes: " + this.pacientes.length);
                            console.log("Alta - total filas: " + this.totalRows);
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
                            this.getPatient(this.currentPage);
                            this.edit = false;
                        })
                    }

                    this.paciente = new Paciente();
                },
                getPatient(pageNumber){
                    fetch('/api/pacientes')
                        .then(res => res.json())
                        .then(data => {
                            this.pacientes = data
                            //console.log("Pagina " +pageNumber);
                            //console.log("Limite inferior: "+(pageNumber -1 ) * 5);
                            //console.log("Limite superior: "+(pageNumber * 5));
                            this.datos = this.pacientes.slice((pageNumber -1 ) * 5,(pageNumber * 5))
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
                        this.getPatient(this.currentPage);
                    });
                },
                editPatient(id) {
                    fetch('api/pacientes/' + id)
                    .then(res => res.json())
                    .then(data => {
                        //this.fechaFormato = this.formatDate(data.fecha_nac);
                        this.paciente = new Paciente(data.nombre, data.apellido,
                            data.fecha_nac, data.genero,
                            data.domicilio, data.correo);
                        this.patientToEdit = data._id;
                        this.edit = true;
                    });
                },
                getTotalPages(){
                    fetch('/api/pacientes')
                        .then(res => res.json())
                        .then(data => {
                            this.pacientes = data
                            console.log(this.pacientes)
                            this.totalRows = this.pacientes.length
                            console.log(this.pacientes.length + " / " + this.perPage)
                            console.log("Total paginas: " + Math.ceil(this.pacientes.length / this.perPage))
                        });
                },
                changePage(pageNumber) {
                    console.log("pagina seleccionada " +pageNumber)
                    this.getPatient(pageNumber);
                },
                customFormatter(date) {
                    return moment(date).format('DD/MM/YYYY')
                }
            }
        }
    </script>

    <style>
        input.datepicker {
            border-left-width: 0;
            border-right-width: 0;
            border-top-width: 0;
            border-bottom-color: blue
        }
    </style>
    
    
    