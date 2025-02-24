<template>
  <div
    class="
      flex flex-col
      justify-start items-start
      w-full
      px-4
      space-y-4
    "
  >
    <div
      class="
        flex flex-row
        w-full
        justify-between
        items-start
      "
    >
      <slot />
    </div>
    <slot name="list" />
  </div>
</template>