Post = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <div className="post">
        {this.props.post.content}
      </div>
    );
  }
});
