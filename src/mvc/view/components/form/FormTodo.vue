<script setup lang="ts">
import {
  ref,
  computed,
  useTemplateRef,
  watch,
} from 'vue';
import {
  TodoVO,
} from '~/mvc/model/vo';
const {
  selectedTodo,
} = defineProps<{ selectedTodo?: TodoVO }>();
const emits = defineEmits<{
  create: [string];
  edit: [string];
}>();

const refInput = useTemplateRef<HTMLInputElement>('domInput');

const selectedTodoText = ref<string | undefined>(selectedTodo?.text);
const isEdit = computed(() => !!selectedTodo);

const getTextFromInputEvent = (event: KeyboardEvent) => {
  const domInput = event.target as HTMLInputElement;
  const inputText: string = domInput.value;
  console.log('> FormTodo -> getTextFromInputEvent:', {
    event, inputText,
  });
  return inputText;
};

const onInputKeyUpEnter = (event: KeyboardEvent) => {
  console.log('> FormTodo -> onInputKeyUpEnter:', event);
  emits('create', getTextFromInputEvent(event));
};

const onInputEditKeyUpEnter = (event: KeyboardEvent) => {
  console.log('> FormTodo -> onInputEditKeyUpEnter:', event);
  emits('edit', getTextFromInputEvent(event));
};
defineExpose({
  clear: () => {
    console.log('> FormTodo -> defineExpose: clear');
    if (refInput.value) { refInput.value.value = ''; }
  },
});
watch(() => selectedTodo,
  (value) => selectedTodoText.value = value?.text);
</script>
<template>
  <div class="flex flex-col items-center">
    <fieldset class="fieldset flex flex-col justify-center items-center">
      <legend class="fieldset-legend w-full justify-center">
        {{ isEdit
          ? "Измените что хотите делать:"
          : "Введите что хотите делать?"
        }}
      </legend>
      <input
        v-if="isEdit"
        ref="domInput"
        class="input"
        placeholder="Edit here"
        type="text"
        :value="selectedTodoText"
        @keyup.enter="onInputEditKeyUpEnter"
      >
      <input
        v-else
        ref="domInput"
        class="input"
        placeholder="Type here"
        type="text"
        @keyup.enter="onInputKeyUpEnter"
      >
      <p class="fieldset-label">
        для {{ isEdit ? "редактирования" : "создание" }} нажмите Enter
      </p>
    </fieldset>
  </div>
</template>