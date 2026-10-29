<!-- schema-map-of-oneOf: /api/latest/rendering-shapes/upsert-rows/ -->

| Parent field         | Field               | Type     | Description                                                                                                               |
| -------------------- | ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| attributes           | values [*required*] | object   | Key-value pairs representing row data, where keys are schema field names and values match the corresponding column types. |
| additionalProperties | <any-key>           | <oneOf>  | Types allowed for Reference Table row values.                                                                             |
| <any-key>            | Object 1            | string   |                                                                                                                           |
| <any-key>            | Object 2            | int32    |                                                                                                                           |
