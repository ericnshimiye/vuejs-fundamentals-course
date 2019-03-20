export default {
  created() {
    this.$store.dispatch('getParts');
  },
  computed: {
    parts() {
      const defaultParts = {
        heads: [],
        arms: [],
        torsos: [],
        bases: [],
      };
      return this.$store.state.parts || defaultParts;
    },
  },
};
