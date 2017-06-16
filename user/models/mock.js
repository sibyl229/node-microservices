// mock data store
const users = [];
const bookmarks = [];


function createUser() {

}

function getUser(userId) {
  return new Promise((resolve, reject) => {
    resolve({
      userId: '1',
      email: 'aa@a.com',
      name: 'John Smith'
    });
  });
}

module.exports = {
  createUser,
  getUser
};


// bookmarks
// user bookmark relations
// userId, pageUrl (permanent), timestamp
