<template>
        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="sendTratamiento">
                                <div class="form-group">
                                    <input type="text" 
                                    v-model='tratamiento.descripcion'
                                    placeholder="Nombre Tratamiento" class="form-control">
                                </div>
                                <div class="form-group">
                                    <input list="lista_estado" type="text" 
                                    v-model='tratamiento.estado'
                                    placeholder="Estado" class="form-control">
                                    <datalist id="lista_estado">
                                        <option value="Activo"></option>
                                        <option value="inactivo"></option>
                                    </datalist>
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
                            <th>Nombre Tratamiento</th>
                            <th>Estado</th>
                        </thead>
                        <tbody v-for="(tratamiento,index) of datos" v-bind:key="index">
                            <td>{{tratamiento.descripcion}}</td>
                            <td>{{tratamiento.estado}}</td>
                            <td>
                                <button @click="disableTratamiento(tratamiento._id)" class="btn btn-danger">
                                    Borrar
                                </button>
                                <button @click="editTratamiento(tratamiento._id)" class="btn btn-secondary">
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
        import BPagination from 'bootstrap-vue/es/components/pagination/pagination'

        class Tratamiento {
            constructor(descripcion, estado){
                this.descripcion = descripcion;
                this.estado = estado
            }
        }

        export default {
            data(){
                return {
                    tratamiento: new Tratamiento(),
                    tratamientos: [],
                    datos: [],
                    edit: false,
                    rowToEdit: '',
                    perPage: 5,
                    totalRows: 0,
                    currentPage: 1
                }
            },
            created(){
                this.getTotalPages();
                this.getTratamiento(this.currentPage);
            },
            methods: {
                sendTratamiento() {
                    if (this.edit === false){
                        fetch('/api/tratamientos', {
                            method: 'POST',
                            body: JSON.stringify(this.tratamiento),
                            headers: {
                                'Accept': 'application/json',
                                'Content-type': 'application/json'
                            }
                        })
                        .then(res => res.json())
                        .then(data => {
                            this.getTotalPages();
                            this.getTratamiento(this.currentPage);
                            console.log("Alta - array tratamientos: " + this.tratamientos.length);
                            console.log("Alta - total filas: " + this.totalRows);
                        });
                    }else{
                        fetch('/api/tratamientos/' + this.rowToEdit, {
                            method: 'PUT',
                            body: JSON.stringify(this.tratamiento),
                            headers: {
                                'Accept': 'application/json',
                                'Content-type': 'application/json'
                            }
                        })
                        .then (res => res.json())
                        .then (data => {
                            this.getTratamiento(this.currentPage);
                            this.edit = false;
                        })
                    }

                    this.tratamiento = new Tratamiento();
                },
                getTratamiento(pageNumber){
                    fetch('/api/tratamientos')
                        .then(res => res.json())
                        .then(data => {
                            this.tratamientos = data
                            //console.log("Pagina " +pageNumber);
                            //console.log("Limite inferior: "+(pageNumber -1 ) * 5);
                            //console.log("Limite superior: "+(pageNumber * 5));
                            this.datos = this.tratamientos.slice((pageNumber -1 ) * 5,(pageNumber * 5))
                        });
                },
                disableTratamiento(id) {
                    fetch('api/tratamientos/' + id, {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.getTratamiento(this.currentPage);
                    });
                },
                editTratamiento(id) {
                    fetch('api/tratamientos/' + id)
                    .then(res => res.json())
                    .then(data => {
                        //this.fechaFormato = this.formatDate(data.fecha_nac);
                        this.tratamiento = new Tratamiento(data.descripcion, data.estado);
                        this.rowToEdit = data._id;
                        this.edit = true;
                    });
                },
                getTotalPages(){
                    fetch('/api/tratamientos')
                        .then(res => res.json())
                        .then(data => {
                            this.tratamientos = data
                            console.log(this.tratamientos)
                            this.totalRows = this.tratamientos.length
                            console.log(this.tratamientos.length + " / " + this.perPage)
                            console.log("Total paginas: " + Math.ceil(this.tratamientos.length / this.perPage))
                        });
                },
                changePage(pageNumber) {
                    console.log("pagina seleccionada " +pageNumber)
                    this.getPatient(pageNumber);
                }
            }
        }
    </script>
    