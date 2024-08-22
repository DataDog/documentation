import {
  minifyClientFunction,
  expandClientFunction
} from '../../src/helperModules/configMinification';
import {
  ClientFunction,
  ClientFunctionSchema,
  ClientVariable
  // ClientVariableSchema
} from 'markdoc-static-compiler';
import _ from 'lodash';
import { describe, test, expect } from 'vitest';

describe('configMinification', () => {
  const simpleClientFunction: ClientFunction = {
    $$mdtype: 'Function',
    name: 'equals',
    parameters: {
      '0': {
        $$mdtype: 'Variable',
        path: ['color'],
        value: 'green'
      },
      '1': 'yellow'
    },
    value: false,
    ref: '50'
  };
  ClientFunctionSchema.parse(simpleClientFunction);

  const minifiedClientFunction = minifyClientFunction(simpleClientFunction);
  const expandedClientFunction = expandClientFunction(minifiedClientFunction);

  test('minifyClientFunction', () => {
    const match = _.isEqual(minifiedClientFunction, {
      m: 'F',
      n: 'e',
      p: {
        '0': {
          m: 'V',
          p: ['color'],
          v: 'green'
        },
        '1': 'yellow'
      },
      v: false,
      r: '50'
    });
    expect(match).toBe(true);
  });

  test('expandClientFunction', () => {
    const match = _.isEqual(expandedClientFunction, simpleClientFunction);
    expect(match).toBe(true);
  });
});
