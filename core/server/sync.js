const hostname = Meteor.settings.public.profile.hostname;
const cloneId = Meteor.settings.public.profile.cloneId;

const limit = 100;
const connection = DDP.connect(`http://${hostname}`);
const collection = new Mongo.Collection('pieces', {connection: connection});
let computation = undefined;
connection.onReconnect = function () {
  if (!!computation) {
    computation.stop();
  }
  const subscription = connection.subscribe("singleClonePieces", cloneId, limit);
  Tracker.autorun(function (c) {
    if (subscription.ready()) {
      console.log("observation begins");
      console.log("Hostname:", hostname);
      console.log("Clone ID:", cloneId);
      let cursor = collection.find();
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
      computation = c;
    }
  })
};
