<template>
  <span>
    <b-dropdown
      v-if="providers.length > 0"
      size="sm"
      variant="link"
      toggle-class="kheopsicon"
      @shown="setShow(true)"
      @hidden="setShow(false)"
    >
      <template slot="button-content">
        <v-icon
          class="align-middle icon-margin"
          name="build"
        />
      </template>
      <div
        class="maxheight-scroll"
      >
        <form
          v-for="provider in providers"
          :id="study.StudyInstanceUID.Value[0]"
          :key="provider.id"
          :action="serverURL + '/report'"
          method="post"
        >
          <b-form-input
            v-if="checkProviderModalities(study, provider)"
            type="text"
            hidden
            name="access_token"
            :value="oidcAccessToken"
          />
          <b-form-input
            v-if="checkProviderModalities(study, provider)"
            type="text"
            hidden
            name="client_id"
            :value="provider.client_id"
          />
          <b-form-input
            v-if="checkProviderModalities(study, provider)"
            type="text"
            hidden
            name="studyUID"
            :value="study.StudyInstanceUID.Value[0]"
          />
          <b-form-input
            v-if="checkProviderModalities(study, provider)"
            type="text"
            hidden
            name="return_uri"
            :value="returnuri"
          />
          <button
            v-if="checkProviderModalities(study, provider)"
            type="submit"
            class="dropdown-item pointer"
          >
            {{ provider.name }}
          </button>
        </form>
      </div>
    </b-dropdown>
  </span>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'IconListProviders',
  components: { },
  mixins: [],
  props: {
    providers: {
      type: Array,
      required: true,
      default: () => ([]),
    },
    study: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    albumId: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    ...mapGetters('oidcStore', [
      'oidcAccessToken',
    ]),
    serverURL() {
      return process.env.VUE_APP_URL_API;
    },
    returnuri() {
      return `${process.env.VUE_APP_URL_ROOT}/albums/${this.albumId}?StudyInstanceUID=${encodeURIComponent(this.study.StudyInstanceUID.Value[0])}`;
    },
  },
  watch: {
    show() {
      this.$emit('dropdownState', this.show, this.study.StudyInstanceUID.Value[0]);
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    setShow(value) {
      this.show = value;
    },
    checkProviderModalities(study, provider) {
      if (provider.data.supported_modalities === undefined) {
        return true;
      }
      let result = false;
      const modalitiesInStudy = study.ModalitiesInStudy.Value;
      modalitiesInStudy.forEach((modality) => {
        if (provider.data.supported_modalities.includes(modality)) {
          result = true;
        }
      });

      return result;
    },
  },
};
</script>
