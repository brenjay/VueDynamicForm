<!-- Vue component -->
<template>
  <div>
    <form>
      <table>
        <tr v-for="(row, index) in selectedFields" :key="index">
          <div class="form-group">
            <td>
              <label :for="row.code">{{row.name}}: &nbsp;</label>
            </td>
            <td>
              <template v-if="row.type === 'array'">
                <select class="form-control" :id="row.code" v-model="row.value">
                  <option
                    v-for="(option, index) in row.options"
                    :key="index"
                    :value="option.value"
                  >{{option.name}}</option>
                </select>
              </template>
              <template v-else-if="row.type === 'date'">
                <datepicker input-class="form-control" :id="row.code" v-model="row.value"></datepicker>
              </template>
              <template v-else>
                <input
                  class="form-control"
                  :id="row.code"
                  :type="row.type"
                  v-model="row.value"
                  :value="row.value"
                >
              </template>
            </td>
          </div>
        </tr>
      </table>
    </form>
    <button class="btn btn-primary" v-on:click="submit()">Submit</button>
    <br>
    <br>
    <label class="typo__label" for="builder">Query Fields:</label>
    <multiselect
      v-model="selectedFields"
      id="builder"
      label="name"
      track-by="code"
      placeholder="Type to search or view dropdown for options."
      open-direction="bottom"
      :options="available_fields"
      :multiple="true"
      :searchable="true"
      :loading="isLoading"
      :internal-search="true"
      :clear-on-select="false"
      :close-on-select="false"
      :options-limit="300"
      :max-height="600"
      :show-no-results="true"
      :hide-selected="false"
    >
      <template slot="tag" slot-scope="{ option, remove }">
        <span class="custom__tag">
          <span>{{ option.name }}</span>
          <span class="custom__remove" @click="remove(option)">❌</span>
        </span>
      </template>
      <template slot="clear" slot-scope="props">
        <div
          class="multiselect__clear"
          v-if="selectedFields.length"
          @mousedown.prevent.stop="clearAll(props.search)"
        ></div>
      </template>
      <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
    </multiselect>
    <br>
    <br>
    <br>
    <pre class="language-json"><code>{{ selectedFields }}</code></pre>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import Datepicker from "vuejs-datepicker";
import Vue from "vue";
// register globally
Vue.component("multiselect", Multiselect);

export default {
  components: {
    Multiselect,
    Datepicker
  },
  props: {
    fields: Array,
    show: Array
  },
  data() {
    return {
      rows: [],
      available_fields: this.fields,
      selectedFields: this.show.map(k => this.fields[k]),
      isLoading: false
    };
  },
  methods: {
    clearAll() {
      this.selectedFields = [];
    },
    submit() {
      console.log(
        this.selectedFields.map(a => {
          return { name: a.name, value: a.value };
        })
      );
    }
  }
};
</script>

<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
</style>