import {
  TodoVO,
} from '~/mvc/model/vo';
import {
  ref,
} from 'vue';
import {
  useTodoLocalStorage,
} from '~/mvc/model/composables/index';
  
export default (todoRaw: string | null, listRaw: string | null) => {
  const {
    parseListFromRawData,
  } = useTodoLocalStorage();
  
  const lastTodo = ref<TodoVO | undefined>(TodoVO.fromRaw(todoRaw));
  const list = ref<TodoVO[]>(parseListFromRawData(listRaw, []));
  const selectedTodo = ref<TodoVO | undefined>();
  
  return {
    list,
    lastTodo,
    selectedTodo,
    addLastTodoToList: () => {
      console.log('> useTodoList -> addLastTodoToList:');
      if (lastTodo.value) {
        list.value.push(lastTodo.value);
      }
      return list.value;
    },
    createTodoFromText: async(text: string) => {
      const id = Date.now().toString();
      const createdAt = new Date();
      console.log('> useTodoList -> createTodoFromText:', {
        id, createdAt, text,
      });
      return new TodoVO(
        id,
        text,
        createdAt,
      );
    },
  };
};