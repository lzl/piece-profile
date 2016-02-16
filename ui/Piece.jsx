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

  componentDidMount() {
    const options = {
      format: (value, type) => {
        if (type === 'url' && value.length > 50) {
          value = value.slice(0, 50) + '…';
        }
        return value;
      },
      linkAttributes: {
        rel: 'nofollow'
      },
      linkClass: null
    };
    $('span.js-content').linkify(options);
  },

  createdFromNow(timestamp) {
    if (timestamp === undefined) {
      return 'unknown';
    }
    const time = timestamp.getTime();
    let between = undefined;

    if (Meteor.isClient) {
      const now = TimeSync.serverTime() || Date.now();
      between = (now - time) / 1000;
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
        <small className="text-muted pull-right">{this.data.createdAt}</small>
        <span className="word-wrap js-content">{this.props.piece.content}</span>
      </li>
    );
  },

  renderSharismPiece() {
    return (
      <li className="list-group-item">
        <small className="text-muted pull-right">{this.data.createdAt}</small>
        {this.props.piece.comment} »
        {' '}
        <span className="text-muted word-wrap js-content">{this.props.piece.origin.username}: {this.props.piece.origin.content}</span>
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
