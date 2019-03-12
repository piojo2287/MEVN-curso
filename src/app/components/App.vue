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
              <form @submit.prevent="sendPaciente">
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
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>fecha Nacimiento</th>
                <th>Genero</th>
                <th>Domicilio</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="paciente of pacientes" v-bind:key="paciente">
                <td>{{paciente.nombre}}</td>
                <td>{{paciente.apellido}}</td>
                <td>{{paciente.fecha_nac}}</td>
                <td>{{paciente.genero}}</td>
                <td>{{paciente.domicilio}}</td>
                <td>
                  <button @click="deletePaciente(paciente._id)" class="btn btn-danger">X</button>
                  <button @click="editPaciente(paciente._id)" class="btn btn-secondary">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
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
      },
      pacientes: [],
      edit: false,
      pacienteToEdit: ""
    };
  },
  created() {
    this.getPaciente();
  },

  methods: {
    sendPaciente() {
      if (this.edit === false) {
        fetch("/api/pacientes", {
          method: "POST",
          body: JSON.stringify(this.paciente),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getPaciente();
          });
      } else {
        fetch("/api/pacientes/" + this.pacienteToEdit, {
          method: "PUT",
          body: JSON.stringify(this.paciente),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getPaciente();
            this.edit = false;
          });
      }

      this.paciente.nombre = "";
      this.paciente.apellido = "";
      this.paciente.fecha_nac = "";
      this.paciente.genero = "";
      this.paciente.domicilio = "";
    },
    getPaciente() {
      fetch("/api/pacientes")
        .then(res => res.json())
        .then(data => {
          this.pacientes = data;
          console.log(this.pacientes);
        });
    },
    deletePaciente(id) {
      fetch("api/pacientes/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          this.getPaciente();
        });
    },
    editPaciente(id) {
      fetch("api/pacientes/" + id)
        .then(res => res.json())
        .then(data => {
          this.paciente = {
            nombre: data.nombre,
            apellido: data.apellido,
            fecha_nac: data.fecha_nac,
            genero: data.genero,
            domicilio: data.domicilio
          };
          this.pacienteToEdit = data._id;
          this.edit = true;
        });
    }
  }
};
</script>


<style>
</style>
