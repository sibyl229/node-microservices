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

function getBookmarks(userId, filterFunc) {
  console.log(bookmarks);
  return getUser(userId).then(
    (user) => {
      return bookmarks.filter((bookmark) => {
        if (filterFunc) {
          return bookmark && bookmark.userId === userId && filterFunc(bookmark)
        } else {
          return bookmark && bookmark.userId === userId;
        }
      });
    }
  );
}

function getBookmarkByUrl(userId, bookmarkUrl) {
  return getUser(userId).then(() => {
    return getBookmarks(userId, (bookmark) => bookmark.url === bookmarkUrl).then(
      (bookmarks) => bookmarks[0]
    );
  });
}

function addBookmark(userId, bookmark) {
  return getUser(userId).then(() => {
    return getBookmarkByUrl(userId, bookmark.url).then(
      (existingBookmark) => {
        if (existingBookmark) {
          return existingBookmark;
        } else {
          const id = bookmarks.length;
          const newBookmark = {
            id: id,
            url: bookmark.url,
            userId: userId
          };
          bookmarks.push(newBookmark);
          return newBookmark;
        }
      }
    );
  });
}

function deleteBookmark(userId, bookmarkId) {
  return getUser(userId).then(() => {
    let deletedBookmark;
    if (bookmarkId < bookmarks.length && bookmarkId >= 0) {
      deletedBookmark = bookmarks[bookmarks]
      bookmarks[bookmarks] = null;
    }
    return deletedBookmark;
  });
}

module.exports = {
  createUser,
  getUser,
  getBookmarks,
  getBookmarkByUrl,
  addBookmark,
  deleteBookmark
};


// bookmarks
// user bookmark relations
// userId, pageUrl (permanent), timestamp
