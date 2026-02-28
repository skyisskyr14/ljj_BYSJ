const KEY='cloud-yearbook-db'
export const storage={
 get(){return JSON.parse(localStorage.getItem(KEY)||'null')},
 set(data){localStorage.setItem(KEY,JSON.stringify(data))},
 reset(data){this.set(data)}
}
