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
     * @param {{ENTITY: string}} params
     *
     * @typedef {Object} B24EntityItemGetParams
     * @property {string} ENTITY
     * @property {Object} SORT
     * @property {Object} FILTER
     *
     * @returns {Promise<Collection>}
     */
    static load(params = {}) {
        return super.load(params);
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
}
