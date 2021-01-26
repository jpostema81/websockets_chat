import MessageBus from "./../../messageBus";
import router from "../../router/index";

export default {
  namespaced: true,
  state: {
    users: [],
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
  },
  actions: {
    register: function ({ commit }, user) {
      commit("setStatus", "registering", { root: true });

      return axios({ url: "users", data: user, method: "POST" })
        .then((resp) => {
          commit("setStatus", "success", { root: true });
        })
        .catch((errors) => {
          return Promise.reject(error);
        });
    },
    activateRegistration: function ({ commit }, activationToken) {
      commit("setStatus", "registering", { root: true });

      return axios({
        url: "user_registrations",
        data: { activationToken },
        method: "PUT",
      })
        .then((resp) => {
          commit("setStatus", "success", { root: true });
        })
        .catch((errors) => {
          return Promise.reject(errors);
        });
    },
    updateUser: function ({ commit }, user) {
      commit("setStatus", "updating", { root: true });

      return axios({
        url: "/users/" + user.id,
        data: user,
        method: "PUT",
      })
        .then((resp) => {
          commit("setStatus", "success", { root: true });
          commit("AuthenticationStore/setUser", resp.data.user, { root: true });

          setTimeout(() => {
            // display success message after route change completes
            MessageBus.$emit("message", {
              message: "Profiel succesvol bijgewerkt",
              variant: "success",
            });
          });
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    unsubscribeUser: function ({ commit }, payload) {
      commit("setStatus", "sending", { root: true });

      return axios({
        url: "user_unsubscribe",
        data: payload,
        method: "POST",
      })
        .then((resp) => {
          commit("setStatus", "success", { root: true });
        })
        .catch((errors) => {
          return Promise.reject(errors);
        });
    },
  },
  getters: {
    getUserById: (state) => (userId) => {
      return state.users.find((item) => item.id == userId);
    },
  },
};
