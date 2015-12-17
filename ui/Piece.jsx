Piece = React.createClass({
  propTypes: {
    piece: React.PropTypes.object.isRequired
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    var createdAt = this.createdFromNow(this.props.piece.createdAt);
    return {
      createdAt
    }
  },

  createdFromNow(timestamp) {
    if (timestamp === undefined) {
      return 'unknown';
    }
    const time = timestamp.getTime();
    let between = undefined;

    if (Meteor.isClient) {
      between = (TimeSync.serverTime() - time) / 1000;
    } else {
      between = (Date.now() - time) / 1000;
    }
    if (between < 60) {
      return ~~(between) + 's';
    } else if (between < 3600) {
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
        <small className="text-muted pull-right">{this.data.createdAt}</small>
      </li>
    );
  },

  renderSharismPiece() {
    return (
      <li className="list-group-item">
        {this.props.piece.comment} »
        {' '}
        <span className="text-muted">{this.props.piece.origin.owner}: {this.props.piece.origin.content}</span>
        <small className="text-muted pull-right">{this.data.createdAt}</small>
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
    return this.renderContent();
  }
});
