export const MessageStore = {
    namespaced: true,
    state: {
        messages: [],
    },
    mutations: {
        setMessage(state, message) {
            state.categories = categories;
        },
    },
    actions: {
        fetchMessages({state, commit, rootState}) {
            // return new Promise((resolve, reject) => {
            //     axios
            //         .get('/api/categories')
            //         .then(categories => {
            //             commit('setCategories', categories.data);
            //             //context.commit('setSelectedCategories', categories.data);
            //             resolve();
            //         }).catch(function (error) {
            //             // handle error
            //             console.log(error);
            //             reject(error);
            //         });
            // });
        },
    },
    getters: {
        getMessages: (state) =>
        {
            return state.messages;
        },
    }
}
