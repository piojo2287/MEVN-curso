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
                                    <option v-for="item_turno in lista_tipo_turno" :key="item_turno.index">
                                         {{item_turno}}</option>
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
                                        <option v-for='paciente in pacientes' 
                                                :value="paciente._id" :key="paciente.index">
                                            {{paciente.apellido}} {{paciente.nombre}}
                                        </option>
                                    </b-select>
                                </td>
                                <td>
                                    <input type="text" class="form-control" 
                                       v-model='turno.dx' 
                                       @change="modificar([turno._id,
                                                           turno.orden_turno,
                                                           turno.tipo_turno,
                                                           turno.hora_inicio,
                                                           turno.orden,
                                                           turno.orden_hora,
                                                           turno.dx])">
                                </td>
                                <td v-on:dblclick="onDblClick([turno.estado, 
                                                               turno.id_paciente])">
                                                               {{turno.estado}}</td>
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
                                        <option v-for='paciente in pacientes' 
                                                :value="paciente._id" :key="paciente.index">
                                            {{paciente.apellido}} {{paciente.nombre}}
                                        </option>
                                    </b-select></td>
                                <td>
                                    <input  type="text" class="form-control"
                                        v-model='turno.dx' 
                                        @change="modificar([turno._id,
                                                            turno.orden_turno,
                                                            turno.tipo_turno,
                                                            turno.hora_inicio,
                                                            turno.orden,
                                                            turno.orden_hora,
                                                            turno.dx])">
                                </td>
                                <td v-on:dblclick="onDblClick([turno.estado, 
                                                               turno.id_paciente])">
                                                               {{turno.estado}}</td>

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
        <!-- Modal para cargar datos de la Ficha de un Paciente -->
        <div>
            <b-modal ref="modal_ficha"  hide-footer title="Datos de la Ficha" 
                   no-stacking ok-only>
                <div class="d-block text-center">
                    <h3>{{this.nombre}}-{{this.texto}}</h3>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="form-group">
                            <input type="text" 
                            v-model='ficha.obra_social'
                            placeholder="Obra Social" class="form-control"
                            required>
                        </div>
                        <div class="form-group">
                            <input type="text" 
                            v-model='ficha.afiliado'
                            placeholder="Nro.Afiliado" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="text" 
                            v-model='ficha.diagnostico'
                            placeholder="Diagnostico" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="text" 
                            v-model='ficha.procedimiento'
                            placeholder="Procedimiento" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="number" 
                            v-model='ficha.total_sesiones'
                            placeholder="Total sesiones" class="form-control">
                        </div>
                        <b-button class="mt-3" variant="outline-danger"  @click="guardarFicha">Guardar</b-button>
                    </div>
                </div>
            </b-modal>
            <b-modal ref="modal_sesion"  hide-footer title="Datos de la Sesion" ok-only>
                <div class="d-block text-center">
                    <h3>{{this.nombre}} - Sesion {{this.nro_sesion}}</h3>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="form-group">
                            <b-select  v-model='sesion.id_trat' v-on:input="onAssignTrat"
                                       class="form-control">
                                <option  disabled :value="null">Seleccione uno</option>
                                <option v-for='tt in tratamientos' 
                                        :value="tt.descripcion" :key="tt.index">
                                    {{tt.descripcion}}
                                </option>
                            </b-select>
                            
                            <!-- <input type="text" 
                            v-model='sesion.tratamiento'
                            placeholder="Tratamiento" class="form-control"> -->
                        </div>
                        <div class="form-group">
                            <input type="number" 
                            v-model.number='duracion'
                            placeholder="Duracion" class="form-control">
                        </div>
                        <b-button class="mt-3" variant="outline-danger"  @click="guardarSesion">Guardar</b-button>
                    </div>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker'; 
    import {en,es} from 'vuejs-datepicker/dist/locale';
    import moment from 'moment';
    import "babel-polyfill";

    class Turno {
        constructor(orden_turno, tipo_turno, fecha_ref, fecha_turno, hora_inicio, orden, orden_hora, 
                    id_paciente, nombre_paciente, dx, estado){
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
    class Sesion{
        constructor(id_ficha, nro_sesion, fecha_sesion, id_trat, desc_trat, duracion, estado){
            this.id_ficha = id_ficha;
            this.nro_sesion = nro_sesion;
            this.fecha_sesion = fecha_sesion;
            this.id_trat = id_trat;
            this.desc_trat = desc_trat;
            this.duracion = duracion;
            this.estado = estado;
        }
    }
    class Ficha {
        constructor (id_paciente, nombre_paciente, obra_social, afiliado, diagnostico, autorizado, 
                     procedimiento, ultima_sesion, total_sesiones, estado) {
            this.id_paciente = id_paciente;
            this.nombre_paciente = nombre_paciente;
            this.obra_social = obra_social;
            this.afiliado = afiliado;
            this.diagnostico = diagnostico;
            this.autorizado = autorizado;
            this.procedimiento =  procedimiento;
            this.ultima_sesion = ultima_sesion
            this.total_sesiones = total_sesiones;
            this.estado = estado;
        }
    }
    export default {
        name: 'app',
        components: {
            Datepicker,
            moment
        },
        data(){
            return {
                turno: new Turno(), sesion: new Sesion(), ficha: new Ficha(),
                turnos: [], datos1: [], datos2: [], tratamientos: [], pacientes: [],
                fichas: [],
                horas_m: [9001, 9002, 9003, 9004, 9301, 9302, 9303, 9304,
                          10001, 10002, 10003, 10004, 10301, 10302, 10303, 10304,
                          11001, 11002, 11003, 11004, 11301, 11302, 11303, 11304,
                          12001, 12002, 12003, 12004],
                horas_t: [16001, 16002, 16003, 16004, 16301, 16302, 16303, 16304,
                          17001, 17002, 17003, 17004, 17301, 17302, 17303, 17304,
                          18001, 18002, 18003, 18004, 18301, 18301, 18301, 18301,
                          19001, 19002, 19003, 19004],
                lista_tipo_turno: ["Mañana","Tarde"],
                
                fecha_actual: '', fecha_turno: '', id_paciente: '', id_ficha: '',
                nombre: '', cant_sesiones: 0, ultima_sesion: 0, texto: '',
                id_turno: '', item_turno: '', desc_trat: '', duracion: '',
                
                perPage: 8, totalRows: 0, currentPage: 1, count: 0,
                es: es, en: en, isValid: false, edit: false, exists: false
            }
        },
        created() {
            this.getPatients();
            this.getTratamientos();
        },
        methods: {
            showModal(modal) {
                this.$refs[modal].show()
            },
            hideModal(modal) {
                this.$refs[modal].hide()
            },
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
                        this.datos2 = this.turnos.slice((pageNumber -1 ) * this.perPage,
                                       (pageNumber * this.perPage))
                    });
                fetch('/api/turnos/nonesm/'+ fecha_turno)
                    .then(res => res.json())
                    .then(data => {
                        this.turnos = data
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
                /*  Verificar si tiene ficha */       
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
            },
            updateFicha() {           
                fetch('/api/fichas/' + this.id_ficha, {
                    method: 'PUT',
                    body: JSON.stringify(this.ficha),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then (res => res.json())
                .then (data => {
                    console.log("ficha actualizada - ultima sesion: " + " " + this.ficha.ultima_sesion);
                })
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
            onAssignTrat(value){
                console.log("Ingreso un tratamiento !!!!" + value);
                
            },
            omitir(){
                this.edit = false;
            },
            modificar(value){
                console.log("Ingreso a modificar() !!!!" + value + " " + this.nombre);
                this.id_turno = value[0]
                this.turno.orden_turno = value[1]
                this.turno.tipo_turno = value[2]
                this.turno.hora_inicio = value[3]
                this.turno.orden = value[4]
                this.turno.orden_hora = value[5]
                this.turno.nombre_paciente = this.nombre
                this.turno.dx = value[6]
                this.turno.estado='Ocupado'
                this.edit = true;
            },
            async onDblClick(value){
                var fetchResult;
                var response;
                var jsonData;
                console.log("Ingreso a onDblClick() !!!! " + value[0] + " " + value[1]);
                this.id_paciente = value[1]
                if (value[0] == 'Ocupado'){
                    /*  
                        Busca los datos de Pacientes 
                    */
                    fetchResult = fetch('api/pacientes/' + this.id_paciente);
                    response = await fetchResult;
                    jsonData = await response.json();
                    this.nombre = jsonData.apellido + " " + jsonData.nombre;
                    /* fetch('api/pacientes/' + this.id_paciente)
                    .then(res => res.json())
                    .then(data => {
                        this.nombre = data.apellido + " " + data.nombre;
                    }); */
 
                    /*  
                        Busca los datos de la Fichas 
                    */
                    console.log(" Busca la ficha " + this.id_paciente);
                    //this.getFicha(this.id_paciente);

                    var fetchResult;
                    var response;
                    var jsonData;
                    fetchResult = fetch('api/fichas/' + this.id_paciente);
                    response = await fetchResult;
                    jsonData = await response.json();
                    
                    this.fichas = jsonData;
                    console.log("Long. Ficha   ----" + this.fichas.length)


                    console.log("Long. Ficha (2)   ----" + this.fichas.length)
                    if (this.fichas.length > 0){
                        this.ultima_sesion = this.fichas[0].ultima_sesion
                        this.id_ficha = this.fichas[0]._id;
                        console.log(" Ficha (3)  ----" + this.fichas[0]._id)
                        this.ficha = this.fichas[0];
                        this.exists = true; 
                    }else{
                        //console.log(" Ficha (4)  ----" + this.fichas[0]._id)
                        this.exists = false;
                    } 
                    /* if (!this.exists){
                        console.log(" NO tiene ficha ")
                        this.texto = "Sin ficha"
                        this.showModal('modal_ficha');
                    }else{
                        console.log(" Tiene ficha " + this.id_paciente);
                    }
 */
                    /* fetchResult = fetch('api/fichas/' + this.id_paciente);
                    response = await fetchResult;
                    jsonData = await response.json();
                    console.log(" Datos de la ficha " + jsonData._id);
                    this.ficha = jsonData;
                    if (jsonData == 0){
                        console.log(" NO tiene ficha " + jsonData)
                        this.texto = "Sin ficha"
                        this.showModal('modal_ficha');
                    } */
                    
                    /* fetch('api/fichas/' + this.id_paciente)
                    .then(res => res.json())
                    .then(data => {
                        this.fichas = data;
                        console.log(" Datos de la ficha " + this.fichas.nombre_paciente);
                        if (data == 0){
                            console.log(" NO tiene ficha ")
                            this.texto = "Sin ficha"
                            this.showModal('modal_ficha');
                        }else{
                            console.log(" Tiene ficha " + this.ficha.id_paciente);
                        }
                    }); */
                    
                    
                    /*  
                        Busca los datos de la Ficha activa del paciente 
                    */
                    /* fetchResult = fetch('api/fichas/activa/' + this.id_paciente)
                    response = await fetchResult;
                    jsonData = await response.json();
                    this.ficha = jsonData
                    console.log("  ficha " + this.id_ficha) */


                    /* fetch('api/fichas/activa/' + this.id_paciente)
                    .then(res => res.json())
                    .then(data => {
                        this.ficha = data
                        console.log("  ficha " + this.ficha._id)
                    }); */

                    /*  
                        Obtiene la cantidad de sesiones realizadas 
                    */
                    if (!this.exists){
                        console.log(" NO tiene ficha ")
                        this.texto = "Sin ficha"
                        this.showModal('modal_ficha');
                       
                        this.nro_sesion = 1
                        //this.texto = ''
                        //this.showModal('modal_sesion');
                    }else{
                        this.nro_sesion = this.ultima_sesion;
                        console.log(" Tiene ficha " + this.id_paciente);
                        //this.getSesion(this.id_ficha)
                        this.showModal('modal_sesion');
                    }   
                }
            },
            guardarFicha(){
                this.ficha = new Ficha(this.id_paciente, this.nombre, this.ficha.obra_social, 
                                       this.ficha.afiliado, this.ficha.diagnostico, false, 
                                       this.ficha.procedimiento, 1,
                                       this.ficha.total_sesiones, 'Generada');
                fetch('/api/fichas', {
                    method: 'POST',
                    body: JSON.stringify(this.ficha),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    //console.log("Alta - array turnos: " + this.turnos.length);
                });
                this.hideModal('modal_ficha');
                this.ficha.ultima_sesion = 1
                this.texto = ''
                
                this.ficha = new Ficha();
                this.showModal('modal_sesion');
            },
            async guardarSesion(value){
                if (!this.exists){
                    var fetchResult;
                    var response;
                    var jsonData;
                    fetchResult = fetch('api/fichas/' + this.id_paciente);
                    response = await fetchResult;
                    jsonData = await response.json();
                    
                    this.fichas = jsonData;
                    console.log("Long. Ficha   ----" + this.fichas.length)
                    this.ficha = this.fichas[0];
                    this.id_ficha = this.fichas[0]._id;
                }

                console.log("Valores de la sesion "+this.ficha.ultima_sesion+"  "+this.desc_trat+
                                   "  "+this.duracion)
                this.sesion = new Sesion(this.id_ficha, this.ficha.ultima_sesion, 
                                         moment(new Date()).format('YYYY-MM-DD'),
                                         this.sesion.id_trat , this.desc_trat, 
                                         this.duracion, "Realizada")
                fetch('/api/sesiones', {
                    method: 'POST',
                    body: JSON.stringify(this.sesion),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    //console.log("Alta - array turnos: " + this.turnos.length);
                });

                
                this.hideModal('modal_sesion');
                this.desc_trat = ''; 
                this.duracion = '';

                this.sesion = new Sesion();
                //this.sesion.desc_trat = '';
                //this.sesion.duracion = '';

                this.ficha.ultima_sesion = this.ficha.ultima_sesion + 1;
                if(this.ficha.ultima_sesion > this.ficha.total_sesiones ){
                    this.ficha.estado = "Realizada"
                }
                console.log("Ficha (5)   ----" + this.ficha._id 
                         + " " + this.ficha.id_paciente
                         + " " + this.ficha.nombre_paciente
                         + " " + this.ficha.obra_social
                         + " " + this.ficha.afiliado
                         + " " + this.ficha.diagnostico
                         + " " + this.ficha.ultima_sesion
                         + " " + this.ficha.estado)
                this.updateFicha();

            },
            /* async getFicha(id_paciente){
                var fetchResult;
                var response;
                var jsonData;
                fetchResult = fetch('api/fichas/' + this.id_paciente);
                response = await fetchResult;
                jsonData = await response.json();
                
                this.fichas = jsonData;
                console.log("Long. Ficha   ----" + this.fichas.length)
                this.ficha = this.fichas[0];
                this.id_ficha = this.fichas[0]._id; */
                
                //this.id_ficha = this.fichas[0]._id;
                
                
                /* fetch('api/fichas/' + this.id_paciente)
                    .then(res => res.json())
                    .then(data => {
                        this.fichas = data;
                        //this.id_ficha = this.fichas[0]._id;
                        //console.log(" Ficha   ----" + this.fichas[0]._id)
                        this.sleep(1000)
                        console.log("Long. Ficha (1)   ----" + this.fichas.length)
                    }); */
                
                //console.log("Long. Ficha   ----" + this.fichas.length)
                /* if (this.fichas.length > 0){
                    this.ultima_sesion = this.ficha[0].ultima_sesion
                    this.id_ficha = this.fichas[0]._id;
                    console.log(" Ficha   ----" + this.fichas[0]._id)
                    this.exists = true; 
                }else{
                    this.exists = false;
                }  */  
                
           /*  }, */
            getSesion(id_ficha){
                /* var fetchResult;
                var response;
                var jsonData;
                fetchResult = fetch('api/sesiones/count/' + this.id_ficha);
                response = await fetchResult;
                jsonData = await response.json();
                this.count = jsonData
                console.log("  sesion " + this.count) */
                console.log("  id_ficha recibida  " + id_ficha + " - " + 'api/sesiones/count/' + id_ficha)
                fetch('api/sesiones/count/' + id_ficha)
                .then(res => res.json())
                .then(data => {
                    this.nro_sesion = data
                    console.log("  sesion " + data)
                });
            },
            /* sleep(milliseconds) {
                var start = new Date().getTime();
                for (var i = 0; i < 1e7; i++) {
                    if ((new Date().getTime() - start) > milliseconds) {
                        break;
                    }
                }
            } */
        }
    }
</script>


