<!-- schema-array-of-oneOf: /api/latest/rendering-shapes/get-a-restriction-query/ -->

| Parent field | Field                   | Type      | Description                                                 |
| ------------ | ----------------------- | --------- | ----------------------------------------------------------- |
|              | included                | [<oneOf>] | Array of objects related to the restriction query.          |
| included     | <type=roles>            | object    | Partial role object.                                        |
| <type=roles> | attributes [*required*] | object    | Attributes of the role for a restriction query.             |
| attributes   | name                    | string    | The role name.                                              |
| <type=roles> | id [*required*]         | string    | ID of the role.                                             |
| <type=roles> | type [*required*]       | enum      | Roles type. Allowed enum values: `roles`. Default: `roles`. |
