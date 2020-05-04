import * as bp from '../build-api-pages';

describe(`updateMenu`, () => {



});

describe(`createPages`, () => {



});

describe(`createResources`, () => {



});

describe(`getSchema`, () => {

  it('should return the schema object with non application/json formatted first key', () => {
    const expected = {
        "description": "This is a test",
        "properties": {
          "fake_foo": {
            "description": "This is a test",
            "example": "wwwtest",
            "type": "string"
          }
        },
        "type": "object"
    };
    const actual = bp.getSchema({
      "foo/bar/baz": {"schema": expected}
    });
    expect(actual).toEqual(expected);
  });

  it('should return the schema object with application/json as key', () => {
    const expected = {
      "description": "This is a test",
      "properties": {
        "fake_foo": {
          "description": "This is a test",
          "example": "wwwtest",
          "type": "string"
        }
      },
      "type": "object"
    };
    const actual = bp.getSchema({
      "application/json": {"schema": expected}
    });
    expect(actual).toEqual(expected);
  });

  it('should return the the first object', () => {
    const expected = {
      "description": "This is a test",
      "properties": {
        "fake_foo": {
          "description": "This is a test",
          "example": "wwwtest",
          "type": "string"
        }
      },
      "type": "object"
    };
    const actual = bp.getSchema({
      "application/json": {"schema": expected},
      "foo/bar/baz": {},
      "another_test": {},
      "this-could-be-anything": {},
    });
    expect(actual).toEqual(expected);
  });

});

describe(`getTagSlug`, () => {

  it('should return lowercase', () => {
      const expected = "integration";
      const actual = bp.getTagSlug("Integration");
      expect(actual).toEqual(expected);
  });

  it('should return hyphenated', () => {
      const expected = "this-is-some-space";
      const actual = bp.getTagSlug("this is some space");
      expect(actual).toEqual(expected);
  });

  it('should return lowercase and hyphenated together', () => {
      const expected = "aws-integration";
      const actual = bp.getTagSlug("AWS Integration");
      expect(actual).toEqual(expected);
  });

});

describe(`isTagMatch `, () => {

  let pathObj;

  beforeEach(() => {
    pathObj = {
      "post": {
        "deprecated": true,
        "description": "Disables muting all monitors. Throws an error if mute all\nwas not enabled previously.",
        "operationId": "UnmuteAllMonitors",
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request"
          },
          "401": {
            "content": {
              "application/json": {
                "schema": {
                  "description": "TODO.",
                  "properties": {
                    "errors": {
                      "description": "TODO.",
                      "items": {
                        "description": "TODO.",
                        "example": "Bad Request",
                        "type": "string"
                      },
                      "type": "array"
                    }
                  },
                  "required": [
                    "errors"
                  ],
                  "type": "object"
                }
              }
            },
            "description": "Authentication error"
          }
        },
        "summary": "Unmute all monitors",
        "tags": [
          "Monitors"
        ],
        "x-codegen-request-body-name": "body"
      }
    };
  });

  it('should return false when there is no match', () => {
    const tag = "FakeTag";
    const actual = bp.isTagMatch(pathObj, tag);
    const expected = false;
    expect(actual).toEqual(expected);
  });

  it('should return true when there is a match', () => {
    const tag = "Monitors";
    const actual = bp.isTagMatch(pathObj, tag);
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('should return false when no keys', () => {
    const tag = "Monitors";
    const actual = bp.isTagMatch({}, tag);
    const expected = false;
    expect(actual).toEqual(expected);
  });
});

