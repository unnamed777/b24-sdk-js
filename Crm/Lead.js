import AbstractEntity from '../AbstractEntity';

export default class Lead extends AbstractEntity {
    static get listEndpoint() {
        return 'crm.lead.list';
    }

    /**
     * @param {LeadFilterParams} payload
     * @param {Object} options
     *
     * @typedef {Object} LeadFilterParams
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
