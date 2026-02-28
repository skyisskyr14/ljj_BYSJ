export const isEmail=v=>/.+@.+/.test(v)
export const isPhone=v=>/^1\d{10}$/.test(v)
export const strongPassword=v=>/^(?=.*\d).{6,}$/.test(v)
