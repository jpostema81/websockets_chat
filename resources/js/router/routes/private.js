const routes = [
];

export default routes.map((route) => {
  const meta = {
    public: false,
    authorize: [],
  };

  return { ...route, meta };
});
