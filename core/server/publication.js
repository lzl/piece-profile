Meteor.publish("allPieces", function (limit) {
  if (limit === undefined) {
    limit = 20;
  }
  check(limit, Number);
  return Pieces.find({published: true}, {sort: {createdAt: -1}, limit: limit});
});
