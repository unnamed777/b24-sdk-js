import BX24Wrapper from 'bx24wrapper';
import Collection from './Collection';

export default class AbstractEntryService {
    static get aliases() {
        return {
            // 'UF_ORIGINAL_NAME': 'NEW_FIELD_NAME'
        }
    }

    static get typeCasting() {
        return {};
    }

    static get defaultOrder() {
        return {'ID': 'ASC'};
    }

    static get defaultSelect() {
        return ['*', 'UF_*'];
    }


    static get endpoint() {
        return '';
    }

    static get listEndpoint() {
        return '';
    }
    
    static get listDomain() {
        return '';
    }

    /**
     * Returns original field name by alias
     *
     * @param alias
     * @returns {*}
     */
    static resolveAlias(alias) {
        if (!this.flippedAliases) {
            this.flippedAliases = {};

            for (let entry of Object.entries(this.aliases)) {
                this.flippedAliases[entry[1]] = entry[0];
            }
        }

        return this.flippedAliases[alias];
    }

    static applyModifiers(entry) {
        this.applyAliases(entry);
        this.castToType(entry);
    }

    /**
     * Set aliases for fields. Useful for UF_*
     */
    static applyAliases(entry) {
        const aliases = this.aliases;

        for (let originalKey in aliases) {
            entry[aliases[originalKey]] = entry[originalKey];
        }
    }

    static castToType(entry) {
        for (let [field, value] of Object.entries(entry)) {
            if (!this.typeCasting[field]) {
                continue;
            }

            switch (this.typeCasting[field]) {
                case 'float':
                    entry[field] = parseFloat(value);
                    break;

                case 'float2':
                    entry[field] = value ? Math.round(parseFloat($value) * 100) / 100 : 0;
                    break;

                case 'int':
                    entry[field] = parseInt(value, 10);
                    break;

                case 'date':
                case 'datetime':
                    entry[field] = value ? new Date(value) : null;
                    break;

                case 'moment':
                    entry[field] = value ? moment(value) : null;
                    break;

                default:
                    break;
            }
        }
    }

    /**
     * @param {Object} payload
     * @returns {*}
     */
    static prepareListPayload(payload) {
        payload.order = payload.order || this.defaultOrder;
        payload.select = payload.select || this.defaultSelect;

        return payload;
    }

    /**
     *
     * @param {Object} payload
     * @param {Object} options
     * @returns {Promise<Collection>}
     */
    static load(payload = {}, options = {}) {
        payload = this.prepareListPayload(payload);
        let fetchMethod;

        if (options.page !== undefined) {
            fetchMethod = 'fetch';

            payload = {
                ...payload,
                start: parseInt(options.page - 1, 10) * this.PAGE_SIZE,
            };
        } else if (options.start !== undefined) {
            fetchMethod = 'fetch';

            payload = {
                ...payload,
                start: options.start,
            };
        } else if (options.fast === true) {
            fetchMethod = 'fastFetchAll';
        } else {
            fetchMethod = 'fetchAll';
        }
        
        if (this.listDomain && options.getter === undefined) {
            options.getter = (response) => response[this.listDomain];
        }
        
        return BX24Wrapper[fetchMethod](
            this.listEndpoint,
            payload,
            {...options, total: true}
        ).then(result => {
            const collection = new Collection(result.entries, this);
            collection.total = result.total;

            return collection;
        });
    }
}
