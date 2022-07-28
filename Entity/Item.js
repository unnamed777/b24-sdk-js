import AbstractEntity from '../AbstractEntity';
import BX24Wrapper from 'bx24wrapper';

export default class Item extends AbstractEntity {
    static get listEndpoint() {
        return 'entity.item.get';
    }

    static get addEndpoint() {
        return 'entity.item.add';
    }

    static get updateEndpoint() {
        return 'entity.item.update';
    }

    static get deleteEndpoint() {
        return 'entity.item.delete';
    }

    /**
     * @param {Object} payload
     * @returns {*}
     */
    static prepareListPayload(payload) {
        payload.SORT = payload.SORT || this.defaultOrder;

        return payload;
    }

    /**
     * @param {B24EntityItemGetParams} payload
     * @param {Object} options
     *
     * @typedef {Object} B24EntityItemGetParams
     * @property {string} ENTITY
     * @property {Object} SORT
     * @property {Object} FILTER
     *
     * @returns {Promise<Collection>}
     */
    static load(payload = {}, options = {}) {
        return super.load(payload, options);
    }

    prepareFieldsToSave(fields) {
        return fields;
    }

    /**
     * Saves data. If record exists, we update it. If not - create a new one.
     * Records, that are absent in data, will be deleted
     *
     * @param {Array} newEntries
     * @returns {Promise<boolean>}
     */
    async saveBatch(newEntries) {
        console.log(newEntries);
        let currentEntryIds = this.getAll().map(entry => entry.ID * 1);
        let batchQuery = [];
        let keepEntryIds = [];

        for (let newEntry of newEntries) {
            let fields = this.prepareFieldsToSave(newEntry);

            if (fields.ID) {
                keepEntryIds.push(fields.ID * 1);
                batchQuery.push([this.constructor.updateEndpoint, fields]);
            } else {
                batchQuery.push([this.constructor.addEndpoint, fields]);
            }
        }

        let deleteEntryIds = currentEntryIds.filter(id => keepEntryIds.indexOf(id) === -1);

        deleteEntryIds.map(id => {
            batchQuery.push([this.constructor.deleteEndpoint, {
                ENTITY: this.constructor.ENTITY,
                ID: id,
            }]);
        });

        console.log(batchQuery);

        // Split into chunks
        const chunkSize = 50;
        let success = true;

        for (let i = 0; i < batchQuery.length; i += chunkSize) {
            let chunk = batchQuery.slice(i, i + chunkSize);

            success = await BX24Wrapper.batch(chunk).then(result => {
                let isSuccess = true;

                result.forEach(entry => {
                    if (entry.answer.error) {
                        isSuccess = false;
                        console.error(entry.answer.error.error + ' ' + entry.answer.error.error_description);
                        console.log(result);
                        alert('Произошла ошибка при сохранении');
                    }
                });

                return isSuccess;
            });

            if (!success) {
                break;
            }
        }


        console.log('Batch result', success);
        return success;
    }

    /**
     * Adds entry
     *
     * @param {string} entity ENTITY
     * @param {number|string} id ID
     * @param {Object} fields
     * @returns {Promise<number>} New entry id
     */
    static async add(entity, fields)
    {
        fields = { ...fields };
        fields.ENTITY = entity;

        if (!fields.ENTITY) {
            throw Error('ENTITY is required');
        }

        const result = await BX24Wrapper.callRaw(this.addEndpoint, fields);
        return result.answer.result;
    }
    
    /**
     * Updates entry
     * 
     * @param {string} entity ENTITY
     * @param {number|string} id ID
     * @param {Object} fields
     * @returns {Promise<void>}
     */
    static async update(entity, id, fields)
    {
        fields = { ...fields };
        fields.ENTITY = entity;
        fields.ID = id;
        
        if (!fields.ENTITY) {
            throw Error('ENTITY is required');
        }
        
        if (!fields.ID) {
            throw Error('ID is required');
        }
        
        const result = await BX24Wrapper.callRaw(this.updateEndpoint, fields);
        return result.answer.result;
    }
    
    /**
     * Deletes entry
     * 
     * @param {string} entity ENTITY
     * @param {number|string} id ID
     * @returns {Promise<void>}
     */
    static delete(entity, id)
    {
        let fields = {
            ENTITY: entity,
            ID: id
        };

        if (!fields.ENTITY) {
            throw Error('ENTITY is required');
        }

        if (!fields.ID) {
            throw Error('ID is required');
        }

        return BX24Wrapper.callRaw(this.deleteEndpoint, fields);
    }
}
