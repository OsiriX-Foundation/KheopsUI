<template>
  <nav class="nav nav-pills nav-justified flex-column text-center text-xl-left">
    <a
      class="nav-link"
      :class="(study.flag.view === 'series')?'active':''"
      @click="setViewDetails(study.StudyInstanceUID.Value[0], 'series')"
    >
      {{ $t('study.series') }}
    </a>
    <a
      class="nav-link"
      :class="(study.flag.view === 'comments')?'active':''"
      @click="setViewDetails(study.StudyInstanceUID.Value[0], 'comments')"
    >
      {{ $t('study.comments') }}
    </a>
    <a
      class="nav-link"
      :class="(study.flag.view === 'study')?'active':''"
      @click="setViewDetails(study.StudyInstanceUID.Value[0], 'study')"
    >
      {{ $t('study.metadata') }}
    </a>
  </nav>
</template>
<script>
export default {
  name: 'StudyMenu',
  components: { },
  props: {
    study: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
  },
  methods: {
    setViewDetails(StudyInstanceUID, flagView) {
      const viewSelected = flagView === '' ? 'series' : flagView;
      const params = {
        StudyInstanceUID,
        flag: 'view',
        value: viewSelected,
      };
      this.$store.dispatch('setFlagByStudyUID', params);
    },
  },
};
</script>
