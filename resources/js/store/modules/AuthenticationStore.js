import router from "../../router/index";

const USER_TOKEN_STORAGE_KEY = "user-access-token";
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
    // authenticate by JWT token (token from login or local storage)
    authenticateByToken: ({ commit, dispatch }) => {
      if (!localStorage.getItem(USER_TOKEN_STORAGE_KEY)) return;

      commit("setStatus", "fetching", { root: true });
      return axios
        .post("get_user_by_token")
        .then((resp) => {
          dispatch("DataStore/fetchData", {}, { root: true });

          // token valid, set user
          commit("setUser", resp.data);

          //Get redirected to learning_goals when at login screen and login is authenticated.
          //On other pages you should stay when u refresh or link directly to the place the user wants to be
          if (router.currentRoute.name === "login")
            // Redirect to page before refresh unless it's the homescreen then redirect to learning goals
            entryPath == "/" || entryPath == "/login"
              ? router.push("/learning_goals")
              : router.push(entryPath);
          return resp;
        })
        .catch((errors) => {
          localStorage.removeItem(USER_TOKEN_STORAGE_KEY);
          // Redirect to login because token login didn't succeed
          router.push("/login");
          return errors;
        });
    },
    // authenticate by user login (email & password)
    login: ({ commit, dispatch }, user) => {
      commit("setStatus", "fetching", { root: true });

      return axios
        .post("login", user)
        .then(({ data }) => {
          // store the token in localstorage
          localStorage.setItem(USER_TOKEN_STORAGE_KEY, data.access_token);
          dispatch("DataStore/fetchData", {}, { root: true });
          router.push("/learning_goals");

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

      localStorage.removeItem(USER_TOKEN_STORAGE_KEY);
      router.push("/login");
    },
    updateApiToken({ commit, state }) {
      commit("setStatus", "updating", { root: true });

      let url = `admin/users/${state.user.id}/api_token`;
      return axios({
        method: "post",
        url,
      })
        .then((response) => {
          commit("setStatus", "success", { root: true });
          commit("updateUserApiToken", response.data.api_token);
        })
        .catch(function (errors) {
          return Promise.reject(errors);
        });
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
    isAdmin: (state) => {
      return (
        !!state.user &&
        state.user.roles.map((role) => role.name).includes("admin")
      );
    },
    user: (state) => {
      return state.user;
    },
  },
};
