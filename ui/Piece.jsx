Piece = React.createClass({
  propTypes: {
    piece: React.PropTypes.object.isRequired
  },

  // getInitialState() {
  //   return {
  //     createdFromNow: this.createdFromNow(this.props.piece.createdAt)
  //   };
  // },

  createdFromNow(timestamp) {
    if (timestamp === undefined) {
      return 'unknown';
    }
    const time = timestamp.getTime();
    const between = (Date.now() - time) / 1000;
    if (between < 3600) {
      return ~~(between / 60) + 'm';
    } else if (between < 86400) {
      return ~~(between / 3600) + 'h';
    } else {
      return ~~(between / 86400) + 'd';
    }
  },

  renderPlaintext() {
    return (
      <li className="list-group-item">
        {this.props.piece.content}
        <small className="text-muted pull-right">{this.createdFromNow(this.props.piece.createdAt)}</small>
      </li>
    );
  },

  renderSharismPiece() {
    return (
      <li className="list-group-item">
        {this.props.piece.comment} »
        {' '}
        <span className="text-muted">{this.props.piece.origin.owner}: {this.props.piece.origin.content}</span>
        <small className="text-muted pull-right">{this.createdFromNow(this.props.piece.createdAt)}</small>
      </li>
    );
  },

  renderContent() {
    switch (this.props.piece.type) {
      case 'plaintext':
        return this.renderPlaintext();
        break;
      case 'sharism-piece':
        return this.renderSharismPiece();
        break;
      default:
        return this.renderPlaintext();
    }
  },

  render() {
    // if (Meteor.isClient) {
    //   setInterval(() => {
    //     this.setState({
    //       createdFromNow: this.createdFromNow(this.props.piece.createdAt)
    //     });
    //   }, 60 * 1000);
    // }
    return this.renderContent();
  }
});
