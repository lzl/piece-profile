Follow = React.createClass({
  handleSubmit(event) {
    event.preventDefault();
    var val = ReactDOM.findDOMNode(this.refs.url).value.trim();
    var url = val + "/follow?hostname=piece.meteor.com&userId=Eqrz7jo3YcMeabNdg" // Piece
    console.log(url);
    window.open(url, "_blank");
  },
  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <div className="input-group">
          <input type="text" className="form-control" ref="url" placeholder="Your Piece Reader URL" />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-primary">Follow</button>
          </span>
        </div>
      </form>
    )
  }
});
