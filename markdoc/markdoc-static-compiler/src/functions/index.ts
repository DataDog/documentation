import type { ConfigFunction, ClientFunction } from '../types';
import { truthy } from '../tags/conditional';

/**
 * Give each client function a unique ref
 * that can be used in HTML elements
 * to reference the function
 */
class RefGenerator {
  static ref = 0;

  static generateRef() {
    return `${RefGenerator.ref++}`;
  }
}

const and: ConfigFunction = {
  transform(parameters): ClientFunction {
    const value = Object.values(parameters).every((p) => {
      if (typeof p === 'object') {
        return truthy(p.value);
      } else {
        return truthy(p);
      }
    });

    return {
      $$mdtype: 'Function',
      name: 'and',
      value,
      parameters,
      ref: RefGenerator.generateRef()
    };
  }
};

const or: ConfigFunction = {
  transform(parameters): ClientFunction {
    const value = Object.values(parameters).find((p) => truthy(p.value)) !== undefined;

    return {
      $$mdtype: 'Function',
      name: 'or',
      value,
      parameters,
      ref: RefGenerator.generateRef()
    };
  }
};

const not: ConfigFunction = {
  parameters: {
    0: { required: true }
  },

  transform(parameters): ClientFunction {
    const value = !truthy(parameters[0].value);
    return {
      $$mdtype: 'Function',
      name: 'not',
      value,
      parameters,
      ref: RefGenerator.generateRef()
    };
  }
};

const equals: ConfigFunction = {
  transform(parameters): ClientFunction {
    const values = Object.values(parameters).map((p) => {
      if (typeof p === 'object') {
        return p.value;
      } else {
        return p;
      }
    });
    const value = values.every((v) => v === values[0]);

    return {
      $$mdtype: 'Function',
      name: 'equals',
      value,
      parameters,
      ref: RefGenerator.generateRef()
    };
  }
};

const debug: ConfigFunction = {
  transform(parameters) {
    if (typeof parameters[0] === 'object') {
      return JSON.stringify(parameters[0].value, null, 2);
    } else {
      return JSON.stringify(parameters[0], null, 2);
    }
  }
};

const defaultFn: ConfigFunction = {
  transform(parameters) {
    let value: any;
    Object.values(parameters).forEach((p) => {
      if (value !== undefined) return;
      if (typeof p === 'object') {
        value = p.value;
      } else {
        value = p;
      }
    });
    return {
      $$mdtype: 'Function',
      name: 'default',
      value,
      parameters
    };
  }
};

export default { and, or, not, equals, default: defaultFn, debug };
