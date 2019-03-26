<template>
    <div class="container">
        <div class="row pt-0 justify-content-center ">
            <div class="card">
                <div class="from-group">
                    <tr>
                        <td>
                            <div class="form-control">
                                <input list="lista_tipo_turno" type="text" 
                                v-model='turno.tipo_turno'
                                placeholder="Tipo Turno">
                                <datalist id="lista_tipo_turno">
                                    <option v-for="item_turno in lista_tipo_turno">{{item_turno}}</option>
                                    <!-- <option value="Mañana"></option>
                                    <option value="Tarde"></option> -->
                                </datalist>
                            </div>
                        </td>
                        <td>
                            <div class="form-control">
                                <datepicker input-class="datepicker" 
                                    :language='es' format="dd-MM-yyyy"
                                    placeholder="Turno" 
                                    v-model='turno.fecha_turno'
                                    v-on:selected='onSelect'>
                                </datepicker>
                            </div>
                        </td>
                    </tr>
                </div>
            </div>
        </div>
        <div class="col-md-12">

        
            <table id="mdtable" class="table table-striped table-bordered table-sm" cellspacing="0" 
                  style="width:100%" data-pagination="true" data-page-size="8">
                <tr heigth="100%">
                    <td>
                        <thead>
                            <th style="width:10%">Hora</th>
                            <th style="width:5%">Orden</th>
                            <th style="width:70%">Paciente</th>
                            <th style="width:15%">Estado</th>
                        </thead>
                        <tbody v-for="(turno,index) of datos1" v-bind:key="index">
                            <tr>
                                <td>{{turno.hora_inicio}}</td>
                                <td>{{turno.orden}}</td>
                                <td><b-select class="form-control" v-model='turno.id_paciente'>
                                        <option  disabled :value="null">Seleccione uno</option>
                                        <option v-for='(paciente,index) in pacientes' 
                                                :value="paciente._id" :key="index">
                                            {{paciente.apellido}} {{paciente.nombre}}
                                        </option>
                                    </b-select>
                                </td>
                                <td>{{turno.estado}}</td>
                            </tr>
                        </tbody>
                    </td>
                    <td>
                        <thead>
                            <th>hora</th>
                            <th>Orden</th>
                            <th>Paciente</th>
                            <th>Estado</th>
                        </thead>
                        <tbody v-for="(turno,index) of datos2" v-bind:key="index">
                            <tr>
                                <td>{{turno.hora_inicio}}</td>
                                <td>{{turno.orden}}</td>
                                <td><b-select class="form-control" v-model='turno.id_paciente'>
                                        <option  disabled :value="null">Seleccione uno</option>
                                        <option v-for='(paciente,index) in pacientes' 
                                                :value="paciente._id" :key="index">
                                            {{paciente.apellido}} {{paciente.nombre}}
                                        </option>
                                    </b-select></td>
                                <td>{{turno.estado}}</td>
                                <td>
                                    <button @click="disablePatient(paciente._id)" class="btn btn-danger">
                                        Borrar
                                    </button>
                                </td>
                                <td>
                                    <button @click="editPatient(paciente._id)" class="btn btn-secondary">
                                        Editar
                                    </button>
                                </td>
                                </tr>
                        </tbody>
                    </td>
                </tr>
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
</template>

