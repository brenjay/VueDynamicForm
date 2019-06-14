<!-- Vue component -->
<template>
  <div>
    <table>
      <ul class="list-group">
        <draggable v-model="selectedFields" group="fields" @start="drag=true" @end="drag=false">
          <tr v-for="(row, index) in selectedFields" :key="index">
            <a
              href="#"
              class="list-group-item list-group-item-action flex-column align-items-start"
            >
              <div class="input-group">
                <td>
                  <label :for="row.code">{{row.name}}: &nbsp;</label>
                </td>
                <span class="input-group-btn">
                  <button
                    class="btn btn-success"
                    v-on:click="row.operator = operator(row.operator)"
                  >{{row.operator}}</button>
                </span>
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
                <template v-if="row.code != selectedFields[selectedFields.length-1].code">
                  <span class="input-group-btn">
                    <button
                      class="btn btn-warning"
                      v-on:click="row.after = option(row.after)"
                    >{{row.after}}</button>
                  </span>
                </template>
                <div
                  style="text-align: right; margin-left: auto; font-size:25px; padding-left:10px;"
                >
                  <i class="icon-move"></i>
                </div>
              </div>
            </a>
          </tr>
        </draggable>
      </ul>
    </table>
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
import draggable from "vuedraggable";
import Vue from "vue";
// register globally
Vue.component("multiselect", Multiselect);

export default {
  components: {
    Multiselect,
    Datepicker,
    draggable
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
          return {
            name: a.name,
            value: a.value,
            operator: a.operator,
            after: a.after
          };
        })
      );
    },
    option(string) {
      var list = ["AND", "OR"];
      if (list.indexOf(string) !== -1) {
        var index = list.indexOf(string);
        return list[index + 1] ? list[index + 1] : list[0];
      } else {
        return "AND";
      }
    },
    operator(string) {
      var list = ["=", "=!", ">", ">=", "<", "<=", "~"];
      if (list.indexOf(string) !== -1) {
        var index = list.indexOf(string);
        return list[index + 1] ? list[index + 1] : list[0];
      } else {
        return "=";
      }
    }
  }
};
</script>

<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
</style>