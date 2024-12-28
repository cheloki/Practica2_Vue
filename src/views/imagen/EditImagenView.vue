<template>
  <div>
    <h1>Editar Imagen</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="categoria">Nombre Portaobjeto:</label>
        <select id="portaobjeto" v-model="form.portaobjetoId" :class="{ 'is-invalid': errors.portaobjetoId }">
          <option :value="portaobjeto.id" v-for="(portaobjeto, index) in portaobjetoList" :key="`categoria-${index}`">{{ portaobjeto.nombre }}
          </option>
        </select>
        
      </div>
      <div class="form-group">
        <!--
        <label for="name">Ruta:</label>
        <input type="text" id="ruta" v-model="form.ruta" :class="{ 'is-invalid': errors.ruta }"
          placeholder="Ingrese la ruta" />
        -->
         
        <input class="form-control" type="file" name="inputFile" id="inputFile" ref="inputFile" @change="selectFile" >
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
  name: 'EditImagenes',
  data() {
    return {
     portaobjetoList: [],
     errors: {}
    };
  },
  props: ['item'],
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};
   
      if (!this.form.ruta) {
       this.errors.ruta = 'La ruta es requerida.';
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
      }
    },
    save() {
      const vm = this;
      this.axios.patch(this.baseUrl + "/imagenes/" + this.item.id, this.form)
        .then(function (response) {
          if (response.status == '200') {
            vm.$emit('on-update', response.data);
          }
          console.log(response); 
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    getPortaobjetoList() {
      const vm = this;
      this.axios.get(this.baseUrl + "/portaobjetos")
        .then(function (response) {
          vm.portaobjetoList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    selectFile(event) {
      this.file = event.target.files[0];
      if (this.file)
    {
      this.form.ruta=this.file.name;
    }
     
    },
    clearFile() {
      this.file = null;
      this.$refs.inputFile.value = null
    }
  },
  computed: {
    // propiedades computadas que dependen de otras propiedades reactivas
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl
    },
    form() {
      return Object.assign({}, this.item);
    }
  },
  mounted() {
    this.getPortaobjetoList();
  },
}
</script>
  
<style scoped></style>
  