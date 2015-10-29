if (Meteor.isServer) {
  FlowRouter.setDeferScriptLoading(true);
}

FlowRouter.route('/', {
  action() {
    ReactLayout.render(App);
  }
});
