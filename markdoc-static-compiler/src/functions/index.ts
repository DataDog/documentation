import type { ConfigFunction } from '../types';
import { truthy } from '../tags/conditional';

const and: ConfigFunction = {
  transform(parameters) {
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
    };
  },
};

const or: ConfigFunction = {
  transform(parameters) {
    const value =
      Object.values(parameters).find((p) => truthy(p.value)) !== undefined;

    return {
      $$mdtype: 'Function',
      name: 'or',
      value,
      parameters,
    };
  },
};

const not: ConfigFunction = {
  parameters: {
    0: { required: true },
  },

  transform(parameters) {
    const value = !truthy(parameters[0].value);
    return {
      $$mdtype: 'Function',
      name: 'not',
      value,
      parameters,
    };
  },
};

const equals: ConfigFunction = {
  transform(parameters) {
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
    };
  },
};

const debug: ConfigFunction = {
  transform(parameters) {
    if (typeof parameters[0] === 'object') {
      return JSON.stringify(parameters[0].value, null, 2);
    } else {
      return JSON.stringify(parameters[0], null, 2);
    }
  },
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
      parameters,
    };
  },
};

export default { and, or, not, equals, default: defaultFn, debug };
