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
                                    :value='turno.fecha_turno'
                                    v-on:selected='onSelect'>
                                </datepicker>
                            </div>
                        </td>
                        <td> </td>
                        <td v-if="edit === true">
                            <button @click="updateTurnos()" class="btn btn-secondary">
                                Asignar Turno
                            </button>
                        </td>
                        <!-- <td v-if="edit === true">
                            <button @click="omitir()" class="btn btn-secondary">
                                Omitir
                            </button>
                        </td> -->
                    </tr>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <table id="mdtable" class="table table-striped table-bordered table-sm" cellspacing="0" 
                  style="width:100%" data-pagination="true" data-page-size="8">
                <tr>
                    <td>
                        <thead>
                            <th style="width:8%">Hora</th>
                            <th style="width:3%">Nro</th>
                            <th style="width:40%">Paciente</th>
                            <th style="width:40%">DX</th>
                            <th style="width:15%">Estado</th>
                        </thead>
                        <tbody v-for="(turno,index) of datos1" v-bind:key="index">
                            <tr>
                                <td>{{turno.hora_inicio}}</td>
                                <td>{{turno.orden_hora}}</td>
                                <td><b-select  v-model='turno.id_paciente' v-on:input="onAssignPacLeft">
                                        <option  disabled :value="null">Seleccione uno</option>
                                        <option v-for='(paciente,index) in pacientes' 
                                                :value="paciente._id" :key="index">
                                            {{paciente.apellido}} {{paciente.nombre}}
                                        </option>
                                    </b-select>
                                </td>
                                <td>
                                    <input type="text" class="form-control" 
                                       v-model='turno.dx' 
                                       @change="modificar([turno._id,turno.dx])">
                                </td>
                                <td>{{turno.estado}}</td>
                                <!-- <td><b-select  v-model='turno.id_paciente' v-on:input="onAssignTra">
                                        <option  disabled :value="null">Seleccione uno</option>
                                        <option v-for='(tratamiento,index) in tratamientos' 
                                                :value="tratamiento.descripcion" :key="index">
                                            {{tratamiento.descripcion}}
                                        </option>
                                    </b-select>
                                </td> -->
                            </tr>
                        </tbody>
                    </td>
                    <td>
                        <thead>
                            <th style="width:8%">hora</th>
                            <th style="width:3%">Nro</th>
                            <th style="width:40%">Paciente</th>
                            <th style="width:40%">DX</th>
                            <th style="width:15%">Estado</th>
                        </thead>
                        <tbody v-for="(turno,index) of datos2" v-bind:key="index">
                            <tr>
                                <td>{{turno.hora_inicio}}</td>
                                <td>{{turno.orden_hora}}</td>
                                <td><b-select  v-model='turno.id_paciente' v-on:input="onAssignPacRight">
                                        <option  disabled :value="null">Seleccione uno</option>
                                        <option v-for='(paciente,index) in pacientes' 
                                                :value="paciente._id" :key="index">
                                            {{paciente.apellido}} {{paciente.nombre}}
                                        </option>
                                    </b-select></td>
                                <td>
                                    <input  type="text" class="form-control"
                                        v-model='turno.dx' 
                                        @change="modificar([turno._id,turno.dx])">
                                </td>
                                <td>{{turno.estado}}</td>

                                <!-- <td><b-select  v-model='turno.id_paciente' v-on:input="onAssignTra">
                                        <option  disabled :value="null">Seleccione uno</option>
                                        <option v-for='(tratamiento,index) in tratamientos' 
                                                :value="tratamiento.descripcion" :key="index">
                                            {{tratamiento.descripcion}}
                                        </option>
                                    </b-select>
                                </td> -->
                            </tr>
                        </tbody>
                    </td>
                </tr>
            </table>
        </div>
        <div class="overflow-auto">
            <div class="mt-3 text-right" style="width=120px">
                <b-pagination v-model="currentPage" :total-rows="totalRows"
                                    :per-page="perPage"
                                    v-on:input="changePage"/>                 
            </div>
            <div class="mt-3">Pagina Actual: {{ currentPage }}</div>
        </div>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker'; 
    import {en,es} from 'vuejs-datepicker/dist/locale';
    import moment from 'moment';
    import "babel-polyfill";

    class Turno {
        constructor(orden_turno, tipo_turno, fecha_ref, fecha_turno, hora_inicio, orden, orden_hora, id_paciente, nombre_paciente, dx, estado){
            this.orden_turno = orden_turno;
            this.tipo_turno = tipo_turno;
            this.fecha_ref = fecha_ref;
            this.fecha_turno = fecha_turno;
            this.hora_inicio = hora_inicio;
            this.orden = orden;
            this.orden_hora = orden_hora;
            this.id_paciente = id_paciente;
            this.nombre_paciente = nombre_paciente;
            this.dx = dx;
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
                turnos: [],
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
                fecha_actual: '',
                fecha_turno: '',
                id_paciente: '',
                nombre: '',
                id_turno: '',
                datos1: [],
                datos2: [],
                perPage: 8,
                totalRows: 0,
                currentPage: 1,
                es: es,
                en: en,
                isValid: false,
                edit: false,
                count: 0
            }
        },
        created() {
            this.getPatients();
            this.getTratamientos();

        },
        methods: {
            getPatients(){
                fetch('/api/pacientes')
                    .then(res => res.json())
                    .then(data => {
                        this.pacientes = data
                    });
            },
            getTratamientos(){
                fetch('/api/tratamientos')
                    .then(res => res.json())
                    .then(data => {
                        this.tratamientos = data
                    });
            },
            getFilteredTurn(pageNumber, fecha_turno, tipo){
                fetch('/api/turnos/paresm/' + fecha_turno)
                    .then(res => res.json())
                    .then(data => {
                        this.turnos = data
                        //this.id_turn = id
                        //console.log('Turnos: '+ data);
                        this.datos2 = this.turnos.slice((pageNumber -1 ) * this.perPage,
                                       (pageNumber * this.perPage))
                    });
                fetch('/api/turnos/nonesm/'+ fecha_turno)
                    .then(res => res.json())
                    .then(data => {
                        this.turnos = data
                        //this.id_turn = id
                        //console.log('Turnos: '+ data);
                        this.datos1 = this.turnos.slice((pageNumber -1 ) * this.perPage,
                                       (pageNumber * this.perPage))
                    });
            },
            async onSelect(value){
                var fetchResult;
               
                this.fecha_actual = moment(value).format('YYYY-MM-DD');
                console.log("Fecha seleccionada ==> " + this.fecha_actual);
                //---------------------------------------------------------------------------------
                let day = value.getDate();
                let month = 1 + value.getMonth();
                let year = value.getFullYear();

                this.fecha_turno = year+""+month+""+day;
                
                //var options = {weekday: "long", year: "numeric", month: "long", 
                //               day: "numeric", hour: "numeric", minute: "numeric", 
                //               second: "numeric", hour12:"false"};
                //alert(value.toLocaleString("es-AR", options));
                //---------------------------------------------------------------------------------
                //alert("Fecha p/filtrar ==> " + this.fecha_turno + '  Turno: ' + this.turno.tipo_turno);
                if(this.turno.tipo_turno == "Mañana"){
                    fetchResult = fetch('/api/turnos/diurno/' + this.fecha_turno);
                    let response = await fetchResult;
                    let jsonData = await response.json();
                    this.isValid = ((jsonData == 0) ? true : false);
                }else{
                    fetchResult = fetch('/api/turnos/tarde/' + this.fecha_turno);
                    let response = await fetchResult;
                    let jsonData = await response.json();
                    this.isValid = ((jsonData == 0) ? true : false);
                }
                
                console.log('isValid: ' + this.isValid);
                if (this.isValid){
                    this.insertTurns(this.fecha_turno);
                    console.log("Crea los turnos del dia " + this.fecha_turno + " "+this.turno.tipo_turno);
                    this.getTotalPages(this.fecha_turno, this.turno.tipo_turno)
                    this.getFilteredTurn(this.currentPage, this.fecha_turno, this.turno.tipo_turno)
                }else{
                    this.getTotalPages(this.fecha_turno, this.turno.tipo_turno)
                    this.getFilteredTurn(this.currentPage, this.fecha_turno, this.turno.tipo_turno)
                }
            },
            insertTurns(fecha){
                console.log("ingreso a la function insertTurns() ");
                var i;
                var j=0;
                for (i = 0; i < this.horas_m.length; i++) { 
                    var str = this.horas_m[i].toString();
                    if(this.horas_m[i] < 10000){
                        this.hora_inicio = '0' + str.substring(0,1) + ':' + str.substring(1,3);
                    }else{
                        this.hora_inicio = str.substring(0,2) + ':' + str.substring(2,4);
                    }
                    this.orden = i + 1;
                    if (j > 3){
                        j = 1;
                    }else{
                        j = j + 1;
                    }
                    this.orden_hora = j;
                    this.turno = new Turno(this.horas_m[i], this.turno.tipo_turno, fecha, this.fecha_actual,
                                        this.hora_inicio, this.orden, this.orden_hora, '', 
                                        '', '', 'Disponible');
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
            editTurnop(id) {
                fetch('api/turnos/' + id)
                .then(res => res.json())
                .then(data => {
                    //this.fechaFormato = this.formatDate(data.fecha_nac);
                    this.turno = new Paciente(data.nombre_paciente, data.estado);
                    this.patientToEdit = data._id;
                    this.edit = true;
                });
            },
            updateTurnos() {           
                console.log("Fecha_actual: " + this.fecha_turno + "    " + this.id_turno)
                fetch('/api/turnos/' + this.id_turno, {
                    method: 'PUT',
                    body: JSON.stringify(this.turno),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then (res => res.json())
                .then (data => {
                    this.getFilteredTurn(this.currentPage, this.fecha_turno, this.turno.tipo_turno);
                    this.edit = false;
                })
                //this.getFilteredTurn(this.currentPage, fecha_turno, this.turno.tipo_turno);
            },
            getTotalPages(fecha_turno, tipo){
                if (tipo = "Mañana"){
                    fetch('/api/turnos/paresm/' + fecha_turno)
                        .then(res => res.json())
                        .then(data => {
                            this.turnos = data
                            console.log(this.turnos)
                            this.totalRows = this.turnos.length
                            console.log(this.turnos.length + " / " + this.perPage)
                            console.log("Total paginas: " + Math.ceil(this.turnos.length / this.perPage))
                        });
                }
            },
            changePage(pageNumber) {
                console.log("pagina seleccionada " +pageNumber)
                this.getFilteredTurn(pageNumber, this.fecha_turno, this.turno.tipo_turno)
            },
            onAssignPacLeft(value){
                console.log("Ingreso un paciente !!!!" + value);
                this.turno.id_paciente = value;
                fetch('api/pacientes/' + value)
                    .then(res => res.json())
                    .then(data => {
                        this.nombre = data.apellido + " " + data.nombre;
                    });
            },
            onAssignPacRight(value){
                console.log("Ingreso un paciente !!!!" + value);
                this.turno.id_paciente = value;
                fetch('api/pacientes/' + value)
                    .then(res => res.json())
                    .then(data => {
                        this.nombre = data.apellido + " " + data.nombre;
                    });
            },
            //onAssignTra(value){
            //    console.log("Ingreso un tratamiento !!!!" + value);
            //    this.edit = true;
            //},
            omitir(){
                this.edit = false;
            },
            modificar(value){
                console.log("Ingreso a modificar() !!!!" + value + " " + this.nombre);
                this.id_turno = value[0]
                this.turno.nombre_paciente = this.nombre
                this.turno.dx = value[1]
                this.turno.estado='Ocupado'
                this.edit = true;
            }
        }
    }
</script>

<style>
    /* .tbody {
    max-width: 400px;
    margin: 0 auto;
    padding: 5px;
    } */
</style>


