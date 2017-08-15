
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'test', password: "123", email: "fake@fake.net", age: 21},
        {username: 'Thomas', password: "Thomas", email: "Thomas@fake.net", age: 30},
        {username: 'Bob', password: "Bob", email: "Bob@fake.net", age: 23},
        {username: 'Alan', password: "Alan", email: "Alan@fake.net", age: 44}
      ]);
    });
};
