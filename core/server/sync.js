var url = Meteor.settings.url;
var cloneId = Meteor.settings.cloneId;

var connection = DDP.connect(url);
var limit = 100;

RemotePieces = new Mongo.Collection('pieces', {connection: connection});
var handle = connection.subscribe("pieceSingleClonePosts", cloneId, limit);

Tracker.autorun(function () {
  if (handle.ready()) {
    observe();
  }
})

var observe = function () {
  console.log("observation begins");
  console.log("URL:", url);
  console.log("Clone ID:", cloneId);
  let cursor = RemotePieces.find();
  let cursorHandle = cursor.observeChanges({
    added: function (id, piece) {
      if (Pieces.findOne(id)) {
        return;
      } else {
        console.log("added:", id);
        piece._id = id;
        Pieces.insert(piece);
      }
    },
    removed: function (id) {
      console.log("removed:", id);
      Pieces.remove(id);
    }
  });
};
