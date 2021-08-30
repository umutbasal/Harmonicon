import { BaseNodeModel } from './base/node.js';

export class InstrumentModel extends BaseNodeModel {

  static properties = {
    session: {
      json: false,
    },
    name: {
      type: String
    },
    fn: {
      type: Function
    }
  }

  get patchType () {
    return 'instrument';
  }

}

InstrumentModel.init();