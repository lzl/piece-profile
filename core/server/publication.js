Meteor.publish("allPosts", function (limit) {
  if (limit === undefined) {
    limit = 20;
  }
  check(limit, Number);
  return Posts.find({published: true}, {sort: {createdAt: -1}, limit: limit});
});
