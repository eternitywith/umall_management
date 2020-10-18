<template>
  <div>
    <v-list @edit="edit"></v-list>
    <v-update ref="update" :info="info"></v-update>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import vUpdate from "./components/update"
import vList from "./components/list"
export default {
  components: {
    vUpdate,
    vList,
  },
  data() {
    return {
      info: {
        isShow: false,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    edit(id) {
      this.info.isShow = true;
      this.$refs.update.look(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>

</style>