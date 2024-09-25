<template>
  <div
    v-if="isVisible"
    :class="['toast fixed top-4 right-4 px-4 py-2 rounded shadow-lg', toastClass]"
    role="alert"
  >
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onBeforeUnmount } from 'vue';

export default defineComponent({
  props: {
    message: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 3000, // Default to 3 seconds
    },
    type: {
      type: String,
      default: 'success', // 'success' or 'error'
    },
  },
  setup(props) {
    const isVisible = ref(true);

    // Determine toast class based on type
    const toastClass = ref(
      props.type === 'success' ? 'bg-green-500' : 'bg-red-500'
    );

    let timeoutId: number | undefined; // Store the timeout ID

    // Auto-hide after duration
    const hideToast = () => {
      isVisible.value = false;
    };

    watch(
      () => props.message,
      () => {
        isVisible.value = true; // Show when message updates

        // Clear any existing timeout before setting a new one
        if (timeoutId !== undefined) {
          clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(hideToast, props.duration); // Hide after duration
      },
      { immediate: true } // To handle initial render
    );

    // Cleanup visibility when component is unmounted
    onBeforeUnmount(() => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    });

    return { isVisible, toastClass };
  },
});
</script>

<style scoped>
.toast {
  z-index: 9999; /* Ensures it stays on top */
}
</style>
