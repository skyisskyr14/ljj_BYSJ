export default {
  '/api/album/list': (req, db) => ({ code: 200, data: db.albums }),
  '/api/album/detail': (req, db) => ({ code: 200, data: db.photos.filter(i => i.albumId === req.params.id) }),
  '/api/album/upload': (req, db) => { const p = { id: `ph${Date.now()}`, createdAt: Date.now(), status: 'pending', ...req.data }; db.photos.unshift(p); return { code: 200, data: p } },
  '/api/album/manage': (req, db) => { if (req.data.action === 'create') db.albums.push({ id: `a${Date.now()}`, ...req.data.payload }); if (req.data.action === 'remove') db.albums = db.albums.filter(i => i.id !== req.data.id); return { code: 200, data: db.albums } }
}
