enum StorageType {
	l = "localStorage",
	s = "sessionStorage"
}
/**
 *  storage工具类
 */
class StorageUtil {
	storage: Storage;

	constructor(type: StorageType) {
		this.storage = type === StorageType.l ? window.localStorage : window.sessionStorage;
	}

	set(key: string, value: any) {
		const data = JSON.stringify(value);
		this.storage.setItem(key, data);
	}

	get(key: string) {
		const value = this.storage.getItem(key);
		if (value) {
			return JSON.parse(value);
		}
	}

	delete(key: string) {
		this.storage.removeItem(key);
	}

	clear() {
		this.storage.clear();
	}
}

export const LStorage = new StorageUtil(StorageType.l);
export const SStorage = new StorageUtil(StorageType.s);
