Follow = React.createClass({
  handleSubmit(event) {
    event.preventDefault();
    const reader = ReactDOM.findDOMNode(this.refs.url).value.trim();
    const hostname = Meteor.settings.public.profile.hostname;
    const cloneId = Meteor.settings.public.profile.cloneId;
    const url = `${reader}/follow?hostname=${hostname}&userId=${cloneId}`;
    console.log(url);
    window.open(url, "_blank");
  },

  handleFollowDefault(event) {
    event.preventDefault();
    const reader = Meteor.settings.public.reader.hostname;
    const hostname = Meteor.settings.public.profile.hostname;
    const cloneId = Meteor.settings.public.profile.cloneId;
    const url = `https://${reader}/follow?hostname=${hostname}&userId=${cloneId}`;
    window.open(url, "_blank");
  },

  render() {
    return (
      <button type="button" className="btn btn-primary-outline btn-block" onClick={this.handleFollowDefault}>
        Follow at {Meteor.settings.public.reader.hostname}
      </button>
      // <form onSubmit={this.handleSubmit} >
      //   <div className="input-group">
      //     <input type="text" className="form-control" ref="url" placeholder="Your Piece Reader URL" />
      //     <span className="input-group-btn">
      //       <button type="submit" className="btn btn-primary">Follow</button>
      //     </span>
      //   </div>
      // </form>
    )
  }
});
