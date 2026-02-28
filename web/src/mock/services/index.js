import { storage } from '../storage'
import { defaultDB } from '../db'
import auth from './authService'
import cls from './classService'
import post from './postService'
import album from './albumService'
import map from './mapService'
import admin from './adminService'

if (!storage.get()) storage.reset(defaultDB())
const routes = { ...auth, ...cls, ...post, ...album, ...map, ...admin }
export function mockRequest(req) {
  const db = storage.get() || defaultDB()
  const handler = routes[req.url]
  if (!handler) return Promise.resolve({ code: 404, message: 'not found', data: null })
  const res = handler(req, db)
  storage.set(db)
  return Promise.resolve(res)
}
