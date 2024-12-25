import AbstractEntityService from '../../AbstractEntityService';
import Collection from '../../Collection';

export default class ProductRowService extends AbstractEntityService {
    static get listEndpoint() {
        return 'crm.item.productrow.list';
    }

    static get defaultOrder() {
        return {'id': 'asc'};
    }

    static get defaultSelect() {
        return ['*'];
    }

    static get listDomain() {
        return 'productRows';
    }

    /**
     * @param {CrmItemProductRowArgs} payload
     * @param {Object} options
     *
     * @typedef {Object} CrmItemProductRowArgs
     * @property {Object} order
     * @property {Object} select
     * @property {Object} filter
     * @property {Number} limit
     *
     * @returns {Promise<Collection>}
     */
    static load(payload = {}, options = {}) {
        return super.load(payload, options);
    }
}
