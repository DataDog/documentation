---
description: Workload Protection ルール向け Windows Agent の属性とヘルパー
disable_edit: true
further_reading:
- link: /security/cloud_workload_security/getting_started/
  tag: ドキュメント
  text: Datadog Workload Protection の概要
title: Windows Agent の属性とヘルパー
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-agent -->


<!-- このファイルは自動生成されています。scripts/templates フォルダーにあるファイルを編集してください -->

## Windows Agent の属性とヘルパー
このドキュメントでは、[Datadog の Security Language (SECL)][1] における Windows 属性とヘルパーについて説明します。

Windows 属性とヘルパーを使用するルールでは、以下のように OS のルールフィルターを含める必要があります。


{{< code-block lang="yaml" >}}
id: [...]
expression: [...]
filters:
  - os == "windows"

{{< /code-block >}}

## トリガー
トリガーは、システムで見られるアクティビティの種類に対応するイベントです。現在サポートされているトリガーは以下のとおりです。

| SECL イベント | タイプ | 定義 | Agent バージョン |
| ---------- | ---- | ---------- | ------------- |
| `change_permission` | レジストリ | 権限の変更が行われました | 7.55 |
| `create` | ファイル | ファイルが作成されました | 7.52 |
| `create_key` | レジストリ | レジストリキーが作成されました | 7.52 |
| `delete` | ファイル | ファイルが削除された | 7.54 |
| `delete_key` | レジストリ | レジストリキーが削除されました | 7.52 |
| `exec` | プロセス | プロセスが実行またはフォークされた | 7.27 |
| `exit` | プロセス | プロセスが終了した | 7.38 |
| `open_key` | レジストリ | レジストリキーが開かれました | 7.52 |
| `rename` | ファイル | ファイル名が変更されました | 7.54 |
| `set_key_value` | レジストリ | レジストリキーの値が設定されました | 7.52 |
| `write` | ファイル | ファイルに書き込みが行われました | 7.54 |

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
| [`container.runtime`](#container-runtime-doc) | Runtime managing the container |
| [`container.tags`](#container-tags-doc) | コンテナのタグ |
| [`event.hostname`](#event-hostname-doc) | Hostname associated with the event |
| [`event.origin`](#event-origin-doc) | Origin of the event |
| [`event.os`](#event-os-doc) | Operating system of the event |
| [`event.service`](#event-service-doc) | Service associated with the event |
| [`event.timestamp`](#event-timestamp-doc) | イベントのタイムスタンプ |
| [`process.ancestors.cmdline`](#common-process-cmdline-doc) | プロセスのコマンドライン |
| [`process.ancestors.container.id`](#common-process-container-id-doc) | コンテナ ID |
| [`process.ancestors.created_at`](#common-process-created_at-doc) | プロセス作成時のタイムスタンプ |
| [`process.ancestors.envp`](#common-process-envp-doc) | プロセスの環境変数 |
| [`process.ancestors.envs`](#common-process-envs-doc) | プロセスの環境変数名 |
| [`process.ancestors.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`process.ancestors.file.name.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`process.ancestors.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`process.ancestors.file.path.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`process.ancestors.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`process.ancestors.pid`](#common-pidcontext-pid-doc) | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |
| [`process.ancestors.ppid`](#common-process-ppid-doc) | 親プロセス ID |
| [`process.ancestors.user`](#common-process-user-doc) | ユーザー名 |
| [`process.ancestors.user_sid`](#common-process-user_sid-doc) | プロセスのユーザー SID |
| [`process.cmdline`](#common-process-cmdline-doc) | プロセスのコマンドライン |
| [`process.container.id`](#common-process-container-id-doc) | コンテナ ID |
| [`process.created_at`](#common-process-created_at-doc) | プロセス作成時のタイムスタンプ |
| [`process.envp`](#common-process-envp-doc) | プロセスの環境変数 |
| [`process.envs`](#common-process-envs-doc) | プロセスの環境変数名 |
| [`process.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`process.file.name.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`process.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`process.file.path.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`process.parent.cmdline`](#common-process-cmdline-doc) | プロセスのコマンドライン |
| [`process.parent.container.id`](#common-process-container-id-doc) | コンテナ ID |
| [`process.parent.created_at`](#common-process-created_at-doc) | プロセス作成時のタイムスタンプ |
| [`process.parent.envp`](#common-process-envp-doc) | プロセスの環境変数 |
| [`process.parent.envs`](#common-process-envs-doc) | プロセスの環境変数名 |
| [`process.parent.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`process.parent.file.name.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`process.parent.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`process.parent.file.path.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`process.parent.pid`](#common-pidcontext-pid-doc) | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |
| [`process.parent.ppid`](#common-process-ppid-doc) | 親プロセス ID |
| [`process.parent.user`](#common-process-user-doc) | ユーザー名 |
| [`process.parent.user_sid`](#common-process-user_sid-doc) | プロセスのユーザー SID |
| [`process.pid`](#common-pidcontext-pid-doc) | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |
| [`process.ppid`](#common-process-ppid-doc) | 親プロセス ID |
| [`process.user`](#common-process-user-doc) | ユーザー名 |
| [`process.user_sid`](#common-process-user_sid-doc) | プロセスのユーザー SID |

### イベント `change_permission`

権限の変更が行われました

| プロパティ | 定義 |
| -------- | ------------- |
| [`change_permission.new_sd`](#change_permission-new_sd-doc) | 変更後のオブジェクトの新しいセキュリティ記述子 |
| [`change_permission.old_sd`](#change_permission-old_sd-doc) | 変更前のオブジェクトの元のセキュリティ記述子 |
| [`change_permission.path`](#change_permission-path-doc) | 権限が変更されたオブジェクトの名前 |
| [`change_permission.type`](#change_permission-type-doc) | 権限が変更されたオブジェクトの種類 |
| [`change_permission.user_domain`](#change_permission-user_domain-doc) | 権限を変更したユーザーのドメイン名 |
| [`change_permission.username`](#change_permission-username-doc) | 権限変更を実行したユーザー名 |

### イベント `create`

ファイルが作成されました

| プロパティ | 定義 |
| -------- | ------------- |
| [`create.file.device_path`](#common-fimfileevent-device_path-doc) | ファイルのパス |
| [`create.file.device_path.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`create.file.name`](#common-fimfileevent-name-doc) | ファイルのベース名 |
| [`create.file.name.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`create.file.path`](#common-fimfileevent-path-doc) | ファイルのパス |
| [`create.file.path.length`](#common-string-length-doc) | 対応する要素の長さ |

### イベント `create_key`

レジストリキーが作成されました

| プロパティ | 定義 |
| -------- | ------------- |
| [`create.registry.key_name`](#common-registryevent-key_name-doc) | レジストリ名 |
| [`create.registry.key_name.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`create.registry.key_path`](#common-registryevent-key_path-doc) | レジストリパス |
| [`create.registry.key_path.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`create_key.registry.key_name`](#common-registryevent-key_name-doc) | レジストリ名 |
| [`create_key.registry.key_name.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`create_key.registry.key_path`](#common-registryevent-key_path-doc) | レジストリパス |
| [`create_key.registry.key_path.length`](#common-string-length-doc) | 対応する要素の長さ |

### イベント `delete`

ファイルが削除された

| プロパティ | 定義 |
| -------- | ------------- |
| [`delete.file.device_path`](#common-fimfileevent-device_path-doc) | ファイルのパス |
| [`delete.file.device_path.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`delete.file.name`](#common-fimfileevent-name-doc) | ファイルのベース名 |
| [`delete.file.name.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`delete.file.path`](#common-fimfileevent-path-doc) | ファイルのパス |
| [`delete.file.path.length`](#common-string-length-doc) | 対応する要素の長さ |

### イベント `delete_key`

レジストリキーが削除されました

| プロパティ | 定義 |
| -------- | ------------- |
| [`delete.registry.key_name`](#common-registryevent-key_name-doc) | レジストリ名 |
| [`delete.registry.key_name.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`delete.registry.key_path`](#common-registryevent-key_path-doc) | レジストリパス |
| [`delete.registry.key_path.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`delete_key.registry.key_name`](#common-registryevent-key_name-doc) | レジストリ名 |
| [`delete_key.registry.key_name.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`delete_key.registry.key_path`](#common-registryevent-key_path-doc) | レジストリパス |
| [`delete_key.registry.key_path.length`](#common-string-length-doc) | 対応する要素の長さ |

### イベント `exec`

プロセスが実行またはフォークされた

| プロパティ | 定義 |
| -------- | ------------- |
| [`exec.cmdline`](#common-process-cmdline-doc) | プロセスのコマンドライン |
| [`exec.container.id`](#common-process-container-id-doc) | コンテナ ID |
| [`exec.created_at`](#common-process-created_at-doc) | プロセス作成時のタイムスタンプ |
| [`exec.envp`](#common-process-envp-doc) | プロセスの環境変数 |
| [`exec.envs`](#common-process-envs-doc) | プロセスの環境変数名 |
| [`exec.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`exec.file.name.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`exec.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`exec.file.path.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`exec.pid`](#common-pidcontext-pid-doc) | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |
| [`exec.ppid`](#common-process-ppid-doc) | 親プロセス ID |
| [`exec.user`](#common-process-user-doc) | ユーザー名 |
| [`exec.user_sid`](#common-process-user_sid-doc) | プロセスのユーザー SID |

### イベント `exit`

プロセスが終了した

| プロパティ | 定義 |
| -------- | ------------- |
| [`exit.cause`](#exit-cause-doc) | プロセス終了の原因 (EXITED、SIGNALED、COREDUMPED のいずれか 1 つ) |
| [`exit.cmdline`](#common-process-cmdline-doc) | プロセスのコマンドライン |
| [`exit.code`](#exit-code-doc) | プロセスの終了コード、またはプロセスを終了させたシグナルの番号 |
| [`exit.container.id`](#common-process-container-id-doc) | コンテナ ID |
| [`exit.created_at`](#common-process-created_at-doc) | プロセス作成時のタイムスタンプ |
| [`exit.envp`](#common-process-envp-doc) | プロセスの環境変数 |
| [`exit.envs`](#common-process-envs-doc) | プロセスの環境変数名 |
| [`exit.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`exit.file.name.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`exit.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`exit.file.path.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`exit.pid`](#common-pidcontext-pid-doc) | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |
| [`exit.ppid`](#common-process-ppid-doc) | 親プロセス ID |
| [`exit.user`](#common-process-user-doc) | ユーザー名 |
| [`exit.user_sid`](#common-process-user_sid-doc) | プロセスのユーザー SID |

### イベント `open_key`

レジストリキーが開かれました

| プロパティ | 定義 |
| -------- | ------------- |
| [`open.registry.key_name`](#common-registryevent-key_name-doc) | レジストリ名 |
| [`open.registry.key_name.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`open.registry.key_path`](#common-registryevent-key_path-doc) | レジストリパス |
| [`open.registry.key_path.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`open_key.registry.key_name`](#common-registryevent-key_name-doc) | レジストリ名 |
| [`open_key.registry.key_name.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`open_key.registry.key_path`](#common-registryevent-key_path-doc) | レジストリパス |
| [`open_key.registry.key_path.length`](#common-string-length-doc) | 対応する要素の長さ |

### イベント `rename`

ファイル名が変更されました

| プロパティ | 定義 |
| -------- | ------------- |
| [`rename.file.destination.device_path`](#common-fimfileevent-device_path-doc) | ファイルのパス |
| [`rename.file.destination.device_path.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`rename.file.destination.name`](#common-fimfileevent-name-doc) | ファイルのベース名 |
| [`rename.file.destination.name.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`rename.file.destination.path`](#common-fimfileevent-path-doc) | ファイルのパス |
| [`rename.file.destination.path.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`rename.file.device_path`](#common-fimfileevent-device_path-doc) | ファイルのパス |
| [`rename.file.device_path.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`rename.file.name`](#common-fimfileevent-name-doc) | ファイルのベース名 |
| [`rename.file.name.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`rename.file.path`](#common-fimfileevent-path-doc) | ファイルのパス |
| [`rename.file.path.length`](#common-string-length-doc) | 対応する要素の長さ |

### イベント `set_key_value`

レジストリキーの値が設定されました

| プロパティ | 定義 |
| -------- | ------------- |
| [`set.registry.key_name`](#common-registryevent-key_name-doc) | レジストリ名 |
| [`set.registry.key_name.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`set.registry.key_path`](#common-registryevent-key_path-doc) | レジストリパス |
| [`set.registry.key_path.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`set.registry.value_name`](#common-setregistrykeyvalueevent-registry-value_name-doc) | レジストリ値名 |
| [`set.registry.value_name.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`set.value_name`](#common-setregistrykeyvalueevent-value_name-doc) | レジストリ値名 |
| [`set_key_value.registry.key_name`](#common-registryevent-key_name-doc) | レジストリ名 |
| [`set_key_value.registry.key_name.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`set_key_value.registry.key_path`](#common-registryevent-key_path-doc) | レジストリパス |
| [`set_key_value.registry.key_path.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`set_key_value.registry.value_name`](#common-setregistrykeyvalueevent-registry-value_name-doc) | レジストリ値名 |
| [`set_key_value.registry.value_name.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`set_key_value.value_name`](#common-setregistrykeyvalueevent-value_name-doc) | レジストリ値名 |

### イベント `write`

ファイルに書き込みが行われました

| プロパティ | 定義 |
| -------- | ------------- |
| [`write.file.device_path`](#common-fimfileevent-device_path-doc) | ファイルのパス |
| [`write.file.device_path.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`write.file.name`](#common-fimfileevent-name-doc) | ファイルのベース名 |
| [`write.file.name.length`](#common-string-length-doc) | 対応する要素の長さ |
| [`write.file.path`](#common-fimfileevent-path-doc) | ファイルのパス |
| [`write.file.path.length`](#common-string-length-doc) | 対応する要素の長さ |


## 属性ドキュメント


### `*.cmdline` {#common-process-cmdline-doc}
タイプ: 文字列

定義: プロセスのコマンドライン

`*.cmdline` には 5 個の有効なプレフィックスがあります。
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

`*.container.id` には 5 個の有効なプレフィックスがあります。
`exec` `exit` `process` `process.ancestors` `process.parent`


### `*.created_at` {#common-process-created_at-doc}
タイプ: 整数

定義: プロセス作成時のタイムスタンプ

`*.created_at` には 5 個の有効なプレフィックスがあります。
`exec` `exit` `process` `process.ancestors` `process.parent`


### `*.device_path` {#common-fimfileevent-device_path-doc}
タイプ: 文字列

定義: ファイルのパス

`*.device_path` には 5 個の有効なプレフィックスがあります。
`create.file` `delete.file` `rename.file` `rename.file.destination` `write.file`



例:

{{< code-block lang="javascript" >}}
create.file.device_path == "\device\harddisk1\cmd.bat"
{{< /code-block >}}

c:\cmd.bat にあるファイルが作成された場合にマッチします

### `*.envp` {#common-process-envp-doc}
タイプ: 文字列

定義: プロセスの環境変数

`*.envp` には 5 個の有効なプレフィックスがあります。
`exec` `exit` `process` `process.ancestors` `process.parent`


### `*.envs` {#common-process-envs-doc}
タイプ: 文字列

定義: プロセスの環境変数名

`*.envs` には 5 個の有効なプレフィックスがあります。
`exec` `exit` `process` `process.ancestors` `process.parent`


### `*.key_name` {#common-registryevent-key_name-doc}
タイプ: 文字列

定義: レジストリ名

`*.key_name` には 8 個の有効なプレフィックスがあります。
`create.registry` `create_key.registry` `delete.registry` `delete_key.registry` `open.registry` `open_key.registry` `set.registry` `set_key_value.registry`


### `*.key_path` {#common-registryevent-key_path-doc}
タイプ: 文字列

定義: レジストリパス

`*.key_path` には 8 個の有効なプレフィックスがあります。
`create.registry` `create_key.registry` `delete.registry` `delete_key.registry` `open.registry` `open_key.registry` `set.registry` `set_key_value.registry`


### `*.length` {#common-string-length-doc}
タイプ: 整数

定義: 対応する要素の長さ

`*.length` には 44 個の有効なプレフィックスがあります。
`create.file.device_path` `create.file.name` `create.file.path` `create.registry.key_name` `create.registry.key_path` `create_key.registry.key_name` `create_key.registry.key_path` `delete.file.device_path` `delete.file.name` `delete.file.path` `delete.registry.key_name` `delete.registry.key_path` `delete_key.registry.key_name` `delete_key.registry.key_path` `exec.file.name` `exec.file.path` `exit.file.name` `exit.file.path` `open.registry.key_name` `open.registry.key_path` `open_key.registry.key_name` `open_key.registry.key_path` `process.ancestors` `process.ancestors.file.name` `process.ancestors.file.path` `process.file.name` `process.file.path` `process.parent.file.name` `process.parent.file.path` `rename.file.destination.device_path` `rename.file.destination.name` `rename.file.destination.path` `rename.file.device_path` `rename.file.name` `rename.file.path` `set.registry.key_name` `set.registry.key_path` `set.registry.value_name` `set_key_value.registry.key_name` `set_key_value.registry.key_path` `set_key_value.registry.value_name` `write.file.device_path` `write.file.name` `write.file.path`


### `*.name` {#common-fileevent-name-doc}
タイプ: 文字列

定義: ファイルのベース名

`*.name` には 5 個の有効なプレフィックスがあります。
`exec.file` `exit.file` `process.ancestors.file` `process.file` `process.parent.file`



例:

{{< code-block lang="javascript" >}}
exec.file.name == "cmd.bat"
{{< /code-block >}}

任意の cmd.bat ファイルが実行された場合にマッチします

### `*.name` {#common-fimfileevent-name-doc}
タイプ: 文字列

定義: ファイルのベース名

`*.name` には 5 個の有効なプレフィックスがあります。
`create.file` `delete.file` `rename.file` `rename.file.destination` `write.file`



例:

{{< code-block lang="javascript" >}}
create.file.name == "cmd.bat"
{{< /code-block >}}

任意の cmd.bat ファイルが作成された場合にマッチします

### `*.path` {#common-fileevent-path-doc}
タイプ: 文字列

定義: ファイルのパス

`*.path` には 5 個の有効なプレフィックスがあります。
`exec.file` `exit.file` `process.ancestors.file` `process.file` `process.parent.file`



例:

{{< code-block lang="javascript" >}}
exec.file.path == "c:\cmd.bat"
{{< /code-block >}}

c:\cmd.bat にあるファイルが実行された場合にマッチします

### `*.path` {#common-fimfileevent-path-doc}
タイプ: 文字列

定義: ファイルのパス

`*.path` には 5 個の有効なプレフィックスがあります。
`create.file` `delete.file` `rename.file` `rename.file.destination` `write.file`



例:

{{< code-block lang="javascript" >}}
create.file.path == "c:\cmd.bat"
{{< /code-block >}}

c:\cmd.bat にあるファイルが作成された場合にマッチします

### `*.pid` {#common-pidcontext-pid-doc}
タイプ: 整数

定義: プロセスのプロセス ID (スレッドグループ ID とも呼ばれる)

`*.pid` には 5 個の有効なプレフィックスがあります。
`exec` `exit` `process` `process.ancestors` `process.parent`


### `*.ppid` {#common-process-ppid-doc}
タイプ: 整数

定義: 親プロセス ID

`*.ppid` には 5 個の有効なプレフィックスがあります。
`exec` `exit` `process` `process.ancestors` `process.parent`


### `*.registry.value_name` {#common-setregistrykeyvalueevent-registry-value_name-doc}
タイプ: 文字列

定義: レジストリ値名

`*.registry.value_name` には 2 個の有効なプレフィックスがあります。
`set` `set_key_value`


### `*.user` {#common-process-user-doc}
タイプ: 文字列

定義: ユーザー名

`*.user` には 5 個の有効なプレフィックスがあります。
`exec` `exit` `process` `process.ancestors` `process.parent`


### `*.user_sid` {#common-process-user_sid-doc}
タイプ: 文字列

定義: プロセスのユーザー SID

`*.user_sid` には 5 個の有効なプレフィックスがあります。
`exec` `exit` `process` `process.ancestors` `process.parent`


### `*.value_name` {#common-setregistrykeyvalueevent-value_name-doc}
タイプ: 文字列

定義: レジストリ値名

`*.value_name` には 2 個の有効なプレフィックスがあります。
`set` `set_key_value`


### `change_permission.new_sd` {#change_permission-new_sd-doc}
タイプ: 文字列

定義: 権限が変更されたオブジェクトの新しいセキュリティ記述子



### `change_permission.old_sd` {#change_permission-old_sd-doc}
タイプ: 文字列

定義: 権限が変更される前のオブジェクトの元のセキュリティ記述子



### `change_permission.path` {#change_permission-path-doc}
タイプ: 文字列

定義: 権限が変更されたオブジェクトの名前



### `change_permission.type` {#change_permission-type-doc}
タイプ: 文字列

定義: 権限が変更されたオブジェクトの種類



### `change_permission.user_domain` {#change_permission-user_domain-doc}
タイプ: 文字列

定義: 権限を変更したユーザーのドメイン名



### `change_permission.username` {#change_permission-username-doc}
タイプ: 文字列

定義: 権限変更を実行したユーザー名



### `container.created_at` {#container-created_at-doc}
タイプ: 整数

定義: コンテナ作成時のタイムスタンプ



### `container.id` {#container-id-doc}
タイプ: 文字列

定義: コンテナの ID



### `container.runtime` {#container-runtime-doc}
タイプ: 文字列

定義: コンテナを管理するランタイム



### `container.tags` {#container-tags-doc}
タイプ: 文字列

定義: コンテナのタグ



### `event.hostname` {#event-hostname-doc}
タイプ: 文字列

定義: イベントに関連付けられたホスト名



### `event.origin` {#event-origin-doc}
タイプ: 文字列

定義: イベントの発生元



### `event.os` {#event-os-doc}
タイプ: 文字列

定義: イベントが発生したオペレーティングシステム



### `event.service` {#event-service-doc}
タイプ: 文字列

定義: イベントに関連付けられたサービス



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
ブール定数はサポートされているブール定数です。

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

### `Network directions` {#network-directions}
Network directions は、ネットワーク パケットでサポートされている方向を表します。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `INGRESS` | すべて |
| `EGRESS` | すべて |



{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/threats/agent