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
      return <li className="list-group-item">Loading</li>
    }
    return this.data.posts.map((post) => {
      return <Post key={post._id} post={post} />;
    });
  },

  render() {
    return (
      <div className="container">
        <div className="row">
          <Navbar />
        </div>

        <div className="row">
          <ul className="list-group">
            {this.renderPosts()}
          </ul>
        </div>
      </div>
    )
  }
});
