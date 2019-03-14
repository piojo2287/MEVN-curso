<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a href="/" class="navbar-brand">MEVN Stack</a>
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
                    v-model="paciente.title"
                    placeholder="insert a task"
                    class="form-control"
                  >
                </div>

                <div class="form-group">
                  <textarea
                    v-model="paciente.description"
                    cols="30"
                    rows="10"
                    class="form-control"
                    placeholder="insert a description"
                  ></textarea>
                  
                  <button class="btn btn-primary btn-block">send</button>
                </div>
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
class Paciente  {
  constructor (title, description) {
    this.title = title;
    this.description = description;
  }
}*/

export default {
  data() {
    return {
      paciente: new Paciente()
    };
  },
  methods: {
    addPaciente() {
      console.log(this.paciente);
      this.paciente = new Paciente();
    }
  }
};
</script>

<style>
</style>
