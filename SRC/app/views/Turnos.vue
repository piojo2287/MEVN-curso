<template>
    <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="sendTurn">
                                <div class="form-group">
                                    <b-select class="form-control" v-model='turno.id_paciente' 
                                        @change="onChange($event)">
                                        <option  disabled :value="null">Seleccione uno</option>
                                        <option v-for='(paciente,index) in pacientes' 
                                                :value="paciente._id" :key="index">
                                            {{paciente.apellido}} {{paciente.nombre}}
                                        </option>
                                    </b-select>
                                </div>
                                <div class="form-group">
                                    <div class="form-control">
                                        <datepicker input-class="datepicker" 
                                            :language='es' :format="customFormatter" 
                                            placeholder="Fecha Turno" 
                                            v-model='turno.fecha_turno'>
                                        </datepicker>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <b-form-input class="form-control" :type="`time`" 
                                            v-model='turno.hora_inicio'
                                            v-b-tooltip.hover title="Hora Inicio Turno"/>
                                </div>
                                <div class="form-group">
                                    <b-form-input class="form-control" :type="`time`" 
                                            v-model='turno.hora_final'
                                            v-b-tooltip.hover title="Hora Final Turno"/>
                                </div>
                                <div class="form-group">
                                    <input list="lista_tratamiento" type="text" 
                                    v-model='turno.tipo_tratamiento'
                                    placeholder="Tratamiento" class="form-control">
                                    <datalist id="lista_tratamiento">
                                        <option value="Fisioterapia 1"></option>
                                        <option value="Fisioterapia 2"></option>
                                        <option value="Fisioterapia 3"></option>
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
                            <th>Fecha</th>
                            <th>Hora Inicio</th>
                            <th>Hora Fin</th>
                        </thead>
                        <tbody v-for="(turno,index) of datos" v-bind:key="index">
                            <td>{{turno.fecha_turno}}</td>
                            <td>{{turno.hora_inicio}}</td>
                            <td>{{turno.hora_final}}</td>
                            <td>
                                <button @click="disableTurn(paciente._id)" class="btn btn-danger">
                                    Borrar
                                </button>
                                <button @click="editTurn(paciente._id)" class="btn btn-secondary">
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
    import BPagination from 'bootstrap-vue/es/components/pagination/pagination';
    import BFormSelect from 'bootstrap-vue/es/components/form-select/form-select';
    import moment from 'moment';

    class Turno {
        constructor(id_paciente, fecha_turno, hora_inicio, hora_final, tipo_tratamiento){
            this.id_paciente = id_paciente;
            this.fecha_turno = fecha_turno;
            this.hora_inicio = hora_inicio;
            this.hora_final = hora_final;
            this.tipo_tratamiento = tipo_tratamiento;
        }
    }

    export default {
        components: {
            Datepicker,
            BPagination,
            BFormSelect,
            moment
        },
        data(){
            return {
                turno: new Turno(),
                turnos: [],
                pacientes: [],
                datos: [],
                edit: false,
                patientToEdit: '',
                perPage: 5,
                totalRows: 0,
                currentPage: 1,
                es: es,
                en: en,
                id: ''
            }
        },
        created(){
            this.getPatients();
            //this.getTurn(this.currentPage);
        },
        methods: {
            getPatients(){
                fetch('/api/pacientes')
                    .then(res => res.json())
                    .then(data => {
                        this.pacientes = data
                        //console.log(this.pacientes);
                    });
            },
            sendTurn() {
                if (this.edit === false){
                    console.log(this.turno)
                    fetch('/api/turnos', {
                        method: 'POST',
                        body: JSON.stringify(this.turno),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.getTotalPages();
                        //this.getPatient(this.currentPage);
                        console.log("Alta - array pacientes: " + this.turnos.length);
                        console.log("Alta - total filas: " + this.totalRows);
                    });
                }else{
                    fetch('/api/turnos/' + this.patientToEdit, {
                        method: 'PUT',
                        body: JSON.stringify(this.turno),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then (res => res.json())
                    .then (data => {
                        this.getTurn(this.currentPage);
                        this.edit = false;
                    })
                }

                this.turno = new Turno();
            },
            getTurn(pageNumber){
                fetch('/api/turnos')
                    .then(res => res.json())
                    .then(data => {
                        this.turnos = data
                        //console.log("Pagina " +pageNumber);
                        //console.log("Limite inferior: "+(pageNumber -1 ) * 5);
                        //console.log("Limite superior: "+(pageNumber * 5));
                        this.datos = this.turnos.slice((pageNumber -1 ) * 5,(pageNumber * 5))
                    });
            },
            disableTurn(id) {
                fetch('api/turnos/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.getTurn(this.currentPage);
                });
            },
            editTurn(id) {
                fetch('api/turnos/' + id)
                .then(res => res.json())
                .then(data => {
                    //this.fechaFormato = this.formatDate(data.fecha_nac);
                    this.turno = new turno(data.id_paciente, data.fecha_turno, 
                                           data.hora_inicio, data.hora_final, 
                                           data.tipo_tratamiento);
                    this.patientToEdit = data._id;
                    this.edit = true;
                });
            },
            getTotalPages(){
                fetch('/api/turnos')
                    .then(res => res.json())
                    .then(data => {
                        this.turnos = data
                        console.log(this.turnos)
                        this.totalRows = this.turnos.length
                        console.log(this.turnos.length + " / " + this.perPage)
                        console.log("Total paginas: " + Math.ceil(this.turnos.length / this.perPage))
                    });
            },
            changePage(pageNumber) {
                console.log("pagina seleccionada " +pageNumber)
                this.getTurn(pageNumber);
            },
            customFormatter(date) {
                return moment(date).format('DD/MM/YYYY')
            },
            onChange(event){
                //console.log('Llamado a la funcion ... ' + this.turno.id_paciente);
                console.log('Llamado a la funcion ... ' + event);
                this.id = event;
                fetch('/api/turnos/'+event)
                    .then(res => res.json())
                    .then(data => {
                        this.turnos = data
                        //console.log(this.pacientes);
                    });
 
                //console.log(id);
            }
        }
    }
</script>

<style>
    input.datepicker {
        border-left-width: 0;
        border-right-width: 0;
        border-top-width: 0;
        border-bottom-width: 0;
        width: 100% ;
    }
</style>

