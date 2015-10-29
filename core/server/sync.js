var url = Meteor.settings.url;
var userId = Meteor.settings.userId;

var connection = DDP.connect(url);
var limit = 100;

Pieces = new Mongo.Collection('pieces', {connection: connection});
var handle = connection.subscribe("pieceSingleUserPosts", userId, limit);

Tracker.autorun(function () {
  if (handle.ready()) {
    observe();
  }
})

var observe = function () {
  console.log("subscription from", url, "is ready");
  let cursor = Pieces.find();
  let cursorHandle = cursor.observeChanges({
    added: function (id, piece) {
      if (Posts.findOne(id)) {
        return;
      } else {
        console.log("added:", id);
        piece._id = id;
        Posts.insert(piece);
      }
    },
    removed: function (id) {
      console.log("removed:", id);
      Posts.remove(id);
    }
  });
};
