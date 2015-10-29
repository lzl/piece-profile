Post = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired
  },

  renderFromNow() {
    const time = this.props.post.createdAt.getTime();
    let fromNow = function (time) {
      const between = (Date.now() - time) / 1000;
      if (between < 3600) {
        return ~~(between / 60) + 'm'
      } else if (between < 86400) {
        return ~~(between / 3600) + 'h'
      } else {
        return ~~(between / 86400) + 'd'
      }
    }

    return fromNow(time);
  },

  render() {
    return (
      <li className="list-group-item">
        <span className="text-muted pull-right">{this.renderFromNow()}</span>
        {this.props.post.content}
      </li>
    );
  }
});