<script>
    import Datepicker from 'vuejs-datepicker'; 
    import {en,es} from 'vuejs-datepicker/dist/locale';
    import moment from 'moment';
    import "babel-polyfill";

    class Turno {
        constructor(orden_turno, tipo_turno, fecha_turno, hora_inicio, orden, id_paciente, nombre_paciente, estado){
            this.orden_turno = orden_turno;
            this.tipo_turno = tipo_turno;
            this.fecha_turno = fecha_turno;
            this.hora_inicio = hora_inicio;
            this.orden = orden;
            this.id_paciente = id_paciente;
            this.nombre_paciente = nombre_paciente;
            this.estado = estado;
        }
    }

    export default {
        components: {
            Datepicker,
            moment
        },
        data(){
            return {
                turno: new Turno(),
                horas_m: [9001, 9002, 9003, 9004, 9301, 9302, 9303, 9304,
                          10001, 10002, 10003, 10004, 10301, 10302, 10303, 10304,
                          11001, 11002, 11003, 11004, 11301, 11302, 11303, 11304,
                          12001, 12002, 12003, 12004],
                horas_t: [16001, 16002, 16003, 16004, 16301, 16302, 16303, 16304,
                          17001, 17002, 17003, 17004, 17301, 17302, 17303, 17304,
                          18001, 18002, 18003, 18004, 18301, 18301, 18301, 18301,
                          19001, 19002, 19003, 19004],
                lista_tipo_turno: ["Mañana","Tarde"],
                item_turno: '',
                datos1: [],
                datos2: [],
                perPage: 8,
                totalRows: 0,
                currentPage: 1,
                es: es,
                en: en,
                isValid: false,
                count: 0
            }
        },
        created() {
            this.getPatients();
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
            getFilteredTurn(pageNumber, fecha_turno){
                fetch('/api/turnos/pares/'+fecha_turno)
                    .then(res => res.json())
                    .then(data => {
                        this.turnos = data
                        //this.id_turn = id
                        console.log('Turnos: '+ data);
                        this.datos2 = this.turnos.slice((pageNumber -1 ) * this.perPage,
                                       (pageNumber * this.perPage))
                    });
                fetch('/api/turnos/nones/'+fecha_turno)
                    .then(res => res.json())
                    .then(data => {
                        this.turnos = data
                        //this.id_turn = id
                        console.log('Turnos: '+ data);
                        this.datos1 = this.turnos.slice((pageNumber -1 ) * this.perPage,
                                       (pageNumber * this.perPage))
                    });
            },
            async onSelect(date){
                var fetchResult;
                var fecha_turno;
                
                fecha_turno = moment(date).format('YYYY-MM-DD');
                console.log("Fecha p/filtrar ==> " + fecha_turno + '  Turno: ' + this.turno.tipo_turno);
                if(this.turno.tipo_turno == "Mañana"){
                    fetchResult = fetch('/api/turnos/diurno/' + fecha_turno);
                    let response = await fetchResult;
                    let jsonData = await response.json();
                    this.isValid = ((jsonData == 0) ? true : false);
                }else{
                    fetchResult = fetch('/api/turnos/tarde/' + fecha_turno);
                    let response = await fetchResult;
                    let jsonData = await response.json();
                    this.isValid = ((jsonData == 0) ? true : false);
                }
                /* let response = await fetchResult;
                let jsonData = await response.json();
                this.isValid = ((jsonData == 0) ? true : false); */

                    /* fetch('/api/mañana/count/' + '\''+this.fecha_turno+'\'')
                    .then(res => res.json())
                    .then(data => {
                        console.log('data: '+ data);
                        this.count = data;
                        if( this.count == 0){
                            this.insertTurns("m");
                        }
                    }); */
                    /* let fetchResult = fetch('/api/turnos/diurno/' + '\''+this.fecha_turno+'\'');
                    let response = await fetchResult;
                    let jsonData = await response.json();
                    console.log('data: '+ jsonData); */
                    /* if( jsonData == 0){
                            this.insertTurns();
                        } */
               /*      this.isValid = ((jsonData == 0) ? true : false);
                }else{ */
                   /*  fetch('/api/tarde/' + '\''+this.fecha_turno+'\'')
                    .then(res => res.json())
                    .then(data => {
                        console.log('data: '+ data);
                        this.count = data;
                        if( this.count == 0){
                            this.insertTurns();
                        }
                    }); */
                    /* let fetchResult = fetch('/api/turnos/tarde/' + '\''+this.fecha_turno+'\'');
                    let response = await fetchResult;
                    let jsonData = await response.json();
                    this.isValid = ((jsonData == 0) ? true : false);
                } */
                console.log('isValid: ' + this.isValid);
                if (this.isValid){
                    this.insertTurns(fecha_turno);
                    console.log("Crea los turnos del dia " + fecha_turno + " "+this.turno.tipo_turno);
                    this.getFilteredTurn(this.currentPage, fecha_turno)
                }else{
                    this.getFilteredTurn(this.currentPage, fecha_turno)
                }
            },
            insertTurns(fecha){
                console.log("ingreso a la function insertTurns() ");
                var i;
                for (i = 0; i < this.horas_m.length; i++) { 
                    var str = this.horas_m[i].toString();
                    if(this.horas_m[i] < 10000){
                        this.hora_inicio = '0' + str.substring(0,1) + ':' + str.substring(1,3);
                    }else{
                        this.hora_inicio = str.substring(0,2) + ':' + str.substring(2,4);
                    }
                    this.orden = i + 1;
                    this.turno = new Turno(this.horas_m[i], this.turno.tipo_turno, fecha, 
                                        this.hora_inicio, this.orden, '', 
                                        '                              ', 'Disponible');
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
                        //this.getTotalPages(this.id_turn);
                        //this.getFilteredTurn(this.id_turn, this.currentPage);
                        //console.log("Alta - array turnos: " + this.turnos.length);
                        //console.log("Alta - reg: " + this.fecha_turno + " - " + i);
                    });
                }
            },
            changePage(pageNumber) {
                console.log("pagina seleccionada " +pageNumber)
                this.getFilteredTurn(pageNumber);
            },
        }
    }
</script>

