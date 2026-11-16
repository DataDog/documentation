<!-- param-enum: /api/latest/rendering-shapes/delete-a-rum-retention-quota-configuration/ -->

### Arguments

#### Path Parameters

| Field                   | Type   | Description                                                                                                                                                                 |
| ----------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| scope_type [*required*] | enum   | The type of scope the retention quota configuration applies to. `application` is the only supported scope type. Allowed enum values: `application`. Default: `application`. |
| scope_id [*required*]   | string | The identifier of the scope the retention quota configuration applies to. For the `application` scope, this is the RUM application ID.                                      |
