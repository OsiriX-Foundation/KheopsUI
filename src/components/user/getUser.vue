<i18n>
{
  "en": {
    "username": "User name",
    "user": "user",
    "send": "Send",
    "cancel": "Cancel"
  },
  "fr": {
    "username": "Utilisateur",
    "user": "Utilisateur",
    "send": "Envoyer",
    "cancel": "Annuler"
  }
}
</i18n>

<template>
  <div class="card">
    <div class="card-body">
      <form @submit.prevent="getUser">
        <div class="row">
          <div class="col-12 col-sm-6 col-md-5 col-lg-3 col-xl-3">
            <v-select
              v-model="new_user_name"
              v-focus
              class="style-chooser"
              :options="userFind"
              @search="searchUser"
            />
          </div>
          <div class="col-12 col-sm-6 col-md-7 col-lg-9">
            <button
              class="btn btn-primary"
              type="submit"
              :disabled="!validEmail(new_user_name)"
            >
              {{ $t('send') }}
            </button>
            <button
              class="btn btn-secondary"
              type="reset"
              tabindex="0"
              @keyup.esc="new_user_name=''"
              @click="cancel"
            >
              {{ $t('cancel') }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import { CurrentUser } from '@/mixins/currentuser.js';
import { HTTP } from '@/router/http';

export default {
  name: 'FormGetUser',
  components: { vSelect },
  mixins: [CurrentUser],
  data() {
    return {
      new_user_name: '',
      userFind: [],
    };
  },
  methods: {
    validEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    searchUser(value, loading) {
      loading(true);
      if (value !== '') {
        HTTP.get(`users?search=${value}`, { headers: { Accept: 'application/json' } }).then((res) => {
          if (res.data === undefined || res.data.length === 0 || Array.isArray(res.data) === false) {
            this.setUserFind([], loading);
          } else {
            const userFind = res.data.map((v) => v.email);
            this.setUserFind(userFind, loading);
          }
        }).catch(() => {
          console.log('Sorry, an error occured');
        });
      } else {
        this.setUserFind([], loading);
      }
    },
    setUserFind(values, loading) {
      this.userFind = values;
      loading(false);
    },
    getUser() {
      const headers = this.getHeaders();
      this.$store.dispatch('checkUser', { user: this.new_user_name, headers }).then((sub) => {
        if (!sub) this.$snotify.error('Sorry, unknown user');
        else {
          this.$emit('get-user', sub);
          this.new_user_name = '';
        }
      });
    },
    getHeaders() {
      if (this.authenticated) {
        return {
          Authorization: `Bearer ${this.currentuserKeycloakToken}`,
          Accept: 'application/json',
        };
      }
      return {
        Accept: 'application/json',
      };
    },
    cancel() {
      this.new_user_name = '';
      this.$emit('cancel-user');
    },
  },
};
</script>
