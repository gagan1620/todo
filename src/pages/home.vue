<template>
  <div class="row">
    <div class="col-md-4 offset-md-4">
      <h3 class="my-3">Home</h3>
      <hr />
      <form submit.prevent class="form-group">
        <label class="design my-1"> New Todo</label
        ><input v-model="newTodo" class="form-control required" name="Todo" />
        <label class="design my-1"> Description</label>
        <input v-model="newinput" class="form-control" name="newinput" /><br />
        <button class="btn btn-primary my-3 " @click.prevent="addnewtodo">
          Add Todo
        </button>
      </form>
    </div>
  </div>
  <table class="table table-striped table-bordered table-hover">
    <thead>
      <tr>
        <th @click="sortby('content')" class="u">Todo</th>
        <th >Description</th>
        <th >Mark</th>
        <th >Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(todo, index) in todos" :key="index">
        <td :class="{ done: todo.done }">{{ todo.content }}</td>
        <td :class="{ done: todo.done }">{{ todo.content2 }}</td>
        <td>
          <button class="btn-group btn-dark bg-primary btn-group-sm" @click="toggleDone(todo)">
            Mark
          </button>
        </td>
        <td>
          <button class="btn-group btn-dark bg-primary btn-group-sm" @click="removeTodo(index)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { ref } from "vue";
import axiosInstance from '../services/AxiosTokeninstance'
import { mapGetters } from 'vuex'
import {GET_USER_TOKEN_GETTER} from '../store/storeconstants'

export default {
  name: "home",
    computed:{
      ...mapGetters('auth',{
          token:GET_USER_TOKEN_GETTER,
      })

  },
  mounted(){
      axiosInstance
      .get(`https://todo-bb6c8-default-rtdb.firebaseio.com/home.json?`, )
      
  },

  setup() {
    const newTodo = ref("");
    const newinput = ref("");
    const todos = ref([]);
    function addnewtodo() {
      todos.value.push({
        done: false,
        content: newTodo.value,
        content2: newinput.value,
      });
      newTodo.value = "";
      newinput.value = "";
    }
    function toggleDone(todo) {
      todo.done = !todo.done;
    }
    function removeTodo(index) {
      todos.value.splice(index, 1);
    }
    function sortby(prop){
        this.todos.sort((a,b)=>a[prop]<b[prop]?-1:1)

    }
    return {
      newTodo,
      addnewtodo,
      todos,
      toggleDone,
      removeTodo,
      newinput,
      sortby,
    };
  },
};
</script>
<style scoped>
.done {
  text-decoration: line-through;
}
.u{
    text-decoration: underline;
}

.design {
  color: rgb(248, 12, 12);

  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-weight: bold;
}
</style>