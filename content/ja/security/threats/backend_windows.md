---
description: CSM Threats Windows バックエンドイベントの JSON スキーマドキュメント
disable_edit: true
title: CSM Threats Windows イベント形式
---
<!-- https://github.com/DataDog/datadog-agent から取得 --> 


<!-- このファイルは自動生成されています。scripts/templates フォルダーにあるファイルを編集してください -->

Windows 向けの CSM Threats イベントには、以下の JSON スキーマがあります:


{{< code-block lang="json" collapsible="true" filename="BACKEND_EVENT_JSON_SCHEMA" >}}
{
"$id": "https://github.com/DataDog/datadog-agent/tree/main/pkg/security/serializers",
"$defs": {
"AgentContext": {
"properties": {
"rule_id": {
"type": "string"
},
"rule_version": {
"type": "string"
},
"rule_actions": {
"items": true,
"type": "array"
},
"policy_name": {
"type": "string"
},
"policy_version": {
"type": "string"
},
"version": {
"type": "string"
},
"os": {
"type": "string"
},
"arch": {
"type": "string"
},
"origin": {
"type": "string"
}
},
"additionalProperties": false,
"type": "object",
"required": [
"rule_id"
]
},
"ChangePermissionEvent": {
"properties": {
"username": {
"type": "string",
"description": "ユーザー名"
},
"user_domain": {
"type": "string",
"description": "ユーザードメイン"
},
"path": {
"type": "string",
"description": "オブジェクト名"
},
"type": {
"type": "string",
"description": "オブジェクトタイプ"
},
"old_sd": {
"type": "string",
"description": "元のセキュリティ記述子"
},
"new_sd": {
"type": "string",
"description": "新しいセキュリティ記述子"
}
},
"additionalProperties": false,
"type": "object",
"description": "ChangePermissionEventSerializer は権限変更イベントを JSON 形式にシリアライズします"
},
"ContainerContext": {
"properties": {
"id": {
"type": "string",
"description": "コンテナID"
},
"created_at": {
"type": "string",
"format": "date-time",
"description": "コンテナの作成時刻"
},
"variables": {
"$ref": "#/$defs/Variables",
"description": "変数値"
}
},
"additionalProperties": false,
"type": "object",
"description": "ContainerContextSerializer はコンテナコンテキストを JSON 形式にシリアライズします"
},
"EventContext": {
"properties": {
"name": {
"type": "string",
"description": "イベント名"
},
"category": {
"type": "string",
"description": "イベントカテゴリ"
},
"outcome": {
"type": "string",
"description": "イベント結果"
},
"async": {
"type": "boolean",
"description": "イベントが非同期の場合に true"
},
"matched_rules": {
"items": {
"$ref": "#/$defs/MatchedRule"
},
"type": "array",
"description": "イベントがマッチしたルールのリスト (異常のコンテキストでのみ有効)"
},
"variables": {
"$ref": "#/$defs/Variables",
"description": "変数値"
}
},
"additionalProperties": false,
"type": "object",
"description": "EventContextSerializer はイベントコンテキストを JSON 形式にシリアライズします"
},
"ExitEvent": {
"properties": {
"cause": {
"type": "string",
"description": "プロセス終了の原因 (EXITED、SIGNALED、COREDUMPED のいずれか)"
},
"code": {
"type": "integer",
"description": "プロセスを終了させた終了コードまたはシグナルの番号"
}
},
"additionalProperties": false,
"type": "object",
"required": [
"cause",
"code"
],
"description": "ExitEventSerializer は終了イベントを JSON 形式にシリアライズします"
},
"File": {
"properties": {
"path": {
"type": "string",
"description": "ファイルパス"
},
"device_path": {
"type": "string",
"description": "ファイルデバイスパス"
},
"name": {
"type": "string",
"description": "ファイルベース名"
}
},
"additionalProperties": false,
"type": "object",
"description": "FileSerializer はファイルを JSON 形式にシリアライズします"
},
"FileEvent": {
"properties": {
"path": {
"type": "string",
"description": "ファイルパス"
},
"device_path": {
"type": "string",
"description": "ファイルデバイスパス"
},
"name": {
"type": "string",
"description": "ファイルベース名"
},
"destination": {
"$ref": "#/$defs/File",
"description": "ターゲットファイル情報"
}
},
"additionalProperties": false,
"type": "object",
"description": "FileEventSerializer はファイルイベントを JSON 形式にシリアライズします"
},
"MatchedRule": {
"properties": {
"id": {
"type": "string",
"description": "ルールID"
},
"version": {
"type": "string",
"description": "ルールのバージョン"
},
"tags": {
"items": {
"type": "string"
},
"type": "array",
"description": "ルールのタグ"
},
"policy_name": {
"type": "string",
"description": "ルールを適用したポリシー名"
},
"policy_version": {
"type": "string",
"description": "ルールを適用したポリシーのバージョン"
}
},
"additionalProperties": false,
"type": "object",
"description": "MatchedRuleSerializer はルールをシリアライズします"
},
"Process": {
"properties": {
"pid": {
"type": "integer",
"description": "プロセス ID"
},
"ppid": {
"type": "integer",
"description": "親プロセス ID"
},
"exec_time": {
"type": "string",
"format": "date-time",
"description": "プロセスの実行時刻"
},
"exit_time": {
"type": "string",
"format": "date-time",
"description": "プロセスの終了時刻"
},
"executable": {
"$ref": "#/$defs/File",
"description": "実行ファイルの情報"
},
"container": {
"$ref": "#/$defs/ContainerContext",
"description": "コンテナコンテキスト"
},
"cmdline": {
"type": "string",
"description": "コマンドライン引数"
},
"user": {
"type": "string",
"description": "ユーザー名"
}
},
"additionalProperties": false,
"type": "object",
"description": "ProcessSerializer はプロセスを JSON 形式にシリアライズします"
},
"ProcessContext": {
"properties": {
"pid": {
"type": "integer",
"description": "プロセス ID"
},
"ppid": {
"type": "integer",
"description": "親プロセス ID"
},
"exec_time": {
"type": "string",
"format": "date-time",
"description": "プロセスの実行時刻"
},
"exit_time": {
"type": "string",
"format": "date-time",
"description": "プロセスの終了時刻"
},
"executable": {
"$ref": "#/$defs/File",
"description": "実行ファイルの情報"
},
"container": {
"$ref": "#/$defs/ContainerContext",
"description": "コンテナコンテキスト"
},
"cmdline": {
"type": "string",
"description": "コマンドライン引数"
},
"user": {
"type": "string",
"description": "ユーザー名"
},
"parent": {
"$ref": "#/$defs/Process",
"description": "親プロセス"
},
"ancestors": {
"items": {
"$ref": "#/$defs/Process"
},
"type": "array",
"description": "祖先プロセス"
},
"variables": {
"$ref": "#/$defs/Variables",
"description": "変数値"
},
"truncated_ancestors": {
"type": "boolean",
"description": "祖先リストが大きすぎたため切り捨てられた場合は true"
}
},
"additionalProperties": false,
"type": "object",
"description": "ProcessContextSerializer はプロセスコンテキストを JSON 形式にシリアライズします"
},
"RegistryEvent": {
"properties": {
"key_name": {
"type": "string",
"description": "レジストリキー名"
},
"key_path": {
"type": "string",
"description": "レジストリキーパス"
},
"value_name": {
"type": "string",
"description": "キー値の名前"
}
},
"additionalProperties": false,
"type": "object",
"description": "RegistryEventSerializer はレジストリイベントを JSON 形式にシリアライズします"
},
"UserContext": {
"properties": {
"name": {
"type": "string",
"description": "ユーザー名"
},
"sid": {
"type": "string",
"description": "所有者 SID"
}
},
"additionalProperties": false,
"type": "object",
"description": "UserContextSerializer はユーザーコンテキストを JSON 形式にシリアライズします"
},
"Variables": {
"type": "object",
"description": "Variables は変数値をシリアライズします"
}
},
"properties": {
"agent": {
"$ref": "#/$defs/AgentContext"
},
"title": {
"type": "string"
},
"evt": {
"$ref": "#/$defs/EventContext"
},
"date": {
"type": "string",
"format": "date-time"
},
"file": {
"$ref": "#/$defs/FileEvent"
},
"exit": {
"$ref": "#/$defs/ExitEvent"
},
"process": {
"$ref": "#/$defs/ProcessContext"
},
"container": {
"$ref": "#/$defs/ContainerContext"
},
"registry": {
"$ref": "#/$defs/RegistryEvent"
},
"usr": {
"$ref": "#/$defs/UserContext"
},
"permission_change": {
"$ref": "#/$defs/ChangePermissionEvent"
}
},
"additionalProperties": false,
"type": "object",
"required": [
"agent",
"title"
]
}

