export default {
  '/api/posts/list': (req, db) => ({ code: 200, data: db.posts }),
  '/api/posts/create': (req, db) => { const p = { id: `p${Date.now()}`, likes: [], comments: [], status: 'pending', createdAt: Date.now(), ...req.data }; db.posts.unshift(p); return { code: 200, data: p } },
  '/api/posts/like': (req, db) => { const p = db.posts.find(i => i.id === req.data.id); if (p) { const idx = p.likes.indexOf(req.data.userId); idx > -1 ? p.likes.splice(idx, 1) : p.likes.push(req.data.userId) } return { code: 200, data: p } },
  '/api/posts/comment': (req, db) => { const p = db.posts.find(i => i.id === req.data.id); if (p) p.comments.push({ id: `cm${Date.now()}`, ...req.data.comment }); return { code: 200, data: p } },
  '/api/posts/review': (req, db) => { const p = db.posts.find(i => i.id === req.data.id); if (p) p.status = req.data.status; return { code: 200, data: p } }
}
