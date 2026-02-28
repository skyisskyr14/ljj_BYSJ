export default {
  '/api/class/list': (req, db) => ({ code: 200, data: db.classes }),
  '/api/class/join': (req, db) => {
    const c = db.classes.find(i => i.code === req.data.code)
    if (!c) return { code: 404, message: '班级码错误' }
    if (!db.memberships.some(m => m.userId === req.data.userId && m.classId === c.id)) db.memberships.push({ userId: req.data.userId, classId: c.id, position: '学生' })
    return { code: 200, data: c }
  },
  '/api/class/create': (req, db) => {
    const c = { id: `c${Date.now()}`, code: `CLS${Math.floor(Math.random() * 9999)}`, ...req.data }
    db.classes.push(c)
    return { code: 200, data: c }
  },
  '/api/class/update': (req, db) => {
    const i = db.classes.findIndex(c => c.id === req.data.id)
    if (i > -1) db.classes[i] = { ...db.classes[i], ...req.data }
    return { code: 200, data: db.classes[i] }
  },
  '/api/class/remove': (req, db) => { db.classes = db.classes.filter(c => c.id !== req.data.id); return { code: 200 } }
}
