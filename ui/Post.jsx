Post = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <li className="list-group-item">{this.props.post.content}</li>
    );
  }
});
