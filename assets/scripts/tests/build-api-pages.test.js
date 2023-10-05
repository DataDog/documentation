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

  it('should return the first object', () => {
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
      "this-could-be-anything": {}
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

  it('should handle single quotes', () => {
    const expected = "get-a-monitors-details";
    const actual = bp.getTagSlug("Get a monitor's details");
    expect(actual).toEqual(expected);
  });

});

describe(`isTagMatch`, () => {

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

describe(`filterJson `, () => {


});

describe(`outputExample `, () => {

  it('should show boolean without quotes', () => {
    const mockExample = false;
    const actual = bp.outputExample(mockExample);
    const expected = 'false';
    expect(actual).toEqual(expected);
  });

  it('should work with array of strings', () => {
    const mockExample = ['foo', 'bar', 'baz'];
    const actual = bp.outputExample(mockExample);
    const expected = '"foo","bar","baz"';
    expect(actual).toEqual(expected);
  });

  it('should work with array of objects', () => {
    const mockExample = [
      {
        "account": "doghouse",
        "url": "https://hooks.slack.com/services/2/2/2"
      }
    ];
    const actual = bp.outputExample(mockExample, "account");
    const expected = '"doghouse"';
    expect(actual).toEqual(expected);
  });

  it('should work with object with single key of value containing array', () => {
    const mockExample = {
      "value": [
        "namespace1",
        "namespace2",
        "namespace3"
      ]
    };
    const actual = bp.outputExample(mockExample);
    const expected = '"namespace1","namespace2","namespace3"';
    expect(actual).toEqual(expected);
  });

  it('should output multi line example strings with newlines as \\n to avoid parse errors', () => {
    const mockExample = `rule_name_1 foo

rule_name_2 bar

`;
    const actual = bp.outputExample(mockExample);
    const expected = '"rule_name_1 foo\\n\\nrule_name_2 bar\\n\\n"';
    expect(actual).toEqual(expected);
  });

});

describe(`getJsonWrapChars `, () => {
  it('should return array chars when data.items', () => {
    const mockInput = {
      "type": "array",
      "items": {}
    };
    const expected = ['[', ']'];
    const actual = bp.getJsonWrapChars(mockInput);
    expect(actual).toEqual(expected);
  });

  it('should return object chars when data.properties', () => {
    const mockInput = {
      "type": "object",
      "items": {}
    };
    const expected = ['{', '}'];
    const actual = bp.getJsonWrapChars(mockInput);
    expect(actual).toEqual(expected);
  });

  it('should return nested array of object chars when items->items->properties', () => {
    const mockInput = {
      "type": "array",
      "items": {
        "type": "array",
        "items": {}
      }
    };
    const expected = ['[[{', '}]]'];
    const actual = bp.getJsonWrapChars(mockInput);
    expect(actual).toEqual(expected);
  });

});

describe(`getInitialJsonData `, () => {


});

describe(`getInitialExampleJsonData `, () => {


});

describe(`filterExampleJson`, () => {

  it('should show example properties->items correctly', () => {
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
    const actual = bp.filterExampleJson("request", mockSchema);
    const expected = {"errors":["Bad Request"]};
    expect(actual).toEqual(expected);
  });

  it('should on empty request show {}', () => {
    const mockSchema = {"type": "object"};
    const actual = bp.filterExampleJson("request", mockSchema);
    const expected = {};
    expect(actual).toEqual(expected);
  });

  it('should handle examples with array of strings', () => {
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
    const actual = bp.filterExampleJson("request", mockSchema);
    const expected = {"access_key_id": "string", "account_id": "1234567", "account_specific_namespace_rules": {"<any-key>": false}, "excluded_regions": ["us-east-1","us-west-2"], "filter_tags": ["<KEY>:<VALUE>"], "host_tags": ["<KEY>:<VALUE>"], "role_name": "DatadogAWSIntegrationRole", "secret_access_key": "string"};
    expect(actual).toEqual(expected);
  });

  it('should show example data when object', () => {
    // 200 response on ListAvailableAWSNamespaces
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
    const actual = bp.filterExampleJson("response", mockSchema);
    const expected = ["namespace1", "namespace2", "namespace3"];
    expect(actual).toEqual(expected);
  });

  it('should show example data when additionalProperties with properties', () => {
    const mockSchema = {
      "type": "object",
      "description": "An object containing a list of services and their dependencies.",
      "example": {
        "service-a": {
          "calls": [
            "service-b",
            "service-c"
          ]
        }
      },
      "additionalProperties": {
        "type": "object",
        "description": "An object containing a service's dependencies.",
        "required": [
          "calls"
        ],
        "properties": {
          "calls": {
            "description": "A list of dependencies.",
            "type": "array",
            "items": {
              "type": "string",
              "description": "Service names."
            }
          }
        }
      }
    };
    const actual = bp.filterExampleJson('request', mockSchema);
    const expected = {"service-a": {"calls": ["service-b", "service-c"]}};
    expect(actual).toEqual(expected);
  });

  it('should show example data when additionalProperties with items and no properties', () => {
    const mockSchema = {
      "additionalProperties": {
        "description": "An array of all SLO timeframes.",
        "items": {
          "description": "The SLO time window options.",
          "enum": [
            "7d",
            "30d",
            "90d"
          ],
          "type": "string",
          "x-enum-varnames": [
            "SEVEN_DAYS",
            "THIRTY_DAYS",
            "NINETY_DAYS"
          ]
        },
        "type": "array"
      },
      "description": "A map of service level objective object IDs to arrays of timeframes,\nwhich indicate the thresholds to delete for each ID.",
      "example": {
        "id1": [
          "7d",
          "30d"
        ],
        "id2": [
          "7d",
          "30d"
        ]
      },
      "type": "object"
    };
    const actual = bp.filterExampleJson('request', mockSchema);
    const expected = {"id1": ["7d", "30d"], "id2": ["7d", "30d"]};
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
    const actual = bp.filterExampleJson("request", mockSchema);
    const expected = [[{
      "duration": "integer",
      "error": "integer",
      "meta": {"<any-key>": "string"},
      "metrics": {"<any-key>": "number"},
      "name": "span_name",
      "parent_id": "integer",
      "resource": "/home",
      "service": "service_name",
      "span_id": 987654321,
      "start": "integer",
      "trace_id": 123456789,
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
    const actual = bp.filterExampleJson("request", mockSchema);
    const expected = {"error": {"code": "string", "details": [], "message": "string"}};
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
    const actual = bp.filterExampleJson("request", mockSchema);
    const expected =  {"data": [{"attributes": {"created": "2019-09-19T10:00:00.000Z","description": "string","display_name": "string","display_type": "string","group_name": "string","name": "string","restricted": false},"id": "string"}]};
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
    const actual = bp.filterExampleJson("request", mockSchema);
    const expected = {"data": {"id": "string"}};
    expect(actual).toEqual(expected);
  });

  it('should map example keys when array of objects', () => {
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

    const actual = bp.filterExampleJson("request", mockSchema);
    const expected = {"service_hooks": [{"account": "doghouse", "url": "https://hooks.slack.com/services/2/2/2"}]}
    expect(actual).toEqual(expected);
  });

  it('should show readonly fields on response json', () => {
    const mockSchema = {
      "description": "This is a test with readonly",
      "properties": {
        "message": {
          "description": "This is a read only field",
          "readOnly": true,
          "type": "string"
        },
        "metric": {
          "description": "This is explicitly not readonly",
          "readOnly": false,
          "type": "string"
        },
        "length": {
          "description": "This is implicitly by omission not readonly",
          "type": "string"
        }
      }
    }
    const actual = bp.filterExampleJson("response", mockSchema);
    const expected = {"message": "string", "metric": "string", "length": "string"};
    expect(actual).toEqual(expected);
  });

  it('should hide readonly fields on request json', () => {
    const mockSchema = {
      "description": "This is a test with readonly",
      "properties": {
        "message": {
          "description": "This is a read only field",
          "readOnly": true,
          "type": "string"
        },
        "metric": {
          "description": "This is explicitly not readonly",
          "readOnly": false,
          "type": "string"
        },
        "length": {
          "description": "This is implicitly by omission not readonly",
          "type": "string"
        }
      }
    };
    const actual = bp.filterExampleJson('request', mockSchema);
    const expected = {'metric':'string', 'length': 'string'};
    expect(actual).toEqual(expected);
  });

  it('should show boolean without quotes', () => {
    const mockSchema = {
      "description": "A dashboard is Datadog’s tool for visually tracking, analyzing, and displaying\nkey performance metrics, which enable you to monitor the health of your infrastructure.",
      "properties": {
        "is_read_only": {
          "default": false,
          "description": "Whether this dashboard is read-only. If True, only the author and admins can make changes to it.",
          "example": false,
          "type": "boolean"
        }
      }
    };
    const actual = bp.filterExampleJson('request', mockSchema);
    const expected = {'is_read_only': false};
    expect(actual).toEqual(expected);
  });

  it('should show array as []', () => {
    const mockSchema = {
      "description": "A dashboard is Datadog’s tool for visually tracking, analyzing, and displaying\nkey performance metrics, which enable you to monitor the health of your infrastructure.",
      "properties": {
        "notify_list": {
          "description": "List of handles of users to notify when changes are made to this dashboard.",
          "items": {
            "description": "User handles.",
            "type": "string"
          },
          "nullable": true,
          "type": "array"
        }
      }
    };
    const actual = bp.filterExampleJson('request', mockSchema);
    const expected = {'notify_list': []};
    expect(actual).toEqual(expected);
  });

  it('should show boolean false when no example boolean to show', () => {
    const mockSchema = {
      "description": "Embeddable graph.",
      "properties": {
        "revoked": {
          "description": "Boolean flag for whether or not the embed is revoked.",
          "type": "boolean"
        }
      },
      "type": "object"
    };
    const actual = bp.filterExampleJson('request', mockSchema);
    const expected = {"revoked": false};
    expect(actual).toEqual(expected);
  });

  it('should show required fields when curl', () => {
    const mockSchema = {
      "description": "The metrics' payload.",
      "properties": {
        "series": {
          "description": "A list of time series to submit to Datadog.",
          "items": {
            "description": "A metric to submit to Datadog.\nSee [Datadog metrics](https://docs.datadoghq.com/developers/metrics/#custom-metrics-properties).",
            "properties": {
              "host": {
                "description": "The name of the host that produced the metric.",
                "type": "string"
              },
              "interval": {
                "default": null,
                "description": "If the type of the metric is rate or count, define the corresponding interval.",
                "format": "int64",
                "nullable": true,
                "type": "integer"
              },
              "metric": {
                "description": "The name of the timeseries.",
                "example": "system.load.1",
                "type": "string"
              },
              "points": {
                "description": "Points relating to a metric.",
                "items": {
                  "description": "Array of timeseries points.",
                  "example": [
                    1575317847,
                    0.5
                  ],
                  "items": {
                    "description": "Each point is of the form `[POSIX_timestamp, numeric_value]`.\nThe timestamp should be in seconds and current.\nThe numeric value format should be a 32bit float gauge-type value.\nCurrent is defined as not more than 10 minutes in the future or more than 1 hour in the past.",
                    "format": "double",
                    "type": "number"
                  },
                  "maxItems": 2,
                  "minItems": 2,
                  "type": "array"
                },
                "type": "array"
              },
              "tags": {
                "description": "A list of tags associated with the metric.",
                "items": {
                  "description": "Individual tags.",
                  "type": "string"
                },
                "type": "array"
              },
              "type": {
                "default": "gauge",
                "description": "The type of the metric.",
                "type": "string"
              }
            },
            "required": [
              "metric",
              "points"
            ],
            "type": "object"
          },
          "type": "array"
        }
      },
      "type": "object"
    };
    const actual = bp.filterExampleJson('curl', mockSchema);
    const expected = {"series": [{"metric": "system.load.1", "points": [1575317847, 0.5]}]};
    expect(actual).toEqual(expected);
  });

  it('should show nested array when curl', () => {
    const mockSchema = {
      "description": "The metrics' payload.",
      "properties": {
        "series": {
          "description": "A list of time series to submit to Datadog.",
          "items": {
            "description": "A metric to submit to Datadog.\nSee [Datadog metrics](https://docs.datadoghq.com/developers/metrics/#custom-metrics-properties).",
            "properties": {
              "host": {
                "description": "The name of the host that produced the metric.",
                "example": "test.example.com",
                "type": "string"
              },
              "interval": {
                "default": null,
                "description": "If the type of the metric is rate or count, define the corresponding interval.",
                "example": 20,
                "format": "int64",
                "nullable": true,
                "type": "integer"
              },
              "metric": {
                "description": "The name of the timeseries.",
                "example": "system.load.1",
                "type": "string"
              },
              "points": {
                "description": "Points relating to a metric. All points must be tuples with timestamp and a scalar value (cannot be a string).",
                "example": [
                  [
                    1575317847,
                    0.5
                  ]
                ],
                "items": {
                  "description": "Array of timeseries points.",
                  "example": [
                    1575317847,
                    0.5
                  ],
                  "items": {
                    "description": "Each point is of the form `[POSIX_timestamp, numeric_value]`.\nThe timestamp should be in seconds and current.\nThe numeric value format should be a 32bit float gauge-type value.\nCurrent is defined as not more than 10 minutes in the future or more than 1 hour in the past.",
                    "format": "double",
                    "type": "number"
                  },
                  "maxItems": 2,
                  "minItems": 2,
                  "type": "array"
                },
                "type": "array"
              },
              "tags": {
                "description": "A list of tags associated with the metric.",
                "example": [
                  "environment:test"
                ],
                "items": {
                  "description": "Individual tags.",
                  "type": "string"
                },
                "type": "array"
              },
              "type": {
                "default": "gauge",
                "description": "The type of the metric.",
                "example": "rate",
                "type": "string"
              }
            },
            "required": [
              "metric",
              "points"
            ],
            "type": "object"
          },
          "type": "array"
        }
      },
      "type": "object"
    };
    const actual = bp.filterExampleJson('curl', mockSchema);
    const expected = {"series": [{"metric": "system.load.1", "points": [[1575317847, 0.5]]}]};
    expect(actual).toEqual(expected);
  });

  it('should show oneOf examples', () => {
    const mockSchema = {
      "description": "Structured log message.",
      "oneOf": [
        {
          "description": "Logs that are sent over HTTP.",
          "properties": {
            "ddsource": {
              "description": "The integration name associated with your log: the technology from which the log originated.\nWhen it matches an integration name, Datadog automatically installs the corresponding parsers and facets.\nSee [reserved attributes](https://docs.datadoghq.com/logs/log_collection/#reserved-attributes).",
              "example": "nginx",
              "type": "string"
            },
            "ddtags": {
              "description": "Tags associated with your logs.",
              "example": "env:staging,version:5.1",
              "type": "string"
            },
            "hostname": {
              "description": "The name of the originating host of the log.",
              "example": "i-012345678",
              "type": "string"
            },
            "message": {
              "description": "The message [reserved attribute](https://docs.datadoghq.com/logs/log_collection/#reserved-attributes)\nof your log. By default, Datadog ingests the value of the message attribute as the body of the log entry.\nThat value is then highlighted and displayed in the Logstream, where it is indexed for full text search.",
              "example": "2019-11-19T14:37:58,995 INFO [process.name][20081] Hello World",
              "type": "string"
            },
            "service": {
              "description": "The name of the application or service generating the log events.\nIt is used to switch from Logs to APM, so make sure you define the same value when you use both products.\nSee [reserved attributes](https://docs.datadoghq.com/logs/log_collection/#reserved-attributes).",
              "example": "payment",
              "type": "string"
            }
          },
          "required": [
            "name"
          ],
          "type": "object"
        },
        {
          "description": "List of log items.",
          "items": {
            "description": "Logs that are sent over HTTP.",
            "properties": {
              "ddsource": {
                "description": "The integration name associated with your log: the technology from which the log originated.\nWhen it matches an integration name, Datadog automatically installs the corresponding parsers and facets.\nSee [reserved attributes](https://docs.datadoghq.com/logs/log_collection/#reserved-attributes).",
                "example": "nginx",
                "type": "string"
              },
              "ddtags": {
                "description": "Tags associated with your logs.",
                "example": "env:staging,version:5.1",
                "type": "string"
              },
              "hostname": {
                "description": "The name of the originating host of the log.",
                "example": "i-012345678",
                "type": "string"
              },
              "message": {
                "description": "The message [reserved attribute](https://docs.datadoghq.com/logs/log_collection/#reserved-attributes)\nof your log. By default, Datadog ingests the value of the message attribute as the body of the log entry.\nThat value is then highlighted and displayed in the Logstream, where it is indexed for full text search.",
                "example": "2019-11-19T14:37:58,995 INFO [process.name][20081] Hello World",
                "type": "string"
              },
              "service": {
                "description": "The name of the application or service generating the log events.\nIt is used to switch from Logs to APM, so make sure you define the same value when you use both products.\nSee [reserved attributes](https://docs.datadoghq.com/logs/log_collection/#reserved-attributes).",
                "example": "payment",
                "type": "string"
              }
            },
            "required": [
              "name"
            ],
            "type": "object"
          },
          "type": "array"
        }
      ]
    };
    const actual = bp.filterExampleJson('request', mockSchema);
    const expected = {
      "ddsource": "nginx",
      "ddtags": "env:staging,version:5.1",
      "hostname": "i-012345678",
      "message": "2019-11-19T14:37:58,995 INFO [process.name][20081] Hello World",
      "service": "payment"
    };
    expect(actual).toEqual(expected);
  });

  xit('should show oneOf with definition', () => {
    const mockSchema = {
      "description": "A dashboard is Datadog’s tool for visually tracking, analyzing, and displaying\nkey performance metrics, which enable you to monitor the health of your infrastructure.",
      "properties": {
        "title": {
          "description": "Title of the dashboard.",
          "example": "",
          "type": "string"
        },
        "widgets": {
          "description": "List of widgets to display on the dashboard.",
          "example": [
            {
              "definition": {
                "requests": {
                  "fill": {
                    "q": "system.cpu.user"
                  }
                },
                "type": "hostmap"
              }
            }
          ],
          "items": {
            "description": "Information about widget.\n\nNote: The `layout` property is required for widgets in dashboards with `free` `layout_type` only.",
            "properties": {
              "definition": {
                "description": "[Definition of the widget](https://docs.datadoghq.com/dashboards/widgets/).",
                "oneOf": [
                  {
                    "description": "Alert graphs are timeseries graphs showing the current status of any monitor defined on your system.",
                    "properties": {
                      "alert_id": {
                        "description": "ID of the alert to use in the widget.",
                        "example": "",
                        "type": "string"
                      },
                      "type": {
                        "default": "alert_graph",
                        "description": "Type of the alert graph widget.",
                        "enum": [
                          "alert_graph"
                        ],
                        "example": "alert_graph",
                        "type": "string",
                        "x-enum-varnames": [
                          "ALERT_GRAPH"
                        ]
                      }
                    },
                    "required": [
                      "alert_id"
                    ],
                    "type": "object"
                  }
                ],
                "type": "object"
              },
              "id": {
                "description": "ID of the widget.",
                "format": "int64",
                "type": "integer"
              }
            },
            "type": "object"
          },
          "type": "array"
        }
      },
      "type": "object"
    };
    const actual = bp.filterExampleJson('request', mockSchema);
    const expected = {
      "title": "",
      "widgets": [
        {
          "definition": "",
          "id": "integer"
        }
      ]
    };
    expect(actual).toEqual(expected);
  });

  it('should show more oneOf examples', () => {
    const mockSchema = {
      "description": "Response object which includes a single metric's volume.",
      "properties": {
        "data": {
          "description": "Possible response objects for a metric's volume.",
          "oneOf": [
            {
              "description": "Object for a single metric's distinct volume.",
              "properties": {
                "attributes": {
                  "description": "Object containing the definition of a metric's distinct volume.",
                  "properties": {
                    "distinct_volume": {
                      "description": "Distinct volume for the given metric.",
                      "example": 10,
                      "format": "int64",
                      "type": "integer"
                    }
                  },
                  "type": "object"
                },
                "id": {
                  "description": "The metric name for this resource.",
                  "example": "test.metric.latency",
                  "type": "string"
                },
                "type": {
                  "default": "distinct_metric_volumes",
                  "description": "The metric distinct volume type.",
                  "enum": [
                    "distinct_metric_volumes"
                  ],
                  "example": "distinct_metric_volumes",
                  "type": "string",
                  "x-enum-varnames": [
                    "DISTINCT_METRIC_VOLUMES"
                  ]
                }
              },
              "type": "object"
            },
            {
              "description": "Object for a single metric's ingested and indexed volume.",
              "properties": {
                "attributes": {
                  "description": "Object containing the definition of a metric's ingested and indexed volume.",
                  "properties": {
                    "indexed_volume": {
                      "description": "Indexed volume for the given metric.",
                      "example": 10,
                      "format": "int64",
                      "type": "integer"
                    },
                    "ingested_volume": {
                      "description": "Ingested volume for the given metric.",
                      "example": 20,
                      "format": "int64",
                      "type": "integer"
                    }
                  },
                  "type": "object"
                },
                "id": {
                  "description": "The metric name for this resource.",
                  "example": "test.metric.latency",
                  "type": "string"
                },
                "type": {
                  "default": "metric_volumes",
                  "description": "The metric ingested and indexed volume type.",
                  "enum": [
                    "metric_volumes"
                  ],
                  "example": "metric_volumes",
                  "type": "string",
                  "x-enum-varnames": [
                    "METRIC_VOLUMES"
                  ]
                }
              },
              "type": "object"
            }
          ],
          "type": "object"
        }
      },
      "readOnly": true,
      "type": "object"
    };
    const actual = bp.filterExampleJson('request', mockSchema);
    const expected = {
      "data": {
        "attributes": {
          "distinct_volume": 10
        },
        "id": "test.metric.latency",
        "type": "distinct_metric_volumes"
      }
    };
    expect(actual).toEqual(expected);
  });

  it('should show more oneOf examples with items', () => {
    const mockSchema = {
      "description": "Response object that includes metrics and metric tag configurations.",
      "properties": {
        "data": {
          "description": "Array of metrics and metric tag configurations.",
          "items": {
            "description": "Object for a metrics and metric tag configurations.",
            "oneOf": [
              {
                "description": "Object for a single metric tag configuration.",
                "example": {
                  "id": "metric.foo.bar",
                  "type": "metric"
                },
                "properties": {
                  "id": {
                    "description": "The metric name for this resource.",
                    "example": "test.metric.latency",
                    "type": "string"
                  },
                  "type": {
                    "default": "metrics",
                    "description": "The metric resource type.",
                    "enum": [
                      "metrics"
                    ],
                    "example": "metrics",
                    "type": "string",
                    "x-enum-varnames": [
                      "METRICS"
                    ]
                  }
                },
                "type": "object"
              },
              {
                "description": "Object for a single metric tag configuration.",
                "example": {
                  "attributes": {
                    "created_at": "2020-03-31T09:48:37.463835Z",
                    "metric_type": "gauge",
                    "modified_at": "2020-04-31T09:48:37.463835Z",
                    "tags": [
                      "app",
                      "datacenter"
                    ]
                  },
                  "id": "http.request.latency",
                  "type": "manage_tags"
                },
                "properties": {
                  "attributes": {
                    "description": "Object containing the definition of a metric tag configuration attributes.",
                    "properties": {
                      "created_at": {
                        "description": "Timestamp when the tag configuration was created.",
                        "example": "2020-03-31T09:48:37.463835Z",
                        "format": "date-time",
                        "type": "string"
                      },
                      "include_percentiles": {
                        "description": "Toggle to turn on/off percentile aggregations for distribution metrics.\nOnly present when the `metric_type` is `distribution`.",
                        "example": true,
                        "type": "boolean"
                      },
                      "metric_type": {
                        "default": "gauge",
                        "description": "The metric's type.",
                        "enum": [
                          "gauge",
                          "count",
                          "distribution"
                        ],
                        "example": "count",
                        "type": "string",
                        "x-enum-varnames": [
                          "GAUGE",
                          "COUNT",
                          "DISTRIBUTION"
                        ]
                      },
                      "modified_at": {
                        "description": "Timestamp when the tag configuration was last modified.",
                        "example": "2020-03-31T09:48:37.463835Z",
                        "format": "date-time",
                        "type": "string"
                      },
                      "tags": {
                        "description": "List of tag keys on which to group.",
                        "example": [
                          "app",
                          "datacenter"
                        ],
                        "items": {
                          "description": "Tag keys to group by.",
                          "type": "string"
                        },
                        "type": "array"
                      }
                    },
                    "type": "object"
                  },
                  "id": {
                    "description": "The metric name for this resource.",
                    "example": "test.metric.latency",
                    "type": "string"
                  },
                  "type": {
                    "default": "manage_tags",
                    "description": "The metric tag configuration resource type.",
                    "enum": [
                      "manage_tags"
                    ],
                    "example": "manage_tags",
                    "type": "string",
                    "x-enum-varnames": [
                      "MANAGE_TAGS"
                    ]
                  }
                },
                "type": "object"
              }
            ],
            "type": "object"
          },
          "type": "array"
        }
      },
      "readOnly": true,
      "type": "object"
    };
    const actual = bp.filterExampleJson('request', mockSchema);
    const expected = {
      "data": [
        {
          "id": "test.metric.latency",
          "type": "metrics"
        }
      ]
    };
    expect(actual).toEqual(expected);
  })

  it('should work when example {}', () => {
    const mockSchema = {
      "description": "The steps used in a Synthetics multistep API test.",
      "properties": {
        "extractedValues": {
          "description": "Array of values to parse and save as variables from the response.",
          "items": {
            "description": "Parsing options for variables to extract.",
            "example": {},
            "properties": {
              "field": {
                "description": "When type is `http_header`, name of the header to use to extract the value.",
                "example": "content-type",
                "type": "string"
              },
              "name": {
                "description": "Name of the variable to extract.",
                "type": "string"
              },
              "parser": {
                "description": "Details of the parser to use for the global variable.",
                "example": {
                  "type": "regex",
                  "value": ".*"
                },
                "properties": {
                  "type": {
                    "description": "Type of parser for a Synthetics global variable from a synthetics test.",
                    "enum": [
                      "raw",
                      "json_path",
                      "regex",
                      "x_path"
                    ],
                    "example": "raw",
                    "type": "string",
                    "x-enum-varnames": [
                      "RAW",
                      "JSON_PATH",
                      "REGEX",
                      "X_PATH"
                    ]
                  },
                  "value": {
                    "description": "Regex or JSON path used for the parser. Not used with type `raw`.",
                    "type": "string"
                  }
                },
                "required": [
                  "type"
                ],
                "type": "object"
              },
              "type": {
                "description": "Property of the Synthetics Test Response to use for a Synthetics global variable.",
                "enum": [
                  "http_body",
                  "http_header"
                ],
                "example": "http_body",
                "type": "string",
                "x-enum-varnames": [
                  "HTTP_BODY",
                  "HTTP_HEADER"
                ]
              }
            },
            "type": "object"
          },
          "type": "array"
        },
        "name": {
          "description": "The name of the step.",
          "type": "string"
        }
      },
      "type": "object"
    };
    const actual = bp.filterExampleJson('request', mockSchema);
    const expected = {
      "extractedValues": [
        {
          "field": "content-type",
          "name": "string",
          "parser": {
            "type": "raw",
            "value": "string"
          },
          "type": "http_body"
        }
      ],
      "name": "string"
    };
    expect(actual).toEqual(expected);
  });

  it('should show oneOf examples with object', () => {
    const mockSchema = {
      "description": "The description of a notebook update request.",
      "properties": {
        "data": {
          "description": "The data for a notebook update request.",
          "properties": {
            "attributes": {
              "description": "The data attributes of a notebook.",
              "properties": {
                "cells": {
                  "description": "List of cells to display in the notebook.",
                  "example": [
                    {
                      "attributes": {
                        "definition": {
                          "text": "## Some test markdown\n\n```js\nvar x, y;\nx = 5;\ny = 6;\n```",
                          "type": "markdown"
                        }
                      },
                      "id": "bzbycoya",
                      "type": "notebook_cells"
                    },
                    {
                      "attributes": {
                        "definition": {
                          "requests": [
                            {
                              "display_type": "line",
                              "q": "avg:system.load.1{*}",
                              "style": {
                                "line_type": "solid",
                                "line_width": "normal",
                                "palette": "dog_classic"
                              }
                            }
                          ],
                          "show_legend": true,
                          "type": "timeseries",
                          "yaxis": {
                            "scale": "linear"
                          }
                        },
                        "graph_size": "m",
                        "split_by": {
                          "keys": [],
                          "tags": []
                        },
                        "time": null
                      },
                      "id": "9k6bc6xc",
                      "type": "notebook_cells"
                    }
                  ],
                  "items": {
                    "description": "Updating a notebook can either insert new cell(s) or update existing cell(s) by including the cell `id`.\nTo delete existing cell(s), simply omit it from the list of cells.",
                    "oneOf": [
                      {
                        "description": "The description of a notebook cell create request.",
                        "properties": {
                          "attributes": {
                            "description": "The attributes of a notebook cell in create cell request. Valid cell types are `markdown`, `timeseries`, `toplist`, `heatmap`, `distribution`,\n`log_stream`. [More information on each graph visualization type.](https://docs.datadoghq.com/dashboards/widgets/)",
                            "example": {
                              "definition": {
                                "requests": [
                                  {
                                    "display_type": "line",
                                    "q": "avg:system.load.1{*}",
                                    "style": {
                                      "line_type": "solid",
                                      "line_width": "normal",
                                      "palette": "dog_classic"
                                    }
                                  }
                                ],
                                "show_legend": true,
                                "type": "timeseries",
                                "yaxis": {
                                  "scale": "linear"
                                }
                              },
                              "graph_size": "m",
                              "split_by": {
                                "keys": [],
                                "tags": []
                              },
                              "time": null
                            },
                            "oneOf": [
                              {
                                "description": "The attributes of a notebook `markdown` cell.",
                                "properties": {
                                  "definition": {
                                    "description": "Text in a notebook is formatted with [Markdown](https://daringfireball.net/projects/markdown/), which enables the use of headings, subheadings, links, images, lists, and code blocks.",
                                    "properties": {
                                      "text": {
                                        "description": "The markdown content.",
                                        "example": "# Example Header \nexample content",
                                        "type": "string"
                                      },
                                      "type": {
                                        "default": "markdown",
                                        "description": "Type of the markdown cell.",
                                        "enum": [
                                          "markdown"
                                        ],
                                        "example": "markdown",
                                        "type": "string",
                                        "x-enum-varnames": [
                                          "MARKDOWN"
                                        ]
                                      }
                                    },
                                    "required": [
                                      "type",
                                      "text"
                                    ],
                                    "type": "object"
                                  }
                                },
                                "required": [
                                  "definition"
                                ],
                                "type": "object"
                              }
                            ]
                          }
                        }
                      }
                    ]
                  },
                  "type": "array"
                }
              },
              "type": "object"
            }
          },
          "type": "object"
        }
      },
      "type": "object"
    };
    const actual = bp.filterExampleJson('request', mockSchema);
    const expected = {
      "data": {
        "attributes": {
          "cells": [
            {
              "attributes": {
                "definition": {
                  "requests": [
                    {
                      "display_type": "line",
                      "q": "avg:system.load.1{*}",
                      "style": {
                        "line_type": "solid",
                        "line_width": "normal",
                        "palette": "dog_classic"
                      }
                    }
                  ],
                  "show_legend": true,
                  "type": "timeseries",
                  "yaxis": {
                    "scale": "linear"
                  }
                },
                "graph_size": "m",
                "split_by": {
                  "keys": [],
                  "tags": []
                },
                "time": null
              }
            }
          ]
        }
      }
    };
    expect(actual).toEqual(expected);
  });

  it('should map objects to one of examples ', () => {
    const mockSchema = {
      "description": "The description of a notebook response.",
      "properties": {
        "data": {
          "description": "The data for a notebook.",
          "properties": {
            "attributes": {
              "description": "The attributes of a notebook.",
              "properties": {
                "author": {
                  "description": "Attributes of user object returned by the API.",
                  "properties": {
                    "name": {
                      "description": "Name of the user.",
                      "nullable": true,
                      "type": "string"
                    }
                  },
                  "type": "object"
                },
                "cells": {
                  "description": "List of cells to display in the notebook.",
                  "example": [
                    {
                      "attributes": {
                        "definition": {
                          "text": "## Some test markdown\n\n```js\nvar x, y;\nx = 5;\ny = 6;\n```",
                          "type": "markdown"
                        }
                      },
                      "id": "bzbycoya",
                      "type": "notebook_cells"
                    },
                    {
                      "attributes": {
                        "definition": {
                          "requests": [
                            {
                              "display_type": "line",
                              "q": "avg:system.load.1{*}",
                              "style": {
                                "line_type": "solid",
                                "line_width": "normal",
                                "palette": "dog_classic"
                              }
                            }
                          ],
                          "show_legend": true,
                          "type": "timeseries",
                          "yaxis": {
                            "scale": "linear"
                          }
                        },
                        "graph_size": "m",
                        "split_by": {
                          "keys": [],
                          "tags": []
                        },
                        "time": null
                      },
                      "id": "9k6bc6xc",
                      "type": "notebook_cells"
                    }
                  ],
                  "items": {
                    "description": "The description of a notebook cell response.",
                    "properties": {
                      "attributes": {
                        "description": "The attributes of a notebook cell response. Valid cell types are `markdown`, `timeseries`, `toplist`, `heatmap`, `distribution`,\n`log_stream`. [More information on each graph visualization type.](https://docs.datadoghq.com/dashboards/widgets/)",
                        "oneOf": [
                          {
                            "description": "The attributes of a notebook `markdown` cell.",
                            "properties": {
                              "definition": {
                                "description": "Text in a notebook is formatted with [Markdown](https://daringfireball.net/projects/markdown/), which enables the use of headings, subheadings, links, images, lists, and code blocks.",
                                "properties": {
                                  "text": {
                                    "description": "The markdown content.",
                                    "example": "# Example Header \nexample content",
                                    "type": "string"
                                  },
                                  "type": {
                                    "default": "markdown",
                                    "description": "Type of the markdown cell.",
                                    "enum": [
                                      "markdown"
                                    ],
                                    "example": "markdown",
                                    "type": "string",
                                    "x-enum-varnames": [
                                      "MARKDOWN"
                                    ]
                                  }
                                },
                                "required": [
                                  "type",
                                  "text"
                                ],
                                "type": "object"
                              }
                            },
                            "required": [
                              "definition"
                            ],
                            "type": "object"
                          }
                        ],
                        "type": "object"
                      },
                      "id": {
                        "description": "Notebook cell ID.",
                        "example": "abcd1234",
                        "type": "string"
                      },
                      "type": {
                        "default": "notebook_cells",
                        "description": "Type of the Notebook Cell resource.",
                        "enum": [
                          "notebook_cells"
                        ],
                        "example": "notebook_cells",
                        "type": "string",
                        "x-enum-varnames": [
                          "NOTEBOOK_CELLS"
                        ]
                      }
                    },
                    "required": [
                      "id",
                      "type",
                      "attributes"
                    ],
                    "type": "object"
                  },
                  "type": "array"
                },
                "created": {
                  "description": "UTC time stamp for when the notebook was created.",
                  "example": "2021-02-24T23:14:15.173964+00:00",
                  "format": "date-time",
                  "readOnly": true,
                  "type": "string"
                },
                "metadata": {
                  "description": "Metadata associated with the notebook.",
                  "properties": {
                    "is_template": {
                      "default": false,
                      "description": "Whether or not the notebook is a template.",
                      "example": false,
                      "type": "boolean"
                    },
                    "take_snapshots": {
                      "default": false,
                      "description": "Whether or not the notebook takes snapshot image backups of the notebook's fixed-time graphs.",
                      "example": false,
                      "type": "boolean"
                    },
                    "type": {
                      "default": null,
                      "description": "Metadata type of the notebook.",
                      "enum": [
                        "postmortem",
                        "runbook",
                        "investigation",
                        "documentation",
                        "report"
                      ],
                      "example": "investigation",
                      "nullable": true,
                      "type": "string",
                      "x-enum-varnames": [
                        "POSTMORTEM",
                        "RUNBOOK",
                        "INVESTIGATION",
                        "DOCUMENTATION",
                        "REPORT"
                      ]
                    }
                  },
                  "type": "object"
                },
                "modified": {
                  "description": "UTC time stamp for when the notebook was last modified.",
                  "example": "2021-02-24T23:15:23.274966+00:00",
                  "format": "date-time",
                  "readOnly": true,
                  "type": "string"
                },
                "name": {
                  "description": "The name of the notebook.",
                  "example": "Example Notebook",
                  "maxLength": 80,
                  "minLength": 0,
                  "type": "string"
                },
                "status": {
                  "default": "published",
                  "description": "Publication status of the notebook. For now, always \"published\".",
                  "enum": [
                    "published"
                  ],
                  "example": "published",
                  "type": "string",
                  "x-enum-varnames": [
                    "PUBLISHED"
                  ]
                },
                "time": {
                  "description": "Notebook global timeframe.",
                  "oneOf": [
                    {
                      "description": "Relative timeframe.",
                      "example": {
                        "live_span": "1h"
                      },
                      "nullable": true,
                      "properties": {
                        "live_span": {
                          "description": "The available timeframes depend on the widget you are using.",
                          "enum": [
                            "1m",
                            "5m",
                            "10m",
                            "15m",
                            "30m",
                            "1h",
                            "4h",
                            "1d",
                            "2d",
                            "1w",
                            "1mo",
                            "3mo",
                            "6mo",
                            "1y",
                            "alert"
                          ],
                          "example": "5m",
                          "type": "string",
                          "x-enum-varnames": [
                            "PAST_ONE_MINUTE",
                            "PAST_FIVE_MINUTES",
                            "PAST_TEN_MINUTES",
                            "PAST_FIFTEEN_MINUTES",
                            "PAST_THIRTY_MINUTES",
                            "PAST_ONE_HOUR",
                            "PAST_FOUR_HOURS",
                            "PAST_ONE_DAY",
                            "PAST_TWO_DAYS",
                            "PAST_ONE_WEEK",
                            "PAST_ONE_MONTH",
                            "PAST_THREE_MONTHS",
                            "PAST_SIX_MONTHS",
                            "PAST_ONE_YEAR",
                            "ALERT"
                          ]
                        }
                      },
                      "required": [
                        "live_span"
                      ],
                      "type": "object"
                    },
                    {
                      "description": "Absolute timeframe.",
                      "example": {
                        "end": "2021-02-24T20:18:28+00:00",
                        "start": "2021-02-24T19:18:28+00:00"
                      },
                      "properties": {
                        "end": {
                          "description": "The end time.",
                          "example": "2021-02-24T20:18:28+00:00",
                          "format": "date-time",
                          "type": "string"
                        },
                        "live": {
                          "description": "Indicates whether the timeframe should be shifted to end at the current time.",
                          "type": "boolean"
                        },
                        "start": {
                          "description": "The start time.",
                          "example": "2021-02-24T19:18:28+00:00",
                          "format": "date-time",
                          "type": "string"
                        }
                      },
                      "required": [
                        "start",
                        "end"
                      ],
                      "type": "object"
                    }
                  ],
                  "type": "object"
                }
              },
              "required": [
                "cells",
                "time",
                "name"
              ],
              "type": "object"
            },
            "id": {
              "description": "Unique notebook ID, assigned when you create the notebook.",
              "example": 123456,
              "format": "int64",
              "readOnly": true,
              "type": "integer"
            },
            "type": {
              "default": "notebooks",
              "description": "Type of the Notebook resource.",
              "enum": [
                "notebooks"
              ],
              "example": "notebooks",
              "type": "string",
              "x-enum-varnames": [
                "NOTEBOOKS"
              ]
            }
          },
          "required": [
            "id",
            "type",
            "attributes"
          ],
          "type": "object"
        }
      },
      "type": "object"
    };
    const actual = bp.filterExampleJson('response', mockSchema);
    const expected = {
      "data": {
        "attributes": {
          "author": {
            "name": "string",
          },
          "cells": [
            {
              "attributes": {
                "definition": {
                  "requests": [
                    {
                      "display_type": "line",
                      "q": "avg:system.load.1{*}",
                      "style": {
                        "line_type": "solid",
                        "line_width": "normal",
                        "palette": "dog_classic"
                      }
                    }
                  ],
                  "show_legend": true,
                  "type": "timeseries",
                  "yaxis": {
                    "scale": "linear"
                  }
                },
                "graph_size": "m",
                "split_by": {
                  "keys": [],
                  "tags": []
                },
                "time": null
              },
              "id": "abcd1234",
              "type": "notebook_cells"
            }
          ],
          "created": "2021-02-24T23:14:15.173964+00:00",
          "metadata": {
            "is_template": false,
            "take_snapshots": false,
            "type": "investigation"
          },
          "modified": "2021-02-24T23:15:23.274966+00:00",
          "name": "Example Notebook",
          "status": "published",
          "time": {
            "live_span": "5m"
          }
        },
        "id": 123456,
        "type": "notebooks"
      }
    };
    expect(actual).toEqual(expected);
  })

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

  const anykeyMarkup = "&lt;any&#45;key&gt;";
  const anykeyResult = `
    <div class="col-4 column">
      <p class="key">${anykeyMarkup}</p>
    </div>
  `;

  const emptyResult = `
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

  const emptyMarkdown = '<div class="col-6 column"></div>';

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

  it('should handle fields named required (properties->required)', () => {
    /*
    Required fields are usually an array of string e.g ['foo'.'bar']
    If a field is named required then the logic should recognise this is a field object and not the array to check against
    */
    const mockData = {
      "description": "A customized field defined by users and attached to a certain object type (incidents, etc).",
      "properties": {
        "id": {
          "type": "string",
          "example": "a91169ea3eb950dd85cc2a58c5a2d2c6",
          "description": "The field's ID."
        },
        "attributes": {
          "type": "object",
          "description": "The field's attributes.",
          "properties": {
            "name": {
              "type": "string",
              "example": "state",
              "description": "Name of the field."
            },
            "required": {
              "type": "boolean",
              "description": "If true, this field is required to create an object of the field's assigned `table_id` type.",
              "default": false
            },
            "created_by_user": {
              "description": "JSON API relationship for users.",
              "properties": {
                "data": {
                  "description": "The User relationship data.",
                  "properties": {
                    "id": {
                      "description": "A unique identifier that represents the user.",
                      "example": "00000000-0000-0000-0000-000000000000",
                      "type": "string"
                    },
                    "type": {
                      "default": "users",
                      "description": "Users resource type.",
                      "enum": [
                        "users"
                      ],
                      "type": "string",
                      "x-enum-varnames": [
                        "USERS"
                      ]
                    }
                  },
                  "type": "object"
                }
              },
              "type": "object"
            }
          }
        }
      },
      "required": [
        "id",
        "type"
      ],
      "type": "object"
    };
    const mockInitialData = mockData.properties;
    const t = () => {
      bp.rowRecursive("request", mockInitialData, false, mockInitialData.required || []);
    };
    expect(t).not.toThrow(Error);

  });

});

describe(`schemaTable`, () => {

  xit('should return html table wrapping rows recursively generated', () => {

    // spyOn(build, 'rowRecursive').and.returnValue('FooBar');
    // const spy = jest.spyOn(build, 'rowRecursive').mockImplementation(() => 'FooBar');
    // const spy = jest.spyOn(bp, 'rowRecursive').mockImplementation(jest.fn());

    const actual = bp.schemaTable({});
    const expected = `
  <div class=" schema-table row">
    <p class="expand-all js-expand-all text-primary text-end">Expand All</p>
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
    <p class="expand-all js-expand-all text-primary text-end">Expand All</p>
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
