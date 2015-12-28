Navbar = React.createClass({
  renderText() {
    const text = Meteor.settings.public.profile.text;
    return text.map((text, index) => {
      return <p key={index} className="card-text">{text}</p>;
    })
  },

  renderLink() {
    const link = Meteor.settings.public.profile.link;
    return link.map((link, index) => {
      return <a key={index} href={link.url} className="card-link">{link.name}</a>;
    })
  },

  render() {
    const avatar = Meteor.settings.public.profile.avatar;
    return (
      <div className="card">
        <img className="card-img-top" src={avatar} alt="profile avatar" />

        <div className="card-block">
          {this.renderText()}
        </div>

        <div className="card-block">
          {this.renderLink()}
        </div>

        <div className="card-footer">
          <Follow />
        </div>
      </div>
    );
  }
});
