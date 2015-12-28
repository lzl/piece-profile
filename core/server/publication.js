Meteor.publish("recentPieces", function () {
  return Pieces.find({published: true}, {sort: {createdAt: -1}, limit: 20});
});

Meteor.publish('allPieces', function () {
  const self = this;
  const query = {
    published: true
  };
  self.autorun(function (computation) {
    return Pieces.find(query, {limit: self.data('limit') || 20, sort: {createdAt: -1}});
  });
});
