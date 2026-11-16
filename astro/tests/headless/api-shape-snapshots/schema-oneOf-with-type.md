<!-- schema-oneOf-with-type: /api/latest/rendering-shapes/list-agent-observability-dataset-records/ -->

| Parent field | Field              | Type           | Description                                           |
| ------------ | ------------------ | -------------- | ----------------------------------------------------- |
| data         | input [*required*] | object <oneOf> | Represents any valid JSON value.                      |
| input        | Object 1           | string         | A scalar value represented as a string.               |
| input        | Object 2           | double         | A scalar numeric value.                               |
| input        | Object 3           | object         | An arbitrary object value with additional properties. |
| input        | Object 4           | [<oneOf>]      | An array of arbitrary values.                         |
| Object 4     | Object 1           | string         | A scalar value represented as a string.               |
| Object 4     | Object 2           | double         | A scalar numeric value.                               |
| Object 4     | Object 3           | object         | An arbitrary object value with additional properties. |
| Object 4     | Object 4           | boolean        | A scalar boolean value.                               |
| input        | Object 5           | boolean        | A scalar boolean value.                               |
