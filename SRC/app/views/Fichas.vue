<template>
    <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="guardarFicha">
                                <div class="form-group">
                                    <input type="text" 
                                    v-model='ficha.obra_social'
                                    placeholder="Obra Social" class="form-control">
                                </div>
                                <div class="form-group">
                                    <input type="text" 
                                    v-model='ficha.afiliado'
                                    placeholder="Diagnostico" class="form-control">
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
                                    <input type="nimber" 
                                    v-model='ficha.total_sesiones'
                                    placeholder="Total sesiones" class="form-control">
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
    class Ficha {
        constructor () {
            this.id_paciente = id_paciente;
            this.nombre_paciente = nombre_paciente;
            this.obra_social = obra_social;
            this.afiliado = afiliado;
            this.diagnostico = diagnostico;
            this.autorizado = autorizado;
            this.procedimiento =  procedimiento;
            this.total_sesiones = total_sesiones;
            this.estado = estado;
        }
    }
    export default {
        data(){
            return {
                ficha: new Ficha()
            }
        },
        guardarFicha() {      
            fetch('/api/fichas', {
                method: 'POST',
                body: JSON.stringify(this.paciente),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log("Ficha creada: " + this.ficha.id_paciente);
            });
        }
    }
</script>