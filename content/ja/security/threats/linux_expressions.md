---
description: Linux Agent attributes and helpers for CSM Threats Rules
disable_edit: true
further_reading:
- link: /security/cloud_workload_security/getting_started/
  tag: ドキュメント
  text: Get started with Datadog CSM Threats
title: Linux Agent attributes and helpers
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-agent -->


<!-- このファイルは自動生成されています。scripts/templates フォルダーにあるファイルを編集してください -->

## Linux Agent attributes and helpers
This documentation describes Linux attributes and helpers of the [Datadog's Security Language (SECL)][1].

## トリガー
トリガーは、システムで見られるアクティビティの種類に対応するイベントです。現在サポートされているトリガーは以下のとおりです。

| SECL イベント | タイプ | 定義 | Agent バージョン |
| ---------- | ---- | ---------- | ------------- |
| `bind` | ネットワーク | バインドが実行された | 7.37 |
| `bpf` | カーネル | BPF コマンドが実行された | 7.33 |
| `capset` | プロセス | あるプロセスが容量セットを変更した | 7.27 |
| `chdir` | ファイル | [Experimental] A process changed the current directory | 7.52 |
| `chmod` | ファイル | ファイルの権限が変更された | 7.27 |
| `chown` | ファイル | ファイルの所有者が変更された | 7.27 |
| `dns` | ネットワーク | DNS リクエストが送信された | 7.36 |
| `exec` | プロセス | プロセスが実行またはフォークされた | 7.27 |
| `exit` | プロセス | プロセスが終了した | 7.38 |
| `imds` | ネットワーク | An IMDS event was captured | 7.55 |
| `link` | ファイル | ファイルの新しい名前/エイリアスを作成する | 7.27 |
| `load_module` | カーネル | 新しいカーネルモジュールがロードされた | 7.35 |
| `mkdir` | ファイル | ディレクトリが作成された | 7.27 |
| `mmap` | カーネル | mmap コマンドが実行された | 7.35 |
| `mount` | ファイル | [実験] ファイルシステムがマウントされました | 7.42 |
| `mprotect` | カーネル | mprotect コマンドが実行された | 7.35 |
| `open` | ファイル | ファイルが開かれた | 7.27 |
| `ptrace` | カーネル | ptrace コマンドが実行された | 7.35 |
| `removexattr` | ファイル | 拡張属性を削除する | 7.27 |
| `rename` | ファイル | ファイル/ディレクトリの名前が変更された | 7.27 |
| `rmdir` | ファイル | ディレクトリが削除された | 7.27 |
| `selinux` | カーネル | SELinux 操作が実行された | 7.30 |
| `setgid` | プロセス | あるプロセスが有効な gid を変更した | 7.27 |
| `setuid` | プロセス | あるプロセスが有効な uid を変更した | 7.27 |
| `setxattr` | ファイル | 拡張属性を設定する | 7.27 |
| `signal` | プロセス | シグナルが送信された | 7.35 |
| `splice` | ファイル | splice コマンドが実行された | 7.36 |
| `unlink` | ファイル | ファイルが削除された | 7.27 |
| `unload_module` | カーネル | カーネルモジュールが削除された | 7.35 |
| `utimes` | ファイル | ファイルのアクセス/変更時間を変更する | 7.27 |

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

## CIDR と IP 範囲
SECL では、CIDR および IP のマッチングが可能です。`in`、`not in`、`allin` のような演算子と CIDR や IP の表記を組み合わせて使うことができます。

このようなルールは、次のように書くことができます。


{{< code-block lang="javascript" >}}
dns.question.name == "example.com" && network.destination.ip in [192.168.1.25, 10.0.0.0/24]

{{< /code-block >}}

## ヘルパー
SECL にはヘルパーが存在し、ユーザーは正規表現のような汎用的なテクニックに頼ることなく、高度なルールを書くことができます。

### コマンドライン引数
The *args_flags* and *args_options* are helpers to ease the writing of CSM Threats rules based on command line arguments.

*args_flags* は、1 つまたは 2 つのハイフン文字で始まり、関連する値を受け入れない引数を捕捉するために使用されます。

例:
* `version` は `cat --version` コマンドの *args_flags* の一部です。
* `netstat -ln` コマンドの *args_flags* には `l` と `n` の両方が含まれています。


*args_options* は、1 つまたは 2 つのハイフン文字で始まり、同じ引数として指定されるが '=' 文字で区切られた値、または次の引数として指定された値を受け入れる引数を捕捉するために使用されます。

例:
* `ls -T 8 --width=8` コマンドの *args_options* には `T=8` と `width=8` の両方が含まれています。
* `exec.args_options in [ r"s=.*\\" ]` can be used to detect `sudoedit` was launched with `-s` argument and a command that ends with a `\`

### ファイル権限

*file.mode* に加えて *file.rights* 属性が使用できるようになりました。*file.mode* はカーネルが設定した値を保持することができますが、*file.rights* はユーザーが設定した値のみを保持します。これらの権限は `chmod` コマンドにあるため、より馴染みがあるかもしれません。

## イベント属性

### すべてのイベントタイプに共通

| プロパティ | 定義 |
| -------- | ------------- |
| [`container.created_at`](#container-created_at-doc) | コンテナ作成時のタイムスタンプ |
| [`container.id`](#container-id-doc) | コンテナの ID |
| [`container.tags`](#container-tags-doc) | コンテナのタグ |
| [`event.async`](#event-async-doc) | syscall が非同期の場合、true |
| [`event.origin`](#event-origin-doc) | Origin of the event |
| [`event.os`](#event-os-doc) | Operating system of the event |
| [`event.service`](#event-service-doc) | Service associated with the event |
| [`event.timestamp`](#event-timestamp-doc) | イベントのタイムスタンプ |
| [`process.ancestors.args`](#common-process-args-doc) | プロセスの引数 (文字列。argv0 を除く) |
| [`process.ancestors.args_flags`](#common-process-args_flags-doc) | プロセス引数のフラグ |
| [`process.ancestors.args_options`](#common-process-args_options-doc) | オプションとしてのプロセスの引数 |
| [`process.ancestors.args_truncated`](#common-process-args_truncated-doc) | 引数の切り捨てのインジケーター |
| [`process.ancestors.argv`](#common-process-argv-doc) | プロセスの引数 (配列。argv0 を除く) |
| [`process.ancestors.argv0`](#common-process-argv0-doc) | プロセスの第一引数 |
| [`process.ancestors.cap_effective`](#common-credentials-cap_effective-doc) | プロセスの有効なケイパビリティセット |
| [`process.ancestors.cap_permitted`](#common-credentials-cap_permitted-doc) | プロセスの許可されたケイパビリティセット |
| [`process.ancestors.comm`](#common-process-comm-doc) | プロセスの Comm 属性 |
| [`process.ancestors.container.id`](#common-process-container-id-doc) | コンテナ ID |
| [`process.ancestors.created_at`](#common-process-created_at-doc) | プロセス作成時のタイムスタンプ |
| [`process.ancestors.egid`](#common-credentials-egid-doc) | プロセスの有効な GID |
| [`process.ancestors.egroup`](#common-credentials-egroup-doc) | プロセスの有効なグループ |
| [`process.ancestors.envp`](#common-process-envp-doc) | プロセスの環境変数 |
| [`process.ancestors.envs`](#common-process-envs-doc) | プロセスの環境変数名 |
| [`process.ancestors.envs_truncated`](#common-process-envs_truncated-doc) | 環境変数の切り捨てのインジケーター |
| [`process.ancestors.euid`](#common-credentials-euid-doc) | プロセスの有効な UID |
| [`process.ancestors.euser`](#common-credentials-euser-doc) | プロセスの有効なユーザー |
| [`process.ancestors.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`process.ancestors.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`process.ancestors.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`process.ancestors.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`process.ancestors.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`process.ancestors.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`process.ancestors.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`process.ancestors.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`process.ancestors.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`process.ancestors.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`process.ancestors.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`process.ancestors.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`process.ancestors.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`process.ancestors.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`process.ancestors.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`process.ancestors.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`process.ancestors.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`process.ancestors.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`process.ancestors.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`process.ancestors.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`process.ancestors.fsgid`](#common-credentials-fsgid-doc) | プロセスの FileSystem-gid |
| [`process.ancestors.fsgroup`](#common-credentials-fsgroup-doc) | プロセスの FileSystem-group |
| [`process.ancestors.fsuid`](#common-credentials-fsuid-doc) | プロセスの FileSystem-uid |
| [`process.ancestors.fsuser`](#common-credentials-fsuser-doc) | プロセスの FileSystem-user |
| [`process.ancestors.gid`](#common-credentials-gid-doc) | プロセスの GID |
| [`process.ancestors.group`](#common-credentials-group-doc) | プロセスのグループ |
| [`process.ancestors.interpreter.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`process.ancestors.interpreter.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`process.ancestors.interpreter.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`process.ancestors.interpreter.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`process.ancestors.interpreter.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`process.ancestors.interpreter.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`process.ancestors.interpreter.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`process.ancestors.interpreter.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`process.ancestors.interpreter.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`process.ancestors.interpreter.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`process.ancestors.interpreter.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`process.ancestors.interpreter.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`process.ancestors.interpreter.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`process.ancestors.interpreter.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`process.ancestors.interpreter.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`process.ancestors.interpreter.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`process.ancestors.interpreter.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`process.ancestors.interpreter.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`process.ancestors.interpreter.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`process.ancestors.interpreter.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`process.ancestors.is_kworker`](#common-pidcontext-is_kworker-doc) | プロセスが kworker であるかどうかを示します |
| [`process.ancestors.is_thread`](#common-process-is_thread-doc) | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |
| [`process.ancestors.pid`](#common-pidcontext-pid-doc) | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |
| [`process.ancestors.ppid`](#common-process-ppid-doc) | 親プロセス ID |
| [`process.ancestors.tid`](#common-pidcontext-tid-doc) | スレッドのスレッド ID |
| [`process.ancestors.tty_name`](#common-process-tty_name-doc) | プロセスに関連する TTY の名前 |
| [`process.ancestors.uid`](#common-credentials-uid-doc) | プロセスの UID |
| [`process.ancestors.user`](#common-credentials-user-doc) | プロセスのユーザー |
| [`process.ancestors.user_session.k8s_groups`](#common-usersessioncontext-k8s_groups-doc) | Kubernetes groups of the user that executed the process |
| [`process.ancestors.user_session.k8s_uid`](#common-usersessioncontext-k8s_uid-doc) | Kubernetes UID of the user that executed the process |
| [`process.ancestors.user_session.k8s_username`](#common-usersessioncontext-k8s_username-doc) | Kubernetes username of the user that executed the process |
| [`process.args`](#common-process-args-doc) | プロセスの引数 (文字列。argv0 を除く) |
| [`process.args_flags`](#common-process-args_flags-doc) | プロセス引数のフラグ |
| [`process.args_options`](#common-process-args_options-doc) | オプションとしてのプロセスの引数 |
| [`process.args_truncated`](#common-process-args_truncated-doc) | 引数の切り捨てのインジケーター |
| [`process.argv`](#common-process-argv-doc) | プロセスの引数 (配列。argv0 を除く) |
| [`process.argv0`](#common-process-argv0-doc) | プロセスの第一引数 |
| [`process.cap_effective`](#common-credentials-cap_effective-doc) | プロセスの有効なケイパビリティセット |
| [`process.cap_permitted`](#common-credentials-cap_permitted-doc) | プロセスの許可されたケイパビリティセット |
| [`process.comm`](#common-process-comm-doc) | プロセスの Comm 属性 |
| [`process.container.id`](#common-process-container-id-doc) | コンテナ ID |
| [`process.created_at`](#common-process-created_at-doc) | プロセス作成時のタイムスタンプ |
| [`process.egid`](#common-credentials-egid-doc) | プロセスの有効な GID |
| [`process.egroup`](#common-credentials-egroup-doc) | プロセスの有効なグループ |
| [`process.envp`](#common-process-envp-doc) | プロセスの環境変数 |
| [`process.envs`](#common-process-envs-doc) | プロセスの環境変数名 |
| [`process.envs_truncated`](#common-process-envs_truncated-doc) | 環境変数の切り捨てのインジケーター |
| [`process.euid`](#common-credentials-euid-doc) | プロセスの有効な UID |
| [`process.euser`](#common-credentials-euser-doc) | プロセスの有効なユーザー |
| [`process.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`process.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`process.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`process.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`process.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`process.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`process.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`process.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`process.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`process.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`process.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`process.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`process.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`process.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`process.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`process.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`process.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`process.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`process.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`process.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`process.fsgid`](#common-credentials-fsgid-doc) | プロセスの FileSystem-gid |
| [`process.fsgroup`](#common-credentials-fsgroup-doc) | プロセスの FileSystem-group |
| [`process.fsuid`](#common-credentials-fsuid-doc) | プロセスの FileSystem-uid |
| [`process.fsuser`](#common-credentials-fsuser-doc) | プロセスの FileSystem-user |
| [`process.gid`](#common-credentials-gid-doc) | プロセスの GID |
| [`process.group`](#common-credentials-group-doc) | プロセスのグループ |
| [`process.interpreter.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`process.interpreter.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`process.interpreter.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`process.interpreter.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`process.interpreter.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`process.interpreter.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`process.interpreter.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`process.interpreter.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`process.interpreter.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`process.interpreter.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`process.interpreter.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`process.interpreter.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`process.interpreter.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`process.interpreter.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`process.interpreter.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`process.interpreter.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`process.interpreter.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`process.interpreter.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`process.interpreter.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`process.interpreter.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`process.is_kworker`](#common-pidcontext-is_kworker-doc) | プロセスが kworker であるかどうかを示します |
| [`process.is_thread`](#common-process-is_thread-doc) | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |
| [`process.parent.args`](#common-process-args-doc) | プロセスの引数 (文字列。argv0 を除く) |
| [`process.parent.args_flags`](#common-process-args_flags-doc) | プロセス引数のフラグ |
| [`process.parent.args_options`](#common-process-args_options-doc) | オプションとしてのプロセスの引数 |
| [`process.parent.args_truncated`](#common-process-args_truncated-doc) | 引数の切り捨てのインジケーター |
| [`process.parent.argv`](#common-process-argv-doc) | プロセスの引数 (配列。argv0 を除く) |
| [`process.parent.argv0`](#common-process-argv0-doc) | プロセスの第一引数 |
| [`process.parent.cap_effective`](#common-credentials-cap_effective-doc) | プロセスの有効なケイパビリティセット |
| [`process.parent.cap_permitted`](#common-credentials-cap_permitted-doc) | プロセスの許可されたケイパビリティセット |
| [`process.parent.comm`](#common-process-comm-doc) | プロセスの Comm 属性 |
| [`process.parent.container.id`](#common-process-container-id-doc) | コンテナ ID |
| [`process.parent.created_at`](#common-process-created_at-doc) | プロセス作成時のタイムスタンプ |
| [`process.parent.egid`](#common-credentials-egid-doc) | プロセスの有効な GID |
| [`process.parent.egroup`](#common-credentials-egroup-doc) | プロセスの有効なグループ |
| [`process.parent.envp`](#common-process-envp-doc) | プロセスの環境変数 |
| [`process.parent.envs`](#common-process-envs-doc) | プロセスの環境変数名 |
| [`process.parent.envs_truncated`](#common-process-envs_truncated-doc) | 環境変数の切り捨てのインジケーター |
| [`process.parent.euid`](#common-credentials-euid-doc) | プロセスの有効な UID |
| [`process.parent.euser`](#common-credentials-euser-doc) | プロセスの有効なユーザー |
| [`process.parent.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`process.parent.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`process.parent.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`process.parent.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`process.parent.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`process.parent.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`process.parent.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`process.parent.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`process.parent.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`process.parent.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`process.parent.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`process.parent.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`process.parent.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`process.parent.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`process.parent.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`process.parent.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`process.parent.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`process.parent.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`process.parent.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`process.parent.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`process.parent.fsgid`](#common-credentials-fsgid-doc) | プロセスの FileSystem-gid |
| [`process.parent.fsgroup`](#common-credentials-fsgroup-doc) | プロセスの FileSystem-group |
| [`process.parent.fsuid`](#common-credentials-fsuid-doc) | プロセスの FileSystem-uid |
| [`process.parent.fsuser`](#common-credentials-fsuser-doc) | プロセスの FileSystem-user |
| [`process.parent.gid`](#common-credentials-gid-doc) | プロセスの GID |
| [`process.parent.group`](#common-credentials-group-doc) | プロセスのグループ |
| [`process.parent.interpreter.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`process.parent.interpreter.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`process.parent.interpreter.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`process.parent.interpreter.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`process.parent.interpreter.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`process.parent.interpreter.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`process.parent.interpreter.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`process.parent.interpreter.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`process.parent.interpreter.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`process.parent.interpreter.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`process.parent.interpreter.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`process.parent.interpreter.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`process.parent.interpreter.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`process.parent.interpreter.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`process.parent.interpreter.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`process.parent.interpreter.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`process.parent.interpreter.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`process.parent.interpreter.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`process.parent.interpreter.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`process.parent.interpreter.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`process.parent.is_kworker`](#common-pidcontext-is_kworker-doc) | プロセスが kworker であるかどうかを示します |
| [`process.parent.is_thread`](#common-process-is_thread-doc) | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |
| [`process.parent.pid`](#common-pidcontext-pid-doc) | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |
| [`process.parent.ppid`](#common-process-ppid-doc) | 親プロセス ID |
| [`process.parent.tid`](#common-pidcontext-tid-doc) | スレッドのスレッド ID |
| [`process.parent.tty_name`](#common-process-tty_name-doc) | プロセスに関連する TTY の名前 |
| [`process.parent.uid`](#common-credentials-uid-doc) | プロセスの UID |
| [`process.parent.user`](#common-credentials-user-doc) | プロセスのユーザー |
| [`process.parent.user_session.k8s_groups`](#common-usersessioncontext-k8s_groups-doc) | Kubernetes groups of the user that executed the process |
| [`process.parent.user_session.k8s_uid`](#common-usersessioncontext-k8s_uid-doc) | Kubernetes UID of the user that executed the process |
| [`process.parent.user_session.k8s_username`](#common-usersessioncontext-k8s_username-doc) | Kubernetes username of the user that executed the process |
| [`process.pid`](#common-pidcontext-pid-doc) | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |
| [`process.ppid`](#common-process-ppid-doc) | 親プロセス ID |
| [`process.tid`](#common-pidcontext-tid-doc) | スレッドのスレッド ID |
| [`process.tty_name`](#common-process-tty_name-doc) | プロセスに関連する TTY の名前 |
| [`process.uid`](#common-credentials-uid-doc) | プロセスの UID |
| [`process.user`](#common-credentials-user-doc) | プロセスのユーザー |
| [`process.user_session.k8s_groups`](#common-usersessioncontext-k8s_groups-doc) | Kubernetes groups of the user that executed the process |
| [`process.user_session.k8s_uid`](#common-usersessioncontext-k8s_uid-doc) | Kubernetes UID of the user that executed the process |
| [`process.user_session.k8s_username`](#common-usersessioncontext-k8s_username-doc) | Kubernetes username of the user that executed the process |

### イベント `bind`

バインドが実行された

| プロパティ | 定義 |
| -------- | ------------- |
| [`bind.addr.family`](#bind-addr-family-doc) | アドレスファミリー |
| [`bind.addr.ip`](#common-ipportcontext-ip-doc) | IP アドレス |
| [`bind.addr.port`](#common-ipportcontext-port-doc) | ポート番号 |
| [`bind.retval`](#common-syscallevent-retval-doc) | syscall の戻り値 |

### イベント `bpf`

BPF コマンドが実行された

| プロパティ | 定義 |
| -------- | ------------- |
| [`bpf.cmd`](#bpf-cmd-doc) | BPF コマンド名 |
| [`bpf.map.name`](#bpf-map-name-doc) | eBPF マップの名前 (7.35 で追加) |
| [`bpf.map.type`](#bpf-map-type-doc) | eBPF マップのタイプ |
| [`bpf.prog.attach_type`](#bpf-prog-attach_type-doc) | eBPF プログラムのアタッチタイプ |
| [`bpf.prog.helpers`](#bpf-prog-helpers-doc) | eBPF プログラムが使用する eBPF ヘルパー (7.35 で追加) |
| [`bpf.prog.name`](#bpf-prog-name-doc) | eBPF プログラムの名前 (7.35 で追加) |
| [`bpf.prog.tag`](#bpf-prog-tag-doc) | eBPF プログラムのハッシュ (sha1) (7.35 で追加) |
| [`bpf.prog.type`](#bpf-prog-type-doc) | eBPF プログラムのタイプ |
| [`bpf.retval`](#common-syscallevent-retval-doc) | syscall の戻り値 |

### イベント `capset`

あるプロセスが容量セットを変更した

| プロパティ | 定義 |
| -------- | ------------- |
| [`capset.cap_effective`](#capset-cap_effective-doc) | プロセスの有効なケイパビリティセット |
| [`capset.cap_permitted`](#capset-cap_permitted-doc) | プロセスの許可されたケイパビリティセット |

### Event `chdir`

_このイベントタイプは実験的なものであり、将来的に変更される可能性があります。_

A process changed the current directory

| プロパティ | 定義 |
| -------- | ------------- |
| [`chdir.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`chdir.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`chdir.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`chdir.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`chdir.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`chdir.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`chdir.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`chdir.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`chdir.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`chdir.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`chdir.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`chdir.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`chdir.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`chdir.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`chdir.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`chdir.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`chdir.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`chdir.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`chdir.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`chdir.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`chdir.retval`](#common-syscallevent-retval-doc) | syscall の戻り値 |
| [`chdir.syscall.path`](#chdir-syscall-path-doc) | path argument of the syscall |

### イベント `chmod`

ファイルの権限が変更された

| プロパティ | 定義 |
| -------- | ------------- |
| [`chmod.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`chmod.file.destination.mode`](#chmod-file-destination-mode-doc) | chmod されたファイルの新しいモード |
| [`chmod.file.destination.rights`](#chmod-file-destination-rights-doc) | chmod されたファイルの新しい権限 |
| [`chmod.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`chmod.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`chmod.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`chmod.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`chmod.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`chmod.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`chmod.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`chmod.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`chmod.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`chmod.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`chmod.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`chmod.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`chmod.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`chmod.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`chmod.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`chmod.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`chmod.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`chmod.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`chmod.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`chmod.retval`](#common-syscallevent-retval-doc) | syscall の戻り値 |
| [`chmod.syscall.mode`](#chmod-syscall-mode-doc) | mode argument of the syscall |
| [`chmod.syscall.path`](#chmod-syscall-path-doc) | path argument of the syscall |

### イベント `chown`

ファイルの所有者が変更された

| プロパティ | 定義 |
| -------- | ------------- |
| [`chown.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`chown.file.destination.gid`](#chown-file-destination-gid-doc) | chown されたファイルの所有者の新しい GID |
| [`chown.file.destination.group`](#chown-file-destination-group-doc) | chown されたファイルの所有者の新しいグループ |
| [`chown.file.destination.uid`](#chown-file-destination-uid-doc) | chown されたファイルの所有者の新しい UID |
| [`chown.file.destination.user`](#chown-file-destination-user-doc) | chown されたファイルの所有者の新しいユーザー |
| [`chown.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`chown.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`chown.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`chown.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`chown.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`chown.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`chown.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`chown.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`chown.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`chown.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`chown.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`chown.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`chown.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`chown.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`chown.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`chown.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`chown.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`chown.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`chown.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`chown.retval`](#common-syscallevent-retval-doc) | syscall の戻り値 |

### イベント `dns`

DNS リクエストが送信された

| プロパティ | 定義 |
| -------- | ------------- |
| [`dns.id`](#dns-id-doc) | [実験] DNS リクエスト ID |
| [`dns.question.class`](#dns-question-class-doc) | DNS の質問で調べたクラス |
| [`dns.question.count`](#dns-question-count-doc) | DNS リクエストの質問数の合計 |
| [`dns.question.length`](#dns-question-length-doc) | DNS リクエストの合計サイズ (バイト) |
| [`dns.question.name`](#dns-question-name-doc) | クエリ対象のドメイン名 |
| [`dns.question.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`dns.question.type`](#dns-question-type-doc) | DNS の質問タイプを指定する 2 オクテットのコード |
| [`network.destination.ip`](#common-ipportcontext-ip-doc) | IP アドレス |
| [`network.destination.port`](#common-ipportcontext-port-doc) | ポート番号 |
| [`network.device.ifindex`](#network-device-ifindex-doc) | インターフェイス ifindex |
| [`network.device.ifname`](#network-device-ifname-doc) | インターフェイス ifname |
| [`network.l3_protocol`](#network-l3_protocol-doc) | ネットワークパケットの l3 プロトコル |
| [`network.l4_protocol`](#network-l4_protocol-doc) | ネットワークパケットの l4 プロトコル |
| [`network.size`](#network-size-doc) | ネットワークパケットのバイト数 |
| [`network.source.ip`](#common-ipportcontext-ip-doc) | IP アドレス |
| [`network.source.port`](#common-ipportcontext-port-doc) | ポート番号 |

### イベント `exec`

プロセスが実行またはフォークされた

| プロパティ | 定義 |
| -------- | ------------- |
| [`exec.args`](#common-process-args-doc) | プロセスの引数 (文字列。argv0 を除く) |
| [`exec.args_flags`](#common-process-args_flags-doc) | プロセス引数のフラグ |
| [`exec.args_options`](#common-process-args_options-doc) | オプションとしてのプロセスの引数 |
| [`exec.args_truncated`](#common-process-args_truncated-doc) | 引数の切り捨てのインジケーター |
| [`exec.argv`](#common-process-argv-doc) | プロセスの引数 (配列。argv0 を除く) |
| [`exec.argv0`](#common-process-argv0-doc) | プロセスの第一引数 |
| [`exec.cap_effective`](#common-credentials-cap_effective-doc) | プロセスの有効なケイパビリティセット |
| [`exec.cap_permitted`](#common-credentials-cap_permitted-doc) | プロセスの許可されたケイパビリティセット |
| [`exec.comm`](#common-process-comm-doc) | プロセスの Comm 属性 |
| [`exec.container.id`](#common-process-container-id-doc) | コンテナ ID |
| [`exec.created_at`](#common-process-created_at-doc) | プロセス作成時のタイムスタンプ |
| [`exec.egid`](#common-credentials-egid-doc) | プロセスの有効な GID |
| [`exec.egroup`](#common-credentials-egroup-doc) | プロセスの有効なグループ |
| [`exec.envp`](#common-process-envp-doc) | プロセスの環境変数 |
| [`exec.envs`](#common-process-envs-doc) | プロセスの環境変数名 |
| [`exec.envs_truncated`](#common-process-envs_truncated-doc) | 環境変数の切り捨てのインジケーター |
| [`exec.euid`](#common-credentials-euid-doc) | プロセスの有効な UID |
| [`exec.euser`](#common-credentials-euser-doc) | プロセスの有効なユーザー |
| [`exec.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`exec.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`exec.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`exec.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`exec.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`exec.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`exec.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`exec.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`exec.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`exec.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`exec.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`exec.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`exec.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`exec.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`exec.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`exec.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`exec.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`exec.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`exec.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`exec.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`exec.fsgid`](#common-credentials-fsgid-doc) | プロセスの FileSystem-gid |
| [`exec.fsgroup`](#common-credentials-fsgroup-doc) | プロセスの FileSystem-group |
| [`exec.fsuid`](#common-credentials-fsuid-doc) | プロセスの FileSystem-uid |
| [`exec.fsuser`](#common-credentials-fsuser-doc) | プロセスの FileSystem-user |
| [`exec.gid`](#common-credentials-gid-doc) | プロセスの GID |
| [`exec.group`](#common-credentials-group-doc) | プロセスのグループ |
| [`exec.interpreter.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`exec.interpreter.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`exec.interpreter.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`exec.interpreter.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`exec.interpreter.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`exec.interpreter.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`exec.interpreter.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`exec.interpreter.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`exec.interpreter.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`exec.interpreter.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`exec.interpreter.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`exec.interpreter.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`exec.interpreter.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`exec.interpreter.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`exec.interpreter.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`exec.interpreter.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`exec.interpreter.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`exec.interpreter.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`exec.interpreter.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`exec.interpreter.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`exec.is_kworker`](#common-pidcontext-is_kworker-doc) | プロセスが kworker であるかどうかを示します |
| [`exec.is_thread`](#common-process-is_thread-doc) | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |
| [`exec.pid`](#common-pidcontext-pid-doc) | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |
| [`exec.ppid`](#common-process-ppid-doc) | 親プロセス ID |
| [`exec.syscall.path`](#exec-syscall-path-doc) | path argument of the syscall |
| [`exec.tid`](#common-pidcontext-tid-doc) | スレッドのスレッド ID |
| [`exec.tty_name`](#common-process-tty_name-doc) | プロセスに関連する TTY の名前 |
| [`exec.uid`](#common-credentials-uid-doc) | プロセスの UID |
| [`exec.user`](#common-credentials-user-doc) | プロセスのユーザー |
| [`exec.user_session.k8s_groups`](#common-usersessioncontext-k8s_groups-doc) | Kubernetes groups of the user that executed the process |
| [`exec.user_session.k8s_uid`](#common-usersessioncontext-k8s_uid-doc) | Kubernetes UID of the user that executed the process |
| [`exec.user_session.k8s_username`](#common-usersessioncontext-k8s_username-doc) | Kubernetes username of the user that executed the process |

### イベント `exit`

プロセスが終了した

| プロパティ | 定義 |
| -------- | ------------- |
| [`exit.args`](#common-process-args-doc) | プロセスの引数 (文字列。argv0 を除く) |
| [`exit.args_flags`](#common-process-args_flags-doc) | プロセス引数のフラグ |
| [`exit.args_options`](#common-process-args_options-doc) | オプションとしてのプロセスの引数 |
| [`exit.args_truncated`](#common-process-args_truncated-doc) | 引数の切り捨てのインジケーター |
| [`exit.argv`](#common-process-argv-doc) | プロセスの引数 (配列。argv0 を除く) |
| [`exit.argv0`](#common-process-argv0-doc) | プロセスの第一引数 |
| [`exit.cap_effective`](#common-credentials-cap_effective-doc) | プロセスの有効なケイパビリティセット |
| [`exit.cap_permitted`](#common-credentials-cap_permitted-doc) | プロセスの許可されたケイパビリティセット |
| [`exit.cause`](#exit-cause-doc) | プロセス終了の原因 (EXITED、SIGNALED、COREDUMPED のいずれか 1 つ) |
| [`exit.code`](#exit-code-doc) | プロセスの終了コード、またはプロセスを終了させたシグナルの番号 |
| [`exit.comm`](#common-process-comm-doc) | プロセスの Comm 属性 |
| [`exit.container.id`](#common-process-container-id-doc) | コンテナ ID |
| [`exit.created_at`](#common-process-created_at-doc) | プロセス作成時のタイムスタンプ |
| [`exit.egid`](#common-credentials-egid-doc) | プロセスの有効な GID |
| [`exit.egroup`](#common-credentials-egroup-doc) | プロセスの有効なグループ |
| [`exit.envp`](#common-process-envp-doc) | プロセスの環境変数 |
| [`exit.envs`](#common-process-envs-doc) | プロセスの環境変数名 |
| [`exit.envs_truncated`](#common-process-envs_truncated-doc) | 環境変数の切り捨てのインジケーター |
| [`exit.euid`](#common-credentials-euid-doc) | プロセスの有効な UID |
| [`exit.euser`](#common-credentials-euser-doc) | プロセスの有効なユーザー |
| [`exit.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`exit.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`exit.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`exit.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`exit.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`exit.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`exit.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`exit.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`exit.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`exit.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`exit.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`exit.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`exit.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`exit.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`exit.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`exit.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`exit.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`exit.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`exit.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`exit.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`exit.fsgid`](#common-credentials-fsgid-doc) | プロセスの FileSystem-gid |
| [`exit.fsgroup`](#common-credentials-fsgroup-doc) | プロセスの FileSystem-group |
| [`exit.fsuid`](#common-credentials-fsuid-doc) | プロセスの FileSystem-uid |
| [`exit.fsuser`](#common-credentials-fsuser-doc) | プロセスの FileSystem-user |
| [`exit.gid`](#common-credentials-gid-doc) | プロセスの GID |
| [`exit.group`](#common-credentials-group-doc) | プロセスのグループ |
| [`exit.interpreter.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`exit.interpreter.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`exit.interpreter.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`exit.interpreter.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`exit.interpreter.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`exit.interpreter.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`exit.interpreter.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`exit.interpreter.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`exit.interpreter.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`exit.interpreter.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`exit.interpreter.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`exit.interpreter.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`exit.interpreter.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`exit.interpreter.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`exit.interpreter.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`exit.interpreter.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`exit.interpreter.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`exit.interpreter.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`exit.interpreter.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`exit.interpreter.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`exit.is_kworker`](#common-pidcontext-is_kworker-doc) | プロセスが kworker であるかどうかを示します |
| [`exit.is_thread`](#common-process-is_thread-doc) | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |
| [`exit.pid`](#common-pidcontext-pid-doc) | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |
| [`exit.ppid`](#common-process-ppid-doc) | 親プロセス ID |
| [`exit.tid`](#common-pidcontext-tid-doc) | スレッドのスレッド ID |
| [`exit.tty_name`](#common-process-tty_name-doc) | プロセスに関連する TTY の名前 |
| [`exit.uid`](#common-credentials-uid-doc) | プロセスの UID |
| [`exit.user`](#common-credentials-user-doc) | プロセスのユーザー |
| [`exit.user_session.k8s_groups`](#common-usersessioncontext-k8s_groups-doc) | Kubernetes groups of the user that executed the process |
| [`exit.user_session.k8s_uid`](#common-usersessioncontext-k8s_uid-doc) | Kubernetes UID of the user that executed the process |
| [`exit.user_session.k8s_username`](#common-usersessioncontext-k8s_username-doc) | Kubernetes username of the user that executed the process |

### Event `imds`

An IMDS event was captured

| プロパティ | 定義 |
| -------- | ------------- |
| [`imds.aws.is_imds_v2`](#imds-aws-is_imds_v2-doc) | a boolean which specifies if the IMDS event follows IMDSv1 or IMDSv2 conventions |
| [`imds.aws.security_credentials.type`](#imds-aws-security_credentials-type-doc) | the security credentials type |
| [`imds.cloud_provider`](#imds-cloud_provider-doc) | the intended cloud provider of the IMDS event |
| [`imds.host`](#imds-host-doc) | the host of the HTTP protocol |
| [`imds.server`](#imds-server-doc) | the server header of a response |
| [`imds.type`](#imds-type-doc) | the type of IMDS event |
| [`imds.url`](#imds-url-doc) | the queried IMDS URL |
| [`imds.user_agent`](#imds-user_agent-doc) | the user agent of the HTTP client |

### イベント `link`

ファイルの新しい名前/エイリアスを作成する

| プロパティ | 定義 |
| -------- | ------------- |
| [`link.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`link.file.destination.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`link.file.destination.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`link.file.destination.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`link.file.destination.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`link.file.destination.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`link.file.destination.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`link.file.destination.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`link.file.destination.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`link.file.destination.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`link.file.destination.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`link.file.destination.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`link.file.destination.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`link.file.destination.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`link.file.destination.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`link.file.destination.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`link.file.destination.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`link.file.destination.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`link.file.destination.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`link.file.destination.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`link.file.destination.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`link.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`link.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`link.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`link.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`link.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`link.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`link.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`link.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`link.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`link.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`link.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`link.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`link.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`link.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`link.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`link.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`link.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`link.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`link.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`link.retval`](#common-syscallevent-retval-doc) | syscall の戻り値 |

### イベント `load_module`

新しいカーネルモジュールがロードされた

| プロパティ | 定義 |
| -------- | ------------- |
| [`load_module.args`](#load_module-args-doc) | 新しいカーネルモジュールのパラメーター (文字列) |
| [`load_module.args_truncated`](#load_module-args_truncated-doc) | 引数が切り捨てられたか否かを示します |
| [`load_module.argv`](#load_module-argv-doc) | 新しいカーネルモジュールのパラメーター (配列) |
| [`load_module.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`load_module.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`load_module.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`load_module.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`load_module.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`load_module.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`load_module.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`load_module.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`load_module.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`load_module.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`load_module.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`load_module.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`load_module.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`load_module.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`load_module.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`load_module.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`load_module.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`load_module.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`load_module.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`load_module.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`load_module.loaded_from_memory`](#load_module-loaded_from_memory-doc) | カーネルモジュールがメモリからロードされたかどうかを示す |
| [`load_module.name`](#load_module-name-doc) | 新しいカーネルモジュールの名前 |
| [`load_module.retval`](#common-syscallevent-retval-doc) | syscall の戻り値 |

### イベント `mkdir`

ディレクトリが作成された

| プロパティ | 定義 |
| -------- | ------------- |
| [`mkdir.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`mkdir.file.destination.mode`](#mkdir-file-destination-mode-doc) | 新しいディレクトリのモード |
| [`mkdir.file.destination.rights`](#mkdir-file-destination-rights-doc) | 新しいディレクトリの権限 |
| [`mkdir.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`mkdir.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`mkdir.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`mkdir.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`mkdir.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`mkdir.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`mkdir.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`mkdir.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`mkdir.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`mkdir.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`mkdir.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`mkdir.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`mkdir.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`mkdir.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`mkdir.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`mkdir.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`mkdir.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`mkdir.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`mkdir.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`mkdir.retval`](#common-syscallevent-retval-doc) | syscall の戻り値 |

### イベント `mmap`

mmap コマンドが実行された

| プロパティ | 定義 |
| -------- | ------------- |
| [`mmap.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`mmap.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`mmap.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`mmap.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`mmap.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`mmap.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`mmap.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`mmap.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`mmap.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`mmap.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`mmap.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`mmap.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`mmap.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`mmap.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`mmap.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`mmap.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`mmap.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`mmap.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`mmap.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`mmap.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`mmap.flags`](#mmap-flags-doc) | メモリセグメントフラグ |
| [`mmap.protection`](#mmap-protection-doc) | メモリセグメント保護 |
| [`mmap.retval`](#common-syscallevent-retval-doc) | syscall の戻り値 |

### イベント `mount`

_このイベントタイプは実験的なものであり、将来的に変更される可能性があります。_

ファイルシステムがマウントされました

| プロパティ | 定義 |
| -------- | ------------- |
| [`mount.fs_type`](#mount-fs_type-doc) | マウントされたファイルシステムの種類 |
| [`mount.mountpoint.path`](#mount-mountpoint-path-doc) | マウントポイントのパス |
| [`mount.retval`](#common-syscallevent-retval-doc) | syscall の戻り値 |
| [`mount.root.path`](#mount-root-path-doc) | Root path of the mount |
| [`mount.source.path`](#mount-source-path-doc) | バインドマウントのソースパス |

### イベント `mprotect`

mprotect コマンドが実行された

| プロパティ | 定義 |
| -------- | ------------- |
| [`mprotect.req_protection`](#mprotect-req_protection-doc) | 新規メモリセグメント保護 |
| [`mprotect.retval`](#common-syscallevent-retval-doc) | syscall の戻り値 |
| [`mprotect.vm_protection`](#mprotect-vm_protection-doc) | 初期メモリセグメント保護 |

### イベント `open`

ファイルが開かれた

| プロパティ | 定義 |
| -------- | ------------- |
| [`open.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`open.file.destination.mode`](#open-file-destination-mode-doc) | 作成されたファイルのモード |
| [`open.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`open.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`open.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`open.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`open.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`open.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`open.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`open.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`open.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`open.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`open.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`open.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`open.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`open.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`open.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`open.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`open.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`open.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`open.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`open.flags`](#open-flags-doc) | ファイルを開く際に使用するフラグ |
| [`open.retval`](#common-syscallevent-retval-doc) | syscall の戻り値 |

### イベント `ptrace`

ptrace コマンドが実行された

| プロパティ | 定義 |
| -------- | ------------- |
| [`ptrace.request`](#ptrace-request-doc) | ptrace リクエスト |
| [`ptrace.retval`](#common-syscallevent-retval-doc) | syscall の戻り値 |
| [`ptrace.tracee.ancestors.args`](#common-process-args-doc) | プロセスの引数 (文字列。argv0 を除く) |
| [`ptrace.tracee.ancestors.args_flags`](#common-process-args_flags-doc) | プロセス引数のフラグ |
| [`ptrace.tracee.ancestors.args_options`](#common-process-args_options-doc) | オプションとしてのプロセスの引数 |
| [`ptrace.tracee.ancestors.args_truncated`](#common-process-args_truncated-doc) | 引数の切り捨てのインジケーター |
| [`ptrace.tracee.ancestors.argv`](#common-process-argv-doc) | プロセスの引数 (配列。argv0 を除く) |
| [`ptrace.tracee.ancestors.argv0`](#common-process-argv0-doc) | プロセスの第一引数 |
| [`ptrace.tracee.ancestors.cap_effective`](#common-credentials-cap_effective-doc) | プロセスの有効なケイパビリティセット |
| [`ptrace.tracee.ancestors.cap_permitted`](#common-credentials-cap_permitted-doc) | プロセスの許可されたケイパビリティセット |
| [`ptrace.tracee.ancestors.comm`](#common-process-comm-doc) | プロセスの Comm 属性 |
| [`ptrace.tracee.ancestors.container.id`](#common-process-container-id-doc) | コンテナ ID |
| [`ptrace.tracee.ancestors.created_at`](#common-process-created_at-doc) | プロセス作成時のタイムスタンプ |
| [`ptrace.tracee.ancestors.egid`](#common-credentials-egid-doc) | プロセスの有効な GID |
| [`ptrace.tracee.ancestors.egroup`](#common-credentials-egroup-doc) | プロセスの有効なグループ |
| [`ptrace.tracee.ancestors.envp`](#common-process-envp-doc) | プロセスの環境変数 |
| [`ptrace.tracee.ancestors.envs`](#common-process-envs-doc) | プロセスの環境変数名 |
| [`ptrace.tracee.ancestors.envs_truncated`](#common-process-envs_truncated-doc) | 環境変数の切り捨てのインジケーター |
| [`ptrace.tracee.ancestors.euid`](#common-credentials-euid-doc) | プロセスの有効な UID |
| [`ptrace.tracee.ancestors.euser`](#common-credentials-euser-doc) | プロセスの有効なユーザー |
| [`ptrace.tracee.ancestors.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`ptrace.tracee.ancestors.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`ptrace.tracee.ancestors.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`ptrace.tracee.ancestors.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`ptrace.tracee.ancestors.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`ptrace.tracee.ancestors.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`ptrace.tracee.ancestors.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`ptrace.tracee.ancestors.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`ptrace.tracee.ancestors.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`ptrace.tracee.ancestors.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`ptrace.tracee.ancestors.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`ptrace.tracee.ancestors.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`ptrace.tracee.ancestors.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`ptrace.tracee.ancestors.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`ptrace.tracee.ancestors.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`ptrace.tracee.ancestors.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`ptrace.tracee.ancestors.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`ptrace.tracee.ancestors.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`ptrace.tracee.ancestors.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`ptrace.tracee.ancestors.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`ptrace.tracee.ancestors.fsgid`](#common-credentials-fsgid-doc) | プロセスの FileSystem-gid |
| [`ptrace.tracee.ancestors.fsgroup`](#common-credentials-fsgroup-doc) | プロセスの FileSystem-group |
| [`ptrace.tracee.ancestors.fsuid`](#common-credentials-fsuid-doc) | プロセスの FileSystem-uid |
| [`ptrace.tracee.ancestors.fsuser`](#common-credentials-fsuser-doc) | プロセスの FileSystem-user |
| [`ptrace.tracee.ancestors.gid`](#common-credentials-gid-doc) | プロセスの GID |
| [`ptrace.tracee.ancestors.group`](#common-credentials-group-doc) | プロセスのグループ |
| [`ptrace.tracee.ancestors.interpreter.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`ptrace.tracee.ancestors.interpreter.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`ptrace.tracee.ancestors.interpreter.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`ptrace.tracee.ancestors.interpreter.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`ptrace.tracee.ancestors.interpreter.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`ptrace.tracee.ancestors.interpreter.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`ptrace.tracee.ancestors.interpreter.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`ptrace.tracee.ancestors.interpreter.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`ptrace.tracee.ancestors.interpreter.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`ptrace.tracee.ancestors.interpreter.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`ptrace.tracee.ancestors.interpreter.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`ptrace.tracee.ancestors.interpreter.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`ptrace.tracee.ancestors.interpreter.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`ptrace.tracee.ancestors.interpreter.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`ptrace.tracee.ancestors.interpreter.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`ptrace.tracee.ancestors.interpreter.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`ptrace.tracee.ancestors.interpreter.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`ptrace.tracee.ancestors.interpreter.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`ptrace.tracee.ancestors.interpreter.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`ptrace.tracee.ancestors.interpreter.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`ptrace.tracee.ancestors.is_kworker`](#common-pidcontext-is_kworker-doc) | プロセスが kworker であるかどうかを示します |
| [`ptrace.tracee.ancestors.is_thread`](#common-process-is_thread-doc) | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |
| [`ptrace.tracee.ancestors.pid`](#common-pidcontext-pid-doc) | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |
| [`ptrace.tracee.ancestors.ppid`](#common-process-ppid-doc) | 親プロセス ID |
| [`ptrace.tracee.ancestors.tid`](#common-pidcontext-tid-doc) | スレッドのスレッド ID |
| [`ptrace.tracee.ancestors.tty_name`](#common-process-tty_name-doc) | プロセスに関連する TTY の名前 |
| [`ptrace.tracee.ancestors.uid`](#common-credentials-uid-doc) | プロセスの UID |
| [`ptrace.tracee.ancestors.user`](#common-credentials-user-doc) | プロセスのユーザー |
| [`ptrace.tracee.ancestors.user_session.k8s_groups`](#common-usersessioncontext-k8s_groups-doc) | Kubernetes groups of the user that executed the process |
| [`ptrace.tracee.ancestors.user_session.k8s_uid`](#common-usersessioncontext-k8s_uid-doc) | Kubernetes UID of the user that executed the process |
| [`ptrace.tracee.ancestors.user_session.k8s_username`](#common-usersessioncontext-k8s_username-doc) | Kubernetes username of the user that executed the process |
| [`ptrace.tracee.args`](#common-process-args-doc) | プロセスの引数 (文字列。argv0 を除く) |
| [`ptrace.tracee.args_flags`](#common-process-args_flags-doc) | プロセス引数のフラグ |
| [`ptrace.tracee.args_options`](#common-process-args_options-doc) | オプションとしてのプロセスの引数 |
| [`ptrace.tracee.args_truncated`](#common-process-args_truncated-doc) | 引数の切り捨てのインジケーター |
| [`ptrace.tracee.argv`](#common-process-argv-doc) | プロセスの引数 (配列。argv0 を除く) |
| [`ptrace.tracee.argv0`](#common-process-argv0-doc) | プロセスの第一引数 |
| [`ptrace.tracee.cap_effective`](#common-credentials-cap_effective-doc) | プロセスの有効なケイパビリティセット |
| [`ptrace.tracee.cap_permitted`](#common-credentials-cap_permitted-doc) | プロセスの許可されたケイパビリティセット |
| [`ptrace.tracee.comm`](#common-process-comm-doc) | プロセスの Comm 属性 |
| [`ptrace.tracee.container.id`](#common-process-container-id-doc) | コンテナ ID |
| [`ptrace.tracee.created_at`](#common-process-created_at-doc) | プロセス作成時のタイムスタンプ |
| [`ptrace.tracee.egid`](#common-credentials-egid-doc) | プロセスの有効な GID |
| [`ptrace.tracee.egroup`](#common-credentials-egroup-doc) | プロセスの有効なグループ |
| [`ptrace.tracee.envp`](#common-process-envp-doc) | プロセスの環境変数 |
| [`ptrace.tracee.envs`](#common-process-envs-doc) | プロセスの環境変数名 |
| [`ptrace.tracee.envs_truncated`](#common-process-envs_truncated-doc) | 環境変数の切り捨てのインジケーター |
| [`ptrace.tracee.euid`](#common-credentials-euid-doc) | プロセスの有効な UID |
| [`ptrace.tracee.euser`](#common-credentials-euser-doc) | プロセスの有効なユーザー |
| [`ptrace.tracee.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`ptrace.tracee.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`ptrace.tracee.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`ptrace.tracee.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`ptrace.tracee.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`ptrace.tracee.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`ptrace.tracee.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`ptrace.tracee.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`ptrace.tracee.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`ptrace.tracee.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`ptrace.tracee.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`ptrace.tracee.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`ptrace.tracee.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`ptrace.tracee.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`ptrace.tracee.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`ptrace.tracee.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`ptrace.tracee.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`ptrace.tracee.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`ptrace.tracee.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`ptrace.tracee.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`ptrace.tracee.fsgid`](#common-credentials-fsgid-doc) | プロセスの FileSystem-gid |
| [`ptrace.tracee.fsgroup`](#common-credentials-fsgroup-doc) | プロセスの FileSystem-group |
| [`ptrace.tracee.fsuid`](#common-credentials-fsuid-doc) | プロセスの FileSystem-uid |
| [`ptrace.tracee.fsuser`](#common-credentials-fsuser-doc) | プロセスの FileSystem-user |
| [`ptrace.tracee.gid`](#common-credentials-gid-doc) | プロセスの GID |
| [`ptrace.tracee.group`](#common-credentials-group-doc) | プロセスのグループ |
| [`ptrace.tracee.interpreter.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`ptrace.tracee.interpreter.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`ptrace.tracee.interpreter.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`ptrace.tracee.interpreter.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`ptrace.tracee.interpreter.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`ptrace.tracee.interpreter.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`ptrace.tracee.interpreter.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`ptrace.tracee.interpreter.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`ptrace.tracee.interpreter.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`ptrace.tracee.interpreter.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`ptrace.tracee.interpreter.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`ptrace.tracee.interpreter.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`ptrace.tracee.interpreter.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`ptrace.tracee.interpreter.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`ptrace.tracee.interpreter.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`ptrace.tracee.interpreter.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`ptrace.tracee.interpreter.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`ptrace.tracee.interpreter.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`ptrace.tracee.interpreter.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`ptrace.tracee.interpreter.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`ptrace.tracee.is_kworker`](#common-pidcontext-is_kworker-doc) | プロセスが kworker であるかどうかを示します |
| [`ptrace.tracee.is_thread`](#common-process-is_thread-doc) | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |
| [`ptrace.tracee.parent.args`](#common-process-args-doc) | プロセスの引数 (文字列。argv0 を除く) |
| [`ptrace.tracee.parent.args_flags`](#common-process-args_flags-doc) | プロセス引数のフラグ |
| [`ptrace.tracee.parent.args_options`](#common-process-args_options-doc) | オプションとしてのプロセスの引数 |
| [`ptrace.tracee.parent.args_truncated`](#common-process-args_truncated-doc) | 引数の切り捨てのインジケーター |
| [`ptrace.tracee.parent.argv`](#common-process-argv-doc) | プロセスの引数 (配列。argv0 を除く) |
| [`ptrace.tracee.parent.argv0`](#common-process-argv0-doc) | プロセスの第一引数 |
| [`ptrace.tracee.parent.cap_effective`](#common-credentials-cap_effective-doc) | プロセスの有効なケイパビリティセット |
| [`ptrace.tracee.parent.cap_permitted`](#common-credentials-cap_permitted-doc) | プロセスの許可されたケイパビリティセット |
| [`ptrace.tracee.parent.comm`](#common-process-comm-doc) | プロセスの Comm 属性 |
| [`ptrace.tracee.parent.container.id`](#common-process-container-id-doc) | コンテナ ID |
| [`ptrace.tracee.parent.created_at`](#common-process-created_at-doc) | プロセス作成時のタイムスタンプ |
| [`ptrace.tracee.parent.egid`](#common-credentials-egid-doc) | プロセスの有効な GID |
| [`ptrace.tracee.parent.egroup`](#common-credentials-egroup-doc) | プロセスの有効なグループ |
| [`ptrace.tracee.parent.envp`](#common-process-envp-doc) | プロセスの環境変数 |
| [`ptrace.tracee.parent.envs`](#common-process-envs-doc) | プロセスの環境変数名 |
| [`ptrace.tracee.parent.envs_truncated`](#common-process-envs_truncated-doc) | 環境変数の切り捨てのインジケーター |
| [`ptrace.tracee.parent.euid`](#common-credentials-euid-doc) | プロセスの有効な UID |
| [`ptrace.tracee.parent.euser`](#common-credentials-euser-doc) | プロセスの有効なユーザー |
| [`ptrace.tracee.parent.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`ptrace.tracee.parent.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`ptrace.tracee.parent.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`ptrace.tracee.parent.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`ptrace.tracee.parent.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`ptrace.tracee.parent.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`ptrace.tracee.parent.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`ptrace.tracee.parent.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`ptrace.tracee.parent.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`ptrace.tracee.parent.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`ptrace.tracee.parent.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`ptrace.tracee.parent.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`ptrace.tracee.parent.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`ptrace.tracee.parent.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`ptrace.tracee.parent.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`ptrace.tracee.parent.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`ptrace.tracee.parent.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`ptrace.tracee.parent.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`ptrace.tracee.parent.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`ptrace.tracee.parent.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`ptrace.tracee.parent.fsgid`](#common-credentials-fsgid-doc) | プロセスの FileSystem-gid |
| [`ptrace.tracee.parent.fsgroup`](#common-credentials-fsgroup-doc) | プロセスの FileSystem-group |
| [`ptrace.tracee.parent.fsuid`](#common-credentials-fsuid-doc) | プロセスの FileSystem-uid |
| [`ptrace.tracee.parent.fsuser`](#common-credentials-fsuser-doc) | プロセスの FileSystem-user |
| [`ptrace.tracee.parent.gid`](#common-credentials-gid-doc) | プロセスの GID |
| [`ptrace.tracee.parent.group`](#common-credentials-group-doc) | プロセスのグループ |
| [`ptrace.tracee.parent.interpreter.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`ptrace.tracee.parent.interpreter.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`ptrace.tracee.parent.interpreter.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`ptrace.tracee.parent.interpreter.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`ptrace.tracee.parent.interpreter.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`ptrace.tracee.parent.interpreter.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`ptrace.tracee.parent.interpreter.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`ptrace.tracee.parent.interpreter.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`ptrace.tracee.parent.interpreter.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`ptrace.tracee.parent.interpreter.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`ptrace.tracee.parent.interpreter.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`ptrace.tracee.parent.interpreter.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`ptrace.tracee.parent.interpreter.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`ptrace.tracee.parent.interpreter.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`ptrace.tracee.parent.interpreter.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`ptrace.tracee.parent.interpreter.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`ptrace.tracee.parent.interpreter.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`ptrace.tracee.parent.interpreter.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`ptrace.tracee.parent.interpreter.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`ptrace.tracee.parent.interpreter.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`ptrace.tracee.parent.is_kworker`](#common-pidcontext-is_kworker-doc) | プロセスが kworker であるかどうかを示します |
| [`ptrace.tracee.parent.is_thread`](#common-process-is_thread-doc) | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |
| [`ptrace.tracee.parent.pid`](#common-pidcontext-pid-doc) | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |
| [`ptrace.tracee.parent.ppid`](#common-process-ppid-doc) | 親プロセス ID |
| [`ptrace.tracee.parent.tid`](#common-pidcontext-tid-doc) | スレッドのスレッド ID |
| [`ptrace.tracee.parent.tty_name`](#common-process-tty_name-doc) | プロセスに関連する TTY の名前 |
| [`ptrace.tracee.parent.uid`](#common-credentials-uid-doc) | プロセスの UID |
| [`ptrace.tracee.parent.user`](#common-credentials-user-doc) | プロセスのユーザー |
| [`ptrace.tracee.parent.user_session.k8s_groups`](#common-usersessioncontext-k8s_groups-doc) | Kubernetes groups of the user that executed the process |
| [`ptrace.tracee.parent.user_session.k8s_uid`](#common-usersessioncontext-k8s_uid-doc) | Kubernetes UID of the user that executed the process |
| [`ptrace.tracee.parent.user_session.k8s_username`](#common-usersessioncontext-k8s_username-doc) | Kubernetes username of the user that executed the process |
| [`ptrace.tracee.pid`](#common-pidcontext-pid-doc) | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |
| [`ptrace.tracee.ppid`](#common-process-ppid-doc) | 親プロセス ID |
| [`ptrace.tracee.tid`](#common-pidcontext-tid-doc) | スレッドのスレッド ID |
| [`ptrace.tracee.tty_name`](#common-process-tty_name-doc) | プロセスに関連する TTY の名前 |
| [`ptrace.tracee.uid`](#common-credentials-uid-doc) | プロセスの UID |
| [`ptrace.tracee.user`](#common-credentials-user-doc) | プロセスのユーザー |
| [`ptrace.tracee.user_session.k8s_groups`](#common-usersessioncontext-k8s_groups-doc) | Kubernetes groups of the user that executed the process |
| [`ptrace.tracee.user_session.k8s_uid`](#common-usersessioncontext-k8s_uid-doc) | Kubernetes UID of the user that executed the process |
| [`ptrace.tracee.user_session.k8s_username`](#common-usersessioncontext-k8s_username-doc) | Kubernetes username of the user that executed the process |

### イベント `removexattr`

拡張属性を削除する

| プロパティ | 定義 |
| -------- | ------------- |
| [`removexattr.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`removexattr.file.destination.name`](#common-setxattrevent-file-destination-name-doc) | 拡張属性の名前 |
| [`removexattr.file.destination.namespace`](#common-setxattrevent-file-destination-namespace-doc) | 拡張属性のネームスペース |
| [`removexattr.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`removexattr.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`removexattr.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`removexattr.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`removexattr.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`removexattr.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`removexattr.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`removexattr.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`removexattr.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`removexattr.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`removexattr.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`removexattr.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`removexattr.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`removexattr.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`removexattr.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`removexattr.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`removexattr.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`removexattr.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`removexattr.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`removexattr.retval`](#common-syscallevent-retval-doc) | syscall の戻り値 |

### イベント `rename`

ファイル/ディレクトリの名前が変更された

| プロパティ | 定義 |
| -------- | ------------- |
| [`rename.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`rename.file.destination.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`rename.file.destination.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`rename.file.destination.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`rename.file.destination.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`rename.file.destination.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`rename.file.destination.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`rename.file.destination.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`rename.file.destination.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`rename.file.destination.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`rename.file.destination.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`rename.file.destination.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`rename.file.destination.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`rename.file.destination.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`rename.file.destination.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`rename.file.destination.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`rename.file.destination.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`rename.file.destination.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`rename.file.destination.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`rename.file.destination.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`rename.file.destination.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`rename.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`rename.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`rename.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`rename.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`rename.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`rename.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`rename.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`rename.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`rename.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`rename.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`rename.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`rename.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`rename.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`rename.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`rename.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`rename.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`rename.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`rename.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`rename.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`rename.retval`](#common-syscallevent-retval-doc) | syscall の戻り値 |

### イベント `rmdir`

ディレクトリが削除された

| プロパティ | 定義 |
| -------- | ------------- |
| [`rmdir.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`rmdir.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`rmdir.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`rmdir.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`rmdir.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`rmdir.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`rmdir.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`rmdir.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`rmdir.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`rmdir.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`rmdir.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`rmdir.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`rmdir.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`rmdir.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`rmdir.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`rmdir.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`rmdir.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`rmdir.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`rmdir.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`rmdir.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`rmdir.retval`](#common-syscallevent-retval-doc) | syscall の戻り値 |

### イベント `selinux`

SELinux 操作が実行された

| プロパティ | 定義 |
| -------- | ------------- |
| [`selinux.bool.name`](#selinux-bool-name-doc) | SELinux ブール値名 |
| [`selinux.bool.state`](#selinux-bool-state-doc) | SELinux のブール値の新しい値 |
| [`selinux.bool_commit.state`](#selinux-bool_commit-state-doc) | SELinux のブールコミット演算のインジケーター |
| [`selinux.enforce.status`](#selinux-enforce-status-doc) | SELinux の実行ステータス ("enforcing"、"permissive"、"disabled" のいずれか 1 つ) |

### イベント `setgid`

あるプロセスが有効な gid を変更した

| プロパティ | 定義 |
| -------- | ------------- |
| [`setgid.egid`](#setgid-egid-doc) | プロセスの新しい有効な GID |
| [`setgid.egroup`](#setgid-egroup-doc) | プロセスの新しい有効なグループ |
| [`setgid.fsgid`](#setgid-fsgid-doc) | プロセスの新しい FileSystem GID |
| [`setgid.fsgroup`](#setgid-fsgroup-doc) | プロセスの新しい FileSystem グループ |
| [`setgid.gid`](#setgid-gid-doc) | プロセスの新しい GID |
| [`setgid.group`](#setgid-group-doc) | プロセスの新しいグループ |

### イベント `setuid`

あるプロセスが有効な uid を変更した

| プロパティ | 定義 |
| -------- | ------------- |
| [`setuid.euid`](#setuid-euid-doc) | プロセスの新しい有効な UID |
| [`setuid.euser`](#setuid-euser-doc) | プロセスの新しい有効なユーザー |
| [`setuid.fsuid`](#setuid-fsuid-doc) | プロセスの新しい FileSystem UID |
| [`setuid.fsuser`](#setuid-fsuser-doc) | プロセスの新しい FileSystem ユーザー |
| [`setuid.uid`](#setuid-uid-doc) | プロセスの新しい UID |
| [`setuid.user`](#setuid-user-doc) | プロセスの新しいユーザー |

### イベント `setxattr`

拡張属性を設定する

| プロパティ | 定義 |
| -------- | ------------- |
| [`setxattr.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`setxattr.file.destination.name`](#common-setxattrevent-file-destination-name-doc) | 拡張属性の名前 |
| [`setxattr.file.destination.namespace`](#common-setxattrevent-file-destination-namespace-doc) | 拡張属性のネームスペース |
| [`setxattr.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`setxattr.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`setxattr.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`setxattr.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`setxattr.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`setxattr.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`setxattr.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`setxattr.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`setxattr.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`setxattr.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`setxattr.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`setxattr.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`setxattr.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`setxattr.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`setxattr.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`setxattr.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`setxattr.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`setxattr.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`setxattr.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`setxattr.retval`](#common-syscallevent-retval-doc) | syscall の戻り値 |

### イベント `signal`

シグナルが送信された

| プロパティ | 定義 |
| -------- | ------------- |
| [`signal.pid`](#signal-pid-doc) | ターゲット PID |
| [`signal.retval`](#common-syscallevent-retval-doc) | syscall の戻り値 |
| [`signal.target.ancestors.args`](#common-process-args-doc) | プロセスの引数 (文字列。argv0 を除く) |
| [`signal.target.ancestors.args_flags`](#common-process-args_flags-doc) | プロセス引数のフラグ |
| [`signal.target.ancestors.args_options`](#common-process-args_options-doc) | オプションとしてのプロセスの引数 |
| [`signal.target.ancestors.args_truncated`](#common-process-args_truncated-doc) | 引数の切り捨てのインジケーター |
| [`signal.target.ancestors.argv`](#common-process-argv-doc) | プロセスの引数 (配列。argv0 を除く) |
| [`signal.target.ancestors.argv0`](#common-process-argv0-doc) | プロセスの第一引数 |
| [`signal.target.ancestors.cap_effective`](#common-credentials-cap_effective-doc) | プロセスの有効なケイパビリティセット |
| [`signal.target.ancestors.cap_permitted`](#common-credentials-cap_permitted-doc) | プロセスの許可されたケイパビリティセット |
| [`signal.target.ancestors.comm`](#common-process-comm-doc) | プロセスの Comm 属性 |
| [`signal.target.ancestors.container.id`](#common-process-container-id-doc) | コンテナ ID |
| [`signal.target.ancestors.created_at`](#common-process-created_at-doc) | プロセス作成時のタイムスタンプ |
| [`signal.target.ancestors.egid`](#common-credentials-egid-doc) | プロセスの有効な GID |
| [`signal.target.ancestors.egroup`](#common-credentials-egroup-doc) | プロセスの有効なグループ |
| [`signal.target.ancestors.envp`](#common-process-envp-doc) | プロセスの環境変数 |
| [`signal.target.ancestors.envs`](#common-process-envs-doc) | プロセスの環境変数名 |
| [`signal.target.ancestors.envs_truncated`](#common-process-envs_truncated-doc) | 環境変数の切り捨てのインジケーター |
| [`signal.target.ancestors.euid`](#common-credentials-euid-doc) | プロセスの有効な UID |
| [`signal.target.ancestors.euser`](#common-credentials-euser-doc) | プロセスの有効なユーザー |
| [`signal.target.ancestors.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`signal.target.ancestors.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`signal.target.ancestors.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`signal.target.ancestors.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`signal.target.ancestors.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`signal.target.ancestors.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`signal.target.ancestors.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`signal.target.ancestors.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`signal.target.ancestors.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`signal.target.ancestors.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`signal.target.ancestors.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`signal.target.ancestors.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`signal.target.ancestors.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`signal.target.ancestors.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`signal.target.ancestors.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`signal.target.ancestors.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`signal.target.ancestors.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`signal.target.ancestors.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`signal.target.ancestors.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`signal.target.ancestors.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`signal.target.ancestors.fsgid`](#common-credentials-fsgid-doc) | プロセスの FileSystem-gid |
| [`signal.target.ancestors.fsgroup`](#common-credentials-fsgroup-doc) | プロセスの FileSystem-group |
| [`signal.target.ancestors.fsuid`](#common-credentials-fsuid-doc) | プロセスの FileSystem-uid |
| [`signal.target.ancestors.fsuser`](#common-credentials-fsuser-doc) | プロセスの FileSystem-user |
| [`signal.target.ancestors.gid`](#common-credentials-gid-doc) | プロセスの GID |
| [`signal.target.ancestors.group`](#common-credentials-group-doc) | プロセスのグループ |
| [`signal.target.ancestors.interpreter.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`signal.target.ancestors.interpreter.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`signal.target.ancestors.interpreter.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`signal.target.ancestors.interpreter.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`signal.target.ancestors.interpreter.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`signal.target.ancestors.interpreter.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`signal.target.ancestors.interpreter.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`signal.target.ancestors.interpreter.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`signal.target.ancestors.interpreter.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`signal.target.ancestors.interpreter.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`signal.target.ancestors.interpreter.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`signal.target.ancestors.interpreter.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`signal.target.ancestors.interpreter.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`signal.target.ancestors.interpreter.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`signal.target.ancestors.interpreter.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`signal.target.ancestors.interpreter.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`signal.target.ancestors.interpreter.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`signal.target.ancestors.interpreter.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`signal.target.ancestors.interpreter.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`signal.target.ancestors.interpreter.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`signal.target.ancestors.is_kworker`](#common-pidcontext-is_kworker-doc) | プロセスが kworker であるかどうかを示します |
| [`signal.target.ancestors.is_thread`](#common-process-is_thread-doc) | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |
| [`signal.target.ancestors.pid`](#common-pidcontext-pid-doc) | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |
| [`signal.target.ancestors.ppid`](#common-process-ppid-doc) | 親プロセス ID |
| [`signal.target.ancestors.tid`](#common-pidcontext-tid-doc) | スレッドのスレッド ID |
| [`signal.target.ancestors.tty_name`](#common-process-tty_name-doc) | プロセスに関連する TTY の名前 |
| [`signal.target.ancestors.uid`](#common-credentials-uid-doc) | プロセスの UID |
| [`signal.target.ancestors.user`](#common-credentials-user-doc) | プロセスのユーザー |
| [`signal.target.ancestors.user_session.k8s_groups`](#common-usersessioncontext-k8s_groups-doc) | Kubernetes groups of the user that executed the process |
| [`signal.target.ancestors.user_session.k8s_uid`](#common-usersessioncontext-k8s_uid-doc) | Kubernetes UID of the user that executed the process |
| [`signal.target.ancestors.user_session.k8s_username`](#common-usersessioncontext-k8s_username-doc) | Kubernetes username of the user that executed the process |
| [`signal.target.args`](#common-process-args-doc) | プロセスの引数 (文字列。argv0 を除く) |
| [`signal.target.args_flags`](#common-process-args_flags-doc) | プロセス引数のフラグ |
| [`signal.target.args_options`](#common-process-args_options-doc) | オプションとしてのプロセスの引数 |
| [`signal.target.args_truncated`](#common-process-args_truncated-doc) | 引数の切り捨てのインジケーター |
| [`signal.target.argv`](#common-process-argv-doc) | プロセスの引数 (配列。argv0 を除く) |
| [`signal.target.argv0`](#common-process-argv0-doc) | プロセスの第一引数 |
| [`signal.target.cap_effective`](#common-credentials-cap_effective-doc) | プロセスの有効なケイパビリティセット |
| [`signal.target.cap_permitted`](#common-credentials-cap_permitted-doc) | プロセスの許可されたケイパビリティセット |
| [`signal.target.comm`](#common-process-comm-doc) | プロセスの Comm 属性 |
| [`signal.target.container.id`](#common-process-container-id-doc) | コンテナ ID |
| [`signal.target.created_at`](#common-process-created_at-doc) | プロセス作成時のタイムスタンプ |
| [`signal.target.egid`](#common-credentials-egid-doc) | プロセスの有効な GID |
| [`signal.target.egroup`](#common-credentials-egroup-doc) | プロセスの有効なグループ |
| [`signal.target.envp`](#common-process-envp-doc) | プロセスの環境変数 |
| [`signal.target.envs`](#common-process-envs-doc) | プロセスの環境変数名 |
| [`signal.target.envs_truncated`](#common-process-envs_truncated-doc) | 環境変数の切り捨てのインジケーター |
| [`signal.target.euid`](#common-credentials-euid-doc) | プロセスの有効な UID |
| [`signal.target.euser`](#common-credentials-euser-doc) | プロセスの有効なユーザー |
| [`signal.target.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`signal.target.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`signal.target.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`signal.target.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`signal.target.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`signal.target.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`signal.target.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`signal.target.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`signal.target.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`signal.target.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`signal.target.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`signal.target.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`signal.target.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`signal.target.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`signal.target.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`signal.target.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`signal.target.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`signal.target.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`signal.target.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`signal.target.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`signal.target.fsgid`](#common-credentials-fsgid-doc) | プロセスの FileSystem-gid |
| [`signal.target.fsgroup`](#common-credentials-fsgroup-doc) | プロセスの FileSystem-group |
| [`signal.target.fsuid`](#common-credentials-fsuid-doc) | プロセスの FileSystem-uid |
| [`signal.target.fsuser`](#common-credentials-fsuser-doc) | プロセスの FileSystem-user |
| [`signal.target.gid`](#common-credentials-gid-doc) | プロセスの GID |
| [`signal.target.group`](#common-credentials-group-doc) | プロセスのグループ |
| [`signal.target.interpreter.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`signal.target.interpreter.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`signal.target.interpreter.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`signal.target.interpreter.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`signal.target.interpreter.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`signal.target.interpreter.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`signal.target.interpreter.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`signal.target.interpreter.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`signal.target.interpreter.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`signal.target.interpreter.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`signal.target.interpreter.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`signal.target.interpreter.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`signal.target.interpreter.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`signal.target.interpreter.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`signal.target.interpreter.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`signal.target.interpreter.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`signal.target.interpreter.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`signal.target.interpreter.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`signal.target.interpreter.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`signal.target.interpreter.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`signal.target.is_kworker`](#common-pidcontext-is_kworker-doc) | プロセスが kworker であるかどうかを示します |
| [`signal.target.is_thread`](#common-process-is_thread-doc) | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |
| [`signal.target.parent.args`](#common-process-args-doc) | プロセスの引数 (文字列。argv0 を除く) |
| [`signal.target.parent.args_flags`](#common-process-args_flags-doc) | プロセス引数のフラグ |
| [`signal.target.parent.args_options`](#common-process-args_options-doc) | オプションとしてのプロセスの引数 |
| [`signal.target.parent.args_truncated`](#common-process-args_truncated-doc) | 引数の切り捨てのインジケーター |
| [`signal.target.parent.argv`](#common-process-argv-doc) | プロセスの引数 (配列。argv0 を除く) |
| [`signal.target.parent.argv0`](#common-process-argv0-doc) | プロセスの第一引数 |
| [`signal.target.parent.cap_effective`](#common-credentials-cap_effective-doc) | プロセスの有効なケイパビリティセット |
| [`signal.target.parent.cap_permitted`](#common-credentials-cap_permitted-doc) | プロセスの許可されたケイパビリティセット |
| [`signal.target.parent.comm`](#common-process-comm-doc) | プロセスの Comm 属性 |
| [`signal.target.parent.container.id`](#common-process-container-id-doc) | コンテナ ID |
| [`signal.target.parent.created_at`](#common-process-created_at-doc) | プロセス作成時のタイムスタンプ |
| [`signal.target.parent.egid`](#common-credentials-egid-doc) | プロセスの有効な GID |
| [`signal.target.parent.egroup`](#common-credentials-egroup-doc) | プロセスの有効なグループ |
| [`signal.target.parent.envp`](#common-process-envp-doc) | プロセスの環境変数 |
| [`signal.target.parent.envs`](#common-process-envs-doc) | プロセスの環境変数名 |
| [`signal.target.parent.envs_truncated`](#common-process-envs_truncated-doc) | 環境変数の切り捨てのインジケーター |
| [`signal.target.parent.euid`](#common-credentials-euid-doc) | プロセスの有効な UID |
| [`signal.target.parent.euser`](#common-credentials-euser-doc) | プロセスの有効なユーザー |
| [`signal.target.parent.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`signal.target.parent.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`signal.target.parent.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`signal.target.parent.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`signal.target.parent.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`signal.target.parent.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`signal.target.parent.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`signal.target.parent.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`signal.target.parent.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`signal.target.parent.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`signal.target.parent.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`signal.target.parent.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`signal.target.parent.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`signal.target.parent.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`signal.target.parent.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`signal.target.parent.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`signal.target.parent.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`signal.target.parent.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`signal.target.parent.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`signal.target.parent.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`signal.target.parent.fsgid`](#common-credentials-fsgid-doc) | プロセスの FileSystem-gid |
| [`signal.target.parent.fsgroup`](#common-credentials-fsgroup-doc) | プロセスの FileSystem-group |
| [`signal.target.parent.fsuid`](#common-credentials-fsuid-doc) | プロセスの FileSystem-uid |
| [`signal.target.parent.fsuser`](#common-credentials-fsuser-doc) | プロセスの FileSystem-user |
| [`signal.target.parent.gid`](#common-credentials-gid-doc) | プロセスの GID |
| [`signal.target.parent.group`](#common-credentials-group-doc) | プロセスのグループ |
| [`signal.target.parent.interpreter.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`signal.target.parent.interpreter.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`signal.target.parent.interpreter.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`signal.target.parent.interpreter.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`signal.target.parent.interpreter.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`signal.target.parent.interpreter.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`signal.target.parent.interpreter.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`signal.target.parent.interpreter.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`signal.target.parent.interpreter.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`signal.target.parent.interpreter.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`signal.target.parent.interpreter.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`signal.target.parent.interpreter.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`signal.target.parent.interpreter.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`signal.target.parent.interpreter.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`signal.target.parent.interpreter.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`signal.target.parent.interpreter.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`signal.target.parent.interpreter.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`signal.target.parent.interpreter.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`signal.target.parent.interpreter.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`signal.target.parent.interpreter.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`signal.target.parent.is_kworker`](#common-pidcontext-is_kworker-doc) | プロセスが kworker であるかどうかを示します |
| [`signal.target.parent.is_thread`](#common-process-is_thread-doc) | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |
| [`signal.target.parent.pid`](#common-pidcontext-pid-doc) | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |
| [`signal.target.parent.ppid`](#common-process-ppid-doc) | 親プロセス ID |
| [`signal.target.parent.tid`](#common-pidcontext-tid-doc) | スレッドのスレッド ID |
| [`signal.target.parent.tty_name`](#common-process-tty_name-doc) | プロセスに関連する TTY の名前 |
| [`signal.target.parent.uid`](#common-credentials-uid-doc) | プロセスの UID |
| [`signal.target.parent.user`](#common-credentials-user-doc) | プロセスのユーザー |
| [`signal.target.parent.user_session.k8s_groups`](#common-usersessioncontext-k8s_groups-doc) | Kubernetes groups of the user that executed the process |
| [`signal.target.parent.user_session.k8s_uid`](#common-usersessioncontext-k8s_uid-doc) | Kubernetes UID of the user that executed the process |
| [`signal.target.parent.user_session.k8s_username`](#common-usersessioncontext-k8s_username-doc) | Kubernetes username of the user that executed the process |
| [`signal.target.pid`](#common-pidcontext-pid-doc) | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |
| [`signal.target.ppid`](#common-process-ppid-doc) | 親プロセス ID |
| [`signal.target.tid`](#common-pidcontext-tid-doc) | スレッドのスレッド ID |
| [`signal.target.tty_name`](#common-process-tty_name-doc) | プロセスに関連する TTY の名前 |
| [`signal.target.uid`](#common-credentials-uid-doc) | プロセスの UID |
| [`signal.target.user`](#common-credentials-user-doc) | プロセスのユーザー |
| [`signal.target.user_session.k8s_groups`](#common-usersessioncontext-k8s_groups-doc) | Kubernetes groups of the user that executed the process |
| [`signal.target.user_session.k8s_uid`](#common-usersessioncontext-k8s_uid-doc) | Kubernetes UID of the user that executed the process |
| [`signal.target.user_session.k8s_username`](#common-usersessioncontext-k8s_username-doc) | Kubernetes username of the user that executed the process |
| [`signal.type`](#signal-type-doc) | シグナルの種類 (例: SIGHUP、SIGINT、SIGQUIT など) |

### イベント `splice`

splice コマンドが実行された

| プロパティ | 定義 |
| -------- | ------------- |
| [`splice.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`splice.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`splice.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`splice.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`splice.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`splice.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`splice.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`splice.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`splice.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`splice.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`splice.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`splice.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`splice.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`splice.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`splice.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`splice.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`splice.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`splice.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`splice.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`splice.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`splice.pipe_entry_flag`](#splice-pipe_entry_flag-doc) | splice syscall に渡された "fd_out" パイプのエントリフラグ |
| [`splice.pipe_exit_flag`](#splice-pipe_exit_flag-doc) | splice syscall に渡された "fd_out" パイプの終了フラグ |
| [`splice.retval`](#common-syscallevent-retval-doc) | syscall の戻り値 |

### イベント `unlink`

ファイルが削除された

| プロパティ | 定義 |
| -------- | ------------- |
| [`unlink.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`unlink.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`unlink.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`unlink.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`unlink.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`unlink.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`unlink.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`unlink.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`unlink.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`unlink.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`unlink.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`unlink.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`unlink.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`unlink.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`unlink.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`unlink.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`unlink.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`unlink.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`unlink.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`unlink.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`unlink.flags`](#unlink-flags-doc) | アンリンク syscall のフラグ |
| [`unlink.retval`](#common-syscallevent-retval-doc) | syscall の戻り値 |

### イベント `unload_module`

カーネルモジュールが削除された

| プロパティ | 定義 |
| -------- | ------------- |
| [`unload_module.name`](#unload_module-name-doc) | 削除されたカーネルモジュールの名前 |
| [`unload_module.retval`](#common-syscallevent-retval-doc) | syscall の戻り値 |

### イベント `utimes`

ファイルのアクセス/変更時間を変更する

| プロパティ | 定義 |
| -------- | ------------- |
| [`utimes.file.change_time`](#common-filefields-change_time-doc) | Change time (ctime) of the file |
| [`utimes.file.filesystem`](#common-fileevent-filesystem-doc) | ファイルの filesystem |
| [`utimes.file.gid`](#common-filefields-gid-doc) | ファイルの所有者の GID |
| [`utimes.file.group`](#common-filefields-group-doc) | ファイルの所有者のグループ |
| [`utimes.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] List of cryptographic hashes computed for this file |
| [`utimes.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |
| [`utimes.file.inode`](#common-pathkey-inode-doc) | ファイルの Inode |
| [`utimes.file.mode`](#common-filefields-mode-doc) | ファイルのモード |
| [`utimes.file.modification_time`](#common-filefields-modification_time-doc) | Modification time (mtime) of the file |
| [`utimes.file.mount_id`](#common-pathkey-mount_id-doc) | ファイルのマウント ID |
| [`utimes.file.name`](#common-fileevent-name-doc) | ファイルのベース名 |
| [`utimes.file.name.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`utimes.file.package.name`](#common-fileevent-package-name-doc) | [試験運用] このファイルを提供したパッケージの名前 |
| [`utimes.file.package.source_version`](#common-fileevent-package-source_version-doc) | [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名 |
| [`utimes.file.package.version`](#common-fileevent-package-version-doc) | [試験運用] このファイルを提供したパッケージの正式バージョン名 |
| [`utimes.file.path`](#common-fileevent-path-doc) | ファイルのパス |
| [`utimes.file.path.length`](#common-string-length-doc) | 対応する文字列の長さ |
| [`utimes.file.rights`](#common-filefields-rights-doc) | ファイルの権限 |
| [`utimes.file.uid`](#common-filefields-uid-doc) | ファイルの所有者の UID |
| [`utimes.file.user`](#common-filefields-user-doc) | ファイルの所有者のユーザー |
| [`utimes.retval`](#common-syscallevent-retval-doc) | syscall の戻り値 |


## 属性ドキュメント


### `*.args` {#common-process-args-doc}
タイプ: 文字列

定義: プロセスの引数 (文字列。argv0 を除く)

`*.args` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`



例:

{{< code-block lang="javascript" >}}
exec.args == "-sV -p 22,53,110,143,4564 198.116.0-255.1-127"
{{< /code-block >}}

これらの正確な引数を持つ任意のプロセスにマッチします。

例:

{{< code-block lang="javascript" >}}
exec.args =~ "* -F * http*"
{{< /code-block >}}

"http" で始まる引数の前に "-F " 引数を持つプロセスにマッチします。

### `*.args_flags` {#common-process-args_flags-doc}
タイプ: 文字列

定義: プロセス引数のフラグ

`*.args_flags` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`



例:

{{< code-block lang="javascript" >}}
exec.args_flags in ["s"] && exec.args_flags in ["V"]
{{< /code-block >}}

引数に "-s" と "-V" フラグを持つプロセスにマッチします。また、"-sV" にもマッチします。

### `*.args_options` {#common-process-args_options-doc}
タイプ: 文字列

定義: オプションとしてのプロセスの引数

`*.args_options` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`



例:

{{< code-block lang="javascript" >}}
exec.args_options in ["p=0-1024"]
{{< /code-block >}}

引数に "-p 0-1024" または "--p=0-1024" が含まれるプロセスにマッチします。

### `*.args_truncated` {#common-process-args_truncated-doc}
タイプ: ブール

定義: 引数の切り捨てのインジケーター

`*.args_truncated` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.argv` {#common-process-argv-doc}
タイプ: 文字列

定義: プロセスの引数 (配列。argv0 を除く)

`*.argv` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`



例:

{{< code-block lang="javascript" >}}
exec.argv in ["127.0.0.1"]
{{< /code-block >}}

この IP アドレスを引数の 1 つとして持つすべてのプロセスにマッチします。

### `*.argv0` {#common-process-argv0-doc}
タイプ: 文字列

定義: プロセスの第一引数

`*.argv0` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.cap_effective` {#common-credentials-cap_effective-doc}
タイプ: 整数

定義: プロセスの有効なケイパビリティセット

`*.cap_effective` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`

定数: [カーネルケイパビリティ定数](#kernel-capability-constants)



### `*.cap_permitted` {#common-credentials-cap_permitted-doc}
タイプ: 整数

定義: プロセスの許可されたケイパビリティセット

`*.cap_permitted` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`

定数: [カーネルケイパビリティ定数](#kernel-capability-constants)



### `*.change_time` {#common-filefields-change_time-doc}
タイプ: 整数

Definition: Change time (ctime) of the file

`*.change_time` has 39 possible prefixes:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.comm` {#common-process-comm-doc}
タイプ: 文字列

定義: プロセスの Comm 属性

`*.comm` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.container.id` {#common-process-container-id-doc}
タイプ: 文字列

定義: コンテナ ID

`*.container.id` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.created_at` {#common-process-created_at-doc}
タイプ: 整数

定義: プロセス作成時のタイムスタンプ

`*.created_at` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.egid` {#common-credentials-egid-doc}
タイプ: 整数

定義: プロセスの有効な GID

`*.egid` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.egroup` {#common-credentials-egroup-doc}
タイプ: 文字列

定義: プロセスの有効なグループ

`*.egroup` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.envp` {#common-process-envp-doc}
タイプ: 文字列

定義: プロセスの環境変数

`*.envp` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.envs` {#common-process-envs-doc}
タイプ: 文字列

定義: プロセスの環境変数名

`*.envs` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.envs_truncated` {#common-process-envs_truncated-doc}
タイプ: ブール

定義: 環境変数の切り捨てのインジケーター

`*.envs_truncated` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.euid` {#common-credentials-euid-doc}
タイプ: 整数

定義: プロセスの有効な UID

`*.euid` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.euser` {#common-credentials-euser-doc}
タイプ: 文字列

定義: プロセスの有効なユーザー

`*.euser` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.file.destination.name` {#common-setxattrevent-file-destination-name-doc}
タイプ: 文字列

定義: 拡張属性の名前

`*.file.destination.name` には 2 個のプレフィックスを付けることができます。
`removexattr` `setxattr`


### `*.file.destination.namespace` {#common-setxattrevent-file-destination-namespace-doc}
タイプ: 文字列

定義: 拡張属性のネームスペース

`*.file.destination.namespace` には 2 個のプレフィックスを付けることができます。
`removexattr` `setxattr`


### `*.filesystem` {#common-fileevent-filesystem-doc}
タイプ: 文字列

定義: ファイルのファイルシステム

`*.filesystem` has 39 possible prefixes:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.fsgid` {#common-credentials-fsgid-doc}
タイプ: 整数

定義: プロセスの FileSystem-gid

`*.fsgid` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.fsgroup` {#common-credentials-fsgroup-doc}
タイプ: 文字列

定義: プロセスの FileSystem-group

`*.fsgroup` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.fsuid` {#common-credentials-fsuid-doc}
タイプ: 整数

定義: プロセスの FileSystem-uid

`*.fsuid` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.fsuser` {#common-credentials-fsuser-doc}
タイプ: 文字列

定義: プロセスの FileSystem-user

`*.fsuser` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.gid` {#common-credentials-gid-doc}
タイプ: 整数

定義: プロセスの GID

`*.gid` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.gid` {#common-filefields-gid-doc}
タイプ: 整数

定義: ファイルの所有者の GID

`*.gid` has 39 possible prefixes:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.group` {#common-credentials-group-doc}
タイプ: 文字列

定義: プロセスのグループ

`*.group` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.group` {#common-filefields-group-doc}
タイプ: 文字列

定義: ファイルの所有者のグループ

`*.group` has 39 possible prefixes:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.hashes` {#common-fileevent-hashes-doc}
タイプ: 文字列

Definition: [Experimental] List of cryptographic hashes computed for this file

`*.hashes` has 39 possible prefixes:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.in_upper_layer` {#common-filefields-in_upper_layer-doc}
タイプ: ブール

定義: ファイルレイヤーのインジケーター (例えば OverlayFS の場合)

`*.in_upper_layer` has 39 possible prefixes:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.inode` {#common-pathkey-inode-doc}
タイプ: 整数

定義: ファイルの Inode

`*.inode` has 39 possible prefixes:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.ip` {#common-ipportcontext-ip-doc}
タイプ: IP/CIDR

定義: IPアドレス

`*.ip` には 3 個のプレフィックスを付けることができます。
`bind.addr` `network.destination` `network.source`


### `*.is_kworker` {#common-pidcontext-is_kworker-doc}
タイプ: ブール

定義: プロセスが kworker であるかどうかを示します

`*.is_kworker` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.is_thread` {#common-process-is_thread-doc}
タイプ: ブール

定義: プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します

`*.is_thread` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.k8s_groups` {#common-usersessioncontext-k8s_groups-doc}
タイプ: 文字列

Definition: Kubernetes groups of the user that executed the process

`*.k8s_groups` has 11 possible prefixes:
`exec.user_session` `exit.user_session` `process.ancestors.user_session` `process.parent.user_session` `process.user_session` `ptrace.tracee.ancestors.user_session` `ptrace.tracee.parent.user_session` `ptrace.tracee.user_session` `signal.target.ancestors.user_session` `signal.target.parent.user_session` `signal.target.user_session`


### `*.k8s_uid` {#common-usersessioncontext-k8s_uid-doc}
タイプ: 文字列

Definition: Kubernetes UID of the user that executed the process

`*.k8s_uid` has 11 possible prefixes:
`exec.user_session` `exit.user_session` `process.ancestors.user_session` `process.parent.user_session` `process.user_session` `ptrace.tracee.ancestors.user_session` `ptrace.tracee.parent.user_session` `ptrace.tracee.user_session` `signal.target.ancestors.user_session` `signal.target.parent.user_session` `signal.target.user_session`


### `*.k8s_username` {#common-usersessioncontext-k8s_username-doc}
タイプ: 文字列

Definition: Kubernetes username of the user that executed the process

`*.k8s_username` has 11 possible prefixes:
`exec.user_session` `exit.user_session` `process.ancestors.user_session` `process.parent.user_session` `process.user_session` `ptrace.tracee.ancestors.user_session` `ptrace.tracee.parent.user_session` `ptrace.tracee.user_session` `signal.target.ancestors.user_session` `signal.target.parent.user_session` `signal.target.user_session`


### `*.length` {#common-string-length-doc}
タイプ: 整数

定義: 対応する文字列の長さ

`*.length` has 79 possible prefixes:
`chdir.file.name` `chdir.file.path` `chmod.file.name` `chmod.file.path` `chown.file.name` `chown.file.path` `dns.question.name` `exec.file.name` `exec.file.path` `exec.interpreter.file.name` `exec.interpreter.file.path` `exit.file.name` `exit.file.path` `exit.interpreter.file.name` `exit.interpreter.file.path` `link.file.destination.name` `link.file.destination.path` `link.file.name` `link.file.path` `load_module.file.name` `load_module.file.path` `mkdir.file.name` `mkdir.file.path` `mmap.file.name` `mmap.file.path` `open.file.name` `open.file.path` `process.ancestors.file.name` `process.ancestors.file.path` `process.ancestors.interpreter.file.name` `process.ancestors.interpreter.file.path` `process.file.name` `process.file.path` `process.interpreter.file.name` `process.interpreter.file.path` `process.parent.file.name` `process.parent.file.path` `process.parent.interpreter.file.name` `process.parent.interpreter.file.path` `ptrace.tracee.ancestors.file.name` `ptrace.tracee.ancestors.file.path` `ptrace.tracee.ancestors.interpreter.file.name` `ptrace.tracee.ancestors.interpreter.file.path` `ptrace.tracee.file.name` `ptrace.tracee.file.path` `ptrace.tracee.interpreter.file.name` `ptrace.tracee.interpreter.file.path` `ptrace.tracee.parent.file.name` `ptrace.tracee.parent.file.path` `ptrace.tracee.parent.interpreter.file.name` `ptrace.tracee.parent.interpreter.file.path` `removexattr.file.name` `removexattr.file.path` `rename.file.destination.name` `rename.file.destination.path` `rename.file.name` `rename.file.path` `rmdir.file.name` `rmdir.file.path` `setxattr.file.name` `setxattr.file.path` `signal.target.ancestors.file.name` `signal.target.ancestors.file.path` `signal.target.ancestors.interpreter.file.name` `signal.target.ancestors.interpreter.file.path` `signal.target.file.name` `signal.target.file.path` `signal.target.interpreter.file.name` `signal.target.interpreter.file.path` `signal.target.parent.file.name` `signal.target.parent.file.path` `signal.target.parent.interpreter.file.name` `signal.target.parent.interpreter.file.path` `splice.file.name` `splice.file.path` `unlink.file.name` `unlink.file.path` `utimes.file.name` `utimes.file.path`


### `*.mode` {#common-filefields-mode-doc}
タイプ: 整数

定義: ファイルのモード

`*.mode` has 39 possible prefixes:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`

定数: [Inode モード定数](#inode-mode-constants)



### `*.modification_time` {#common-filefields-modification_time-doc}
タイプ: 整数

Definition: Modification time (mtime) of the file

`*.modification_time` has 39 possible prefixes:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.mount_id` {#common-pathkey-mount_id-doc}
タイプ: 整数

定義: ファイルのマウント ID

`*.mount_id` has 39 possible prefixes:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.name` {#common-fileevent-name-doc}
タイプ: 文字列

定義: ファイルのベース名

`*.name` has 39 possible prefixes:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`



例:

{{< code-block lang="javascript" >}}
exec.file.name == "apt"
{{< /code-block >}}

apt という名前のファイルの実行にマッチします。

### `*.package.name` {#common-fileevent-package-name-doc}
タイプ: 文字列

定義: [試験運用] このファイルを提供したパッケージの名前

`*.package.name` has 39 possible prefixes:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.package.source_version` {#common-fileevent-package-source_version-doc}
タイプ: 文字列

定義: [試験運用] このファイルを提供したパッケージのソースパッケージの正式バージョン名

`*.package.source_version` has 39 possible prefixes:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.package.version` {#common-fileevent-package-version-doc}
タイプ: 文字列

定義: [試験運用] このファイルを提供したパッケージの正式バージョン名

`*.package.version` has 39 possible prefixes:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.path` {#common-fileevent-path-doc}
タイプ: 文字列

定義: ファイルのパス

`*.path` has 39 possible prefixes:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`



例:

{{< code-block lang="javascript" >}}
exec.file.path == "/usr/bin/apt"
{{< /code-block >}}

usr/bin/apt にあるファイルの実行にマッチします。

例:

{{< code-block lang="javascript" >}}
open.file.path == "/etc/passwd"
{{< /code-block >}}

etc/passwd ファイルを開いているすべてのプロセスにマッチします。

### `*.pid` {#common-pidcontext-pid-doc}
タイプ: 整数

定義: プロセスのプロセス ID (スレッドグループ ID とも呼ばれる)

`*.pid` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.port` {#common-ipportcontext-port-doc}
タイプ: 整数

定義: ポート番号

`*.port` には 3 個のプレフィックスを付けることができます。
`bind.addr` `network.destination` `network.source`


### `*.ppid` {#common-process-ppid-doc}
タイプ: 整数

定義: 親プロセス ID

`*.ppid` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.retval` {#common-syscallevent-retval-doc}
タイプ: 整数

定義: syscall の戻り値

`*.retval` has 22 possible prefixes:
`bind` `bpf` `chdir` `chmod` `chown` `link` `load_module` `mkdir` `mmap` `mount` `mprotect` `open` `ptrace` `removexattr` `rename` `rmdir` `setxattr` `signal` `splice` `unlink` `unload_module` `utimes`

定数: [エラー定数](#error-constants)



### `*.rights` {#common-filefields-rights-doc}
タイプ: 整数

定義: ファイルの権限

`*.rights` has 39 possible prefixes:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`

定数: [ファイルモード定数](#file-mode-constants)



### `*.tid` {#common-pidcontext-tid-doc}
タイプ: 整数

定義: スレッドのスレッド ID

`*.tid` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.tty_name` {#common-process-tty_name-doc}
タイプ: 文字列

定義: プロセスに関連する TTY の名前

`*.tty_name` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.uid` {#common-credentials-uid-doc}
タイプ: 整数

定義: プロセスの UID

`*.uid` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.uid` {#common-filefields-uid-doc}
タイプ: 整数

定義: ファイルの所有者の UID

`*.uid` has 39 possible prefixes:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.user` {#common-credentials-user-doc}
タイプ: 文字列

定義: プロセスのユーザー

`*.user` には 11 個のプレフィックスを付けることができます。
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`



例:

{{< code-block lang="javascript" >}}
process.user == "root"
{{< /code-block >}}

ルートユーザーとして実行されているプロセスによってトリガーされるイベントを制限します。

### `*.user` {#common-filefields-user-doc}
タイプ: 文字列

定義: ファイルの所有者のユーザー

`*.user` has 39 possible prefixes:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `bind.addr.family` {#bind-addr-family-doc}
タイプ: 整数

定義: アドレスファミリー



### `bpf.cmd` {#bpf-cmd-doc}
タイプ: 整数

定義: BPF コマンド名


定数: [BPF コマンド](#bpf-commands)



### `bpf.map.name` {#bpf-map-name-doc}
タイプ: 文字列

定義: eBPF マップの名前 (7.35 で追加)



### `bpf.map.type` {#bpf-map-type-doc}
タイプ: 整数

定義: eBPF マップのタイプ


定数: [BPF マップタイプ](#bpf-map-types)



### `bpf.prog.attach_type` {#bpf-prog-attach_type-doc}
タイプ: 整数

定義: eBPF プログラムのアタッチタイプ


定数: [BPF アタッチタイプ](#bpf-attach-types)



### `bpf.prog.helpers` {#bpf-prog-helpers-doc}
タイプ: 整数

定義: eBPF プログラムが使用する eBPF ヘルパー (7.35 で追加)


定数: [BPF ヘルパー関数](#bpf-helper-functions)



### `bpf.prog.name` {#bpf-prog-name-doc}
タイプ: 文字列

定義: eBPF プログラムの名前 (7.35 で追加)



### `bpf.prog.tag` {#bpf-prog-tag-doc}
タイプ: 文字列

定義: eBPF プログラムのハッシュ (sha1) (7.35 で追加)



### `bpf.prog.type` {#bpf-prog-type-doc}
タイプ: 整数

定義: eBPF プログラムのタイプ


定数: [BPF プログラムタイプ](#bpf-program-types)



### `capset.cap_effective` {#capset-cap_effective-doc}
タイプ: 整数

定義: プロセスの有効なケイパビリティセット


定数: [カーネルケイパビリティ定数](#kernel-capability-constants)



### `capset.cap_permitted` {#capset-cap_permitted-doc}
タイプ: 整数

定義: プロセスの許可されたケイパビリティセット


定数: [カーネルケイパビリティ定数](#kernel-capability-constants)



### `chdir.syscall.path` {#chdir-syscall-path-doc}
タイプ: 文字列

Definition: path argument of the syscall



### `chmod.file.destination.mode` {#chmod-file-destination-mode-doc}
タイプ: 整数

定義: chmod されたファイルの新しいモード


定数: [ファイルモード定数](#file-mode-constants)



### `chmod.file.destination.rights` {#chmod-file-destination-rights-doc}
タイプ: 整数

定義: chmod されたファイルの新しい権限


定数: [ファイルモード定数](#file-mode-constants)



### `chmod.syscall.mode` {#chmod-syscall-mode-doc}
タイプ: 整数

Definition: mode argument of the syscall



### `chmod.syscall.path` {#chmod-syscall-path-doc}
タイプ: 文字列

Definition: path argument of the syscall



### `chown.file.destination.gid` {#chown-file-destination-gid-doc}
タイプ: 整数

定義: chown されたファイルの所有者の新しい GID



### `chown.file.destination.group` {#chown-file-destination-group-doc}
タイプ: 文字列

定義: chown されたファイルの所有者の新しいグループ



### `chown.file.destination.uid` {#chown-file-destination-uid-doc}
タイプ: 整数

定義: chown されたファイルの所有者の新しい UID



### `chown.file.destination.user` {#chown-file-destination-user-doc}
タイプ: 文字列

定義: chown されたファイルの所有者の新しいユーザー



### `container.created_at` {#container-created_at-doc}
タイプ: 整数

定義: コンテナ作成時のタイムスタンプ



### `container.id` {#container-id-doc}
タイプ: 文字列

定義: コンテナの ID



### `container.tags` {#container-tags-doc}
タイプ: 文字列

定義: コンテナのタグ



### `dns.id` {#dns-id-doc}
タイプ: 整数

定義: [実験] DNS リクエスト ID



### `dns.question.class` {#dns-question-class-doc}
タイプ: 整数

定義: DNS の質問で調べたクラス


定数: [DNS qclasses](#dns-qclasses)



### `dns.question.count` {#dns-question-count-doc}
タイプ: 整数

定義: DNS リクエストの質問数の合計



### `dns.question.length` {#dns-question-length-doc}
タイプ: 整数

定義: DNS リクエストの合計サイズ (バイト)



### `dns.question.name` {#dns-question-name-doc}
タイプ: 文字列

定義: クエリ対象のドメイン名



### `dns.question.type` {#dns-question-type-doc}
タイプ: 整数

定義: DNS の質問タイプを指定する 2 オクテットのコード


定数: [DNS qtypes](#dns-qtypes)



### `event.async` {#event-async-doc}
タイプ: ブール

定義: syscall が非同期の場合、true



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



### `exec.syscall.path` {#exec-syscall-path-doc}
タイプ: 文字列

Definition: path argument of the syscall



### `exit.cause` {#exit-cause-doc}
タイプ: 整数

定義: プロセス終了の原因 (EXITED、SIGNALED、COREDUMPED のいずれか 1 つ)



### `exit.code` {#exit-code-doc}
タイプ: 整数

定義: プロセスの終了コード、またはプロセスを終了させたシグナルの番号



### `imds.aws.is_imds_v2` {#imds-aws-is_imds_v2-doc}
タイプ: ブール

Definition: a boolean which specifies if the IMDS event follows IMDSv1 or IMDSv2 conventions



### `imds.aws.security_credentials.type` {#imds-aws-security_credentials-type-doc}
タイプ: 文字列

Definition: the security credentials type



### `imds.cloud_provider` {#imds-cloud_provider-doc}
タイプ: 文字列

Definition: the intended cloud provider of the IMDS event



### `imds.host` {#imds-host-doc}
タイプ: 文字列

Definition: the host of the HTTP protocol



### `imds.server` {#imds-server-doc}
タイプ: 文字列

Definition: the server header of a response



### `imds.type` {#imds-type-doc}
タイプ: 文字列

Definition: the type of IMDS event



### `imds.url` {#imds-url-doc}
タイプ: 文字列

Definition: the queried IMDS URL



### `imds.user_agent` {#imds-user_agent-doc}
タイプ: 文字列

Definition: the user agent of the HTTP client



### `load_module.args` {#load_module-args-doc}
タイプ: 文字列

定義: 新しいカーネルモジュールのパラメーター (文字列)



### `load_module.args_truncated` {#load_module-args_truncated-doc}
タイプ: ブール

定義: 引数が切り捨てられたか否かを示します



### `load_module.argv` {#load_module-argv-doc}
タイプ: 文字列

定義: 新しいカーネルモジュールのパラメーター (配列)



### `load_module.loaded_from_memory` {#load_module-loaded_from_memory-doc}
タイプ: ブール

定義: カーネルモジュールがメモリからロードされたかどうかを示す



### `load_module.name` {#load_module-name-doc}
タイプ: 文字列

定義: 新しいカーネルモジュールの名前



### `mkdir.file.destination.mode` {#mkdir-file-destination-mode-doc}
タイプ: 整数

定義: 新しいディレクトリのモード


定数: [ファイルモード定数](#file-mode-constants)



### `mkdir.file.destination.rights` {#mkdir-file-destination-rights-doc}
タイプ: 整数

定義: 新しいディレクトリの権限


定数: [ファイルモード定数](#file-mode-constants)



### `mmap.flags` {#mmap-flags-doc}
タイプ: 整数

定義: メモリセグメントフラグ


定数: [MMap フラグ](#mmap-flags)



### `mmap.protection` {#mmap-protection-doc}
タイプ: 整数

定義: メモリセグメント保護


定数: [保護定数](#protection-constants)



### `mount.fs_type` {#mount-fs_type-doc}
タイプ: 文字列

定義: マウントされたファイルシステムの種類



### `mount.mountpoint.path` {#mount-mountpoint-path-doc}
タイプ: 文字列

定義: マウントポイントのパス



### `mount.root.path` {#mount-root-path-doc}
タイプ: 文字列

Definition: Root path of the mount



### `mount.source.path` {#mount-source-path-doc}
タイプ: 文字列

定義: バインドマウントのソースパス



### `mprotect.req_protection` {#mprotect-req_protection-doc}
タイプ: 整数

定義: 新規メモリセグメント保護


定数: [仮想メモリフラグ](#virtual-memory-flags)



### `mprotect.vm_protection` {#mprotect-vm_protection-doc}
タイプ: 整数

定義: 初期メモリセグメント保護


定数: [仮想メモリフラグ](#virtual-memory-flags)



### `network.device.ifindex` {#network-device-ifindex-doc}
タイプ: 整数

定義: インターフェイス ifindex



### `network.device.ifname` {#network-device-ifname-doc}
タイプ: 文字列

定義: インターフェイス ifname



### `network.l3_protocol` {#network-l3_protocol-doc}
タイプ: 整数

定義: ネットワークパケットの l3 プロトコル


定数: [L3 プロトコル](#l3-protocols)



### `network.l4_protocol` {#network-l4_protocol-doc}
タイプ: 整数

定義: ネットワークパケットの l4 プロトコル


定数: [L4 プロトコル](#l4-protocols)



### `network.size` {#network-size-doc}
タイプ: 整数

定義: ネットワークパケットのバイト数



### `open.file.destination.mode` {#open-file-destination-mode-doc}
タイプ: 整数

定義: 作成されたファイルのモード


定数: [ファイルモード定数](#file-mode-constants)



### `open.flags` {#open-flags-doc}
タイプ: 整数

定義: ファイルを開く際に使用するフラグ


定数: [オープンフラグ](#open-flags)



### `ptrace.request` {#ptrace-request-doc}
タイプ: 整数

定義: ptrace リクエスト


定数: [Ptrace 定数](#ptrace-constants)



### `selinux.bool.name` {#selinux-bool-name-doc}
タイプ: 文字列

定義: SELinux ブール値名



### `selinux.bool.state` {#selinux-bool-state-doc}
タイプ: 文字列

定義: SELinux のブール値の新しい値



### `selinux.bool_commit.state` {#selinux-bool_commit-state-doc}
タイプ: ブール

定義: SELinux のブールコミット演算のインジケーター



### `selinux.enforce.status` {#selinux-enforce-status-doc}
タイプ: 文字列

定義: SELinux の実行ステータス ("enforcing"、"permissive"、"disabled" のいずれか 1 つ)



### `setgid.egid` {#setgid-egid-doc}
タイプ: 整数

定義: プロセスの新しい有効な GID



### `setgid.egroup` {#setgid-egroup-doc}
タイプ: 文字列

定義: プロセスの新しい有効なグループ



### `setgid.fsgid` {#setgid-fsgid-doc}
タイプ: 整数

定義: プロセスの新しい FileSystem GID



### `setgid.fsgroup` {#setgid-fsgroup-doc}
タイプ: 文字列

定義: プロセスの新しい FileSystem グループ



### `setgid.gid` {#setgid-gid-doc}
タイプ: 整数

定義: プロセスの新しい GID



### `setgid.group` {#setgid-group-doc}
タイプ: 文字列

定義: プロセスの新しいグループ



### `setuid.euid` {#setuid-euid-doc}
タイプ: 整数

定義: プロセスの新しい有効な UID



### `setuid.euser` {#setuid-euser-doc}
タイプ: 文字列

定義: プロセスの新しい有効なユーザー



### `setuid.fsuid` {#setuid-fsuid-doc}
タイプ: 整数

定義: プロセスの新しい FileSystem UID



### `setuid.fsuser` {#setuid-fsuser-doc}
タイプ: 文字列

定義: プロセスの新しい FileSystem ユーザー



### `setuid.uid` {#setuid-uid-doc}
タイプ: 整数

定義: プロセスの新しい UID



### `setuid.user` {#setuid-user-doc}
タイプ: 文字列

定義: プロセスの新しいユーザー



### `signal.pid` {#signal-pid-doc}
タイプ: 整数

定義: ターゲット PID



### `signal.type` {#signal-type-doc}
タイプ: 整数

定義: シグナルの種類 (例: SIGHUP、SIGINT、SIGQUIT など)


定数: [シグナル定数](#signal-constants)



### `splice.pipe_entry_flag` {#splice-pipe_entry_flag-doc}
タイプ: 整数

定義: splice syscall に渡された "fd_out" パイプのエントリフラグ


定数: [パイプバッファフラグ](#pipe-buffer-flags)



### `splice.pipe_exit_flag` {#splice-pipe_exit_flag-doc}
タイプ: 整数

定義: splice syscall に渡された "fd_out" パイプの終了フラグ


定数: [パイプバッファフラグ](#pipe-buffer-flags)



### `unlink.flags` {#unlink-flags-doc}
タイプ: 整数

定義: アンリンク syscall のフラグ


定数: [リンク解除フラグ](#unlink-flags)



### `unload_module.name` {#unload_module-name-doc}
タイプ: 文字列

定義: 削除されたカーネルモジュールの名前



## 定数

定数は、ルールの可読性を向上させるために使用します。定数には、すべてのアーキテクチャに共通するものと、いくつかのアーキテクチャに固有のものがあります。

### `BPF attach types` {#bpf-attach-types}
BPF アタッチタイプは、サポートされている eBPF プログラムアタッチタイプです。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `BPF_CGROUP_INET_INGRESS` | すべて |
| `BPF_CGROUP_INET_EGRESS` | すべて |
| `BPF_CGROUP_INET_SOCK_CREATE` | すべて |
| `BPF_CGROUP_SOCK_OPS` | すべて |
| `BPF_SK_SKB_STREAM_PARSER` | すべて |
| `BPF_SK_SKB_STREAM_VERDICT` | すべて |
| `BPF_CGROUP_DEVICE` | すべて |
| `BPF_SK_MSG_VERDICT` | すべて |
| `BPF_CGROUP_INET4_BIND` | すべて |
| `BPF_CGROUP_INET6_BIND` | すべて |
| `BPF_CGROUP_INET4_CONNECT` | すべて |
| `BPF_CGROUP_INET6_CONNECT` | すべて |
| `BPF_CGROUP_INET4_POST_BIND` | すべて |
| `BPF_CGROUP_INET6_POST_BIND` | すべて |
| `BPF_CGROUP_UDP4_SENDMSG` | すべて |
| `BPF_CGROUP_UDP6_SENDMSG` | すべて |
| `BPF_LIRC_MODE2` | すべて |
| `BPF_FLOW_DISSECTOR` | すべて |
| `BPF_CGROUP_SYSCTL` | すべて |
| `BPF_CGROUP_UDP4_RECVMSG` | すべて |
| `BPF_CGROUP_UDP6_RECVMSG` | すべて |
| `BPF_CGROUP_GETSOCKOPT` | すべて |
| `BPF_CGROUP_SETSOCKOPT` | すべて |
| `BPF_TRACE_RAW_TP` | すべて |
| `BPF_TRACE_FENTRY` | すべて |
| `BPF_TRACE_FEXIT` | すべて |
| `BPF_MODIFY_RETURN` | すべて |
| `BPF_LSM_MAC` | すべて |
| `BPF_TRACE_ITER` | すべて |
| `BPF_CGROUP_INET4_GETPEERNAME` | すべて |
| `BPF_CGROUP_INET6_GETPEERNAME` | すべて |
| `BPF_CGROUP_INET4_GETSOCKNAME` | すべて |
| `BPF_CGROUP_INET6_GETSOCKNAME` | すべて |
| `BPF_XDP_DEVMAP` | すべて |
| `BPF_CGROUP_INET_SOCK_RELEASE` | すべて |
| `BPF_XDP_CPUMAP` | すべて |
| `BPF_SK_LOOKUP` | すべて |
| `BPF_XDP` | すべて |
| `BPF_SK_SKB_VERDICT` | すべて |

### `BPF commands` {#bpf-commands}
BPF コマンドは、bpf syscall へのコマンドを指定するために使用されます。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `BPF_MAP_CREATE` | すべて |
| `BPF_MAP_LOOKUP_ELEM` | すべて |
| `BPF_MAP_UPDATE_ELEM` | すべて |
| `BPF_MAP_DELETE_ELEM` | すべて |
| `BPF_MAP_GET_NEXT_KEY` | すべて |
| `BPF_PROG_LOAD` | すべて |
| `BPF_OBJ_PIN` | すべて |
| `BPF_OBJ_GET` | すべて |
| `BPF_PROG_ATTACH` | すべて |
| `BPF_PROG_DETACH` | すべて |
| `BPF_PROG_TEST_RUN` | すべて |
| `BPF_PROG_RUN` | すべて |
| `BPF_PROG_GET_NEXT_ID` | すべて |
| `BPF_MAP_GET_NEXT_ID` | すべて |
| `BPF_PROG_GET_FD_BY_ID` | すべて |
| `BPF_MAP_GET_FD_BY_ID` | すべて |
| `BPF_OBJ_GET_INFO_BY_FD` | すべて |
| `BPF_PROG_QUERY` | すべて |
| `BPF_RAW_TRACEPOINT_OPEN` | すべて |
| `BPF_BTF_LOAD` | すべて |
| `BPF_BTF_GET_FD_BY_ID` | すべて |
| `BPF_TASK_FD_QUERY` | すべて |
| `BPF_MAP_LOOKUP_AND_DELETE_ELEM` | すべて |
| `BPF_MAP_FREEZE` | すべて |
| `BPF_BTF_GET_NEXT_ID` | すべて |
| `BPF_MAP_LOOKUP_BATCH` | すべて |
| `BPF_MAP_LOOKUP_AND_DELETE_BATCH` | すべて |
| `BPF_MAP_UPDATE_BATCH` | すべて |
| `BPF_MAP_DELETE_BATCH` | すべて |
| `BPF_LINK_CREATE` | すべて |
| `BPF_LINK_UPDATE` | すべて |
| `BPF_LINK_GET_FD_BY_ID` | すべて |
| `BPF_LINK_GET_NEXT_ID` | すべて |
| `BPF_ENABLE_STATS` | すべて |
| `BPF_ITER_CREATE` | すべて |
| `BPF_LINK_DETACH` | すべて |
| `BPF_PROG_BIND_MAP` | すべて |

### `BPF helper functions` {#bpf-helper-functions}
BPF ヘルパー関数は、サポートされている BPF ヘルパー関数です。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `BPF_UNSPEC` | すべて |
| `BPF_MAP_LOOKUP_ELEM` | すべて |
| `BPF_MAP_UPDATE_ELEM` | すべて |
| `BPF_MAP_DELETE_ELEM` | すべて |
| `BPF_PROBE_READ` | すべて |
| `BPF_KTIME_GET_NS` | すべて |
| `BPF_TRACE_PRINTK` | すべて |
| `BPF_GET_PRANDOM_U32` | すべて |
| `BPF_GET_SMP_PROCESSOR_ID` | すべて |
| `BPF_SKB_STORE_BYTES` | すべて |
| `BPF_L3_CSUM_REPLACE` | すべて |
| `BPF_L4_CSUM_REPLACE` | すべて |
| `BPF_TAIL_CALL` | すべて |
| `BPF_CLONE_REDIRECT` | すべて |
| `BPF_GET_CURRENT_PID_TGID` | すべて |
| `BPF_GET_CURRENT_UID_GID` | すべて |
| `BPF_GET_CURRENT_COMM` | すべて |
| `BPF_GET_CGROUP_CLASSID` | すべて |
| `BPF_SKB_VLAN_PUSH` | すべて |
| `BPF_SKB_VLAN_POP` | すべて |
| `BPF_SKB_GET_TUNNEL_KEY` | すべて |
| `BPF_SKB_SET_TUNNEL_KEY` | すべて |
| `BPF_PERF_EVENT_READ` | すべて |
| `BPF_REDIRECT` | すべて |
| `BPF_GET_ROUTE_REALM` | すべて |
| `BPF_PERF_EVENT_OUTPUT` | すべて |
| `BPF_SKB_LOAD_BYTES` | すべて |
| `BPF_GET_STACKID` | すべて |
| `BPF_CSUM_DIFF` | すべて |
| `BPF_SKB_GET_TUNNEL_OPT` | すべて |
| `BPF_SKB_SET_TUNNEL_OPT` | すべて |
| `BPF_SKB_CHANGE_PROTO` | すべて |
| `BPF_SKB_CHANGE_TYPE` | すべて |
| `BPF_SKB_UNDER_CGROUP` | すべて |
| `BPF_GET_HASH_RECALC` | すべて |
| `BPF_GET_CURRENT_TASK` | すべて |
| `BPF_PROBE_WRITE_USER` | すべて |
| `BPF_CURRENT_TASK_UNDER_CGROUP` | すべて |
| `BPF_SKB_CHANGE_TAIL` | すべて |
| `BPF_SKB_PULL_DATA` | すべて |
| `BPF_CSUM_UPDATE` | すべて |
| `BPF_SET_HASH_INVALID` | すべて |
| `BPF_GET_NUMA_NODE_ID` | すべて |
| `BPF_SKB_CHANGE_HEAD` | すべて |
| `BPF_XDP_ADJUST_HEAD` | すべて |
| `BPF_PROBE_READ_STR` | すべて |
| `BPF_GET_SOCKET_COOKIE` | すべて |
| `BPF_GET_SOCKET_UID` | すべて |
| `BPF_SET_HASH` | すべて |
| `BPF_SETSOCKOPT` | すべて |
| `BPF_SKB_ADJUST_ROOM` | すべて |
| `BPF_REDIRECT_MAP` | すべて |
| `BPF_SK_REDIRECT_MAP` | すべて |
| `BPF_SOCK_MAP_UPDATE` | すべて |
| `BPF_XDP_ADJUST_META` | すべて |
| `BPF_PERF_EVENT_READ_VALUE` | すべて |
| `BPF_PERF_PROG_READ_VALUE` | すべて |
| `BPF_GETSOCKOPT` | すべて |
| `BPF_OVERRIDE_RETURN` | すべて |
| `BPF_SOCK_OPS_CB_FLAGS_SET` | すべて |
| `BPF_MSG_REDIRECT_MAP` | すべて |
| `BPF_MSG_APPLY_BYTES` | すべて |
| `BPF_MSG_CORK_BYTES` | すべて |
| `BPF_MSG_PULL_DATA` | すべて |
| `BPF_BIND` | すべて |
| `BPF_XDP_ADJUST_TAIL` | すべて |
| `BPF_SKB_GET_XFRM_STATE` | すべて |
| `BPF_GET_STACK` | すべて |
| `BPF_SKB_LOAD_BYTES_RELATIVE` | すべて |
| `BPF_FIB_LOOKUP` | すべて |
| `BPF_SOCK_HASH_UPDATE` | すべて |
| `BPF_MSG_REDIRECT_HASH` | すべて |
| `BPF_SK_REDIRECT_HASH` | すべて |
| `BPF_LWT_PUSH_ENCAP` | すべて |
| `BPF_LWT_SEG6_STORE_BYTES` | すべて |
| `BPF_LWT_SEG6_ADJUST_SRH` | すべて |
| `BPF_LWT_SEG6_ACTION` | すべて |
| `BPF_RC_REPEAT` | すべて |
| `BPF_RC_KEYDOWN` | すべて |
| `BPF_SKB_CGROUP_ID` | すべて |
| `BPF_GET_CURRENT_CGROUP_ID` | すべて |
| `BPF_GET_LOCAL_STORAGE` | すべて |
| `BPF_SK_SELECT_REUSEPORT` | すべて |
| `BPF_SKB_ANCESTOR_CGROUP_ID` | すべて |
| `BPF_SK_LOOKUP_TCP` | すべて |
| `BPF_SK_LOOKUP_UDP` | すべて |
| `BPF_SK_RELEASE` | すべて |
| `BPF_MAP_PUSH_ELEM` | すべて |
| `BPF_MAP_POP_ELEM` | すべて |
| `BPF_MAP_PEEK_ELEM` | すべて |
| `BPF_MSG_PUSH_DATA` | すべて |
| `BPF_MSG_POP_DATA` | すべて |
| `BPF_RC_POINTER_REL` | すべて |
| `BPF_SPIN_LOCK` | すべて |
| `BPF_SPIN_UNLOCK` | すべて |
| `BPF_SK_FULLSOCK` | すべて |
| `BPF_TCP_SOCK` | すべて |
| `BPF_SKB_ECN_SET_CE` | すべて |
| `BPF_GET_LISTENER_SOCK` | すべて |
| `BPF_SKC_LOOKUP_TCP` | すべて |
| `BPF_TCP_CHECK_SYNCOOKIE` | すべて |
| `BPF_SYSCTL_GET_NAME` | すべて |
| `BPF_SYSCTL_GET_CURRENT_VALUE` | すべて |
| `BPF_SYSCTL_GET_NEW_VALUE` | すべて |
| `BPF_SYSCTL_SET_NEW_VALUE` | すべて |
| `BPF_STRTOL` | すべて |
| `BPF_STRTOUL` | すべて |
| `BPF_SK_STORAGE_GET` | すべて |
| `BPF_SK_STORAGE_DELETE` | すべて |
| `BPF_SEND_SIGNAL` | すべて |
| `BPF_TCP_GEN_SYNCOOKIE` | すべて |
| `BPF_SKB_OUTPUT` | すべて |
| `BPF_PROBE_READ_USER` | すべて |
| `BPF_PROBE_READ_KERNEL` | すべて |
| `BPF_PROBE_READ_USER_STR` | すべて |
| `BPF_PROBE_READ_KERNEL_STR` | すべて |
| `BPF_TCP_SEND_ACK` | すべて |
| `BPF_SEND_SIGNAL_THREAD` | すべて |
| `BPF_JIFFIES64` | すべて |
| `BPF_READ_BRANCH_RECORDS` | すべて |
| `BPF_GET_NS_CURRENT_PID_TGID` | すべて |
| `BPF_XDP_OUTPUT` | すべて |
| `BPF_GET_NETNS_COOKIE` | すべて |
| `BPF_GET_CURRENT_ANCESTOR_CGROUP_ID` | すべて |
| `BPF_SK_ASSIGN` | すべて |
| `BPF_KTIME_GET_BOOT_NS` | すべて |
| `BPF_SEQ_PRINTF` | すべて |
| `BPF_SEQ_WRITE` | すべて |
| `BPF_SK_CGROUP_ID` | すべて |
| `BPF_SK_ANCESTOR_CGROUP_ID` | すべて |
| `BPF_RINGBUF_OUTPUT` | すべて |
| `BPF_RINGBUF_RESERVE` | すべて |
| `BPF_RINGBUF_SUBMIT` | すべて |
| `BPF_RINGBUF_DISCARD` | すべて |
| `BPF_RINGBUF_QUERY` | すべて |
| `BPF_CSUM_LEVEL` | すべて |
| `BPF_SKC_TO_TCP6_SOCK` | すべて |
| `BPF_SKC_TO_TCP_SOCK` | すべて |
| `BPF_SKC_TO_TCP_TIMEWAIT_SOCK` | すべて |
| `BPF_SKC_TO_TCP_REQUEST_SOCK` | すべて |
| `BPF_SKC_TO_UDP6_SOCK` | すべて |
| `BPF_GET_TASK_STACK` | すべて |
| `BPF_LOAD_HDR_OPT` | すべて |
| `BPF_STORE_HDR_OPT` | すべて |
| `BPF_RESERVE_HDR_OPT` | すべて |
| `BPF_INODE_STORAGE_GET` | すべて |
| `BPF_INODE_STORAGE_DELETE` | すべて |
| `BPF_D_PATH` | すべて |
| `BPF_COPY_FROM_USER` | すべて |
| `BPF_SNPRINTF_BTF` | すべて |
| `BPF_SEQ_PRINTF_BTF` | すべて |
| `BPF_SKB_CGROUP_CLASSID` | すべて |
| `BPF_REDIRECT_NEIGH` | すべて |
| `BPF_PER_CPU_PTR` | すべて |
| `BPF_THIS_CPU_PTR` | すべて |
| `BPF_REDIRECT_PEER` | すべて |
| `BPF_TASK_STORAGE_GET` | すべて |
| `BPF_TASK_STORAGE_DELETE` | すべて |
| `BPF_GET_CURRENT_TASK_BTF` | すべて |
| `BPF_BPRM_OPTS_SET` | すべて |
| `BPF_KTIME_GET_COARSE_NS` | すべて |
| `BPF_IMA_INODE_HASH` | すべて |
| `BPF_SOCK_FROM_FILE` | すべて |
| `BPF_CHECK_MTU` | すべて |
| `BPF_FOR_EACH_MAP_ELEM` | すべて |
| `BPF_SNPRINTF` | すべて |

### `BPF map types` {#bpf-map-types}
BPF マップタイプは、サポートされている eBPF マップタイプです。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `BPF_MAP_TYPE_UNSPEC` | すべて |
| `BPF_MAP_TYPE_HASH` | すべて |
| `BPF_MAP_TYPE_ARRAY` | すべて |
| `BPF_MAP_TYPE_PROG_ARRAY` | すべて |
| `BPF_MAP_TYPE_PERF_EVENT_ARRAY` | すべて |
| `BPF_MAP_TYPE_PERCPU_HASH` | すべて |
| `BPF_MAP_TYPE_PERCPU_ARRAY` | すべて |
| `BPF_MAP_TYPE_STACK_TRACE` | すべて |
| `BPF_MAP_TYPE_CGROUP_ARRAY` | すべて |
| `BPF_MAP_TYPE_LRU_HASH` | すべて |
| `BPF_MAP_TYPE_LRU_PERCPU_HASH` | すべて |
| `BPF_MAP_TYPE_LPM_TRIE` | すべて |
| `BPF_MAP_TYPE_ARRAY_OF_MAPS` | すべて |
| `BPF_MAP_TYPE_HASH_OF_MAPS` | すべて |
| `BPF_MAP_TYPE_DEVMAP` | すべて |
| `BPF_MAP_TYPE_SOCKMAP` | すべて |
| `BPF_MAP_TYPE_CPUMAP` | すべて |
| `BPF_MAP_TYPE_XSKMAP` | すべて |
| `BPF_MAP_TYPE_SOCKHASH` | すべて |
| `BPF_MAP_TYPE_CGROUP_STORAGE` | すべて |
| `BPF_MAP_TYPE_REUSEPORT_SOCKARRAY` | すべて |
| `BPF_MAP_TYPE_PERCPU_CGROUP_STORAGE` | すべて |
| `BPF_MAP_TYPE_QUEUE` | すべて |
| `BPF_MAP_TYPE_STACK` | すべて |
| `BPF_MAP_TYPE_SK_STORAGE` | すべて |
| `BPF_MAP_TYPE_DEVMAP_HASH` | すべて |
| `BPF_MAP_TYPE_STRUCT_OPS` | すべて |
| `BPF_MAP_TYPE_RINGBUF` | すべて |
| `BPF_MAP_TYPE_INODE_STORAGE` | すべて |
| `BPF_MAP_TYPE_TASK_STORAGE` | すべて |

### `BPF program types` {#bpf-program-types}
BPF プログラムタイプは、サポートされている eBPF プログラムタイプです。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `BPF_PROG_TYPE_UNSPEC` | すべて |
| `BPF_PROG_TYPE_SOCKET_FILTER` | すべて |
| `BPF_PROG_TYPE_KPROBE` | すべて |
| `BPF_PROG_TYPE_SCHED_CLS` | すべて |
| `BPF_PROG_TYPE_SCHED_ACT` | すべて |
| `BPF_PROG_TYPE_TRACEPOINT` | すべて |
| `BPF_PROG_TYPE_XDP` | すべて |
| `BPF_PROG_TYPE_PERF_EVENT` | すべて |
| `BPF_PROG_TYPE_CGROUP_SKB` | すべて |
| `BPF_PROG_TYPE_CGROUP_SOCK` | すべて |
| `BPF_PROG_TYPE_LWT_IN` | すべて |
| `BPF_PROG_TYPE_LWT_OUT` | すべて |
| `BPF_PROG_TYPE_LWT_XMIT` | すべて |
| `BPF_PROG_TYPE_SOCK_OPS` | すべて |
| `BPF_PROG_TYPE_SK_SKB` | すべて |
| `BPF_PROG_TYPE_CGROUP_DEVICE` | すべて |
| `BPF_PROG_TYPE_SK_MSG` | すべて |
| `BPF_PROG_TYPE_RAW_TRACEPOINT` | すべて |
| `BPF_PROG_TYPE_CGROUP_SOCK_ADDR` | すべて |
| `BPF_PROG_TYPE_LWT_SEG6LOCAL` | すべて |
| `BPF_PROG_TYPE_LIRC_MODE2` | すべて |
| `BPF_PROG_TYPE_SK_REUSEPORT` | すべて |
| `BPF_PROG_TYPE_FLOW_DISSECTOR` | すべて |
| `BPF_PROG_TYPE_CGROUP_SYSCTL` | すべて |
| `BPF_PROG_TYPE_RAW_TRACEPOINT_WRITABLE` | すべて |
| `BPF_PROG_TYPE_CGROUP_SOCKOPT` | すべて |
| `BPF_PROG_TYPE_TRACING` | すべて |
| `BPF_PROG_TYPE_STRUCT_OPS` | すべて |
| `BPF_PROG_TYPE_EXT` | すべて |
| `BPF_PROG_TYPE_LSM` | すべて |
| `BPF_PROG_TYPE_SK_LOOKUP` | すべて |

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

### `Error constants` {#error-constants}
エラー定数は、サポートされているエラー定数です。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `E2BIG` | すべて |
| `EACCES` | すべて |
| `EADDRINUSE` | すべて |
| `EADDRNOTAVAIL` | すべて |
| `EADV` | すべて |
| `EAFNOSUPPORT` | すべて |
| `EAGAIN` | すべて |
| `EALREADY` | すべて |
| `EBADE` | すべて |
| `EBADF` | すべて |
| `EBADFD` | すべて |
| `EBADMSG` | すべて |
| `EBADR` | すべて |
| `EBADRQC` | すべて |
| `EBADSLT` | すべて |
| `EBFONT` | すべて |
| `EBUSY` | すべて |
| `ECANCELED` | すべて |
| `ECHILD` | すべて |
| `ECHRNG` | すべて |
| `ECOMM` | すべて |
| `ECONNABORTED` | すべて |
| `ECONNREFUSED` | すべて |
| `ECONNRESET` | すべて |
| `EDEADLK` | すべて |
| `EDEADLOCK` | すべて |
| `EDESTADDRREQ` | すべて |
| `EDOM` | すべて |
| `EDOTDOT` | すべて |
| `EDQUOT` | すべて |
| `EEXIST` | すべて |
| `EFAULT` | すべて |
| `EFBIG` | すべて |
| `EHOSTDOWN` | すべて |
| `EHOSTUNREACH` | すべて |
| `EIDRM` | すべて |
| `EILSEQ` | すべて |
| `EINPROGRESS` | すべて |
| `EINTR` | すべて |
| `EINVAL` | すべて |
| `EIO` | すべて |
| `EISCONN` | すべて |
| `EISDIR` | すべて |
| `EISNAM` | すべて |
| `EKEYEXPIRED` | すべて |
| `EKEYREJECTED` | すべて |
| `EKEYREVOKED` | すべて |
| `EL2HLT` | すべて |
| `EL2NSYNC` | すべて |
| `EL3HLT` | すべて |
| `EL3RST` | すべて |
| `ELIBACC` | すべて |
| `ELIBBAD` | すべて |
| `ELIBEXEC` | すべて |
| `ELIBMAX` | すべて |
| `ELIBSCN` | すべて |
| `ELNRNG` | すべて |
| `ELOOP` | すべて |
| `EMEDIUMTYPE` | すべて |
| `EMFILE` | すべて |
| `EMLINK` | すべて |
| `EMSGSIZE` | すべて |
| `EMULTIHOP` | すべて |
| `ENAMETOOLONG` | すべて |
| `ENAVAIL` | すべて |
| `ENETDOWN` | すべて |
| `ENETRESET` | すべて |
| `ENETUNREACH` | すべて |
| `ENFILE` | すべて |
| `ENOANO` | すべて |
| `ENOBUFS` | すべて |
| `ENOCSI` | すべて |
| `ENODATA` | すべて |
| `ENODEV` | すべて |
| `ENOENT` | すべて |
| `ENOEXEC` | すべて |
| `ENOKEY` | すべて |
| `ENOLCK` | すべて |
| `ENOLINK` | すべて |
| `ENOMEDIUM` | すべて |
| `ENOMEM` | すべて |
| `ENOMSG` | すべて |
| `ENONET` | すべて |
| `ENOPKG` | すべて |
| `ENOPROTOOPT` | すべて |
| `ENOSPC` | すべて |
| `ENOSR` | すべて |
| `ENOSTR` | すべて |
| `ENOSYS` | すべて |
| `ENOTBLK` | すべて |
| `ENOTCONN` | すべて |
| `ENOTDIR` | すべて |
| `ENOTEMPTY` | すべて |
| `ENOTNAM` | すべて |
| `ENOTRECOVERABLE` | すべて |
| `ENOTSOCK` | すべて |
| `ENOTSUP` | すべて |
| `ENOTTY` | すべて |
| `ENOTUNIQ` | すべて |
| `ENXIO` | すべて |
| `EOPNOTSUPP` | すべて |
| `EOVERFLOW` | すべて |
| `EOWNERDEAD` | すべて |
| `EPERM` | すべて |
| `EPFNOSUPPORT` | すべて |
| `EPIPE` | すべて |
| `EPROTO` | すべて |
| `EPROTONOSUPPORT` | すべて |
| `EPROTOTYPE` | すべて |
| `ERANGE` | すべて |
| `EREMCHG` | すべて |
| `EREMOTE` | すべて |
| `EREMOTEIO` | すべて |
| `ERESTART` | すべて |
| `ERFKILL` | すべて |
| `EROFS` | すべて |
| `ESHUTDOWN` | すべて |
| `ESOCKTNOSUPPORT` | すべて |
| `ESPIPE` | すべて |
| `ESRCH` | すべて |
| `ESRMNT` | すべて |
| `ESTALE` | すべて |
| `ESTRPIPE` | すべて |
| `ETIME` | すべて |
| `ETIMEDOUT` | すべて |
| `ETOOMANYREFS` | すべて |
| `ETXTBSY` | すべて |
| `EUCLEAN` | すべて |
| `EUNATCH` | すべて |
| `EUSERS` | すべて |
| `EWOULDBLOCK` | すべて |
| `EXDEV` | すべて |
| `EXFULL` | すべて |

### `File mode constants` {#file-mode-constants}
ファイルモード定数は、サポートされるファイル権限のほか、set-user-ID、set-group-ID、スティッキービットの定数です。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `S_ISUID` | すべて |
| `S_ISGID` | すべて |
| `S_ISVTX` | すべて |
| `S_IRWXU` | すべて |
| `S_IRUSR` | すべて |
| `S_IWUSR` | すべて |
| `S_IXUSR` | すべて |
| `S_IRWXG` | すべて |
| `S_IRGRP` | すべて |
| `S_IWGRP` | すべて |
| `S_IXGRP` | すべて |
| `S_IRWXO` | すべて |
| `S_IROTH` | すべて |
| `S_IWOTH` | すべて |
| `S_IXOTH` | すべて |

### `Inode mode constants` {#inode-mode-constants}
Inode モード定数は、ファイルモード定数と同様に、サポートされるファイルタイプ定数です。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `S_IFMT` | すべて |
| `S_IFSOCK` | すべて |
| `S_IFLNK` | すべて |
| `S_IFREG` | すべて |
| `S_IFBLK` | すべて |
| `S_IFDIR` | すべて |
| `S_IFCHR` | すべて |
| `S_IFIFO` | すべて |
| `S_ISUID` | すべて |
| `S_ISGID` | すべて |
| `S_ISVTX` | すべて |
| `S_IRWXU` | すべて |
| `S_IRUSR` | すべて |
| `S_IWUSR` | すべて |
| `S_IXUSR` | すべて |
| `S_IRWXG` | すべて |
| `S_IRGRP` | すべて |
| `S_IWGRP` | すべて |
| `S_IXGRP` | すべて |
| `S_IRWXO` | すべて |
| `S_IROTH` | すべて |
| `S_IWOTH` | すべて |
| `S_IXOTH` | すべて |

### `Kernel Capability constants` {#kernel-capability-constants}
カーネルケイパビリティ定数は、サポートされている Linux カーネルケイパビリティです。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `CAP_AUDIT_CONTROL` | すべて |
| `CAP_AUDIT_READ` | すべて |
| `CAP_AUDIT_WRITE` | すべて |
| `CAP_BLOCK_SUSPEND` | すべて |
| `CAP_BPF` | すべて |
| `CAP_CHECKPOINT_RESTORE` | すべて |
| `CAP_CHOWN` | すべて |
| `CAP_DAC_OVERRIDE` | すべて |
| `CAP_DAC_READ_SEARCH` | すべて |
| `CAP_FOWNER` | すべて |
| `CAP_FSETID` | すべて |
| `CAP_IPC_LOCK` | すべて |
| `CAP_IPC_OWNER` | すべて |
| `CAP_KILL` | すべて |
| `CAP_LEASE` | すべて |
| `CAP_LINUX_IMMUTABLE` | すべて |
| `CAP_MAC_ADMIN` | すべて |
| `CAP_MAC_OVERRIDE` | すべて |
| `CAP_MKNOD` | すべて |
| `CAP_NET_ADMIN` | すべて |
| `CAP_NET_BIND_SERVICE` | すべて |
| `CAP_NET_BROADCAST` | すべて |
| `CAP_NET_RAW` | すべて |
| `CAP_PERFMON` | すべて |
| `CAP_SETFCAP` | すべて |
| `CAP_SETGID` | すべて |
| `CAP_SETPCAP` | すべて |
| `CAP_SETUID` | すべて |
| `CAP_SYSLOG` | すべて |
| `CAP_SYS_ADMIN` | すべて |
| `CAP_SYS_BOOT` | すべて |
| `CAP_SYS_CHROOT` | すべて |
| `CAP_SYS_MODULE` | すべて |
| `CAP_SYS_NICE` | すべて |
| `CAP_SYS_PACCT` | すべて |
| `CAP_SYS_PTRACE` | すべて |
| `CAP_SYS_RAWIO` | すべて |
| `CAP_SYS_RESOURCE` | すべて |
| `CAP_SYS_TIME` | すべて |
| `CAP_SYS_TTY_CONFIG` | すべて |
| `CAP_WAKE_ALARM` | すべて |

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

### `MMap flags` {#mmap-flags}
MMap フラグは、mmap syscall でサポートされているフラグです。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `MAP_SHARED` | すべて |
| `MAP_PRIVATE` | すべて |
| `MAP_SHARED_VALIDATE` | すべて |
| `MAP_ANON` | すべて |
| `MAP_ANONYMOUS` | すべて |
| `MAP_DENYWRITE` | すべて |
| `MAP_EXECUTABLE` | すべて |
| `MAP_FIXED` | すべて |
| `MAP_FIXED_NOREPLACE` | すべて |
| `MAP_GROWSDOWN` | すべて |
| `MAP_HUGETLB` | すべて |
| `MAP_LOCKED` | すべて |
| `MAP_NONBLOCK` | すべて |
| `MAP_NORESERVE` | すべて |
| `MAP_POPULATE` | すべて |
| `MAP_STACK` | すべて |
| `MAP_SYNC` | すべて |
| `MAP_UNINITIALIZED` | すべて |
| `MAP_HUGE_16KB` | すべて |
| `MAP_HUGE_64KB` | すべて |
| `MAP_HUGE_512KB` | すべて |
| `MAP_HUGE_1MB` | すべて |
| `MAP_HUGE_2MB` | すべて |
| `MAP_HUGE_8MB` | すべて |
| `MAP_HUGE_16MB` | すべて |
| `MAP_HUGE_32MB` | すべて |
| `MAP_HUGE_256MB` | すべて |
| `MAP_HUGE_512MB` | すべて |
| `MAP_HUGE_1GB` | すべて |
| `MAP_HUGE_2GB` | すべて |
| `MAP_HUGE_16GB` | すべて |
| `MAP_32BIT` | amd64 |

### `Network Address Family constants` {#network-address-family-constants}
ネットワークアドレスファミリー定数は、サポートされているネットワークアドレスファミリーです。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `AF_UNSPEC` | すべて |
| `AF_LOCAL` | すべて |
| `AF_UNIX` | すべて |
| `AF_FILE` | すべて |
| `AF_INET` | すべて |
| `AF_AX25` | すべて |
| `AF_IPX` | すべて |
| `AF_APPLETALK` | すべて |
| `AF_NETROM` | すべて |
| `AF_BRIDGE` | すべて |
| `AF_ATMPVC` | すべて |
| `AF_X25` | すべて |
| `AF_INET6` | すべて |
| `AF_ROSE` | すべて |
| `AF_DECnet` | すべて |
| `AF_NETBEUI` | すべて |
| `AF_SECURITY` | すべて |
| `AF_KEY` | すべて |
| `AF_NETLINK` | すべて |
| `AF_ROUTE` | すべて |
| `AF_PACKET` | すべて |
| `AF_ASH` | すべて |
| `AF_ECONET` | すべて |
| `AF_ATMSVC` | すべて |
| `AF_RDS` | すべて |
| `AF_SNA` | すべて |
| `AF_IRDA` | すべて |
| `AF_PPPOX` | すべて |
| `AF_WANPIPE` | すべて |
| `AF_LLC` | すべて |
| `AF_IB` | すべて |
| `AF_MPLS` | すべて |
| `AF_CAN` | すべて |
| `AF_TIPC` | すべて |
| `AF_BLUETOOTH` | すべて |
| `AF_IUCV` | すべて |
| `AF_RXRPC` | すべて |
| `AF_ISDN` | すべて |
| `AF_PHONET` | すべて |
| `AF_IEEE802154` | すべて |
| `AF_CAIF` | すべて |
| `AF_ALG` | すべて |
| `AF_NFC` | すべて |
| `AF_VSOCK` | すべて |
| `AF_KCM` | すべて |
| `AF_QIPCRTR` | すべて |
| `AF_SMC` | すべて |
| `AF_XDP` | すべて |
| `AF_MAX` | すべて |

### `Open flags` {#open-flags}
オープンフラグは、オープン syscall でサポートされているフラグです。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `O_RDONLY` | すべて |
| `O_WRONLY` | すべて |
| `O_RDWR` | すべて |
| `O_APPEND` | すべて |
| `O_CREAT` | すべて |
| `O_EXCL` | すべて |
| `O_SYNC` | すべて |
| `O_TRUNC` | すべて |
| `O_ACCMODE` | すべて |
| `O_ASYNC` | すべて |
| `O_CLOEXEC` | すべて |
| `O_DIRECT` | すべて |
| `O_DIRECTORY` | すべて |
| `O_DSYNC` | すべて |
| `O_FSYNC` | すべて |
| `O_NDELAY` | すべて |
| `O_NOATIME` | すべて |
| `O_NOCTTY` | すべて |
| `O_NOFOLLOW` | すべて |
| `O_NONBLOCK` | すべて |
| `O_RSYNC` | すべて |

### `Pipe buffer flags` {#pipe-buffer-flags}
パイプバッファフラグは、パイプバッファでサポートされているフラグです。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `PIPE_BUF_FLAG_LRU` | すべて |
| `PIPE_BUF_FLAG_ATOMIC` | すべて |
| `PIPE_BUF_FLAG_GIFT` | すべて |
| `PIPE_BUF_FLAG_PACKET` | すべて |
| `PIPE_BUF_FLAG_CAN_MERGE` | すべて |
| `PIPE_BUF_FLAG_WHOLE` | すべて |
| `PIPE_BUF_FLAG_LOSS` | すべて |

### `Protection constants` {#protection-constants}
保護定数は、mmap syscall でサポートされている保護です。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `PROT_NONE` | すべて |
| `PROT_READ` | すべて |
| `PROT_WRITE` | すべて |
| `PROT_EXEC` | すべて |
| `PROT_GROWSDOWN` | すべて |
| `PROT_GROWSUP` | すべて |

### `Ptrace constants` {#ptrace-constants}
ptrace 定数は、ptrace syscall でサポートされている ptrace コマンドです。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `PTRACE_TRACEME` | すべて |
| `PTRACE_PEEKTEXT` | すべて |
| `PTRACE_PEEKDATA` | すべて |
| `PTRACE_PEEKUSR` | すべて |
| `PTRACE_POKETEXT` | すべて |
| `PTRACE_POKEDATA` | すべて |
| `PTRACE_POKEUSR` | すべて |
| `PTRACE_CONT` | すべて |
| `PTRACE_KILL` | すべて |
| `PTRACE_SINGLESTEP` | すべて |
| `PTRACE_ATTACH` | すべて |
| `PTRACE_DETACH` | すべて |
| `PTRACE_SYSCALL` | すべて |
| `PTRACE_SETOPTIONS` | すべて |
| `PTRACE_GETEVENTMSG` | すべて |
| `PTRACE_GETSIGINFO` | すべて |
| `PTRACE_SETSIGINFO` | すべて |
| `PTRACE_GETREGSET` | すべて |
| `PTRACE_SETREGSET` | すべて |
| `PTRACE_SEIZE` | すべて |
| `PTRACE_INTERRUPT` | すべて |
| `PTRACE_LISTEN` | すべて |
| `PTRACE_PEEKSIGINFO` | すべて |
| `PTRACE_GETSIGMASK` | すべて |
| `PTRACE_SETSIGMASK` | すべて |
| `PTRACE_SECCOMP_GET_FILTER` | すべて |
| `PTRACE_SECCOMP_GET_METADATA` | すべて |
| `PTRACE_GET_SYSCALL_INFO` | すべて |
| `PTRACE_GETFPREGS` | amd64、arm |
| `PTRACE_SETFPREGS` | amd64、arm |
| `PTRACE_GETFPXREGS` | amd64 |
| `PTRACE_SETFPXREGS` | amd64 |
| `PTRACE_OLDSETOPTIONS` | amd64、arm |
| `PTRACE_GET_THREAD_AREA` | amd64、arm |
| `PTRACE_SET_THREAD_AREA` | amd64 |
| `PTRACE_ARCH_PRCTL` | amd64 |
| `PTRACE_SYSEMU` | amd64、arm64 |
| `PTRACE_SYSEMU_SINGLESTEP` | amd64、arm64 |
| `PTRACE_SINGLEBLOCK` | amd64 |
| `PTRACE_GETCRUNCHREGS` | arm |
| `PTRACE_GETFDPIC` | arm |
| `PTRACE_GETFDPIC_EXEC` | arm |
| `PTRACE_GETFDPIC_INTERP` | arm |
| `PTRACE_GETHBPREGS` | arm |
| `PTRACE_GETVFPREGS` | arm |
| `PTRACE_GETWMMXREGS` | arm |
| `PTRACE_SETCRUNCHREGS` | arm |
| `PTRACE_SETHBPREGS` | arm |
| `PTRACE_SETVFPREGS` | arm |
| `PTRACE_SETWMMXREGS` | arm |
| `PTRACE_SET_SYSCALL` | arm |
| `PTRACE_PEEKMTETAGS` | arm64 |
| `PTRACE_POKEMTETAGS` | arm64 |

### `Signal constants` {#signal-constants}
シグナル定数は、kill syscall でサポートされているシグナルです。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `SIGHUP` | すべて |
| `SIGINT` | すべて |
| `SIGQUIT` | すべて |
| `SIGILL` | すべて |
| `SIGTRAP` | すべて |
| `SIGABRT` | すべて |
| `SIGIOT` | すべて |
| `SIGBUS` | すべて |
| `SIGFPE` | すべて |
| `SIGKILL` | すべて |
| `SIGUSR1` | すべて |
| `SIGSEGV` | すべて |
| `SIGUSR2` | すべて |
| `SIGPIPE` | すべて |
| `SIGALRM` | すべて |
| `SIGTERM` | すべて |
| `SIGSTKFLT` | すべて |
| `SIGCHLD` | すべて |
| `SIGCONT` | すべて |
| `SIGSTOP` | すべて |
| `SIGTSTP` | すべて |
| `SIGTTIN` | すべて |
| `SIGTTOU` | すべて |
| `SIGURG` | すべて |
| `SIGXCPU` | すべて |
| `SIGXFSZ` | すべて |
| `SIGVTALRM` | すべて |
| `SIGPROF` | すべて |
| `SIGWINCH` | すべて |
| `SIGIO` | すべて |
| `SIGPOLL` | すべて |
| `SIGPWR` | すべて |
| `SIGSYS` | すべて |

### `Unlink flags` {#unlink-flags}
アンリンクフラグは、アンリンク syscall でサポートされているフラグです。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `AT_REMOVEDIR` | すべて |

### `Virtual Memory flags` {#virtual-memory-flags}
仮想メモリフラグは、仮想メモリセグメントの保護を定義します。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `VM_NONE` | すべて |
| `VM_READ` | すべて |
| `VM_WRITE` | すべて |
| `VM_EXEC` | すべて |
| `VM_SHARED` | すべて |
| `VM_MAYREAD` | すべて |
| `VM_MAYWRITE` | すべて |
| `VM_MAYEXEC` | すべて |
| `VM_MAYSHARE` | すべて |
| `VM_GROWSDOWN` | すべて |
| `VM_UFFD_MISSING` | すべて |
| `VM_PFNMAP` | すべて |
| `VM_UFFD_WP` | すべて |
| `VM_LOCKED` | すべて |
| `VM_IO` | すべて |
| `VM_SEQ_READ` | すべて |
| `VM_RAND_READ` | すべて |
| `VM_DONTCOPY` | すべて |
| `VM_DONTEXPAND` | すべて |
| `VM_LOCKONFAULT` | すべて |
| `VM_ACCOUNT` | すべて |
| `VM_NORESERVE` | すべて |
| `VM_HUGETLB` | すべて |
| `VM_SYNC` | すべて |
| `VM_ARCH_1` | すべて |
| `VM_WIPEONFORK` | すべて |
| `VM_DONTDUMP` | すべて |
| `VM_SOFTDIRTY` | すべて |
| `VM_MIXEDMAP` | すべて |
| `VM_HUGEPAGE` | すべて |
| `VM_NOHUGEPAGE` | すべて |
| `VM_MERGEABLE` | すべて |



{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/threats/agent
