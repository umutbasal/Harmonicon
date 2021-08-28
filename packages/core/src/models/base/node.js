import { BaseModel } from '../base';

export class BaseNodeModel extends BaseModel {

  get patches() {
    console.log(this.patchType)
    return this.session.patches.reduce((patches, patch) => {
      if (patch.outputType === this.patchType && patch.output === this.name) {
        patches.inputs.push(patch);
      }
      else if (patch.inputType === this.patchType && patch.input === this.name) {
        patches.outputs.push(patch);
      }

      return patches;
    }, {
      inputs: [],
      outputs: []
    });
  }

  get inputs () {
    return this.patches.inputs;
  }

  get outputs () {
    return this.patches.outputs;
  }

}