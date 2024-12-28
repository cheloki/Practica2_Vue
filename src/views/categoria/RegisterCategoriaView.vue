<template>
  <div>
    <h1>Registrar Categorias</h1>
    <form @submit.prevent="submitForm()">

      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="form.nombre" :class="{ 'is-invalid': errors.nombre }"
          placeholder="Ingrese el nombre" />
        <div v-if="errors.nombre" class="invalid-feedback">{{ errors.nombre }}</div>
      </div>

      <div class="form-group">
        <label for="description">Descripción:</label>
        <input type="text" id="description" v-model="form.descripcion" :class="{ 'is-invalid': errors.descripcion }"
          placeholder="Ingrese el teléfono" />
        <div v-if="errors.descripcion" class="invalid-feedback">{{ errors.descripcion }}</div>
      </div>


      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>
  
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'RegisterCategoria',
  data() {
    return {
      categoriaList: [],
      form: {
        nombre: '',
        descripcion: ''
      },
      errors: {}
    };
  },
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};

      if (!this.form.nombre) {
        this.errors.nombre = 'El nombre es requerido.';
      }

 
      if (!this.form.descripcion) {
        this.errors.descripcion = 'La descripción es obligatoria.';
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        // Enviar los datos al servidor
        this.save();
        // Reiniciar el formulario
        this.form = {
         nombre: '',
        descripcion: ''
        };
      }
    },
    save() {
      const vm = this;
      this.axios.post(this.baseUrl + "/categorias", this.form)
        .then(function (response) {
          if (response.status == '201') {
            vm.$emit('on-register', response.data);
          }
          console.log(response);
          //vm.itemList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    
  },
  computed: {
    // propiedades computadas que dependen de otras propiedades reactivas
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl
    }
  },
 
}
</script>
  
<style scoped></style>
  