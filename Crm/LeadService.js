import AbstractEntityService from '../AbstractEntityService';

export default class LeadService extends AbstractEntityService {
    static get listEndpoint() {
        return 'crm.lead.list';
    }

    static get endpoint() {
        return 'crm.lead.get';
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
