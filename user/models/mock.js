// mock data store
const users = [];
const bookmarks = [];


function createUser({email, name}) {
  return new Promise((resolve, reject) => {
    const user = {
      id: users.length,
      email: email,
      name: name
    };
    users.push(user);
    resolve(user);
  });
}

function getUser(userId) {
  return new Promise((resolve, reject) => {
    const user = users[userId];
    if (user) {
      resolve(user);
    } else {
      reject('user does not exist');
    }
  });
}

module.exports = {
  createUser,
  getUser
};


// bookmarks
// user bookmark relations
// userId, pageUrl (permanent), timestamp
