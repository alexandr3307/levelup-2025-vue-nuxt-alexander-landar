import {
  TodoVO,
} from '~/mvc/model/vo';
import {
  LocalStorageKeys,
} from '~/_shared/keys';
  
export default () => {
  return {
    saveTodoToLocalStorage: async(todo?: TodoVO) => {
      console.log('> useTodoLocalStorage -> saveTodoToLocalStorage:', {
        todo,
      });
      if (!todo) {
        localStorage.removeItem(LocalStorageKeys.TODO);
        return;
      }
      localStorage.setItem(
        LocalStorageKeys.TODO,
        TodoVO.toJSON(todo as TodoVO),
      );
      return todo;
    },
    saveListToLocalStorage: async(list: TodoVO[]) => {
      console.log('> useTodoLocalStorage -> saveListToLocalStorage');
      localStorage.setItem(
        LocalStorageKeys.LIST,
        JSON.stringify(
          list.map((todo:TodoVO) =>
            TodoVO.toJSON(todo as TodoVO)),
        ));
    },
    parseListFromRawData: (list: string | null, defaultValue = []) => {
      console.log('> useTodoLocalStorage -> parseListFromRawData');
      return !!list
          && JSON.parse(list).map((data: string) =>
            TodoVO.fromRaw(data))
          || defaultValue;
    },
  };
};