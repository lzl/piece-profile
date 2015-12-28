Navbar = React.createClass({
  render() {
    const avatar = Meteor.settings.public.profile.avatar;
    return (
      <div className="card">
        <img className="card-img-top" src={avatar} alt="profile avatar" />

        <div className="card-block">
          <p className="card-text">This is a sub-project of <a href="https://github.com/lzl/piece">Piece</a>.</p>
          <p className="card-text">With Piece Profile, visitors can read your pieces, no need to know your user ID or the meaning of URL, just like Twitter profile page or WordPress blog page.</p>
        </div>

        <div className="card-block">
          <a href="https://github.com/lzl/piece-profile" className="card-link">GitHub</a>
        </div>

        <div className="card-footer">
          <Follow />
        </div>
      </div>
    );
  }
});
