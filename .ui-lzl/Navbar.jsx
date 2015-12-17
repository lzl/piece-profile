Navbar = React.createClass({
  render() {
    return (
      <div className="card">
        <img className="card-img-top" src="/avatar.png" alt="profile avatar" />

        <div className="card-block">
          <p className="card-text">I'm LZL, interested in Unschooling and Meteor.</p>
          <p className="card-text">Meteor is a complete open source platform for building web and mobile apps in pure JavaScript.</p>
          <p className="card-text">Unschooling is creating and maintaining an environment in which natural learning can thrive.</p>
          <p className="card-text">Then what is LZL?</p>
        </div>

        <div className="card-block">
          <a href="https://lizunlong.com/" className="card-link">Blog</a>
          <a href="https://github.com/lzl" className="card-link">GitHub</a>
        </div>
        
        <div className="card-footer">
          <Follow />
        </div>
      </div>
    );
  }
});
