---
aliases:
- /ja/security_platform/cspm/custom_rules/gcp_iam_service_account_key
kind: documentation
title: gcp_iam_service_account_key
---

## `ancestors`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `disabled`
**タイプ**: `BOOLEAN`<br>
    **説明**: 暗号鍵のステータス。<br>
    **GCP 名**: `disabled`<br>
## `gcp_iam_service_account_key: FOREIGN_KEY`
**暗号鍵の発行対象**: `gcp_iam_service_account`

## `key_algorithm`
**タイプ**: `STRING`<br>
    **説明**: 暗号鍵で使用するアルゴリズム (および場合によっては鍵のサイズ) を指定します。 <br>
    **GCP 名**: `keyAlgorithm`<br>
        **可能な値**:<br>
  - `KEY_ALG_UNSPECIFIED` - 暗号鍵のアルゴリズムの指定なし。<br>
  - `KEY_ALG_RSA_1024` - 1k の RSA 暗号鍵。<br>
  - `KEY_ALG_RSA_2048` - 2k の RSA 暗号鍵。<br>
## `key_origin`
**タイプ**: `STRING`<br>
    **説明**: 暗号鍵の提供元。 <br>
    **GCP 名**: `keyOrigin`<br>
        **可能な値**:<br>
  - `ORIGIN_UNSPECIFIED` - 暗号鍵の提供元の指定なし。<br>
  - `USER_PROVIDED` - 暗号鍵をユーザーが提供。<br>
  - `GOOGLE_PROVIDED` - 暗号鍵を Google が提供。<br>
## `key_type`
**タイプ**: `STRING`<br>
    **説明**: 鍵の種類。<br>
    **GCP 名**: `keyType`<br>
        **可能な値**:<br>
  - `KEY_TYPE_UNSPECIFIED` - 暗号鍵の種類の指定なし。メッセージにこの値が設定されている場合、直ちにエラーになります。<br>
  - `USER_MANAGED` - ユーザー管理型の暗号鍵 (管理とローテーションをユーザーが行う)。<br>
  - `SYSTEM_MANAGED` - システム管理型の暗号鍵 (管理とローテーションを Google が行う)。<br>

## `labels`
**タイプ**: `UNORDERED_LIST_STRING`<br>

## `name`
**タイプ**: `STRING`<br>
    **説明**: サービスアカウントキーのリソース名を次の形式で指定します: `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}/keys/{key}`<br>
    **GCP 名**: `name`<br>
## `organization_id`
**タイプ**: `STRING`<br>
## `parent`
**タイプ**: `STRING`<br>
## `private_key_type`
**タイプ**: `STRING`<br>
    **説明**: 秘密鍵の出力形式。`CreateServiceAccountKey` に対する応答でのみ提供され、`GetServiceAccountKey` や `ListServiceAccountKey` に対する応答では提供されません。Google がシステム管理型の秘密鍵を公開したり、ユーザー管理型の秘密鍵を保管したりすることは絶対にありません。 <br>
    **GCP 名**: `privateKeyType`<br>
        **可能な値**:<br>
  - `TYPE_UNSPECIFIED` - 不明。`TYPE_GOOGLE_CREDENTIALS_FILE` と同義。<br>
  - `TYPE_PKCS12_FILE` - PKCS12 形式。PKCS12 ファイルのパスワードは `notasecret` です。詳しくは、[RFC 7292][1] をご覧ください。<br>
  - `TYPE_GOOGLE_CREDENTIALS_FILE` - Google 認証情報ファイルの形式。<br>
## `project_id`
**タイプ**: `STRING`<br>
## `project_number`
**タイプ**: `STRING`<br>
## `resource_name`
**タイプ**: `STRING`<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `valid_after_time`
**タイプ**: `TIMESTAMP`<br>
    **説明**: 暗号鍵は、このタイムスタンプの日時が到来した後に使用できます。<br>
    **GCP 名**: `validAfterTime`<br>
## `valid_before_time`
**タイプ**: `TIMESTAMP`<br>
    **説明**: 暗号鍵は、このタイムスタンプの日時が到来するまで使用できます。システム管理型の鍵ペアの場合、この日時が秘密鍵によって署名できる最終日時となります。公開鍵は、この日時を過ぎても数時間は認証に使用できます。<br>
    **GCP 名**: `validBeforeTime`<br>


[1]: https://tools.ietf.org/html/rfc7292