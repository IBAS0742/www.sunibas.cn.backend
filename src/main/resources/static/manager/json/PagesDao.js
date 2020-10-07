const PagesDao = new (class extends Dao {
    constructor() {
        super("pages");
    }

    listAll() {
        return this.fetchJson(`${this.ip}${this._path}/listAll`);
    }
});