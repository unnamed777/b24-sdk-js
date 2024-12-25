import AbstractEntityService from './AbstractEntityService';

export default class UserService extends AbstractEntityService {
    static get listEndpoint() {
        return 'user.get';
    }

    static get defaultSelect() {
        return undefined;
    }

    /**
     * @param {UserFilterParams} payload
     * @param {Object} options
     *
     * @typedef {Object} UserFilterParams
     * @property {string} sort
     * @property {string} order ASC, DESC
     * @property {Object} FILTER
     * @property {string} ADMIN_MODE
     *
     * @returns {Promise<Collection<User>>}
     */
    static async load(payload = {}, options = {}) {
        const collection = await super.load(payload, options);

        collection.getByDepartment = (function (departmentId) {
            return this.getAll().filter(item => (
                item.UF_DEPARTMENT && item.UF_DEPARTMENT.indexOf(departmentId) !== -1
            ));
        }).bind(collection);

        return collection;
    }

    static applyModifiers(entry) {
        super.applyModifiers(entry);

        entry.ID = parseInt(entry.ID, 10);
        entry.FULL_NAME = ((entry.LAST_NAME || '') + ' ' + (entry.NAME || '')).replace(/^\s*/, '').replace(/\s+$/, '');

        if (entry.FULL_NAME === '') {
            entry.FULL_NAME = entry.EMAIL;
        }
    }
}
