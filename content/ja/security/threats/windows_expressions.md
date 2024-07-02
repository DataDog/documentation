---
description: Windows Agent attributes and helpers for CSM Threats Rules
disable_edit: true
further_reading:
- link: /security/cloud_workload_security/getting_started/
  tag: ドキュメント
  text: Get started with Datadog CSM Threats
title: Windows Agent attributes and helpers
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-agent -->


<!-- このファイルは自動生成されています。scripts/templates フォルダーにあるファイルを編集してください -->

## Windows Agent attributes and helpers
This documentation describes Windows attributes and helpers of the [Datadog's Security Language (SECL)][1].

## トリガー
トリガーは、システムで見られるアクティビティの種類に対応するイベントです。現在サポートされているトリガーは以下のとおりです。

| SECL イベント | タイプ | 定義 | Agent バージョン |
| ---------- | ---- | ---------- | ------------- |
| `change_permission` | Registry | A permission change was made | 7.55 |
| `create` | ファイル | A file was created | 7.52 |
| `create_key` | Registry | A registry key was created | 7.52 |
| `delete` | ファイル | ファイルが削除された | 7.54 |
| `delete_key` | Registry | A registry key was deleted | 7.52 |
| `exec` | プロセス | プロセスが実行またはフォークされた | 7.27 |
| `exit` | プロセス | プロセスが終了した | 7.38 |
| `open_key` | Registry | A registry key was opened | 7.52 |
| `rename` | ファイル | A file was renamed | 7.54 |
| `set_key_value` | Registry | A registry key value was set | 7.52 |
| `write` | ファイル | A file was written | 7.54 |

## 変数
SECL 変数は、値として、または値の一部として使用することができる定義済みの変数です。

例えば、`process.pid` という変数を使ったルールは以下のようになります。


{{< code-block lang="javascript" >}}
open.file.path == "/proc/${process.pid}/maps"

{{< /code-block >}}

利用可能な変数の一覧です。

| SECL 変数         |  定義                           | Agent バージョン |
|-----------------------|---------------------------------------|---------------|
| `process.pid`         | プロセス PID                           | 7.33          |

## イベント属性

### すべてのイベントタイプに共通

| プロパティ | 定義 |
| -------- | ------------- |
| [`container.created_at`](#container-created_at-doc) | コンテナ作成時のタイムスタンプ |
| [`container.id`](#container-id-doc) | コンテナの ID |
| [`container.tags`](#container-tags-doc) | コンテナのタグ |
| [`event.origin`](#event-origin-doc) | Origin of the event |
| [`event.os`](#event-os-doc) | Operating system of the event |
| [`event.service`](#event-service-doc) | Service associated with the event |
| [`event.timestamp`](#event-timestamp-doc) | イベントのタイムスタンプ |
| [`process.ancestors.cmdline`](#common-process-cmdline-doc) | Command line of the process |
| [`process.ancestors.container.id`](#common-process-container-id-doc) | コンテナ ID |
| [`process.ancestors.created_at`](#common-process-created_at-doc) | プロセス作成時のタイムスタンプ |
| [`process.ancestors.envp`](#common-process-envp-doc) | プロセスの環境変数 |
| [`process.ancestors.envs`](#common-process-envs-doc) | プロセスの環境変数名 |
| [`process.ancestors.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`process.ancestors.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`process.ancestors.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`process.ancestors.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`process.ancestors.pid`](#common-pidcontext-pid-doc) | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |
| [`process.ancestors.ppid`](#common-process-ppid-doc) | 親プロセス ID |
| [`process.ancestors.user`](#common-process-user-doc) | ユーザー名 |
| [`process.ancestors.user_sid`](#common-process-user_sid-doc) | Sid of the user of the process |
| [`process.cmdline`](#common-process-cmdline-doc) | Command line of the process |
| [`process.container.id`](#common-process-container-id-doc) | コンテナ ID |
| [`process.created_at`](#common-process-created_at-doc) | プロセス作成時のタイムスタンプ |
| [`process.envp`](#common-process-envp-doc) | プロセスの環境変数 |
| [`process.envs`](#common-process-envs-doc) | プロセスの環境変数名 |
| [`process.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`process.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`process.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`process.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`process.parent.cmdline`](#common-process-cmdline-doc) | Command line of the process |
| [`process.parent.container.id`](#common-process-container-id-doc) | コンテナ ID |
| [`process.parent.created_at`](#common-process-created_at-doc) | プロセス作成時のタイムスタンプ |
| [`process.parent.envp`](#common-process-envp-doc) | プロセスの環境変数 |
| [`process.parent.envs`](#common-process-envs-doc) | プロセスの環境変数名 |
| [`process.parent.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`process.parent.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`process.parent.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`process.parent.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`process.parent.pid`](#common-pidcontext-pid-doc) | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |
| [`process.parent.ppid`](#common-process-ppid-doc) | 親プロセス ID |
| [`process.parent.user`](#common-process-user-doc) | ユーザー名 |
| [`process.parent.user_sid`](#common-process-user_sid-doc) | Sid of the user of the process |
| [`process.pid`](#common-pidcontext-pid-doc) | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |
| [`process.ppid`](#common-process-ppid-doc) | 親プロセス ID |
| [`process.user`](#common-process-user-doc) | ユーザー名 |
| [`process.user_sid`](#common-process-user_sid-doc) | Sid of the user of the process |

### Event `change_permission`

A permission change was made

| プロパティ | 定義 |
| -------- | ------------- |
| [`change_permission.new_sd`](#change_permission-new_sd-doc) | New Security Descriptor of the object of which permission was changed |
| [`change_permission.old_sd`](#change_permission-old_sd-doc) | Original Security Descriptor of the object of which permission was changed |
| [`change_permission.path`](#change_permission-path-doc) | Name of the object of which permission was changed |
| [`change_permission.type`](#change_permission-type-doc) | Type of the object of which permission was changed |
| [`change_permission.user_domain`](#change_permission-user_domain-doc) | Domain name of the permission change author |
| [`change_permission.username`](#change_permission-username-doc) | Username of the permission change author |

### Event `create`

A file was created

| プロパティ | 定義 |
| -------- | ------------- |
| [`create.file.device_path`](#common-fimfileevent-device_path-doc) | ファイルのパス |
| [`create.file.device_path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`create.file.name`](#common-fimfileevent-name-doc) | ファイルのベース名 |
| [`create.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`create.file.path`](#common-fimfileevent-path-doc) | ファイルのパス |
| [`create.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |

### Event `create_key`

A registry key was created

| プロパティ | 定義 |
| -------- | ------------- |
| [`create.registry.key_name`](#common-registryevent-key_name-doc) | Registry's name |
| [`create.registry.key_name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`create.registry.key_path`](#common-registryevent-key_path-doc) | Registry's path |
| [`create.registry.key_path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`create_key.registry.key_name`](#common-registryevent-key_name-doc) | Registry's name |
| [`create_key.registry.key_name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`create_key.registry.key_path`](#common-registryevent-key_path-doc) | Registry's path |
| [`create_key.registry.key_path.length`](#common-string-length-doc) | 対応する文字列の長さ |

### Event `delete`

ファイルが削除された

| プロパティ | 定義 |
| -------- | ------------- |
| [`delete.file.device_path`](#common-fimfileevent-device_path-doc) | ファイルのパス |
| [`delete.file.device_path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`delete.file.name`](#common-fimfileevent-name-doc) | ファイルのベース名 |
| [`delete.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`delete.file.path`](#common-fimfileevent-path-doc) | ファイルのパス |
| [`delete.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |

### Event `delete_key`

A registry key was deleted

| プロパティ | 定義 |
| -------- | ------------- |
| [`delete.registry.key_name`](#common-registryevent-key_name-doc) | Registry's name |
| [`delete.registry.key_name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`delete.registry.key_path`](#common-registryevent-key_path-doc) | Registry's path |
| [`delete.registry.key_path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`delete_key.registry.key_name`](#common-registryevent-key_name-doc) | Registry's name |
| [`delete_key.registry.key_name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`delete_key.registry.key_path`](#common-registryevent-key_path-doc) | Registry's path |
| [`delete_key.registry.key_path.length`](#common-string-length-doc) | 対応する文字列の長さ |

### イベント `exec`

プロセスが実行またはフォークされた

| プロパティ | 定義 |
| -------- | ------------- |
| [`exec.cmdline`](#common-process-cmdline-doc) | Command line of the process |
| [`exec.container.id`](#common-process-container-id-doc) | コンテナ ID |
| [`exec.created_at`](#common-process-created_at-doc) | プロセス作成時のタイムスタンプ |
| [`exec.envp`](#common-process-envp-doc) | プロセスの環境変数 |
| [`exec.envs`](#common-process-envs-doc) | プロセスの環境変数名 |
| [`exec.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`exec.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`exec.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`exec.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`exec.pid`](#common-pidcontext-pid-doc) | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |
| [`exec.ppid`](#common-process-ppid-doc) | 親プロセス ID |
| [`exec.user`](#common-process-user-doc) | ユーザー名 |
| [`exec.user_sid`](#common-process-user_sid-doc) | Sid of the user of the process |

### イベント `exit`

プロセスが終了した

| プロパティ | 定義 |
| -------- | ------------- |
| [`exit.cause`](#exit-cause-doc) | プロセス終了の原因 (EXITED、SIGNALED、COREDUMPED のいずれか 1 つ) |
| [`exit.cmdline`](#common-process-cmdline-doc) | Command line of the process |
| [`exit.code`](#exit-code-doc) | プロセスの終了コード、またはプロセスを終了させたシグナルの番号 |
| [`exit.container.id`](#common-process-container-id-doc) | コンテナ ID |
| [`exit.created_at`](#common-process-created_at-doc) | プロセス作成時のタイムスタンプ |
| [`exit.envp`](#common-process-envp-doc) | プロセスの環境変数 |
| [`exit.envs`](#common-process-envs-doc) | プロセスの環境変数名 |
| [`exit.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`exit.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`exit.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`exit.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`exit.pid`](#common-pidcontext-pid-doc) | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |
| [`exit.ppid`](#common-process-ppid-doc) | 親プロセス ID |
| [`exit.user`](#common-process-user-doc) | ユーザー名 |
| [`exit.user_sid`](#common-process-user_sid-doc) | Sid of the user of the process |

### Event `open_key`

A registry key was opened

| プロパティ | 定義 |
| -------- | ------------- |
| [`open.registry.key_name`](#common-registryevent-key_name-doc) | Registry's name |
| [`open.registry.key_name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`open.registry.key_path`](#common-registryevent-key_path-doc) | Registry's path |
| [`open.registry.key_path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`open_key.registry.key_name`](#common-registryevent-key_name-doc) | Registry's name |
| [`open_key.registry.key_name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`open_key.registry.key_path`](#common-registryevent-key_path-doc) | Registry's path |
| [`open_key.registry.key_path.length`](#common-string-length-doc) | 対応する文字列の長さ |

### イベント `rename`

A file was renamed

| プロパティ | 定義 |
| -------- | ------------- |
| [`rename.file.destination.device_path`](#common-fimfileevent-device_path-doc) | ファイルのパス |
| [`rename.file.destination.device_path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`rename.file.destination.name`](#common-fimfileevent-name-doc) | ファイルのベース名 |
| [`rename.file.destination.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`rename.file.destination.path`](#common-fimfileevent-path-doc) | ファイルのパス |
| [`rename.file.destination.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`rename.file.device_path`](#common-fimfileevent-device_path-doc) | ファイルのパス |
| [`rename.file.device_path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`rename.file.name`](#common-fimfileevent-name-doc) | ファイルのベース名 |
| [`rename.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`rename.file.path`](#common-fimfileevent-path-doc) | ファイルのパス |
| [`rename.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |

### Event `set_key_value`

A registry key value was set

| プロパティ | 定義 |
| -------- | ------------- |
| [`set.registry.key_name`](#common-registryevent-key_name-doc) | Registry's name |
| [`set.registry.key_name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`set.registry.key_path`](#common-registryevent-key_path-doc) | Registry's path |
| [`set.registry.key_path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`set.registry.value_name`](#common-setregistrykeyvalueevent-registry-value_name-doc) | Registry's value name |
| [`set.registry.value_name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`set.value_name`](#common-setregistrykeyvalueevent-value_name-doc) | Registry's value name |
| [`set_key_value.registry.key_name`](#common-registryevent-key_name-doc) | Registry's name |
| [`set_key_value.registry.key_name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`set_key_value.registry.key_path`](#common-registryevent-key_path-doc) | Registry's path |
| [`set_key_value.registry.key_path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`set_key_value.registry.value_name`](#common-setregistrykeyvalueevent-registry-value_name-doc) | Registry's value name |
| [`set_key_value.registry.value_name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`set_key_value.value_name`](#common-setregistrykeyvalueevent-value_name-doc) | Registry's value name |

### Event `write`

A file was written

| プロパティ | 定義 |
| -------- | ------------- |
| [`write.file.device_path`](#common-fimfileevent-device_path-doc) | ファイルのパス |
| [`write.file.device_path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`write.file.name`](#common-fimfileevent-name-doc) | ファイルのベース名 |
| [`write.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`write.file.path`](#common-fimfileevent-path-doc) | ファイルのパス |
| [`write.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |


## 属性ドキュメント


### `*.cmdline` {#common-process-cmdline-doc}
タイプ: 文字列

Definition: Command line of the process

`*.cmdline` has 5 possible prefixes:
`exec` `exit` `process` `process.ancestors` `process.parent`



例:

{{< code-block lang="javascript" >}}
exec.cmdline == "-sV -p 22,53,110,143,4564 198.116.0-255.1-127"
{{< /code-block >}}

これらの正確な引数を持つ任意のプロセスにマッチします。

例:

{{< code-block lang="javascript" >}}
exec.cmdline =~ "* -F * http*"
{{< /code-block >}}

"http" で始まる引数の前に "-F " 引数を持つプロセスにマッチします。

### `*.container.id` {#common-process-container-id-doc}
タイプ: 文字列

定義: コンテナ ID

`*.container.id` has 5 possible prefixes:
`exec` `exit` `process` `process.ancestors` `process.parent`


### `*.created_at` {#common-process-created_at-doc}
タイプ: 整数

定義: プロセス作成時のタイムスタンプ

`*.created_at` has 5 possible prefixes:
`exec` `exit` `process` `process.ancestors` `process.parent`


### `*.device_path` {#common-fimfileevent-device_path-doc}
タイプ: 文字列

定義: ファイルのパス

`*.device_path` has 5 possible prefixes:
`create.file` `delete.file` `rename.file` `rename.file.destination` `write.file`



例:

{{< code-block lang="javascript" >}}
create.file.device_path == "\device\harddisk1\cmd.bat"
{{< /code-block >}}

Matches the creation of the file located at c:\cmd.bat

### `*.envp` {#common-process-envp-doc}
タイプ: 文字列

定義: プロセスの環境変数

`*.envp` has 5 possible prefixes:
`exec` `exit` `process` `process.ancestors` `process.parent`


### `*.envs` {#common-process-envs-doc}
タイプ: 文字列

定義: プロセスの環境変数名

`*.envs` has 5 possible prefixes:
`exec` `exit` `process` `process.ancestors` `process.parent`


### `*.key_name` {#common-registryevent-key_name-doc}
タイプ: 文字列

Definition: Registry's name

`*.key_name` has 8 possible prefixes:
`create.registry` `create_key.registry` `delete.registry` `delete_key.registry` `open.registry` `open_key.registry` `set.registry` `set_key_value.registry`


### `*.key_path` {#common-registryevent-key_path-doc}
タイプ: 文字列

Definition: Registry's path

`*.key_path` has 8 possible prefixes:
`create.registry` `create_key.registry` `delete.registry` `delete_key.registry` `open.registry` `open_key.registry` `set.registry` `set_key_value.registry`


### `*.length` {#common-string-length-doc}
タイプ: 整数

定義: 対応する文字列の長さ

`*.length` has 43 possible prefixes:
`create.file.device_path` `create.file.name` `create.file.path` `create.registry.key_name` `create.registry.key_path` `create_key.registry.key_name` `create_key.registry.key_path` `delete.file.device_path` `delete.file.name` `delete.file.path` `delete.registry.key_name` `delete.registry.key_path` `delete_key.registry.key_name` `delete_key.registry.key_path` `exec.file.name` `exec.file.path` `exit.file.name` `exit.file.path` `open.registry.key_name` `open.registry.key_path` `open_key.registry.key_name` `open_key.registry.key_path` `process.ancestors.file.name` `process.ancestors.file.path` `process.file.name` `process.file.path` `process.parent.file.name` `process.parent.file.path` `rename.file.destination.device_path` `rename.file.destination.name` `rename.file.destination.path` `rename.file.device_path` `rename.file.name` `rename.file.path` `set.registry.key_name` `set.registry.key_path` `set.registry.value_name` `set_key_value.registry.key_name` `set_key_value.registry.key_path` `set_key_value.registry.value_name` `write.file.device_path` `write.file.name` `write.file.path`


### `*.name` {#common-fileevent-name-doc}
タイプ: 文字列

定義: ファイルのベース名

`*.name` has 5 possible prefixes:
`exec.file` `exit.file` `process.ancestors.file` `process.file` `process.parent.file`



例:

{{< code-block lang="javascript" >}}
exec.file.name == "cmd.bat"
{{< /code-block >}}

Matches the execution of any file named cmd.bat.

### `*.name` {#common-fimfileevent-name-doc}
タイプ: 文字列

定義: ファイルのベース名

`*.name` has 5 possible prefixes:
`create.file` `delete.file` `rename.file` `rename.file.destination` `write.file`



例:

{{< code-block lang="javascript" >}}
create.file.name == "cmd.bat"
{{< /code-block >}}

Matches the creation of any file named cmd.bat.

### `*.path` {#common-fileevent-path-doc}
タイプ: 文字列

定義: ファイルのパス

`*.path` has 5 possible prefixes:
`exec.file` `exit.file` `process.ancestors.file` `process.file` `process.parent.file`



例:

{{< code-block lang="javascript" >}}
exec.file.path == "c:\cmd.bat"
{{< /code-block >}}

Matches the execution of the file located at c:\cmd.bat

### `*.path` {#common-fimfileevent-path-doc}
タイプ: 文字列

定義: ファイルのパス

`*.path` has 5 possible prefixes:
`create.file` `delete.file` `rename.file` `rename.file.destination` `write.file`



例:

{{< code-block lang="javascript" >}}
create.file.path == "c:\cmd.bat"
{{< /code-block >}}

Matches the creation of the file located at c:\cmd.bat

### `*.pid` {#common-pidcontext-pid-doc}
タイプ: 整数

定義: プロセスのプロセス ID (スレッドグループ ID とも呼ばれる)

`*.pid` has 5 possible prefixes:
`exec` `exit` `process` `process.ancestors` `process.parent`


### `*.ppid` {#common-process-ppid-doc}
タイプ: 整数

定義: 親プロセス ID

`*.ppid` has 5 possible prefixes:
`exec` `exit` `process` `process.ancestors` `process.parent`


### `*.registry.value_name` {#common-setregistrykeyvalueevent-registry-value_name-doc}
タイプ: 文字列

Definition: Registry's value name

`*.registry.value_name` has 2 possible prefixes:
`set` `set_key_value`


### `*.user` {#common-process-user-doc}
タイプ: 文字列

Definition: User name

`*.user` has 5 possible prefixes:
`exec` `exit` `process` `process.ancestors` `process.parent`


### `*.user_sid` {#common-process-user_sid-doc}
タイプ: 文字列

Definition: Sid of the user of the process

`*.user_sid` has 5 possible prefixes:
`exec` `exit` `process` `process.ancestors` `process.parent`


### `*.value_name` {#common-setregistrykeyvalueevent-value_name-doc}
タイプ: 文字列

Definition: Registry's value name

`*.value_name` has 2 possible prefixes:
`set` `set_key_value`


### `change_permission.new_sd` {#change_permission-new_sd-doc}
タイプ: 文字列

Definition: New Security Descriptor of the object of which permission was changed



### `change_permission.old_sd` {#change_permission-old_sd-doc}
タイプ: 文字列

Definition: Original Security Descriptor of the object of which permission was changed



### `change_permission.path` {#change_permission-path-doc}
タイプ: 文字列

Definition: Name of the object of which permission was changed



### `change_permission.type` {#change_permission-type-doc}
タイプ: 文字列

Definition: Type of the object of which permission was changed



### `change_permission.user_domain` {#change_permission-user_domain-doc}
タイプ: 文字列

Definition: Domain name of the permission change author



### `change_permission.username` {#change_permission-username-doc}
タイプ: 文字列

Definition: Username of the permission change author



### `container.created_at` {#container-created_at-doc}
タイプ: 整数

定義: コンテナ作成時のタイムスタンプ



### `container.id` {#container-id-doc}
タイプ: 文字列

定義: コンテナの ID



### `container.tags` {#container-tags-doc}
タイプ: 文字列

定義: コンテナのタグ



### `event.origin` {#event-origin-doc}
タイプ: 文字列

Definition: Origin of the event



### `event.os` {#event-os-doc}
タイプ: 文字列

Definition: Operating system of the event



### `event.service` {#event-service-doc}
タイプ: 文字列

Definition: Service associated with the event



### `event.timestamp` {#event-timestamp-doc}
タイプ: 整数

定義: イベントのタイムスタンプ



### `exit.cause` {#exit-cause-doc}
タイプ: 整数

定義: プロセス終了の原因 (EXITED、SIGNALED、COREDUMPED のいずれか 1 つ)



### `exit.code` {#exit-code-doc}
タイプ: 整数

定義: プロセスの終了コード、またはプロセスを終了させたシグナルの番号



## 定数

定数は、ルールの可読性を向上させるために使用します。定数には、すべてのアーキテクチャに共通するものと、いくつかのアーキテクチャに固有のものがあります。

### `Boolean constants` {#boolean-constants}
Boolean constants are the supported boolean constants.

| 名前 | アーキテクチャ |
| ---- |---------------|
| `true` | すべて |
| `false` | すべて |

### `DNS qclasses` {#dns-qclasses}
DNS qclasses は、サポートされている DNS クエリクラスです。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `CLASS_INET` | すべて |
| `CLASS_CSNET` | すべて |
| `CLASS_CHAOS` | すべて |
| `CLASS_HESIOD` | すべて |
| `CLASS_NONE` | すべて |
| `CLASS_ANY` | すべて |

### `DNS qtypes` {#dns-qtypes}
DNS qtypes は、サポートされている DNS クエリタイプです。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `None` | すべて |
| `A` | すべて |
| `NS` | すべて |
| `MD` | すべて |
| `MF` | すべて |
| `CNAME` | すべて |
| `SOA` | すべて |
| `MB` | すべて |
| `MG` | すべて |
| `MR` | すべて |
| `NULL` | すべて |
| `PTR` | すべて |
| `HINFO` | すべて |
| `MINFO` | すべて |
| `MX` | すべて |
| `TXT` | すべて |
| `RP` | すべて |
| `AFSDB` | すべて |
| `X25` | すべて |
| `ISDN` | すべて |
| `RT` | すべて |
| `NSAPPTR` | すべて |
| `SIG` | すべて |
| `KEY` | すべて |
| `PX` | すべて |
| `GPOS` | すべて |
| `AAAA` | すべて |
| `LOC` | すべて |
| `NXT` | すべて |
| `EID` | すべて |
| `NIMLOC` | すべて |
| `SRV` | すべて |
| `ATMA` | すべて |
| `NAPTR` | すべて |
| `KX` | すべて |
| `CERT` | すべて |
| `DNAME` | すべて |
| `OPT` | すべて |
| `APL` | すべて |
| `DS` | すべて |
| `SSHFP` | すべて |
| `RRSIG` | すべて |
| `NSEC` | すべて |
| `DNSKEY` | すべて |
| `DHCID` | すべて |
| `NSEC3` | すべて |
| `NSEC3PARAM` | すべて |
| `TLSA` | すべて |
| `SMIMEA` | すべて |
| `HIP` | すべて |
| `NINFO` | すべて |
| `RKEY` | すべて |
| `TALINK` | すべて |
| `CDS` | すべて |
| `CDNSKEY` | すべて |
| `OPENPGPKEY` | すべて |
| `CSYNC` | すべて |
| `ZONEMD` | すべて |
| `SVCB` | すべて |
| `HTTPS` | すべて |
| `SPF` | すべて |
| `UINFO` | すべて |
| `UID` | すべて |
| `GID` | すべて |
| `UNSPEC` | すべて |
| `NID` | すべて |
| `L32` | すべて |
| `L64` | すべて |
| `LP` | すべて |
| `EUI48` | すべて |
| `EUI64` | すべて |
| `URI` | すべて |
| `CAA` | すべて |
| `AVC` | すべて |
| `TKEY` | すべて |
| `TSIG` | すべて |
| `IXFR` | すべて |
| `AXFR` | すべて |
| `MAILB` | すべて |
| `MAILA` | すべて |
| `ANY` | すべて |
| `TA` | すべて |
| `DLV` | すべて |
| `Reserved` | すべて |

### `L3 protocols` {#l3-protocols}
L3 プロトコルは、サポートされているレイヤー 3 プロトコルです。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `ETH_P_LOOP` | すべて |
| `ETH_P_PUP` | すべて |
| `ETH_P_PUPAT` | すべて |
| `ETH_P_TSN` | すべて |
| `ETH_P_IP` | すべて |
| `ETH_P_X25` | すべて |
| `ETH_P_ARP` | すべて |
| `ETH_P_BPQ` | すべて |
| `ETH_P_IEEEPUP` | すべて |
| `ETH_P_IEEEPUPAT` | すべて |
| `ETH_P_BATMAN` | すべて |
| `ETH_P_DEC` | すべて |
| `ETH_P_DNADL` | すべて |
| `ETH_P_DNARC` | すべて |
| `ETH_P_DNART` | すべて |
| `ETH_P_LAT` | すべて |
| `ETH_P_DIAG` | すべて |
| `ETH_P_CUST` | すべて |
| `ETH_P_SCA` | すべて |
| `ETH_P_TEB` | すべて |
| `ETH_P_RARP` | すべて |
| `ETH_P_ATALK` | すべて |
| `ETH_P_AARP` | すべて |
| `ETH_P_8021_Q` | すべて |
| `ETH_P_ERSPAN` | すべて |
| `ETH_P_IPX` | すべて |
| `ETH_P_IPV6` | すべて |
| `ETH_P_PAUSE` | すべて |
| `ETH_P_SLOW` | すべて |
| `ETH_P_WCCP` | すべて |
| `ETH_P_MPLSUC` | すべて |
| `ETH_P_MPLSMC` | すべて |
| `ETH_P_ATMMPOA` | すべて |
| `ETH_P_PPPDISC` | すべて |
| `ETH_P_PPPSES` | すべて |
| `ETH_P__LINK_CTL` | すべて |
| `ETH_P_ATMFATE` | すべて |
| `ETH_P_PAE` | すべて |
| `ETH_P_AOE` | すべて |
| `ETH_P_8021_AD` | すべて |
| `ETH_P_802_EX1` | すべて |
| `ETH_P_TIPC` | すべて |
| `ETH_P_MACSEC` | すべて |
| `ETH_P_8021_AH` | すべて |
| `ETH_P_MVRP` | すべて |
| `ETH_P_1588` | すべて |
| `ETH_P_NCSI` | すべて |
| `ETH_P_PRP` | すべて |
| `ETH_P_FCOE` | すべて |
| `ETH_P_IBOE` | すべて |
| `ETH_P_TDLS` | すべて |
| `ETH_P_FIP` | すべて |
| `ETH_P_80221` | すべて |
| `ETH_P_HSR` | すべて |
| `ETH_P_NSH` | すべて |
| `ETH_P_LOOPBACK` | すべて |
| `ETH_P_QINQ1` | すべて |
| `ETH_P_QINQ2` | すべて |
| `ETH_P_QINQ3` | すべて |
| `ETH_P_EDSA` | すべて |
| `ETH_P_IFE` | すべて |
| `ETH_P_AFIUCV` | すべて |
| `ETH_P_8023_MIN` | すべて |
| `ETH_P_IPV6_HOP_BY_HOP` | すべて |
| `ETH_P_8023` | すべて |
| `ETH_P_AX25` | すべて |
| `ETH_P_ALL` | すべて |
| `ETH_P_8022` | すべて |
| `ETH_P_SNAP` | すべて |
| `ETH_P_DDCMP` | すべて |
| `ETH_P_WANPPP` | すべて |
| `ETH_P_PPPMP` | すべて |
| `ETH_P_LOCALTALK` | すべて |
| `ETH_P_CAN` | すべて |
| `ETH_P_CANFD` | すべて |
| `ETH_P_PPPTALK` | すべて |
| `ETH_P_TR8022` | すべて |
| `ETH_P_MOBITEX` | すべて |
| `ETH_P_CONTROL` | すべて |
| `ETH_P_IRDA` | すべて |
| `ETH_P_ECONET` | すべて |
| `ETH_P_HDLC` | すべて |
| `ETH_P_ARCNET` | すべて |
| `ETH_P_DSA` | すべて |
| `ETH_P_TRAILER` | すべて |
| `ETH_P_PHONET` | すべて |
| `ETH_P_IEEE802154` | すべて |
| `ETH_P_CAIF` | すべて |
| `ETH_P_XDSA` | すべて |
| `ETH_P_MAP` | すべて |

### `L4 protocols` {#l4-protocols}
L4 プロトコルは、サポートされているレイヤー 4 プロトコルです。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `IP_PROTO_IP` | すべて |
| `IP_PROTO_ICMP` | すべて |
| `IP_PROTO_IGMP` | すべて |
| `IP_PROTO_IPIP` | すべて |
| `IP_PROTO_TCP` | すべて |
| `IP_PROTO_EGP` | すべて |
| `IP_PROTO_IGP` | すべて |
| `IP_PROTO_PUP` | すべて |
| `IP_PROTO_UDP` | すべて |
| `IP_PROTO_IDP` | すべて |
| `IP_PROTO_TP` | すべて |
| `IP_PROTO_DCCP` | すべて |
| `IP_PROTO_IPV6` | すべて |
| `IP_PROTO_RSVP` | すべて |
| `IP_PROTO_GRE` | すべて |
| `IP_PROTO_ESP` | すべて |
| `IP_PROTO_AH` | すべて |
| `IP_PROTO_ICMPV6` | すべて |
| `IP_PROTO_MTP` | すべて |
| `IP_PROTO_BEETPH` | すべて |
| `IP_PROTO_ENCAP` | すべて |
| `IP_PROTO_PIM` | すべて |
| `IP_PROTO_COMP` | すべて |
| `IP_PROTO_SCTP` | すべて |
| `IP_PROTO_UDPLITE` | すべて |
| `IP_PROTO_MPLS` | すべて |
| `IP_PROTO_RAW` | すべて |



{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/threats/agent
