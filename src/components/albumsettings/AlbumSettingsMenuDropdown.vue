<template>
  <nav class="nav nav-pills nav-justified flex-column">
    <b-dropdown
      id="dropdown-right"
      :text="$t(`albumsettingsmenu.${currentCategory}`)"
      variant="primary"
      class="m-2 p-2 d-flex justify-content-center"
      toggle-class="col-12"
      menu-class="col-10"
    >
      <b-dropdown-item
        v-for="(cat,idx) in categories"
        :key="idx"
        href="#"
        :active="currentCategory === cat"
      >
        <router-link
          :to="{ name: 'albumsettings', params: { category: cat }}"
          class="nav-link font-white"
        >
          {{ $t(`albumsettingsmenu.${cat}`) }}
        </router-link>
      </b-dropdown-item>
    </b-dropdown>
  </nav>
</template>
<script>
export default {
  name: 'AlbumSettingsMenuNav',
  props: {
    categories: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  computed: {
    currentCategory() {
      return this.$route.params.category !== undefined ? this.$route.params.category : this.categories[0];
    },
  },
};
</script>
