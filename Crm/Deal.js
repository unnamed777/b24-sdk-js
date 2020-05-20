import AbstractEntity from '../AbstractEntity';

export default class Deal extends AbstractEntity {
    static get listEndpoint() {
        return 'crm.deal.list';
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
