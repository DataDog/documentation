---
description: JSON schema documentation of the CSM Threats Windows backend event
disable_edit: true
title: CSM Threats Windows Events Formats
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-agent -->


<!-- このファイルは自動生成されています。scripts/templates フォルダーにあるファイルを編集してください -->

CSM Threats event for Windows have the following JSON schema:


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
                    "description": "User name"
                },
                "user_domain": {
                    "type": "string",
                    "description": "User domain"
                },
                "path": {
                    "type": "string",
                    "description": "Object name"
                },
                "type": {
                    "type": "string",
                    "description": "Object type"
                },
                "old_sd": {
                    "type": "string",
                    "description": "Original Security Descriptor"
                },
                "new_sd": {
                    "type": "string",
                    "description": "New Security Descriptor"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "ChangePermissionEventSerializer serializes a permission change event to JSON"
        },
        "ContainerContext": {
            "properties": {
                "id": {
                    "type": "string",
                    "description": "Container ID"
                },
                "created_at": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Creation time of the container"
                },
                "variables": {
                    "$ref": "#/$defs/Variables",
                    "description": "Variables values"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "ContainerContextSerializer serializes a container context to JSON"
        },
        "EventContext": {
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Event name"
                },
                "category": {
                    "type": "string",
                    "description": "Event category"
                },
                "outcome": {
                    "type": "string",
                    "description": "Event outcome"
                },
                "async": {
                    "type": "boolean",
                    "description": "True if the event was asynchronous"
                },
                "matched_rules": {
                    "items": {
                        "$ref": "#/$defs/MatchedRule"
                    },
                    "type": "array",
                    "description": "The list of rules that the event matched (only valid in the context of an anomaly)"
                },
                "variables": {
                    "$ref": "#/$defs/Variables",
                    "description": "Variables values"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "EventContextSerializer serializes an event context to JSON"
        },
        "ExitEvent": {
            "properties": {
                "cause": {
                    "type": "string",
                    "description": "Cause of the process termination (one of EXITED, SIGNALED, COREDUMPED)"
                },
                "code": {
                    "type": "integer",
                    "description": "Exit code of the process or number of the signal that caused the process to terminate"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "cause",
                "code"
            ],
            "description": "ExitEventSerializer serializes an exit event to JSON"
        },
        "File": {
            "properties": {
                "path": {
                    "type": "string",
                    "description": "File path"
                },
                "device_path": {
                    "type": "string",
                    "description": "File device path"
                },
                "name": {
                    "type": "string",
                    "description": "File basename"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "FileSerializer serializes a file to JSON"
        },
        "FileEvent": {
            "properties": {
                "path": {
                    "type": "string",
                    "description": "File path"
                },
                "device_path": {
                    "type": "string",
                    "description": "File device path"
                },
                "name": {
                    "type": "string",
                    "description": "File basename"
                },
                "destination": {
                    "$ref": "#/$defs/File",
                    "description": "Target file information"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "FileEventSerializer serializes a file event to JSON"
        },
        "MatchedRule": {
            "properties": {
                "id": {
                    "type": "string",
                    "description": "ID of the rule"
                },
                "version": {
                    "type": "string",
                    "description": "Version of the rule"
                },
                "tags": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "Tags of the rule"
                },
                "policy_name": {
                    "type": "string",
                    "description": "Name of the policy that introduced the rule"
                },
                "policy_version": {
                    "type": "string",
                    "description": "Version of the policy that introduced the rule"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "MatchedRuleSerializer serializes a rule"
        },
        "Process": {
            "properties": {
                "pid": {
                    "type": "integer",
                    "description": "Process ID"
                },
                "ppid": {
                    "type": "integer",
                    "description": "Parent Process ID"
                },
                "exec_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Exec time of the process"
                },
                "exit_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Exit time of the process"
                },
                "executable": {
                    "$ref": "#/$defs/File",
                    "description": "File information of the executable"
                },
                "container": {
                    "$ref": "#/$defs/ContainerContext",
                    "description": "Container context"
                },
                "cmdline": {
                    "type": "string",
                    "description": "Command line arguments"
                },
                "user": {
                    "type": "string",
                    "description": "User name"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "ProcessSerializer serializes a process to JSON"
        },
        "ProcessContext": {
            "properties": {
                "pid": {
                    "type": "integer",
                    "description": "Process ID"
                },
                "ppid": {
                    "type": "integer",
                    "description": "Parent Process ID"
                },
                "exec_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Exec time of the process"
                },
                "exit_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Exit time of the process"
                },
                "executable": {
                    "$ref": "#/$defs/File",
                    "description": "File information of the executable"
                },
                "container": {
                    "$ref": "#/$defs/ContainerContext",
                    "description": "Container context"
                },
                "cmdline": {
                    "type": "string",
                    "description": "Command line arguments"
                },
                "user": {
                    "type": "string",
                    "description": "User name"
                },
                "parent": {
                    "$ref": "#/$defs/Process",
                    "description": "Parent process"
                },
                "ancestors": {
                    "items": {
                        "$ref": "#/$defs/Process"
                    },
                    "type": "array",
                    "description": "Ancestor processes"
                },
                "variables": {
                    "$ref": "#/$defs/Variables",
                    "description": "Variables values"
                },
                "truncated_ancestors": {
                    "type": "boolean",
                    "description": "True if the ancestors list was truncated because it was too big"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "ProcessContextSerializer serializes a process context to JSON"
        },
        "RegistryEvent": {
            "properties": {
                "key_name": {
                    "type": "string",
                    "description": "Registry key name"
                },
                "key_path": {
                    "type": "string",
                    "description": "Registry key path"
                },
                "value_name": {
                    "type": "string",
                    "description": "Value name of the key value"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "RegistryEventSerializer serializes a registry event to JSON"
        },
        "UserContext": {
            "properties": {
                "name": {
                    "type": "string",
                    "description": "User name"
                },
                "sid": {
                    "type": "string",
                    "description": "Owner Sid"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "UserContextSerializer serializes a user context to JSON"
        },
        "Variables": {
            "type": "object",
            "description": "Variables serializes the variable values"
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
| `agent` | $ref | Please see [AgentContext](#agentcontext) |
| `title` | 文字列 |  |
| `evt` | $ref | [EventContext](#eventcontext) をご覧ください。 |
| `date` | 文字列 |  |
| `file` | $ref | [FileEvent](#fileevent) をご覧ください。 |
| `exit` | $ref | [ExitEvent](#exitevent) をご覧ください。 |
| `process` | $ref | [ProcessContext](#processcontext) をご覧ください。 |
| `container` | $ref | [ContainerContext](#containercontext) をご覧ください。 |
| `registry` | $ref | Please see [RegistryEvent](#registryevent) |
| `usr` | $ref | [UserContext](#usercontext) をご覧ください。 |
| `permission_change` | $ref | Please see [ChangePermissionEvent](#changepermissionevent) |

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
            "description": "User name"
        },
        "user_domain": {
            "type": "string",
            "description": "User domain"
        },
        "path": {
            "type": "string",
            "description": "Object name"
        },
        "type": {
            "type": "string",
            "description": "Object type"
        },
        "old_sd": {
            "type": "string",
            "description": "Original Security Descriptor"
        },
        "new_sd": {
            "type": "string",
            "description": "New Security Descriptor"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "ChangePermissionEventSerializer serializes a permission change event to JSON"
}

{{< /code-block >}}

| フィールド | 説明 |
| ----- | ----------- |
| `username` | ユーザー名 |
| `user_domain` | User domain |
| `path` | Object name |
| `type` | Object type |
| `old_sd` | Original Security Descriptor |
| `new_sd` | New Security Descriptor |


## `ContainerContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "id": {
            "type": "string",
            "description": "Container ID"
        },
        "created_at": {
            "type": "string",
            "format": "date-time",
            "description": "Creation time of the container"
        },
        "variables": {
            "$ref": "#/$defs/Variables",
            "description": "Variables values"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "ContainerContextSerializer serializes a container context to JSON"
}

{{< /code-block >}}

| フィールド | 説明 |
| ----- | ----------- |
| `id` | コンテナ ID |
| `created_at` | コンテナの作成時間 |
| `variables` | Variables values |

| リファレンス |
| ---------- |
| [Variables](#variables) |

## `EventContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "name": {
            "type": "string",
            "description": "Event name"
        },
        "category": {
            "type": "string",
            "description": "Event category"
        },
        "outcome": {
            "type": "string",
            "description": "Event outcome"
        },
        "async": {
            "type": "boolean",
            "description": "True if the event was asynchronous"
        },
        "matched_rules": {
            "items": {
                "$ref": "#/$defs/MatchedRule"
            },
            "type": "array",
            "description": "The list of rules that the event matched (only valid in the context of an anomaly)"
        },
        "variables": {
            "$ref": "#/$defs/Variables",
            "description": "Variables values"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "EventContextSerializer serializes an event context to JSON"
}

{{< /code-block >}}

| フィールド | 説明 |
| ----- | ----------- |
| `name` | イベント名 |
| `category` | イベントカテゴリー |
| `outcome` | イベント結果 |
| `async` | イベントが非同期の場合、true |
| `matched_rules` | イベントが一致したルールのリスト (異常のコンテキストでのみ有効) |
| `variables` | Variables values |

| リファレンス |
| ---------- |
| [Variables](#variables) |

## `ExitEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "cause": {
            "type": "string",
            "description": "Cause of the process termination (one of EXITED, SIGNALED, COREDUMPED)"
        },
        "code": {
            "type": "integer",
            "description": "Exit code of the process or number of the signal that caused the process to terminate"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "cause",
        "code"
    ],
    "description": "ExitEventSerializer serializes an exit event to JSON"
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
            "description": "File path"
        },
        "device_path": {
            "type": "string",
            "description": "File device path"
        },
        "name": {
            "type": "string",
            "description": "File basename"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "FileSerializer serializes a file to JSON"
}

{{< /code-block >}}

| フィールド | 説明 |
| ----- | ----------- |
| `path` | ファイルパス |
| `device_path` | File device path |
| `name` | ファイルベース名 |


## `FileEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "path": {
            "type": "string",
            "description": "File path"
        },
        "device_path": {
            "type": "string",
            "description": "File device path"
        },
        "name": {
            "type": "string",
            "description": "File basename"
        },
        "destination": {
            "$ref": "#/$defs/File",
            "description": "Target file information"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "FileEventSerializer serializes a file event to JSON"
}

{{< /code-block >}}

| フィールド | 説明 |
| ----- | ----------- |
| `path` | ファイルパス |
| `device_path` | File device path |
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
            "description": "Process ID"
        },
        "ppid": {
            "type": "integer",
            "description": "Parent Process ID"
        },
        "exec_time": {
            "type": "string",
            "format": "date-time",
            "description": "Exec time of the process"
        },
        "exit_time": {
            "type": "string",
            "format": "date-time",
            "description": "Exit time of the process"
        },
        "executable": {
            "$ref": "#/$defs/File",
            "description": "File information of the executable"
        },
        "container": {
            "$ref": "#/$defs/ContainerContext",
            "description": "Container context"
        },
        "cmdline": {
            "type": "string",
            "description": "Command line arguments"
        },
        "user": {
            "type": "string",
            "description": "User name"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "ProcessSerializer serializes a process to JSON"
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
            "description": "Process ID"
        },
        "ppid": {
            "type": "integer",
            "description": "Parent Process ID"
        },
        "exec_time": {
            "type": "string",
            "format": "date-time",
            "description": "Exec time of the process"
        },
        "exit_time": {
            "type": "string",
            "format": "date-time",
            "description": "Exit time of the process"
        },
        "executable": {
            "$ref": "#/$defs/File",
            "description": "File information of the executable"
        },
        "container": {
            "$ref": "#/$defs/ContainerContext",
            "description": "Container context"
        },
        "cmdline": {
            "type": "string",
            "description": "Command line arguments"
        },
        "user": {
            "type": "string",
            "description": "User name"
        },
        "parent": {
            "$ref": "#/$defs/Process",
            "description": "Parent process"
        },
        "ancestors": {
            "items": {
                "$ref": "#/$defs/Process"
            },
            "type": "array",
            "description": "Ancestor processes"
        },
        "variables": {
            "$ref": "#/$defs/Variables",
            "description": "Variables values"
        },
        "truncated_ancestors": {
            "type": "boolean",
            "description": "True if the ancestors list was truncated because it was too big"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "ProcessContextSerializer serializes a process context to JSON"
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
| `variables` | Variables values |
| `truncated_ancestors` | True if the ancestors list was truncated because it was too big |

| リファレンス |
| ---------- |
| [ファイル](#file) |
| [ContainerContext](#containercontext) |
| [プロセス](#process) |
| [Variables](#variables) |

## `RegistryEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "key_name": {
            "type": "string",
            "description": "Registry key name"
        },
        "key_path": {
            "type": "string",
            "description": "Registry key path"
        },
        "value_name": {
            "type": "string",
            "description": "Value name of the key value"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "RegistryEventSerializer serializes a registry event to JSON"
}

{{< /code-block >}}

| フィールド | 説明 |
| ----- | ----------- |
| `key_name` | Registry key name |
| `key_path` | Registry key path |
| `value_name` | Value name of the key value |


## `UserContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "name": {
            "type": "string",
            "description": "User name"
        },
        "sid": {
            "type": "string",
            "description": "Owner Sid"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "UserContextSerializer serializes a user context to JSON"
}

{{< /code-block >}}

| フィールド | 説明 |
| ----- | ----------- |
| `name` | ユーザー名 |
| `sid` | Owner Sid |


## `Variables`


{{< code-block lang="json" collapsible="true" >}}
{
    "type": "object",
    "description": "Variables serializes the variable values"
}

{{< /code-block >}}




[1]: /security/threats/
[2]: /security/threats/agent
