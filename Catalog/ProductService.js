import AbstractEntity from '../AbstractEntity';
import Collection from '../Collection';
import BX24Wrapper from 'bx24wrapper';

export default class ProductService extends AbstractEntity {
    static get listEndpoint() {
        return 'catalog.product.list';
    }

    static get updateEndpoint() {
        return 'catalog.product.update';
    }

    static get defaultOrder() {
        return {'id': 'asc'};
    }

    static get defaultSelect() {
        return ['id', 'iblockId', '*'];
    }

    static get listDomain() {
        return 'products';
    }

    static get getDomain() {
        return 'product';
    }

    /**
     * @param {CatalogProductListArgs} payload
     * @param {Object} options
     *
     * @typedef {Object} CatalogProductListArgs
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

    /**
     *
     * @param {Number} id
     * @param {Object} fields
     * @returns {Promise<Object>} Updated element
     */
    static async update(id, fields) {
        fields = { ...fields };

        const result = await BX24Wrapper.callRaw(this.updateEndpoint, {
            id,
            fields,
        });

        return result.answer.result.element;
    }
}
