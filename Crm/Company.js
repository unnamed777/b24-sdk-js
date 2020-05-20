import AbstractEntity from '../AbstractEntity';

export default class Company extends AbstractEntity {
    static get listEndpoint() {
        return 'crm.company.list';
    }

    /**
     * @param {CompanyFilterParams} payload
     * @param {Object} options
     *
     * @typedef {Object} CompanyFilterParams
     * @property {Object} order
     * @property {Object} select
     * @property {Object} filter
     *
     * @returns {Promise<Collection>}
     */
    static load(payload = {}, options = {}) {
        return super.load(payload, options);
    }
}
