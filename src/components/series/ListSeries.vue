<template>
  <span>
    <div
      v-if="loadingSerie === false && errorSeries === false"
      class="row"
    >
      <div
        v-for="serie in series[studyUID]"
        :key="serie.id"
        class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-5"
      >
        <series-summary
          :serie="serie"
          :study="study"
          :source="source"
        />
      </div>
    </div>
    <loading
      v-if="loadingSerie"
    />
    <div
      v-if="loadingSerie === false && errorSeries === true"
    >
      <div
        class="d-flex flex-column justify-content-center align-items-center full-height"
      >
        <div class="mb-3">
          {{ $t('serie.errorSeries') }}
        </div>
        <div class="">
          <button
            type="button"
            class=" btn btn-md"
            @click="getSeries()"
          >
            {{ $t('reload') }}
          </button>
        </div>
      </div>
    </div>
  </span>
</template>
<script>
import { mapGetters } from 'vuex';
import SeriesSummary from '@/components/series/SeriesSummary';
import Loading from '@/components/globalloading/Loading';

export default {
  name: 'ListSeries',
  components: {
    SeriesSummary, Loading,
  },
  props: {
    study: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    source: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      loadingSerie: true,
      errorSeries: false,
      includefield: ['00080021', '00080031'],
    };
  },
  computed: {
    ...mapGetters({
      series: 'series',
      sendingFiles: 'sending',
    }),
    studyUID() {
      return this.study.StudyInstanceUID.Value[0];
    },
  },
  watch: {
    sendingFiles() {
      if (!this.sendingFiles) {
        this.getSeries();
      }
    },
  },
  created() {
    this.getSeries();
  },
  methods: {
    getSeries() {
      const params = {
        StudyInstanceUID: this.studyUID,
        studySelected: this.study.flag.is_selected,
        queries: {},
      };
      if (Object.keys(this.source).length > 0) {
        params.queries[this.source.key] = this.source.value;
      }
      params.queries.includefield = this.includefield;
      this.loadingSerie = true;
      this.$store.dispatch('getSeries', params).then((res) => {
        if (res.status === 200) {
          this.loadingSerie = false;
          this.errorSeries = false;
        }
      }).catch(() => {
        this.loadingSerie = false;
        this.errorSeries = true;
      });
    },
  },
};
</script>
