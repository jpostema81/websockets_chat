/**
 * @typedef {import('vuex').Module} StoreModule
 */

import Vue from "vue";

/**
 * @param {String} moduleNameAndEndpoint the the name of the store module, also the moduleNameAndEndpoint
 *
 * @returns {StoreModule}
 */
export default (moduleNameAndEndpoint) => ({
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    // Groups
    setData(state, data) {
      state.data = data;
    },

    // Specific
    storeSingleEntry(state, entry) {
      state.data.unshift(entry);
    },

    updateSingleEntry(state, entry) {
      state.data[state.data.findIndex((x) => x.id === entry.id)] = entry;
    },

    deleteSingleEntry(state, id) {
      Vue.delete(
        state.data,
        state.data.findIndex((x) => x.id === id)
      );
    },
  },
  actions: {
    store({ commit }, data) {
      commit("setStatus", "creating", { root: true });

      return axios
        .post(moduleNameAndEndpoint, data)
        .then((response) =>
          commit("storeSingleEntry", response.data[moduleNameAndEndpoint])
        )
        .finally((_) => commit("setStatus", "success", { root: true }));
    },

    delete({ commit }, id) {
      commit("setStatus", "deleting", { root: true });

      return axios
        .delete(`${moduleNameAndEndpoint}/${id}`)
        .then(() => commit("deleteSingleEntry", id))
        .finally((_) => commit("setStatus", "success", { root: true }));
    },

    update({ commit }, data) {
      commit("setStatus", "updating", { root: true });

      return axios
        .put(`${moduleNameAndEndpoint}/${data.id}`, data)
        .then((response) =>
          commit("updateSingleEntry", response.data[moduleNameAndEndpoint])
        )
        .finally((_) => commit("setStatus", "success", { root: true }));
    },

    fetchData({ commit }) {
      commit("setStatus", "fetching", { root: true });

      return axios
        .get(moduleNameAndEndpoint)
        .then((response) =>
          commit("setData", response.data[moduleNameAndEndpoint])
        )
        .finally((_) => commit("setStatus", "success", { root: true }));
    },
  },
  getters: {
    all: (state) => state.data,
    byId: (state) => (id) => state.data.find((item) => item.id === id),
  },
});
