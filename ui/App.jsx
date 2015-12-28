App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    if (Meteor.isServer) {
      var handle = Meteor.subscribe("recentPieces");
    } else if (Meteor.isClient) {
      var handle = Meteor.subscribe("allPieces");
    }
    return {
      handle: handle,
      loading: ! handle.ready(),
      pieces: Pieces.find({}, {sort: {createdAt: -1}}).fetch()
    }
  },

  renderPieces() {
    if (this.data.loading) {
      return <li className="list-group-item">Loading</li>
    }
    return this.data.pieces.map((piece) => {
      return <Piece key={piece._id} piece={piece} />;
    });
  },

  renderReadMoreButton() {
    const limit = this.data.handle.data('limit') || 20;
    let disabled = '';
    if (limit > Pieces.find().count()) {
      disabled = 'disabled';
    }
    return (
      <div className="row">
        <div className="hr"></div>
        <button type="button" className="btn btn-primary-outline btn-block" onClick={this.loadMore} disabled={disabled} >Read More</button>
        <div className="hr"></div>
      </div>
    );
  },

  loadMore(event) {
    event.preventDefault();
    if (this.data.handle.data('limit') === undefined) {
      this.data.handle.setData('limit', 40);
    } else {
      this.data.handle.setData('limit', this.data.handle.data('limit') + 20);
    }
  },

  render() {
    return (
      <div className="container">
        <div className="row">
          <Navbar />
        </div>

        <div className="row">
          <ul className="list-group">
            {this.renderPieces()}
          </ul>
        </div>

        { Meteor.isClient ? this.renderReadMoreButton() : '' }
      </div>
    )
  }
});
