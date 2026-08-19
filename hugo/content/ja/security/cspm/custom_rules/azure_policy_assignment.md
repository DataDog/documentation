---
dependencies: []
disable_edit: true
---
# azure_policy_assignment

## `description`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.description`<br>
**説明**: このメッセージは、ポリシー違反があった場合のレスポンスの一部となります。<br>
## `display_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.displayName`<br>
**説明**: ポリシーの割り当ての表示名。<br>
## `enforcement_mode`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.enforcementMode`<br>
**説明**: ポリシー割り当ての強制モード。設定可能な値は、Default および DoNotEnforce です。<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `id`<br>
**説明**: ポリシー割り当ての ID。<br>
## `identity`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `identity`<br>
**説明**: ポリシー割り当てに関連付けられたマネージドアイデンティティ。<br>
   - `principal_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `principalId`<br>
    **説明**: リソースアイデンティティのプリンシパル ID。<br>
   - `tenant_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `tenantId`<br>
    **説明**: リソースアイデンティティのテナント ID。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: アイデンティティタイプ。システムに割り当てられた ID をリソースに追加する場合、このフィールドだけが必須となります。<br>
## `location`
**タイプ**: `STRING`<br>
**プロバイダー名**: `location`<br>
**説明**: ポリシーの割り当て場所。マネージドアイデンティティを利用する場合のみ必要です。<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**説明**: ポリシー割り当ての名前。<br>
## `not_scopes`
**タイプ**: `UNORDERED_LIST_STRING`<br>
**プロバイダー名**: `properties.notScopes`<br>
**説明**: ポリシーの除外スコープ。<br>
## `parameters`
**タイプ**: `MAP_STRING_STRING`<br>
**プロバイダー名**: `properties.parameters`<br>
**説明**: 割り当てられたポリシールールのパラメーター値。キーはパラメーター名です。<br>
## `policy_definition_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.policyDefinitionId`<br>
**説明**: 割り当てられるポリシー定義またはポリシーセット定義の ID。<br>
## `resource_group`
**タイプ**: `STRING`<br>
## `scope`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.scope`<br>
**説明**: ポリシーの割り当てのスコープ。<br>
## `subscription_id`
**タイプ**: `STRING`<br>
## `subscription_name`
**タイプ**: `STRING`<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `type`<br>
**説明**: ポリシー割り当てのタイプ。<br>