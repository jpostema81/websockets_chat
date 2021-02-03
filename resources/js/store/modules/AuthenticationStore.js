import router from "../../router/index";

// const USER_TOKEN_STORAGE_KEY = "user-access-token";
const entryPath = window.location.pathname;

export const AuthenticationStore = {
  namespaced: true,
  state: {
    user: "",
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
    updateUserApiToken(state, api_token) {
      state.user.api_token = api_token;
    },
  },
  actions: {
    // authenticate by user login (email & password)
    login: ({ commit, dispatch }, user) => {
      commit("setStatus", "fetching", { root: true });

      return axios
        .post("api/login", user)
        .then(({ data }) => {
            router.push("/home");

            // token received, set user
            // commit("setStatus", "success", { root: true });
            commit("setUser", data.user);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
    },
    logout: function ({ commit }) {
      // no serverside logout to keep tokens stateless.
      // Just remove tokens from client
      commit("setStatus", "", { root: true });
      commit("setUser", "");

      router.push("/login");
    },
    resetPassword({ commit, state }, { password, resetToken }) {
      commit("setStatus", "resetting", { root: true });

      let url = `password_reset/${resetToken}`;
      return axios({
        method: "put",
        url,
        data: {
          password,
        },
      })
        .then((res) => {
          commit("setStatus", "success", { root: true });

          router.push("/login");
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
    requestPasswordReset({ commit, state }, { email }) {
      commit("setStatus", "loading", { root: true });

      return axios({ method: "post", url: "password_reset", data: { email } })
        .then((res) => {
          commit("setStatus", "success", { root: true });

          router.push("/login");
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    },
  },
  getters: {
    isAuthenticated: (state) => {
      return !!state.user;
    },
    user: (state) => {
      return state.user;
    },
  },
};
