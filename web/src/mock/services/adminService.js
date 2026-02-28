export default {
  '/api/admin/stats': (req, db) => ({ code: 200, data: { users: db.users.length, classes: db.classes.length, posts: db.posts.length, photos: db.photos.length, today: 2 } }),
  '/api/admin/users': (req, db) => ({ code: 200, data: db.users }),
  '/api/admin/classes': (req, db) => ({ code: 200, data: db.classes }),
  '/api/admin/settings': (req, db) => { db.settings = { ...db.settings, ...req.data }; return { code: 200, data: db.settings } }
}
