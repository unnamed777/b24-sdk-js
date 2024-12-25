import AbstractEntityService from '../AbstractEntityService';

export default class DealService extends AbstractEntityService {
    static get listEndpoint() {
        return 'crm.deal.list';
    }

    static get endpoint() {
        return 'crm.deal.get';
    }

    /**
     * @param {DealFilterParams} payload
     * @param {Object} options
     *
     * @typedef {Object} DealFilterParams
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
