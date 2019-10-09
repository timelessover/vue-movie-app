//需求：set添加，get获取，has查找，remove删除，clear删除所有，getAll获取全部

/**
 *
 * 序列化与反序列化
 * @param {*} val
 * @returns
 */
function serialize(val) {
    return JSON.stringify(val)
}
function deserialize(val) {
    if (typeof val !== 'string') {
        return undefined
    }
    try {
        return JSON.parse(val)
    } catch{
        return val || undefined
    }
}

//store方法
class store {
    constructor() {
    }
    set(key, val) {
        if (this.disabled) {
            return
        }
        if (val === undefined) {
            return this.remove(key)
        }
        this.storage.setItem(key, serialize(val))
        return val
    }
    get(key, def) {
        if (this.disabled) {
            return def
        }
        let val = deserialize(this.storage.getItem(key))
        return (val === undefined ? def : val)
    }

    has(key) {
        return this.get(key) !== undefined
    }

    remove(key) {
        if (this.disabled) {
            return
        }
        this.storage.removeItem(key)
    }

    clear() {
        if (this.disabled) {
            return
        }
        this.storage.clear()
    }

    getAll() {
        if (this.disabled) {
            return null
        }
        let obj = {}
        this.forEach((key, val) => {
            obj[key] = val
        })
        return obj
    }

    forEach(cb) {
        if (this.disabled) {
            return
        }
        for (let i = 0; i < this.storage.length; i++) {
            let key = this.storage.key(i)
            cb(key, this.get(key))
        }
    }

}
//localStrage支持
class _storage extends store{
    constructor(){
        super()
        this.storage = window.localStorage
    }
}
//sessionStrage支持
class _session extends store{
    constructor(){
        super()
        this.storage = window.sessionStorage
    }
}

export const storage = new _storage()

export const sesstion =  new _session()