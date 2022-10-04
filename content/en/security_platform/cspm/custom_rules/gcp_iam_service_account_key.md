---
title: gcp_iam_service_account_key
kind: documentation
---

## `ancestors`
**Type**: `UNORDERED_LIST_STRING`<br>
## `disabled`
**Type**: `BOOLEAN`<br>
    **Description**: The key status.<br>
    **GCP name**: `disabled`<br>
- #### gcp_iam_service_account_key: FOREIGN_KEY

  _Key to: gcp_iam_service_account_
## `key_algorithm`
**Type**: `STRING`<br>
    **Description**: Specifies the algorithm (and possibly key size) for the key. <br>
    **GCP name**: `keyAlgorithm`<br>
        **Possible values**:<br>
  - `KEY_ALG_UNSPECIFIED` - An unspecified key algorithm.<br>
  - `KEY_ALG_RSA_1024` - 1k RSA Key.<br>
  - `KEY_ALG_RSA_2048` - 2k RSA Key.<br>
## `key_origin`
**Type**: `STRING`<br>
    **Description**: The key origin. <br>
    **GCP name**: `keyOrigin`<br>
        **Possible values**:<br>
  - `ORIGIN_UNSPECIFIED` - Unspecified key origin.<br>
  - `USER_PROVIDED` - Key is provided by user.<br>
  - `GOOGLE_PROVIDED` - Key is provided by Google.<br>
## `key_type`
**Type**: `STRING`<br>
    **Description**: The key type. <br>
    **GCP name**: `keyType`<br>
        **Possible values**:<br>
  - `KEY_TYPE_UNSPECIFIED` - Unspecified key type. The presence of this in the message will immediately result in an error.<br>
  - `USER_MANAGED` - User-managed keys (managed and rotated by the user).<br>
  - `SYSTEM_MANAGED` - System-managed keys (managed and rotated by Google).<br>
## `labels`
**Type**: `UNORDERED_LIST_STRING`<br>
## `name`
**Type**: `STRING`<br>
    **Description**: The resource name of the service account key in the following format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}/keys/{key}`.<br>
    **GCP name**: `name`<br>
## `organization_id`
**Type**: `STRING`<br>
## `parent`
**Type**: `STRING`<br>
## `private_key_type`
**Type**: `STRING`<br>
    **Description**: The output format for the private key. Only provided in `CreateServiceAccountKey` responses, not in `GetServiceAccountKey` or `ListServiceAccountKey` responses. Google never exposes system-managed private keys, and never retains user-managed private keys. <br>
    **GCP name**: `privateKeyType`<br>
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
    **Description**: The key can be used after this timestamp.<br>
    **GCP name**: `validAfterTime`<br>
## `valid_before_time`
**Type**: `TIMESTAMP`<br>
    **Description**: The key can be used before this timestamp. For system-managed key pairs, this timestamp is the end time for the private key signing operation. The public key could still be used for verification for a few hours after this time.<br>
    **GCP name**: `validBeforeTime`<br>
