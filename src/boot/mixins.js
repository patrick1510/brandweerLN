export default ({ Vue, store }) => {
  const permissionsMixin = {
    methods: {
      can(action, entity) {
        const role = store.state.auth.role;
        if (
          !store.state.permissions[role] ||
          !store.state.permissions[role][entity]
        ) {
          return false;
        }
        return store.state.permissions[role][entity].includes(action);
      }
    }
  };

  Vue.mixin(permissionsMixin);
};
