export default {
  created() {
    this.$store.dispatch('robots/getParts');
  },
  computed: {
    parts() {
      const defaultParts = {
        heads: [],
        arms: [],
        torsos: [],
        bases: [],
      };
      return this.$store.state.robots.parts || defaultParts;
    },
  },
};
