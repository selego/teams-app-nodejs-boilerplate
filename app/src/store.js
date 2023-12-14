import { create } from 'zustand'

const store = create(set => ({
  user: null,
  setUser: user => set(() => ({ user })),
  fund: null,
  setFund: fund => set(() => ({ fund }))
}))

export default store
