import ModuleFactory from "./Factory";

const moduleNames = [
  "topics",
  "milestones",
  "dayupdates",
  "progress-levels",
  "learning-goals",

  "admin/topics",
  "admin/milestones",
  "admin/learning-goals",
  "admin/users",
  // "admin/dayupdates",
  // "admin/progress-levels",
];

const factoryStoreModules = moduleNames.reduce((modules, name) => {
  return {
    ...modules,
    [name]: ModuleFactory(name),
  };
}, {});

factoryStoreModules["admin/topics"].getters.byMilestoneId = (state) => (id) => {
  return state.data.filter((element) => element.milestone_id == id);
};

factoryStoreModules["admin/learning-goals"].getters.byTopicId = (state) => {
  return (id) => state.data.filter((element) => element.topic.id == id);
};

factoryStoreModules[
  "progress-levels"
].getters.getProgressPercentageByProgressLevelId = (state) => {
  return (progressId) =>
    state.data.find((element) => element.id == progressId).percentage;
};

factoryStoreModules["learning-goals"].getters.getLearningGoalsByTopicId = (
  state
) => (id) => state.data.filter((element) => element.topic.id == id);

// Load store modules dynamically based on files.
const requireContext = require.context("./", false, /.*\.js$/);

export default requireContext.keys().reduce((modules, file) => {
  const filename = file.replace(/(^.\/)|(\.js$)/g, "");
  if (filename === "index") return modules;
  if (filename === "Factory") return modules;

  return {
    ...modules,
    [filename]: requireContext(file).default,
  };
}, factoryStoreModules);
