import AbstractEntityService from '../AbstractEntityService';

export default class ActivityService extends AbstractEntityService {
    static get OWNER_TYPE_LEAD() {
        return 1;
    }

    static get OWNER_TYPE_DEAL() {
        return 2;
    }

    static get OWNER_TYPE_CONTACT() {
        return 3;
    }

    static get OWNER_TYPE_COMPANY() {
        return 4;
    }

    static get listEndpoint() {
        return 'crm.activity.list';
    }
}
