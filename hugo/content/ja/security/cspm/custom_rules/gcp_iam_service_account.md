---
dependencies: []
disable_edit: true
---
# gcp_iam_service_account

## `ancestors`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `description`
**タイプ**: `STRING`<br>
**プロバイダー名**: `description`<br>
**説明**: オプション。サービスアカウントに関するユーザーが指定した、人間が読める説明です。最大長は 256 UTF-8 バイトです。<br>
## `disabled`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `disabled`<br>
**説明**: 出力のみ。サービスアカウントが無効になっているかどうか。<br>
## `email`
**タイプ**: `STRING`<br>
**プロバイダー名**: `email`<br>
**説明**: 出力のみ。サービスアカウントのメールアドレスです。<br>
## `gcp_display_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `displayName`<br>
**説明**: オプション。サービスアカウントに関するユーザーが指定した、人間が読める名前です。最大長は 100 UTF-8 バイトです。<br>
## `labels`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**説明**: サービスアカウントのリソース名。以下のいずれかの形式を使用します。 <ul> <li>`projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS}`</li>  <li>`projects/{PROJECT_ID}/serviceAccounts/{UNIQUE_ID}`</li></ul> <p>また、プロジェクト ID の代わりに `-` ワイルドカード文字を使用することもできます。<ul> <li> `projects/-/serviceAccounts/{EMAIL_ADDRESS}`</li> <li>`projects/-/serviceAccounts/{UNIQUE_ID}`</li></ul> <p>可能な限り、ワイルドカード文字 `-` の使用は避けてください。これは、レスポンスメッセージに誤解を招くようなエラーコードを含ませてしまう可能性があるからです。例えば、存在しないサービスアカウント `projects/-/serviceAccounts/fake@example.com` を取得しようとした場合、レスポンスには `404 Not Found` エラーではなく、HTTP `403 Forbidden` エラーが含まれます。</p>
## `oauth2_client_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `oauth2ClientId`<br>
**説明**: 出力のみ。サービスアカウントの OAuth 2.0 クライアント ID です。<br>
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
**プロバイダー名**: `uniqueId`<br>
**説明**: 出力のみ。サービスアカウントの一意の固定 ID (数字で構成)。各サービスアカウントは、たとえユーザーがそのサービスアカウントを削除したとしても、一意の ID を保持したままとなります。たとえば、ユーザーがサービスアカウントを削除し、同じ名前で新規のサービスアカウントを作成した場合、新規のサービスアカウントには、削除されたサービスアカウントとは異なる一意の ID が付与されます。<br>