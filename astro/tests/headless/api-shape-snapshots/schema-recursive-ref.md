<!-- schema-recursive-ref: /api/latest/rendering-shapes/get-ast-for-source-code/ -->

### Response

{% tabs %}
{% tab label="200" %}
OK

{% tabs %}
{% tab label="Model" %}
The response payload containing the parsed abstract syntax tree.

| Parent field | Field                   | Type     | Description                                                                                            |
| ------------ | ----------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
|              | data [*required*]       | object   | The primary data object in the get-AST response.                                                       |
| data         | attributes [*required*] | object   | The attributes of the get-AST response, containing the parsed abstract syntax tree.                    |
| attributes   | result [*required*]     | object   | The root node of the parsed abstract syntax tree, or null when the source code could not be parsed.    |
| result       | ast_type [*required*]   | string   | The tree-sitter node type of this AST node.                                                            |
| result       | children [*required*]   | [object] | The child nodes of this AST node, or null for a leaf node.                                             |
| result       | end [*required*]        | object   | A position in source code, identified by line and column numbers.                                      |
| end          | col [*required*]        | int64    | The column number in the source file (1-based).                                                        |
| end          | line [*required*]       | int64    | The line number in the source file (1-based).                                                          |
| result       | field_name              | string   | The name of the field this node occupies within its parent node, when the parent addresses it by name. |
| result       | start [*required*]      | object   | A position in source code, identified by line and column numbers.                                      |
| start        | col [*required*]        | int64    | The column number in the source file (1-based).                                                        |
| start        | line [*required*]       | int64    | The line number in the source file (1-based).                                                          |
{% /tab %}

{% tab label="Example" %}
```json
{
  "data": {
    "attributes": {
      "result": {
        "ast_type": "module",
        "children": [],
        "end": {
          "col": 5,
          "line": 10
        },
        "field_name": "string",
        "start": {
          "col": 5,
          "line": 10
        }
      }
    }
  }
}
```
{% /tab %}
{% /tabs %}
{% /tab %}
{% /tabs %}
