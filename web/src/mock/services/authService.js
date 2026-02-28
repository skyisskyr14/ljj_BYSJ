const token = (u) => `token-${u.id}`
export default {
  '/api/auth/login': (req, db) => {
    const u = db.users.find(i => i.username === req.data.username && i.password === req.data.password)
    if (!u || !u.status) return { code: 401, message: '账号或密码错误' }
    return { code: 200, data: { token: token(u), user: u } }
  },
  '/api/auth/register': (req, db) => {
    if (db.users.some(i => i.username === req.data.username)) return { code: 400, message: '账号已存在' }
    const nu = { id: `u${Date.now()}`, status: true, avatar: '', signature: '', ...req.data }
    db.users.push(nu)
    return { code: 200, data: { token: token(nu), user: nu } }
  },
  '/api/auth/profile': (req, db) => ({ code: 200, data: db.users })
}
