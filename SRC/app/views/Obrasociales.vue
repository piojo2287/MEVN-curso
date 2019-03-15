<template>
        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="sendOS">
                                <div class="form-group">
                                    <input type="text" 
                                    v-model='obrasocial.descripcion'
                                    placeholder="Nombre Obra Social" class="form-control">
                                </div>
                                <div class="form-group">
                                    <input list="lista_estado" type="text" 
                                    v-model='obrasocial.estado'
                                    placeholder="Estado" class="form-control">
                                    <datalist id="lista_estado">
                                        <option value="Activa"></option>
                                        <option value="inactiva"></option>
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
                            <th>Nombre Obra Social</th>
                            <th>Estado</th>
                        </thead>
                        <tbody v-for="(obrasocial,index) of datos" v-bind:key="index">
                            <td>{{obrasocial.descripcion}}</td>
                            <td>{{obrasocial.estado}}</td>
                            <td>
                                <button @click="disableOS(obrasocial._id)" class="btn btn-danger">
                                    Borrar
                                </button>
                                <button @click="editOS(obrasocial._id)" class="btn btn-secondary">
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

        class ObraSocial {
            constructor(descripcion, estado){
                this.descripcion = descripcion;
                this.estado = estado
            }
        }

        export default {
            data(){
                return {
                    obrasocial: new ObraSocial(),
                    obrasociales: [],
                    datos: [],
                    edit: false,
                    obrasocialToEdit: '',
                    perPage: 5,
                    totalRows: 0,
                    currentPage: 1
                }
            },
            created(){
                this.getTotalPages();
                this.getOS(this.currentPage);
            },
            methods: {
                sendOS() {
                    if (this.edit === false){
                        fetch('/api/obrasociales', {
                            method: 'POST',
                            body: JSON.stringify(this.obrasocial),
                            headers: {
                                'Accept': 'application/json',
                                'Content-type': 'application/json'
                            }
                        })
                        .then(res => res.json())
                        .then(data => {
                            this.getTotalPages();
                            //this.getPatient(this.currentPage);
                            console.log("Alta - array obrasociales: " + this.obrasociales.length);
                            console.log("Alta - total filas: " + this.totalRows);
                        });
                    }else{
                        fetch('/api/obrasociales/' + this.obrasocialToEdit, {
                            method: 'PUT',
                            body: JSON.stringify(this.obrasocial),
                            headers: {
                                'Accept': 'application/json',
                                'Content-type': 'application/json'
                            }
                        })
                        .then (res => res.json())
                        .then (data => {
                            this.getOS(this.currentPage);
                            this.edit = false;
                        })
                    }

                    this.obrasocial = new ObraSocial();
                },
                getOS(pageNumber){
                    fetch('/api/obrasociales')
                        .then(res => res.json())
                        .then(data => {
                            this.obrasociales = data
                            //console.log("Pagina " +pageNumber);
                            //console.log("Limite inferior: "+(pageNumber -1 ) * 5);
                            //console.log("Limite superior: "+(pageNumber * 5));
                            this.datos = this.obrasociales.slice((pageNumber -1 ) * 5,(pageNumber * 5))
                        });
                },
                disableOS(id) {
                    fetch('api/obrasociales/' + id, {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.getOS(this.currentPage);
                    });
                },
                editOS(id) {
                    fetch('api/obrasociales/' + id)
                    .then(res => res.json())
                    .then(data => {
                        //this.fechaFormato = this.formatDate(data.fecha_nac);
                        this.obrasocial = new ObraSocial(data.descripcion, data.estado);
                        this.obrasocialToEdit = data._id;
                        this.edit = true;
                    });
                },
                getTotalPages(){
                    fetch('/api/obrasociales')
                        .then(res => res.json())
                        .then(data => {
                            this.obrasociales = data
                            console.log(this.obrasociales)
                            this.totalRows = this.obrasociales.length
                            console.log(this.obrasociales.length + " / " + this.perPage)
                            console.log("Total paginas: " + Math.ceil(this.obrasociales.length / this.perPage))
                        });
                },
                changePage(pageNumber) {
                    console.log("pagina seleccionada " +pageNumber)
                    this.getPatient(pageNumber);
                }
            }
        }
    </script>
    