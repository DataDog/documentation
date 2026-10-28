<!-- param-type: /api/latest/rendering-shapes/get-all-access-tokens/ -->

### Arguments

#### Query Strings

| Field            | Type    | Description                                                                                       |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------- |
| page[size]       | integer | Number of items to return per page. The maximum allowed value is 100. Default: `10`.              |
| filter           | string  | Filter access tokens by the specified string.                                                     |
| filter[owned_by] | array   | Filter access tokens by the owner's ID. Supports multiple values.                                 |
| filter[leaked]   | boolean | When true, only return access tokens that have been detected as leaked. Has no effect when false. |
