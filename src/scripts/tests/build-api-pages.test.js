import * as bp from '../build-api-pages';

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
});

describe(`filterExampleJson`, () => {


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
  `;

  it('should say <any-key> when parentkey additionProperties', () => {
    const actual = bp.fieldColumn("", "", "", "", "additionalProperties");
    const expected = anykeyResult;
    expect(actual).toEqual(expected);
  });

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
    const actual = bp.descColumn(obj);
    const expected = emptyMarkdown;
    expect(actual).toEqual(expected);
  });

  it('should return format markdown', () => {
    const obj = {description: "# test"};
    const actual = bp.descColumn(obj);
    const expected = '<div class="col-6 column"><h1 id="test">test</h1></div>';
    expect(actual).toEqual(expected);
  });

});

describe(`rowRecursive`, () => {


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

});

describe(`buildResources`, () => {


});
