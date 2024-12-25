import AbstractEntityService from '../AbstractEntityService';

export default class StatusService extends AbstractEntityService {
    static get defaultOrder() {
        return {
            'ENTITY_ID': 'ASC',
            'SORT': 'ASC'
        };
    }

    static get fieldsEndpoint() {
        return 'crm.status.fields';
    }

    static get listEndpoint() {
        return 'crm.status.list';
    }

    /**
     * @param {CrmStatusFilterParams} payload
     *
     * @typedef {Object} CrmStatusFilterParams
     * @property {Object} order
     * @property {Object} filter
     *
     * @returns {Promise<Collection>}
     */
    static async load(payload = {}) {
        const collection = await super.load(payload);

        collection.filterByEntityId = function (entityId) {
            return this.getAll().filter(item => item.ENTITY_ID === entityId);
        };

        return collection;
    }
}
