<!-- schema-nested-object: /api/latest/rendering-shapes/create-a-datadog-gcp-principal/ -->

| Parent field | Field                  | Type   | Description                                                                                |
| ------------ | ---------------------- | ------ | ------------------------------------------------------------------------------------------ |
|              | data                   | object | Datadog principal service account info.                                                    |
| data         | attributes             | object | Your delegate account attributes.                                                          |
| attributes   | delegate_account_email | string | Your organization's Datadog principal email address.                                       |
| data         | id                     | string | The ID of the delegate service account.                                                    |
| data         | type                   | enum   | The type of account. Allowed enum values: `gcp_sts_delegate`. Default: `gcp_sts_delegate`. |
