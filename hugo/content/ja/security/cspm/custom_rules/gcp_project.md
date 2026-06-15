---
dependencies: []
disable_edit: true
---
# gcp_project

## `ancestors`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `create_time`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `createTime`<br>
**説明**: 出力のみ。作成時間。<br>
## `delete_time`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `deleteTime`<br>
**説明**: 出力のみ。このリソースの削除がリクエストされた時間。<br>
## `etag`
**タイプ**: `STRING`<br>
**プロバイダー名**: `etag`<br>
**説明**: 出力のみ。プロジェクトリソースの現在値に基づきサーバーが計算したチェックサム。処理を進める前にクライアントが最新の値を持っていることを確認するために、更新および削除のリクエストで送信される場合があります。<br>
## `gcp_display_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `displayName`<br>
**説明**: オプション。ユーザーが割り当てたプロジェクトの表示名。使用する場合は、4 ～ 30 文字でなければなりません。使用できる文字は、小文字と大文字、数字、ハイフン、単一引用符、二重引用符、スペース、感嘆符です。例: `My Project`<br>
## `labels`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**説明**: 出力のみ。プロジェクトの一意のリソース名。自動生成された int64 型の数字に、プレフィックス "projects/" が付きます。例: `projects/415104041262`<br>
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
## `state`
**タイプ**: `STRING`<br>
**プロバイダー名**: `state`<br>
**説明**: 出力のみ。プロジェクトのライフサイクルの状態。 <br>
**可能な値**:<br>
  - `STATE_UNSPECIFIED` - 未指定の状態。未設定の値を区別するためにのみ使用されます。またはその目的でのみ有用です。<br>
  - `ACTIVE` - 通常のアクティブな状態。<br>
  - `DELETE_REQUESTED` - プロジェクトがユーザー (DeleteProject の呼び出し) またはシステム (Google Cloud Platform) により削除対象に指定された状態。これは通常、UndeleteProject を呼び出すことで取り消すことができます。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `update_time`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `updateTime`<br>
**説明**: 出力のみ。このリソースが最後に変更された時間。<br>