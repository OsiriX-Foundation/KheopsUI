<template>
  <div class="sidebar">
    <transition name="slide">
      <div
        v-if="isPanelOpen"
        class="sidebar-panel"
      >
        <slot />
        <div @click="toggleSidebarPanel">
          Click on me !
        </div>
      </div>
    </transition>
    <transition name="slide">
      <div
        v-if="!isPanelOpen"
        class="sidebar-panel-reduce"
      >
        <span>icon</span>
        <div @click="toggleSidebarPanel">
          Click on me !
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data: () => ({
    isPanelOpen: true,
  }),
  methods: {
    closeSidebarPanel() {
      this.isPanelOpen = false;
    },
    toggleSidebarPanel() {
      this.isPanelOpen = !this.isPanelOpen;
    },
  },
};
</script>
<style>
    .slide-enter-active,
    .slide-leave-active
    {
        transition: transform 0.2s ease;
    }

    .slide-enter,
    .slide-leave-to {
        transform: translateX(-100%);
        transition: all 150ms ease-in 0s
    }
    .sidebar-panel {
        overflow-y: auto;
        background-color: #130f40;
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        padding: 3rem 20px 2rem 20px;
        width: 200px;
    }
    .sidebar-panel-reduce {
        overflow-y: auto;
        background-color: #130f40;
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        padding: 3rem 20px 2rem 0px;
        width: 50px;
    }
</style>
