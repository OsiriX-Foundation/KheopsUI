<i18n>
{
  "en": {
    "albums": "Kheops - Albums",
    "album": "Kheops - Album",
    "newalbum": "Kheops - New album",
    "user": "Kheops - User"
  },
  "fr": {
    "albums": "Kheops - Albums",
    "album": "Kheops - Album",
    "newalbum": "Kheops - Nouvel album",
    "user": "Kheops - Utilisateur"
  }
}
</i18n>
<template>
  <div
    id="app"
    :class="[{'collapsed' : collapsed}]"
  >
    <div>
      <vue-snotify />
      <!--
      <nav-header
        :logged="logged"
      />
      <nav-bar
        v-if="logged"
      />
      -->
      <!-- content -->
      <router-view
        :style="logged ? 'margin: 25px auto' : 'margin: 75px auto'"
      />

      <send-studies />
      <!-- footer -->
    </div>
    <sidebar-menu
      :menu="menu"
      :width="props.width"
      :show-child="props.showChild"
      :show-one-child="props.showOneChild"
      @toggle-collapse="onToggleCollapse"
      @item-click="onItemClick"
    >
      <div slot="header">
        <a
          href="/"
          class="vsm--link vsm--link_level-1"
        >
          <font-awesome-icon
            icon="user-cog"
            class=" vsm--icon svg-inline--fa fa-user-cog fa-w-20"
          />
          <span
            v-if="!collapsed"
            class="vsm--title"
          >
            KHEOPS
          </span>
        </a>
      </div>
      <div slot="footer">
        <div
          v-if="!collapsed"
          class="p-2"
        >
          © KHEOPS, inc 2019
        </div>
      </div>
      <span slot="toggle-icon">
        <v-icon
          class="align-middle"
          :name="collapsed ? 'chevron-right' : 'chevron-left'"
        />
      </span>
      <span slot="dropdown-icon">
        <v-icon
          class="align-middle"
          :name="'chevron-right'"
        />
      </span>
    </sidebar-menu>
    <!-- footer -->
    <footer />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import navHeader from '@/components/navheader';
import navBar from '@/components/navbar';
import SendStudies from '@/components/study/SendStudies';
import store from '@/store';

const separator = {
  template: '<hr style="border-color: rgba(0, 0, 0, 255); margin: 20px;">',
};


export default {
  name: 'App',
  components: { navHeader, navBar, SendStudies },
  data() {
    return {
      appTitle: 'Kheops',
      props: {
        showChild: false,
        showOneChild: true,
        width: '200px',
      },
      redirect: {
        Help: {
          href: 'https://docs.kheops.online/',
          name: '_blank',
        },
      },
      menu: [
        {
          header: true,
          title: 'Kheops',
          hiddenOnCollapse: true,
        },
        {
          href: { path: '/' },
          title: 'Inbox',
          icon: {
            element: 'font-awesome-icon',
            attributes: {
              icon: 'bars',
              size: 'sm',
            },
          },
        },
        {
          title: 'Albums',
          child: [],
          icon: {
            element: 'font-awesome-icon',
            attributes: {
              icon: 'book',
            },
          },
        },
        {
          component: separator,
          hidden: false,
          hiddenOnCollapse: true,
        },
        {
          href: '/user',
          title: 'User settings',
          icon: {
            element: 'font-awesome-icon',
            attributes: {
              icon: 'user-cog',
            },
          },
        },
        {
          title: 'Help',
          icon: {
            element: 'font-awesome-icon',
            attributes: {
              icon: 'question-circle',
            },
          },
        },
        {
          title: 'Logout',
          icon: {
            element: 'font-awesome-icon',
            attributes: {
              icon: 'sign-out-alt',
            },
          },
        },
        {
          title: 'Langage',
          icon: {
            element: 'font-awesome-icon',
            attributes: {
              icon: 'language',
            },
          },
          child: [
            {
              title: 'ENG',
            },
            {
              title: 'FR',
            },
          ],
        },
      ],
      collapsed: false,
    };
  },
  computed: {
    ...mapGetters({
      albums: 'albums',
    }),
    year() {
      return new Date().getFullYear();
    },
    logged() {
      return this.$keycloak.authenticated;
    },
  },
  watch: {
    $route(to) {
      document.title = this.$t(to.meta.title) || this.appTitle;
    },
    albums: {
      handler() {
        this.setAlbumsMenu();
      },
    },
  },
  created() {
    document.title = 'Kheops';
    this.setAlbumsMenu();
  },
  methods: {
    getIndexAlbumsMenu() {
      const index = this.menu.findIndex((menu) => menu.title === 'Albums');
      return index;
    },
    initMenuChildAlbums(index) {
      this.menu[index].child = [];
    },
    addCreateAlbum(index) {
      if (this.albums.length > 0) {
        this.menu[index].child.push({
          component: separator,
        });
      }
      this.menu[index].child.push({
        title: 'Create an album',
        href: '/albums/new',
      });
    },
    setAlbumsMenu() {
      const index = this.getIndexAlbumsMenu();
      this.initMenuChildAlbums(index);
      this.albums.forEach((album) => {
        this.menu[index].child.push({
          title: album.name,
          href: `/albums/${album.album_id}`,
        });
      });
      this.addCreateAlbum(index);
    },
    onToggleCollapse(collapsed) {
      console.log(collapsed);
      this.collapsed = collapsed;
    },
    onItemClick(event, item) {
      if (this.redirect[item.title] !== undefined) {
        window.open(this.redirect[item.title].href, this.redirect[item.title].name);
      }
      if (item.title === 'Login') {
        this.login();
      }
      if (item.title === 'Logout') {
        this.logout();
      }
    },
    logout() {
      store.dispatch('logout').then(() => {
        Vue.prototype.$keycloak.logoutFn();
      });
    },
    login() {
      Vue.prototype.$keycloak.loginFn();
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');

#app {
  padding-left: 205px;
}
#app.collapsed {
  padding-left: 55px;
}
</style>

