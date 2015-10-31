App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let handle = Meteor.subscribe("allPosts");

    return {
      loading: ! handle.ready(),
      posts: Posts.find({}, {sort: {createdAt: -1}}).fetch()
    }
  },

  renderPosts() {
    if (this.data.loading) {
      return "Loading";
    }
    return this.data.posts.map((post) => {
      return <Post key={post._id} post={post} />;
    });
  },

  render() {
    return (
      <div>
        <Navbar />
        <div className="wall">
          {this.renderPosts()}
        </div>
      </div>
    )
  }
});
