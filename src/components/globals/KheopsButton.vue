<template>
    <div>
      <button
        class="kheops-btn"
        :class="customClass"
        @click.stop="click()"
      >
        <slot name="content" />
      </button>
    </div>
</template>
<script>
export default {
  name: 'KheopsButton',
  props: {
    customClass: {
      type: String,
      required: false,
      default: '',
    },
  },
  methods: {
    click() {
      this.$emit('click');
    },
  },
};
</script>