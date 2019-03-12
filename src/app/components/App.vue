<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a href="/" class="navbar-brand">Pacientes</a>
    </nav>
    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="addPaciente">
                <div class="form-group">
                  <input
                    type="text"
                    v-model="paciente.nombre"
                    placeholder="Inserte nombre"
                    class="form-control"
                  >
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    v-model="paciente.apellido"
                    placeholder="Inserte apellido"
                    class="form-control"
                  >
                </div>

                <div class="form-group">
                  <input
                    type="date"
                    v-model="paciente.fecha_nac"
                    placeholder="Inserte fecha de nacimiento"
                    class="form-control"
                  >
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    v-model="paciente.genero"
                    placeholder="Seleccione genero"
                    class="form-control"
                  >
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    v-model="paciente.domicilio"
                    placeholder="Inserte domicilio"
                    class="form-control"
                  >
                </div>

                <button class="btn btn-primary btn-block">Enviar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
class Paciente {
  constructor(nombre, apellido, fecha_nac, genero, domicilio) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.fecha_nac = fecha_nac;
    this.genero = genero;
    this.domicilio = domicilio;
  }
}
*/
export default {
  data() {
    return {
      paciente: {
        nombre: "",
        apellido: "",
        fecha_nac: "",
        genero: "",
        domicilio: ""
      }
    }
  },
  methods: {
    addPaciente() {
      console.log(this.paciente)
  
      this.paciente.nombre = "";
      this.paciente.apellido = "";
      this.paciente.fecha_nac = "";
      this.paciente.genero = "";
      this.paciente.domicilio = "";
    }
  }
};
</script>


<style>
</style>
