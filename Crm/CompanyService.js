import AbstractEntityService from '../AbstractEntityService';

export default class CompanyService extends AbstractEntityService {
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
