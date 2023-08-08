---
dependencies: []
disable_edit: true
---
# gcp_iam_service_account_key

## `ancestors`
**Type**: `UNORDERED_LIST_STRING`<br>
## `disabled`
**Type**: `BOOLEAN`<br>
**Provider name**: `disabled`<br>
**Description**: The key status.<br>
## `key_algorithm`
**Type**: `STRING`<br>
**Provider name**: `keyAlgorithm`<br>
**Description**: Specifies the algorithm (and possibly key size) for the key. <br>
**Possible values**:<br>
  - `KEY_ALG_UNSPECIFIED` - An unspecified key algorithm.<br>
  - `KEY_ALG_RSA_1024` - 1k RSA Key.<br>
  - `KEY_ALG_RSA_2048` - 2k RSA Key.<br>
## `key_origin`
**Type**: `STRING`<br>
**Provider name**: `keyOrigin`<br>
**Description**: The key origin. <br>
**Possible values**:<br>
  - `ORIGIN_UNSPECIFIED` - Unspecified key origin.<br>
  - `USER_PROVIDED` - Key is provided by user.<br>
  - `GOOGLE_PROVIDED` - Key is provided by Google.<br>
## `key_type`
**Type**: `STRING`<br>
**Provider name**: `keyType`<br>
**Description**: The key type. <br>
**Possible values**:<br>
  - `KEY_TYPE_UNSPECIFIED` - Unspecified key type. The presence of this in the message will immediately result in an error.<br>
  - `USER_MANAGED` - User-managed keys (managed and rotated by the user).<br>
  - `SYSTEM_MANAGED` - System-managed keys (managed and rotated by Google).<br>
## `labels`
**Type**: `UNORDERED_LIST_STRING`<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: The resource name of the service account key in the following format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}/keys/{key}`.<br>
## `organization_id`
**Type**: `STRING`<br>
## `parent`
**Type**: `STRING`<br>
## `private_key_type`
**Type**: `STRING`<br>
**Provider name**: `privateKeyType`<br>
**Description**: The output format for the private key. Only provided in `CreateServiceAccountKey` responses, not in `GetServiceAccountKey` or `ListServiceAccountKey` responses. Google never exposes system-managed private keys, and never retains user-managed private keys. <br>
**Possible values**:<br>
  - `TYPE_UNSPECIFIED` - Unspecified. Equivalent to `TYPE_GOOGLE_CREDENTIALS_FILE`.<br>
  - `TYPE_PKCS12_FILE` - PKCS12 format. The password for the PKCS12 file is `notasecret`. For more information, see https://tools.ietf.org/html/rfc7292.<br>
  - `TYPE_GOOGLE_CREDENTIALS_FILE` - Google Credentials File format.<br>
## `project_id`
**Type**: `STRING`<br>
## `project_number`
**Type**: `STRING`<br>
## `resource_name`
**Type**: `STRING`<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `valid_after_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `validAfterTime`<br>
**Description**: The key can be used after this timestamp.<br>
## `valid_before_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `validBeforeTime`<br>
**Description**: The key can be used before this timestamp. For system-managed key pairs, this timestamp is the end time for the private key signing operation. The public key could still be used for verification for a few hours after this time.<br>
