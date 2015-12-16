var hostname = Meteor.settings.public.hostname;
var cloneId = Meteor.settings.public.cloneId;

var connection = DDP.connect(`http://${hostname}`);
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
  console.log("Hostname:", hostname);
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
