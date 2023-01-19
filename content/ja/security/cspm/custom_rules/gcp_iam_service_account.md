---
aliases:
- /ja/security_platform/cspm/custom_rules/gcp_iam_service_account
kind: documentation
title: gcp_iam_service_account
---

## `ancestors`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `description`
**タイプ**: `STRING`<br>
    **説明**: オプション。ユーザーによるサービスアカウントのわかりやすい説明。最大長は、UTF-8 で 256 バイト。<br>
    **GCP 名**: `description`<br>
## `disabled`
**タイプ**: `BOOLEAN`<br>
    **説明**: 出力のみ。サービスアカウントが無効になっているかどうか。<br>
    **GCP 名**: `disabled`<br>
## `email`
**タイプ**: `STRING`<br>
    **説明**: 出力のみ。サービスアカウントのメールアドレス。<br>
    **GCP 名**: `email`<br>
## `gcp_display_name`
**タイプ**: `STRING`<br>
    **説明**: オプション。ユーザーが指定するサービスアカウントのわかりやすい名前。最大長は、UTF-8 で 100 バイト。<br>
    **GCP 名**: `displayName`<br>
## `labels`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `name`
**タイプ**: `STRING`<br>
**説明**: サービスアカウントのリソース名。次のいずれかの形式を使用します。
- `projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}` 
- `projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}` <br>
あるいは、プロジェクト ID の代わりにワイルドカード文字の "-" を使用することもできます。
- `projects/-/serviceAccounts/{EMAIL_ADDRESS}` 
- `projects/-/serviceAccounts/{UNIQUE_ID}` <br>
可能な限り、ワイルドカード文字 `-` の使用は避けてください。これは、レスポンスメッセージに誤解を招くようなエラーコードを含ませてしまう可能性があるからです。例えば、存在しないサービスアカウント `projects/-/serviceAccounts/fake@example.com` を取得しようとした場合、レスポンスには `404 Not Found` エラーではなく、HTTP `403 Forbidden` エラーが含まれます。
    **GCP 名**: `name`<br>
## `oauth2_client_id`
**タイプ**: `STRING`<br>
    **説明**: 出力のみ。このサービスアカウント用の OAuth 2.0 クライアント ID。<br>
    **GCP 名**: `oauth2ClientId`<br>
## `organization_id`
**タイプ**: `STRING`<br>
## `parent`
**タイプ**: `STRING`<br>
## `project_id`
**タイプ**: `STRING`<br>
## `project_number`
**タイプ**: `STRING`<br>
## `resource_name`
**タイプ**: `STRING`<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `unique_id`
**タイプ**: `STRING`<br>
    **説明**: 出力のみ。サービスアカウントの一意の固定 ID (数字で構成)。各サービスアカウントは、たとえユーザーがそのサービスアカウントを削除したとしても、一意の ID を保持したままとなります。たとえば、ユーザーがサービスアカウントを削除し、同じ名前で新規のサービスアカウントを作成した場合、新規のサービスアカウントには、削除されたサービスアカウントとは異なる一意の ID が付与されます。<br>
    **GCP 名**: `uniqueId`<br>