{{< /code-block >}}

| パラメーター | タイプ | 説明 |
| --------- | ---- | ----------- |
| `agent` | $ref | 詳細は [AgentContext](#agentcontext) をご覧ください。 |
| `title` | 文字列 |  |
| `evt` | $ref | [EventContext](#eventcontext) をご覧ください。 |
| `date` | 文字列 |  |
| `file` | $ref | [FileEvent](#fileevent) をご覧ください。 |
| `exit` | $ref | [ExitEvent](#exitevent) をご覧ください。 |
| `process` | $ref | [ProcessContext](#processcontext) をご覧ください。 |
| `container` | $ref | [ContainerContext](#containercontext) をご覧ください。 |
| `registry` | $ref | 詳細は [RegistryEvent](#registryevent) をご覧ください。 |
| `usr` | $ref | [UserContext](#usercontext) をご覧ください。 |
| `permission_change` | $ref | 詳細は [ChangePermissionEvent](#changepermissionevent) をご覧ください。 |

## `AgentContext`


{{< code-block lang="json" collapsible="true" >}}
{
"properties": {
"rule_id": {
"type": "string"
},
"rule_version": {
"type": "string"
},
"rule_actions": {
"items": true,
"type": "array"
},
"policy_name": {
"type": "string"
},
"policy_version": {
"type": "string"
},
"version": {
"type": "string"
},
"os": {
"type": "string"
},
"arch": {
"type": "string"
},
"origin": {
"type": "string"
}
},
"additionalProperties": false,
"type": "object",
"required": [
"rule_id"
]
}

{{< /code-block >}}



## `ChangePermissionEvent`


{{< code-block lang="json" collapsible="true" >}}
{
"properties": {
"username": {
"type": "string",
"description": "ユーザー名"
},
"user_domain": {
"type": "string",
"description": "ユーザードメイン"
},
"path": {
"type": "string",
"description": "オブジェクト名"
},
"type": {
"type": "string",
"description": "オブジェクトタイプ"
},
"old_sd": {
"type": "string",
"description": "元のセキュリティ記述子"
},
"new_sd": {
"type": "string",
"description": "新しいセキュリティ記述子"
}
},
"additionalProperties": false,
"type": "object",
"description": "ChangePermissionEventSerializer は権限変更イベントを JSON 形式にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明 |
| ----- | ----------- |
| `username` | ユーザー名 |
| `user_domain` | ユーザードメイン |
| `path` | オブジェクト名 |
| `type` | オブジェクトタイプ |
| `old_sd` | 元のセキュリティ記述子 |
| `new_sd` | 新しいセキュリティ記述子 |


## `ContainerContext`


{{< code-block lang="json" collapsible="true" >}}
{
"properties": {
"id": {
"type": "string",
"description": "コンテナ ID"
},
"created_at": {
"type": "string",
"format": "date-time",
"description": "コンテナの作成時刻"
},
"variables": {
"$ref": "#/$defs/Variables",
"description": "変数値"
}
},
"additionalProperties": false,
"type": "object",
"description": "ContainerContextSerializer はコンテナコンテキストを JSON 形式にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明 |
| ----- | ----------- |
| `id` | コンテナ ID |
| `created_at` | コンテナの作成時間 |
| `variables` | 変数値 |

| リファレンス |
| ---------- |
| [変数](#variables) |

## `EventContext`


{{< code-block lang="json" collapsible="true" >}}
{
"properties": {
"name": {
"type": "string",
"description": "イベント名"
},
"category": {
"type": "string",
"description": "イベントカテゴリ"
},
"outcome": {
"type": "string",
"description": "イベント結果"
},
"async": {
"type": "boolean",
"description": "イベントが非同期の場合は true"
},
"matched_rules": {
"items": {
"$ref": "#/$defs/MatchedRule"
},
"type": "array",
"description": "イベントがマッチしたルールの一覧 (異常のコンテキストでのみ有効)"
},
"variables": {
"$ref": "#/$defs/Variables",
"description": "変数値"
}
},
"additionalProperties": false,
"type": "object",
"description": "EventContextSerializer はイベントコンテキストを JSON 形式にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明 |
| ----- | ----------- |
| `name` | イベント名 |
| `category` | イベントカテゴリー |
| `outcome` | イベント結果 |
| `async` | イベントが非同期の場合、true |
| `matched_rules` | イベントが一致したルールのリスト (異常のコンテキストでのみ有効) |
| `variables` | 変数値 |

| リファレンス |
| ---------- |
| [変数](#variables) |

## `ExitEvent`


{{< code-block lang="json" collapsible="true" >}}
{
"properties": {
"cause": {
"type": "string",
"description": "プロセス終了の原因 (EXITED、SIGNALED、COREDUMPED のいずれか)"
},
"code": {
"type": "integer",
"description": "プロセスを終了させた終了コードまたはシグナルの番号"
}
},
"additionalProperties": false,
"type": "object",
"required": [
"cause",
"code"
],
"description": "ExitEventSerializer は終了イベントを JSON 形式にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明 |
| ----- | ----------- |
| `cause` | プロセス終了の原因 (EXITED、SIGNALED、COREDUMPED のいずれか 1 つ) |
| `code` | プロセスの終了コード、またはプロセスを終了させたシグナルの番号 |


## `File`


{{< code-block lang="json" collapsible="true" >}}
{
"properties": {
"path": {
"type": "string",
"description": "ファイルパス"
},
"device_path": {
"type": "string",
"description": "ファイルデバイスパス"
},
"name": {
"type": "string",
"description": "ファイルベース名"
}
},
"additionalProperties": false,
"type": "object",
"description": "FileSerializer はファイルを JSON 形式にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明 |
| ----- | ----------- |
| `path` | ファイルパス |
| `device_path` | ファイルデバイスパス |
| `name` | ファイルベース名 |


## `FileEvent`


{{< code-block lang="json" collapsible="true" >}}
{
"properties": {
"path": {
"type": "string",
"description": "ファイルパス"
},
"device_path": {
"type": "string",
"description": "ファイルデバイスパス"
},
"name": {
"type": "string",
"description": "ファイルベース名"
},
"destination": {
"$ref": "#/$defs/File",
"description": "ターゲットファイル情報"
}
},
"additionalProperties": false,
"type": "object",
"description": "FileEventSerializer はファイルイベントを JSON 形式にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明 |
| ----- | ----------- |
| `path` | ファイルパス |
| `device_path` | ファイルデバイスパス |
| `name` | ファイルベース名 |
| `destination` | ターゲットファイル情報 |

| リファレンス |
| ---------- |
| [ファイル](#file) |

## `MatchedRule`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "id": {
            "type": "string",
            "description": "ルールの ID"
        },
        "version": {
            "type": "string",
            "description": "ルールのバージョン"
        },
        "tags": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "ルールのタグ"
        },
        "policy_name": {
            "type": "string",
            "description": "ルールを導入したポリシーの名前"
        },
        "policy_version": {
            "type": "string",
            "description": "ルールを導入したポリシーのバージョン"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "MatchedRuleSerializer はルールをシリアライズする"
}

{{< /code-block >}}

| フィールド | 説明 |
| ----- | ----------- |
| `id` | ルールの ID |
| `version` | ルールのバージョン |
| `tags` | ルールのタグ |
| `policy_name` | ルールを導入したポリシーの名前 |
| `policy_version` | ルールを導入したポリシーのバージョン |


## `Process`


{{< code-block lang="json" collapsible="true" >}}
{
"properties": {
"pid": {
"type": "integer",
"description": "プロセス ID"
},
"ppid": {
"type": "integer",
"description": "親プロセス ID"
},
"exec_time": {
"type": "string",
"format": "date-time",
"description": "プロセスの実行時刻"
},
"exit_time": {
"type": "string",
"format": "date-time",
"description": "プロセスの終了時刻"
},
"executable": {
"$ref": "#/$defs/File",
"description": "実行ファイルの情報"
},
"container": {
"$ref": "#/$defs/ContainerContext",
"description": "コンテナコンテキスト"
},
"cmdline": {
"type": "string",
"description": "コマンドライン引数"
},
"user": {
"type": "string",
"description": "ユーザー名"
}
},
"additionalProperties": false,
"type": "object",
"description": "ProcessSerializer はプロセスを JSON 形式にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明 |
| ----- | ----------- |
| `pid` | プロセス ID |
| `ppid` | 親プロセス ID |
| `exec_time` | プロセスの実行時間 |
| `exit_time` | プロセスの終了時間 |
| `executable` | 実行ファイルのファイル情報 |
| `container` | コンテナコンテキスト |
| `cmdline` | コマンドライン引数 |
| `user` | ユーザー名 |

| リファレンス |
| ---------- |
| [ファイル](#file) |
| [ContainerContext](#containercontext) |

## `ProcessContext`


{{< code-block lang="json" collapsible="true" >}}
{
"properties": {
"pid": {
"type": "integer",
"description": "プロセス ID"
},
"ppid": {
"type": "integer",
"description": "親プロセス ID"
},
"exec_time": {
"type": "string",
"format": "date-time",
"description": "プロセスの実行時刻"
},
"exit_time": {
"type": "string",
"format": "date-time",
"description": "プロセスの終了時刻"
},
"executable": {
"$ref": "#/$defs/File",
"description": "実行ファイルの情報"
},
"container": {
"$ref": "#/$defs/ContainerContext",
"description": "コンテナコンテキスト"
},
"cmdline": {
"type": "string",
"description": "コマンドライン引数"
},
"user": {
"type": "string",
"description": "ユーザー名"
},
"parent": {
"$ref": "#/$defs/Process",
"description": "親プロセス"
},
"ancestors": {
"items": {
"$ref": "#/$defs/Process"
},
"type": "array",
"description": "祖先プロセス"
},
"variables": {
"$ref": "#/$defs/Variables",
"description": "変数値"
},
"truncated_ancestors": {
"type": "boolean",
"description": "祖先リストが大きすぎたため切り捨てられた場合は true"
}
},
"additionalProperties": false,
"type": "object",
"description": "ProcessContextSerializer はプロセスコンテキストを JSON 形式にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明 |
| ----- | ----------- |
| `pid` | プロセス ID |
| `ppid` | 親プロセス ID |
| `exec_time` | プロセスの実行時間 |
| `exit_time` | プロセスの終了時間 |
| `executable` | 実行ファイルのファイル情報 |
| `container` | コンテナコンテキスト |
| `cmdline` | コマンドライン引数 |
| `user` | ユーザー名 |
| `parent` | 親プロセス |
| `ancestors` | 祖先プロセス |
| `variables` | 変数値 |
| `truncated_ancestors` | 祖先リストが大きすぎたため切り捨てられた場合は true |

| リファレンス |
| ---------- |
| [ファイル](#file) |
| [ContainerContext](#containercontext) |
| [プロセス](#process) |
| [変数](#variables) |

## `RegistryEvent`


{{< code-block lang="json" collapsible="true" >}}
{
"properties": {
"key_name": {
"type": "string",
"description": "レジストリキー名"
},
"key_path": {
"type": "string",
"description": "レジストリキーパス"
},
"value_name": {
"type": "string",
"description": "キー値の名前"
}
},
"additionalProperties": false,
"type": "object",
"description": "RegistryEventSerializer はレジストリイベントを JSON 形式にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明 |
| ----- | ----------- |
| `key_name` | レジストリキー名 |
| `key_path` | レジストリキーパス |
| `value_name` | キー値の名前 |


## `UserContext`


{{< code-block lang="json" collapsible="true" >}}
{
"properties": {
"name": {
"type": "string",
"description": "ユーザー名"
},
"sid": {
"type": "string",
"description": "所有者 SID"
}
},
"additionalProperties": false,
"type": "object",
"description": "UserContextSerializer はユーザーコンテキストを JSON 形式にシリアライズします"
}

{{< /code-block >}}

| フィールド | 説明 |
| ----- | ----------- |
| `name` | ユーザー名 |
| `sid` | 所有者 SID |


## `Variables`


{{< code-block lang="json" collapsible="true" >}}
{
"type": "object",
"description": "Variables は変数値をシリアライズします"
}

{{< /code-block >}}




[1]: /ja/security/threats/
[2]: /ja/security/threats/agent