describe(`filterExampleJson`, () => {

  it('should show example array and object correctly', () => {
    const mockSchema = {
      "description": "TODO.",
      "properties": {
        "errors": {
          "description": "TODO.",
          "items": {
            "description": "TODO.",
            "example": "Bad Request",
            "type": "string"
          },
          "type": "array"
        }
      },
      "required": [
        "errors"
      ],
      "type": "object"
    };
    const actual = bp.filterExampleJson(mockSchema);
    const expected = {"errors":["Bad Request"]};
    expect(actual).toEqual(expected);
  });

  it('should on empty request show {}', () => {
    const mockSchema = {"type": "object"};
    const actual = bp.filterExampleJson(mockSchema);
    const expected = {};
    expect(actual).toEqual(expected);
  });

  it('should show example data when comma seperated array', () => {
    const mockSchema = {
      "description": "Returns the AWS account associated with this integration.",
      "properties": {
        "access_key_id": {
          "description": "Your AWS access key ID. Only required if your AWS account is a GovCloud or China account.",
          "type": "string"
        },
        "account_id": {
          "description": "Your AWS Account ID without dashes.",
          "example": "1234567",
          "type": "string"
        },
        "account_specific_namespace_rules": {
          "additionalProperties": {
            "description": "TODO.",
            "type": "boolean"
          },
          "description": "An object (in the form {\"namespace1\":true/false, \"namespace2\":true/false})\nthat enables or disables metric collection for specific AWS namespaces for\nthis AWS account only.\nA list of namespaces can be found at the /v1/integration/aws/available_namespace_rules endpoint.",
          "example": false,
          "type": "object"
        },
        "excluded_regions": {
          "description": "An array of AWS regions to exclude from metrics collection.",
          "example": [
            "us-east-1",
            "us-west-2"
          ],
          "items": {
            "description": "TODO.",
            "type": "string"
          },
          "type": "array"
        },
        "filter_tags": {
          "description": "The array of EC2 tags (in the form key:value) defines a filter that Datadog uses when collecting metrics from EC2.\nWildcards, such as ? (for single characters) and * (for multiple characters) can also be used.\nOnly hosts that match one of the defined tags\nwill be imported into Datadog. The rest will be ignored.\nHost matching a given tag can also be excluded by adding ! before the tag.\nFor example, `env:production,instance-type:c1.*,!region:us-east-1`",
          "example": [
            "<KEY>:<VALUE>"
          ],
          "items": {
            "description": "TODO.",
            "type": "string"
          },
          "type": "array"
        },
        "host_tags": {
          "description": "Array of tags (in the form key:value) to add to all hosts\nand metrics reporting through this integration.",
          "example": [
            "<KEY>:<VALUE>"
          ],
          "items": {
            "description": "TODO.",
            "type": "string"
          },
          "type": "array"
        },
        "role_name": {
          "description": "Your Datadog role delegation name.",
          "example": "DatadogAWSIntegrationRole",
          "type": "string"
        },
        "secret_access_key": {
          "description": "Your AWS secret access key. Only required if your AWS account is a GovCloud or China account.",
          "type": "string"
        }
      },
      "type": "object"
    };
    const actual = bp.filterExampleJson(mockSchema);
    const expected = {"access_key_id": "string", "account_id": "1234567", "account_specific_namespace_rules": {"&lt;any-key&gt;": "false"}, "excluded_regions": ["us-east-1","us-west-2"], "filter_tags": ["<KEY>:<VALUE>"], "host_tags": ["<KEY>:<VALUE>"], "role_name": "DatadogAWSIntegrationRole", "secret_access_key": "string"};
    expect(actual).toEqual(expected);
  });

  it('should show example data when object', () => {
    const mockSchema = {
      "example": {
        "value": [
          "namespace1",
          "namespace2",
          "namespace3"
        ]
      },
      "items": {
        "type": "string"
      },
      "type": "array"
    };
    const actual = bp.filterExampleJson(mockSchema);
    const expected = ["namespace1", "namespace2", "namespace3"];
    expect(actual).toEqual(expected);
  });

  it('should show array of array of objects', () => {
    const mockSchema = {
      "description": "An array of traces.",
      "items": {
        "description": "An array of spans.",
        "items": {
          "description": "TODO.",
          "properties": {
            "duration": {
              "description": "The duration of the request in nanoseconds.",
              "format": "int64",
              "type": "integer"
            },
            "error": {
              "description": "Set this value to 1 to indicate if an error occured.\n\nIf an error occurs, you should pass additional information,\nsuch as the error message, type and stack information in the meta property.",
              "format": "int32",
              "maximum": 1,
              "minimum": 0,
              "type": "integer"
            },
            "meta": {
              "additionalProperties": {
                "description": "TODO.",
                "type": "string"
              },
              "description": "A set of key-value metadata. Keys and values must be strings.",
              "type": "object"
            },
            "metrics": {
              "additionalProperties": {
                "description": "TODO.",
                "format": "double",
                "type": "number"
              },
              "description": "A set of key-value metadata. Keys must be strings and values must be 64-bit floating point numbers.",
              "type": "object"
            },
            "name": {
              "description": "The span name. The span name must not be longer than 100 characters.",
              "example": "span_name",
              "maxLength": 100,
              "type": "string"
            },
            "parent_id": {
              "description": "The span integer ID of the parent span.",
              "format": "int64",
              "type": "integer"
            },
            "resource": {
              "description": "The resource you are tracing. The resource name must not be longer than 5000 characters.",
              "example": "/home",
              "maxLength": 5000,
              "type": "string"
            },
            "service": {
              "description": "The service you are tracing. The service name must not be longer than 100 characters.",
              "example": "service_name",
              "maxLength": 100,
              "type": "string"
            },
            "span_id": {
              "description": "The span integer (64-bit unsigned) ID.",
              "example": 987654321,
              "format": "int64",
              "type": "integer"
            },
            "start": {
              "description": "The start time of the request in nanoseconds from the unix epoch.",
              "format": "int64",
              "type": "integer"
            },
            "trace_id": {
              "description": "The unique integer (64-bit unsigned) ID of the trace containing this span.",
              "example": 123456789,
              "format": "int64",
              "type": "integer"
            },
            "type": {
              "default": "custom",
              "description": "The type of request.",
              "enum": [
                "web",
                "db",
                "cache",
                "custom"
              ],
              "example": "web",
              "type": "string",
              "x-enum-varnames": [
                "WEB",
                "DB",
                "CACHE",
                "CUSTOM"
              ]
            }
          },
          "required": [
            "trace_id",
            "span_id",
            "name",
            "resource",
            "service",
            "start",
            "duration"
          ],
          "type": "object"
        },
        "type": "array"
      },
      "type": "array"
    };
    const actual = bp.filterExampleJson(mockSchema);
    const expected = [[{
      "duration": "integer",
      "error": "integer",
      "meta": {"&lt;any-key&gt;": "string"},
      "metrics": {"&lt;any-key&gt;": "number"},
      "name": "span_name",
      "parent_id": "integer",
      "resource": "/home",
      "service": "service_name",
      "span_id": "987654321",
      "start": "integer",
      "trace_id": "123456789",
      "type": "web"
    }]];
    expect(actual).toEqual(expected);
  });

  it('should stop at circular reference', () => {
    const mockSchema = {
      "description": "Response returned by the Logs API when errors occur.",
      "properties": {
        "error": {
          "description": "Error returned by the Logs API",
          "properties": {
            "code": {
              "description": "Code identifying the error",
              "type": "string"
            },
            "details": {
              "description": "Additional error details",
              "items": "[Circular]",
              "type": "array"
            },
            "message": {
              "description": "Error message",
              "type": "string"
            }
          },
          "type": "object"
        }
      },
      "type": "object"
    };
    const actual = bp.filterExampleJson(mockSchema);
    const expected = {"error": {"code": "string", "details": "array", "message": "string"}};
    expect(actual).toEqual(expected);
  });

  it('should work with multiple nesting', () => {
    const mockSchema = {
      "description": "Payload with API-returned permissions.",
      "properties": {
        "data": {
          "description": "Array of permissions.",
          "items": {
            "description": "Permission object.",
            "properties": {
              "attributes": {
                "description": "Attributes of a permission.",
                "properties": {
                  "created": {
                    "description": "Creation time of the permission.",
                    "format": "date-time",
                    "type": "string"
                  },
                  "description": {
                    "description": "Description of the permission.",
                    "type": "string"
                  },
                  "display_name": {
                    "description": "Displayed name for the permission.",
                    "type": "string"
                  },
                  "display_type": {
                    "description": "Display type.",
                    "type": "string"
                  },
                  "group_name": {
                    "description": "Name of the permission group.",
                    "type": "string"
                  },
                  "name": {
                    "description": "Name of the permission.",
                    "type": "string"
                  },
                  "restricted": {
                    "description": "Whether or not the permission is restricted.",
                    "type": "boolean"
                  }
                },
                "type": "object"
              },
              "id": {
                "description": "ID of the permission.",
                "type": "string"
              },
              "type": {
                "default": "permissions",
                "description": "Permissions resource type.",
                "readOnly": true,
                "type": "string"
              }
            },
            "type": "object"
          },
          "type": "array"
        }
      },
      "type": "object"
    };
    const actual = bp.filterExampleJson(mockSchema);
    const expected =  {"data": [{"attributes": {"created": "string","description": "string","display_name": "string","display_type": "string","group_name": "string","name": "string","restricted": "boolean"},"id": "string"}]};
    expect(actual).toEqual(expected);
  });

  it('should not show the type field', () => {
    const mockSchema = {
      "description": "Relationship to user.",
      "properties": {
        "data": {
          "description": "Relationship to user object.",
          "properties": {
            "id": {
              "description": "ID of the user.",
              "type": "string"
            },
            "type": {
              "default": "users",
              "description": "Users type.",
              "readOnly": true,
              "type": "string"
            }
          },
          "type": "object"
        }
      },
      "type": "object"
    };
    const actual = bp.filterExampleJson(mockSchema);
    const expected = {"data": {"id": "string"}};
    expect(actual).toEqual(expected);
  });


  it('should map example keys', () => {
    const mockSchema = {
      "description": "New Datadog-Slack integration.",
      "properties": {
        "service_hooks": {
          "description": "The array of service hook objects.",
          "example": [
            {
              "account": "Main_Account",
              "url": "https://hooks.slack.com/services/1/1/1"
            },
            {
              "account": "doghouse",
              "url": "https://hooks.slack.com/services/2/2/2"
            }
          ],
          "items": {
            "description": "The service hook is generated for your Slack account in\nyour Slack account administration page.",
            "properties": {
              "account": {
                "description": "Your Slack account name.",
                "type": "string"
              },
              "url": {
                "description": "Your Slack Service Hook URL.",
                "type": "string"
              }
            },
            "required": [
              "account",
              "url"
            ],
            "type": "object"
          },
          "type": "array"
        }
      },
      "type": "object"
    };
    const actual = bp.filterExampleJson(mockSchema);
    const expected = {"service_hooks": [{"account": "Main_Account", "url": "https://hooks.slack.com/services/1/1/1"},{"account": "doghouse", "url": "https://hooks.slack.com/services/2/2/2"}]};
    expect(actual).toEqual(expected);
  });

});

