// mock data store
const users = [];
const bookmarks = [];


function createUser() {

}

function getUser(userId, callback) {
  callback({
    userId: '1',
    email: 'aa@a.com',
    name: 'John Smith'
  });
}

module.exports = {
  createUser,
  getUser
};


// bookmarks
// user bookmark relations
// userId, pageUrl (permanent), timestamp
