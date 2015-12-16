App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let handle = Meteor.subscribe("allPieces", 100);

    return {
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
      </div>
    )
  }
});
