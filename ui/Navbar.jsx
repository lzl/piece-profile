Navbar = React.createClass({
  render() {
    return (
      <div className="card">
        <img className="card-img-top" src="/avatar.png" alt="profile avatar" />
        <div className="card-block">
          <p className="card-text">Yes, I found my lexi.</p>
        </div>
        <div className="card-block">
          <a href="https://lizunlong.com/" className="card-link">Blog</a>
          <a href="https://github.com/lzl" className="card-link">GitHub</a>
        </div>
      </div>
    );
  }
});