describe(`isReadOnlyRow`, () => {

  it('should return true when object with readonly true', () => {
    const obj = {readOnly: true};
    const actual = bp.isReadOnlyRow(obj);
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('should return false when object with readonly false', () => {
    const obj = {readOnly: false};
    const actual = bp.isReadOnlyRow(obj);
    const expected = false;
    expect(actual).toEqual(expected);
  });

  it('should return false when object with no readonly attribute', () => {
    const obj = {};
    const actual = bp.isReadOnlyRow(obj);
    const expected = false;
    expect(actual).toEqual(expected);
  });

  it('should return true when array with readonly true', () => {
    const obj = {type: "array", items: {readOnly: true}};
    const actual = bp.isReadOnlyRow(obj);
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('should return false when array with readonly false', () => {
    const obj = {type: "array", items: {readOnly: false}};
    const actual = bp.isReadOnlyRow(obj);
    const expected = false;
    expect(actual).toEqual(expected);
  });

  it('should return false when array has no readonly attribute', () => {
    const obj = {type: "array", items: {}};
    const actual = bp.isReadOnlyRow(obj);
    const expected = false;
    expect(actual).toEqual(expected);
  });

  it('should return false when array has no items', () => {
    const obj = {type: "array"};
    const actual = bp.isReadOnlyRow(obj);
    const expected = false;
    expect(actual).toEqual(expected);
  });

  it('should return false when empty obj', () => {
    const obj = {};
    const actual = bp.isReadOnlyRow(obj);
    const expected = false;
    expect(actual).toEqual(expected);
  });

});

describe(`fieldColumn`, () => {

  let anykeyMarkup = "&lt;any&#45;key&gt;";
  let anykeyResult = `
    <div class="col-4 column">
      <p class="key">${anykeyMarkup}</p>
    </div>
  `;

  let emptyResult = `
    <div class="col-4 column">
      <p class="key"></p>
    </div>
  `.trim();


  it('should should empty field if key is type and value not object', () => {
    const actual = bp.fieldColumn("type", "array", "", "");
    const expected = emptyResult;
    expect(actual).toEqual(expected);
  });

});

describe(`typeColumn`, () => {

  it('should show type value', () => {
    const obj = {description: ""};
    const actual = bp.typeColumn("type", "array", "");
    const expected = `<div class="col-2 column"><p>array</p></div>`;
    expect(actual).toEqual(expected);
  });

});

describe(`descColumn`, () => {

  let emptyMarkdown = '<div class="col-6 column"></div>';

  it('should return empty column markup when desc empty', () => {
    const obj = {description: ""};
    const key = "foo";
    const actual = bp.descColumn(key, obj);
    const expected = emptyMarkdown;
    expect(actual).toEqual(expected);
  });

  it('should return format markdown', () => {
    const obj = {description: "# test"};
    const key = "foo";
    const actual = bp.descColumn(key, obj);
    const expected = '<div class="col-6 column"><h1 id="test">test</h1></div>';
    expect(actual).toEqual(expected);
  });

  it('should value as description when key is description', () => {
    // this is for additionalProperties
    const obj = "TODO";
    const key = "description";
    const actual = bp.descColumn(key, obj);
    const expected = '<div class="col-6 column"><p>TODO</p></div>';
    expect(actual).toEqual(expected);
  });

});

describe(`rowRecursive`, () => {


});

describe(`addHasExpandClass`, () => {

  it('should do nothing when substring js-collapse-trigger found', () => {
    const mockInput = `
    <div class="table-response schema-table row">
      <p class="expand-all js-expand-all text-primary">Expand All</p>
      <div class="col-12">
        <div class="row table-header">
          <div class="col-4 column">
            <p class="font-semibold">Field</p>
          </div>
          <div class="col-2 column">
            <p class="font-semibold">Type</p>
          </div>
          <div class="col-6 column">
            <p class="font-semibold">Description</p>
          </div>
        </div>
        <div class="row first-row js-collapse-trigger collapse-trigger">Testing Div</div>
      </div>  
    </div>`.trim();
    const expected = `
    <div class="table-response schema-table row">
      <p class="expand-all js-expand-all text-primary">Expand All</p>
      <div class="col-12">
        <div class="row table-header">
          <div class="col-4 column">
            <p class="font-semibold">Field</p>
          </div>
          <div class="col-2 column">
            <p class="font-semibold">Type</p>
          </div>
          <div class="col-6 column">
            <p class="font-semibold">Description</p>
          </div>
        </div>
        <div class="row first-row js-collapse-trigger collapse-trigger">Testing Div</div>
      </div>  
    </div>`.trim();
    const actual = bp.addHasExpandClass(mockInput);
    expect(actual).toEqual(expected);
  });

  it('should add has-no-expands class when substring js-collapse-trigger not found', () => {
    const mockInput = `
    <div class="table-response schema-table row">
      <p class="expand-all js-expand-all text-primary">Expand All</p>
      <div class="col-12">
        <div class="row table-header">
          <div class="col-4 column">
            <p class="font-semibold">Field</p>
          </div>
          <div class="col-2 column">
            <p class="font-semibold">Type</p>
          </div>
          <div class="col-6 column">
            <p class="font-semibold">Description</p>
          </div>
        </div>
        <div class="row first-row collapse-trigger">Testing Div</div>
      </div>  
    </div>`.trim();
    const expected = `
    <div class="table-response schema-table has-no-expands row">
      <p class="expand-all js-expand-all text-primary">Expand All</p>
      <div class="col-12">
        <div class="row table-header">
          <div class="col-4 column">
            <p class="font-semibold">Field</p>
          </div>
          <div class="col-2 column">
            <p class="font-semibold">Type</p>
          </div>
          <div class="col-6 column">
            <p class="font-semibold">Description</p>
          </div>
        </div>
        <div class="row first-row collapse-trigger">Testing Div</div>
      </div>  
    </div>`.trim();
    const actual = bp.addHasExpandClass(mockInput);
    expect(actual).toEqual(expected);
  });

});

describe(`schemaTable`, () => {

  xit('should return html table wrapping rows recursively generated', () => {

    //spyOn(build, 'rowRecursive').and.returnValue('FooBar');
    //const spy = jest.spyOn(build, 'rowRecursive').mockImplementation(() => 'FooBar');
    //const spy = jest.spyOn(bp, 'rowRecursive').mockImplementation(jest.fn());

    const actual = bp.schemaTable({});
    const expected = `
  <div class=" schema-table row">
    <p class="expand-all js-expand-all text-primary">Expand All</p>
    <div class="col-12">
      <div class="row table-header">
        <div class="col-4 column">
          <p class="font-semibold">Field</p>
        </div>
        <div class="col-2 column">
          <p class="font-semibold">Type</p>
        </div>
        <div class="col-6 column">
          <p class="font-semibold">Description</p>
        </div>
      </div>
      FooBar
    </div>  
  </div>`;

    expect(bp.rowRecursive).toHaveBeenCalledTimes(1);
    expect(actual).toEqual(expected);
  });

  xit('should work with array of arrays', () => {
    const mockData = JSON.parse(`
        {
          "schema": {
            "description": "An array of traces.",
            "items": {
              "description": "An array of spans.",
              "items": {
                "description": "TODO.",
                "properties": {
                  "duration": {
                    "description": "The duration of the request in nanoseconds.",
                    "format": "int64",
                    "type": "integer"
                  },
                  "error": {
                    "description": "Set this value to 1 to indicate if an error occured.\\n\\nIf an error occurs, you should pass additional information,\\nsuch as the error message, type and stack information in the meta property.",
                    "format": "int32",
                    "maximum": 1,
                    "minimum": 0,
                    "type": "integer"
                  }
                },
                "required": [
                  "trace_id",
                  "span_id",
                  "name",
                  "resource",
                  "service",
                  "start",
                  "duration"
                ],
                "type": "object"
              },
              "type": "array"
            },
            "type": "array"
          }
      }`);

    const actual = bp.schemaTable("request", mockData.schema);
    const expected = `<div class="table-request schema-table row">
    <p class="expand-all js-expand-all text-primary">Expand All</p>
    <div class="col-12">
      <div class="row table-header">
        <div class="col-4 column">
          <p class="font-semibold">Field</p>
        </div>
        <div class="col-2 column">
          <p class="font-semibold">Type</p>
        </div>
        <div class="col-6 column">
          <p class="font-semibold">Description</p>
        </div>
      </div>
      <div class="row   ">
          <div class="col-12 first-column">
            <div class="row first-row  ">
              <div class="col-4 column">
      <p class="key">duration</p>
    </div>
              <div class="col-2 column"><p>int64</p></div>
              <div class="col-6 column"><p>The duration of the request in nanoseconds.</p></div>
            </div>
            
          </div>
            </div>
            
            <div class="row   ">
              <div class="col-12 first-column">
                <div class="row first-row  ">
                  
              <div class="col-4 column">
      <p class="key">error</p>
    </div>
      
                  <div class="col-2 column"><p>int32</p></div>
                  <div class="col-6 column"><p>Set this value to 1 to indicate if an error occured.</p>
    <p>If an error occurs, you should pass additional information,
    such as the error message, type and stack information in the meta property.</p></div>
                </div>
                
              </div>
            </div>
            
        </div>  
      </div>`.trim();
    expect(actual).toEqual(expected);
  });

});
