import { createContext, useContext, useEffect, useState } from 'react'
import data from './data/product.json'

// 장바구니·관심상품·로그인을 localStorage에 저장하는 가짜 쇼핑몰 상태
const Store = createContext(null)
export const useStore = () => useContext(Store)

export const products = data.products
export const findProduct = (id) => products.find((p) => p.id === Number(id))
export const farmCats = data.categories.filter((c) => c.farm).map((c) => c.id)
export const won = (n) => n.toLocaleString('ko-KR') + '원'

export const RULES = { total: 240000, min: 40000, max: 100000, pointRate: 0.8, pointMax: 80000, farmRatio: 0.5 }

const load = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}
const usePersist = (key, fallback) => {
  const [v, setV] = useState(() => load(key, fallback))
  useEffect(() => localStorage.setItem(key, JSON.stringify(v)), [key, v])
  return [v, setV]
}

// 장바구니 합계와 주문 가능 여부 (이용안내의 실제 규칙)
export function checkout(lines, points) {
  const total = lines.reduce((s, l) => s + l.product.price * l.qty, 0)
  const farm = lines.filter((l) => farmCats.includes(l.product.category)).reduce((s, l) => s + l.product.price * l.qty, 0)
  const usePoint = Math.min(Math.round(total * RULES.pointRate), RULES.pointMax, points)
  const errors = []
  if (total < RULES.min) errors.push(`1회 주문은 ${won(RULES.min)} 이상부터 가능합니다.`)
  if (total > RULES.max) errors.push(`1회 주문은 ${won(RULES.max)} 이하만 가능합니다.`)
  if (total > 0 && farm / total < RULES.farmRatio) errors.push('농산물(쌀/잡곡·채소/버섯·과일/견과) 비중이 50% 이상이어야 합니다.')
  return { total, farm, usePoint, pay: total - usePoint, errors }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = usePersist('hs-cart', []) // [{ id, qty }]
  const [likes, setLikes] = usePersist('hs-likes', [])
  const [recent, setRecent] = usePersist('hs-recent', [])
  const [users, setUsers] = usePersist('hs-users', {}) // { [userId]: { name, password, points, orders } }
  const [userId, setUserId] = usePersist('hs-login', null)
  const user = userId ? users[userId] : null

  const addCart = (id, qty = 1) => {
    const p = findProduct(id)
    if (!p || p.status === 'soldout' || p.status === 'paused') return false
    setCart((c) => (c.some((l) => l.id === p.id) ? c.map((l) => (l.id === p.id ? { ...l, qty: l.qty + qty } : l)) : [...c, { id: p.id, qty }]))
    return true
  }
  const setQty = (id, qty) => setCart((c) => (qty < 1 ? c.filter((l) => l.id !== id) : c.map((l) => (l.id === id ? { ...l, qty } : l))))
  const toggleLike = (id) => setLikes((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]))
  const viewed = (id) => setRecent((r) => [id, ...r.filter((x) => x !== id)].slice(0, 10))

  const join = ({ id, name, password }) => {
    if (users[id]) return '이미 사용 중인 아이디입니다.'
    setUsers({ ...users, [id]: { name, password, points: RULES.total, orders: [] } })
    setUserId(id)
    return null
  }
  const login = (id, password) => {
    if (users[id]?.password !== password) return '아이디 또는 비밀번호가 맞지 않습니다.'
    setUserId(id)
    return null
  }
  const logout = () => setUserId(null)

  const lines = cart.map((l) => ({ ...l, product: findProduct(l.id) })).filter((l) => l.product)
  const order = () => {
    const r = checkout(lines, user.points)
    if (r.errors.length) return r.errors
    const record = { no: Date.now(), date: new Date().toLocaleDateString('ko-KR'), items: lines.map((l) => `${l.product.name} x${l.qty}`), ...r }
    setUsers({ ...users, [userId]: { ...user, points: user.points - r.usePoint, orders: [record, ...user.orders] } })
    setCart([])
    return null
  }

  const cartCount = cart.reduce((s, l) => s + l.qty, 0)
  const value = { cart, lines, cartCount, addCart, setQty, likes, toggleLike, recent, viewed, user, userId, join, login, logout, order }
  return <Store.Provider value={value}>{children}</Store.Provider>
}
