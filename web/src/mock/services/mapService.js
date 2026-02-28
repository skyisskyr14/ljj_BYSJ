export default {
  '/api/map/points': (req, db) => ({ code: 200, data: db.locations }),
  '/api/map/update': (req, db) => { const i = db.locations.findIndex(l => l.userId === req.data.userId); const rec = { id: `l${Date.now()}`, updatedAt: Date.now(), ...req.data }; if (i > -1) db.locations[i] = rec; else db.locations.push(rec); return { code: 200, data: rec } }
}
