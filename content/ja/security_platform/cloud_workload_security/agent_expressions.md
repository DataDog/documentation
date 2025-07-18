---
description: クラウドワークロードセキュリティルールの Agent 式属性と演算子
disable_edit: true
further_reading:
- link: /security_platform/cloud_workload_security/getting_started/
  tag: ドキュメント
  text: Datadog クラウドワークロードセキュリティの概要
kind: documentation
title: カスタム Agent ルールの作成
---
<!-- このファイルは自動生成されています。scripts/templates フォルダーにあるファイルを編集してください -->

## Agent 式の構文
クラウドワークロードセキュリティ (CWS) は、まず Datadog Agent 内のアクティビティを Agent 式に照らして評価し、収集するアクティビティを決定します。CWS ルールのこの部分は、Agent式と呼ばれます。Agent 式は、Datadog のセキュリティ言語 (SECL) を使用します。SECL 式の標準的なフォーマットは、以下のとおりです。


{{< code-block lang="javascript" >}}
<event-type>.<event-attribute> <operator> <value> <event-attribute> ...

{{< /code-block >}}

このフォーマットを使うと、ルール例は次のようになります。

{{< code-block lang="javascript" >}}
open.file.path == "/etc/shadow" && file.path not in ["/usr/sbin/vipw"]

{{< /code-block >}}

## トリガー
トリガーは、システムで見られるアクティビティの種類に対応するイベントです。現在サポートされているトリガーは以下のとおりです。

| SECL イベント | タイプ | 定義 | Agent バージョン |
| ---------- | ---- | ---------- | ------------- |
| `bind` | ネットワーク | [実験] バインドが実行された | 7.37 |
| `bpf` | カーネル | BPF コマンドが実行された | 7.33 |
| `capset` | プロセス | あるプロセスが容量セットを変更した | 7.27 |
| `chmod` | ファイル | ファイルの権限が変更された | 7.27 |
| `chown` | ファイル | ファイルの所有者が変更された | 7.27 |
| `dns` | ネットワーク | DNS リクエストが送信された | 7.36 |
| `exec` | プロセス | プロセスが実行またはフォークされた | 7.27 |
| `exit` | プロセス | プロセスが終了した | 7.38 |
| `link` | ファイル | ファイルの新しい名前/エイリアスを作成する | 7.27 |
| `load_module` | カーネル | 新しいカーネルモジュールがロードされた | 7.35 |
| `mkdir` | ファイル | ディレクトリが作成された | 7.27 |
| `mmap` | カーネル | mmap コマンドが実行された | 7.35 |
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

## 演算子
SECL 演算子は、イベント属性を組み合わせて完全な式を作成するために使用されます。以下の演算子が利用可能です。

| SECL 演算子         | 種類            |  定義                              | Agent バージョン |
|-----------------------|------------------|------------------------------------------|---------------|
| `==`                  | プロセス          | 等しい                                    | 7.27          |
| `!=`                  | ファイル             | 等しくない                                | 7.27          |
| `>`                   | ファイル             | 大なり                                  | 7.27          |
| `>=`                  | ファイル             | 以上                         | 7.27          |
| `<`                   | ファイル             | 小なり                                   | 7.27          |
| `<=`                  | ファイル             | 以下                          | 7.27          |
| `!`                   | ファイル             | 異なる                                      | 7.27          |
| `^`                   | ファイル             | 異なるバイナリ                               | 7.27          |
| `in [elem1, ...]`     | ファイル             | 要素がリストに含まれている             | 7.27          |
| `not in [elem1, ...]` | ファイル             | 要素がリストに含まれていない         | 7.27          |
| `=~`                  | ファイル             | 一致する文字列                          | 7.27          |
| `!~`                  | ファイル             | 一致しない文字列                      | 7.27          |
| `&`                   | ファイル             | バイナリおよび                               | 7.27          |
| `\|`                  | ファイル             | バイナリまたは                                | 7.27          |
| `&&`                  | ファイル             | ロジカルおよび                              | 7.27          |
| `\|\|`                | ファイル             | ロジカルまたは                               | 7.27          |
| `in CIDR`             | ネットワーク          | 要素が IP 範囲にある               | 7.37          |
| `not in CIDR`         | ネットワーク          | 要素が IP 範囲にない           | 7.37          |
| `allin CIDR`          | ネットワーク          | すべての要素が IP 範囲にある     | 7.37          |
| `in [CIDR1, ...]`     | ネットワーク          | 要素が IP 範囲にある              | 7.37          |
| `not in [CIDR1, ...]` | ネットワーク          | 要素が IP 範囲にない          | 7.37          |
| `allin [CIDR1, ...]`  | ネットワーク          | すべての要素が IP 範囲にある    | 7.37          |

## パターンと正規表現
SECL 式では、パターンや正規表現を使用することができます。これらは `in`、`not in`、`=~`、`!~` 演算子とともに使用することができます。

| 形式           |  例             | 対応フィールド   | Agent バージョン |
|------------------|----------------------|--------------------|---------------|
| `~"pattern"`     | `~"httpd.*"`         | すべて                | 7.27          |
| `r"regexp"`      | `r"rc[0-9]+"`        | `.path` を除くすべて | 7.27          |

`.path` フィールドのパターンは Glob として使用されます。`*` は同じレベルのファイルやフォルダにマッチします。7.34 で導入された `**` は、すべてのファイルとサブフォルダにマッチさせるためにパスの末尾に使用することができます。

## Duration
SECL を使用すると、特定の期間に発生したイベントをトリガーとする継続時間ベースのルールを記述することができます。例えば、プロセスが作成された後、一定時間以上秘密ファイルにアクセスした場合にトリガーします。
このようなルールは、次のように書くことができます。


{{< code-block lang="javascript" >}}
open.file.path == "/etc/secret" && process.file.name == "java" && process.created_at > 5s

{{< /code-block >}}

期間は、数値に単位の接尾辞をつけたものです。対応するサフィックスは "s"、"m"、"h" です。

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
dns.question.name == "example.com" && network.destination.ip in ["192.168.1.25", "10.0.0.0/24"]

{{< /code-block >}}

## ヘルパー
SECL にはヘルパーが存在し、ユーザーは正規表現のような汎用的なテクニックに頼ることなく、高度なルールを書くことができます。

### コマンドライン引数
*args_flags* と *args_options* は、コマンドライン引数に基づく CWS 規則の記述を容易にするためのヘルパーです。

*args_flags* は、1 つまたは 2 つのハイフン文字で始まり、関連する値を受け入れない引数を捕捉するために使用されます。

例:
* `version` は `cat --version` コマンドの *args_flags* の一部です。
* `netstat -ln` コマンドの *args_flags* には `l` と `n` の両方が含まれています。


*args_options* は、1 つまたは 2 つのハイフン文字で始まり、同じ引数として指定されるが '=' 文字で区切られた値、または次の引数として指定された値を受け入れる引数を捕捉するために使用されます。

例:
* `ls -T 8 --width=8` コマンドの *args_options* には `T=8` と `width=8` の両方が含まれています。
* `exec.args_options ~= [ “s=.*\’” ]` は `-s` 引数と `\` で終わるコマンドで `sudoedit` が起動されたことを検出するために使用することができます。

### ファイル権限

*file.mode* に加えて *file.rights* 属性が使用できるようになりました。*file.mode* はカーネルが設定した値を保持することができますが、*file.rights* はユーザーが設定した値のみを保持します。これらの権限は `chmod` コマンドにあるため、より馴染みがあるかもしれません。

## イベントタイプ

### すべてのイベントタイプに共通

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `async` | ブール | syscall が非同期の場合、true |  |
| `container.id` | 文字列 | コンテナの ID |  |
| `container.tags` | 文字列 | コンテナのタグ |  |
| `network.destination.ip` | IP/CIDR | IP アドレス |  |
| `network.destination.port` | 整数 | ポート番号 |  |
| `network.device.ifindex` | 整数 | インターフェイス ifindex |  |
| `network.device.ifname` | 文字列 | インターフェイス ifname |  |
| `network.l3_protocol` | 整数 | ネットワークパケットの l3 プロトコル | L3 プロトコル |
| `network.l4_protocol` | 整数 | ネットワークパケットの l4 プロトコル | L4 プロトコル |
| `network.size` | 整数 | ネットワークパケットのバイト数 |  |
| `network.source.ip` | IP/CIDR | IP アドレス |  |
| `network.source.port` | 整数 | ポート番号 |  |
| `process.ancestors.args` | 文字列 | プロセスの引数 (文字列) |  |
| `process.ancestors.args_flags` | 文字列 | プロセスの引数 (配列) |  |
| `process.ancestors.args_options` | 文字列 | プロセスの引数 (配列) |  |
| `process.ancestors.args_truncated` | ブール | 引数の切り捨てのインジケーター |  |
| `process.ancestors.argv` | 文字列 | プロセスの引数 (配列) |  |
| `process.ancestors.argv0` | 文字列 | プロセスの第一引数 |  |
| `process.ancestors.cap_effective` | 整数 | プロセスの有効なケイパビリティセット | カーネルケイパビリティの定数 |
| `process.ancestors.cap_permitted` | 整数 | プロセスの許可されたケイパビリティセット | カーネルケイパビリティの定数 |
| `process.ancestors.comm` | 文字列 | プロセスの Comm 属性 |  |
| `process.ancestors.container.id` | 文字列 | コンテナ ID |  |
| `process.ancestors.cookie` | 整数 | プロセスのクッキー |  |
| `process.ancestors.created_at` | 整数 | プロセス作成時のタイムスタンプ |  |
| `process.ancestors.egid` | 整数 | プロセスの有効な GID |  |
| `process.ancestors.egroup` | 文字列 | プロセスの有効なグループ |  |
| `process.ancestors.envp` | 文字列 | プロセスの環境変数 |  |
| `process.ancestors.envs` | 文字列 | プロセスの環境変数名 |  |
| `process.ancestors.envs_truncated` | ブール | 環境変数の切り捨てのインジケーター |  |
| `process.ancestors.euid` | 整数 | プロセスの有効な UID |  |
| `process.ancestors.euser` | 文字列 | プロセスの有効なユーザー |  |
| `process.ancestors.file.change_time` | 整数 | ファイルの変更時間 |  |
| `process.ancestors.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `process.ancestors.file.gid` | 整数 | ファイルの所有者の GID |  |
| `process.ancestors.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `process.ancestors.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `process.ancestors.file.inode` | 整数 | ファイルの Inode |  |
| `process.ancestors.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `process.ancestors.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `process.ancestors.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `process.ancestors.file.name` | 文字列 | ファイルのベース名 |  |
| `process.ancestors.file.name.length` | 整数 | ‘process.ancestors.file.name' の文字列の長さ |  |
| `process.ancestors.file.path` | 文字列 | ファイルのパス |  |
| `process.ancestors.file.path.length` | 整数 | 'process.ancestors.file.path' の文字列の長さ |  |
| `process.ancestors.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `process.ancestors.file.uid` | 整数 | ファイルの所有者の UID |  |
| `process.ancestors.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `process.ancestors.fsgid` | 整数 | プロセスの FileSystem-gid |  |
| `process.ancestors.fsgroup` | 文字列 | プロセスの FileSystem-group |  |
| `process.ancestors.fsuid` | 整数 | プロセスの FileSystem-uid |  |
| `process.ancestors.fsuser` | 文字列 | プロセスの FileSystem-user |  |
| `process.ancestors.gid` | 整数 | プロセスの GID |  |
| `process.ancestors.group` | 文字列 | プロセスのグループ |  |
| `process.ancestors.interpreter.file.change_time` | 整数 | ファイルの変更時間 |  |
| `process.ancestors.interpreter.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `process.ancestors.interpreter.file.gid` | 整数 | ファイルの所有者の GID |  |
| `process.ancestors.interpreter.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `process.ancestors.interpreter.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `process.ancestors.interpreter.file.inode` | 整数 | ファイルの Inode |  |
| `process.ancestors.interpreter.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `process.ancestors.interpreter.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `process.ancestors.interpreter.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `process.ancestors.interpreter.file.name` | 文字列 | ファイルのベース名 |  |
| `process.ancestors.interpreter.file.name.length` | 整数 | 'process.ancestors.interpreter.file.name' の文字列の長さ |  |
| `process.ancestors.interpreter.file.path` | 文字列 | ファイルのパス |  |
| `process.ancestors.interpreter.file.path.length` | 整数 | 'process.ancestors.interpreter.file.path' の文字列の長さ |  |
| `process.ancestors.interpreter.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `process.ancestors.interpreter.file.uid` | 整数 | ファイルの所有者の UID |  |
| `process.ancestors.interpreter.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `process.ancestors.is_kworker` | ブール | プロセスが kworker であるかどうかを示します |  |
| `process.ancestors.is_thread` | ブール | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |  |
| `process.ancestors.pid` | 整数 | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |  |
| `process.ancestors.ppid` | 整数 | 親プロセス ID |  |
| `process.ancestors.tid` | 整数 | スレッドのスレッド ID |  |
| `process.ancestors.tty_name` | 文字列 | プロセスに関連する TTY の名前 |  |
| `process.ancestors.uid` | 整数 | プロセスの UID |  |
| `process.ancestors.user` | 文字列 | プロセスのユーザー |  |
| `process.args` | 文字列 | プロセスの引数 (文字列) |  |
| `process.args_flags` | 文字列 | プロセスの引数 (配列) |  |
| `process.args_options` | 文字列 | プロセスの引数 (配列) |  |
| `process.args_truncated` | ブール | 引数の切り捨てのインジケーター |  |
| `process.argv` | 文字列 | プロセスの引数 (配列) |  |
| `process.argv0` | 文字列 | プロセスの第一引数 |  |
| `process.cap_effective` | 整数 | プロセスの有効なケイパビリティセット | カーネルケイパビリティの定数 |
| `process.cap_permitted` | 整数 | プロセスの許可されたケイパビリティセット | カーネルケイパビリティの定数 |
| `process.comm` | 文字列 | プロセスの Comm 属性 |  |
| `process.container.id` | 文字列 | コンテナ ID |  |
| `process.cookie` | 整数 | プロセスのクッキー |  |
| `process.created_at` | 整数 | プロセス作成時のタイムスタンプ |  |
| `process.egid` | 整数 | プロセスの有効な GID |  |
| `process.egroup` | 文字列 | プロセスの有効なグループ |  |
| `process.envp` | 文字列 | プロセスの環境変数 |  |
| `process.envs` | 文字列 | プロセスの環境変数名 |  |
| `process.envs_truncated` | ブール | 環境変数の切り捨てのインジケーター |  |
| `process.euid` | 整数 | プロセスの有効な UID |  |
| `process.euser` | 文字列 | プロセスの有効なユーザー |  |
| `process.file.change_time` | 整数 | ファイルの変更時間 |  |
| `process.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `process.file.gid` | 整数 | ファイルの所有者の GID |  |
| `process.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `process.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `process.file.inode` | 整数 | ファイルの Inode |  |
| `process.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `process.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `process.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `process.file.name` | 文字列 | ファイルのベース名 |  |
| `process.file.name.length` | 整数 | 'process.file.name' の文字列の長さ |  |
| `process.file.path` | 文字列 | ファイルのパス |  |
| `process.file.path.length` | 整数 | 'process.file.path' の文字列の長さ |  |
| `process.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `process.file.uid` | 整数 | ファイルの所有者の UID |  |
| `process.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `process.fsgid` | 整数 | プロセスの FileSystem-gid |  |
| `process.fsgroup` | 文字列 | プロセスの FileSystem-group |  |
| `process.fsuid` | 整数 | プロセスの FileSystem-uid |  |
| `process.fsuser` | 文字列 | プロセスの FileSystem-user |  |
| `process.gid` | 整数 | プロセスの GID |  |
| `process.group` | 文字列 | プロセスのグループ |  |
| `process.interpreter.file.change_time` | 整数 | ファイルの変更時間 |  |
| `process.interpreter.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `process.interpreter.file.gid` | 整数 | ファイルの所有者の GID |  |
| `process.interpreter.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `process.interpreter.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `process.interpreter.file.inode` | 整数 | ファイルの Inode |  |
| `process.interpreter.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `process.interpreter.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `process.interpreter.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `process.interpreter.file.name` | 文字列 | ファイルのベース名 |  |
| `process.interpreter.file.name.length` | 整数 | 'process.interpreter.file.name' の文字列の長さ |  |
| `process.interpreter.file.path` | 文字列 | ファイルのパス |  |
| `process.interpreter.file.path.length` | 整数 | 'process.interpreter.file.path' の文字列の長さ |  |
| `process.interpreter.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `process.interpreter.file.uid` | 整数 | ファイルの所有者の UID |  |
| `process.interpreter.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `process.is_kworker` | ブール | プロセスが kworker であるかどうかを示します |  |
| `process.is_thread` | ブール | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |  |
| `process.parent.args` | 文字列 | プロセスの引数 (文字列) |  |
| `process.parent.args_flags` | 文字列 | プロセスの引数 (配列) |  |
| `process.parent.args_options` | 文字列 | プロセスの引数 (配列) |  |
| `process.parent.args_truncated` | ブール | 引数の切り捨てのインジケーター |  |
| `process.parent.argv` | 文字列 | プロセスの引数 (配列) |  |
| `process.parent.argv0` | 文字列 | プロセスの第一引数 |  |
| `process.parent.cap_effective` | 整数 | プロセスの有効なケイパビリティセット | カーネルケイパビリティの定数 |
| `process.parent.cap_permitted` | 整数 | プロセスの許可されたケイパビリティセット | カーネルケイパビリティの定数 |
| `process.parent.comm` | 文字列 | プロセスの Comm 属性 |  |
| `process.parent.container.id` | 文字列 | コンテナ ID |  |
| `process.parent.cookie` | 整数 | プロセスのクッキー |  |
| `process.parent.created_at` | 整数 | プロセス作成時のタイムスタンプ |  |
| `process.parent.egid` | 整数 | プロセスの有効な GID |  |
| `process.parent.egroup` | 文字列 | プロセスの有効なグループ |  |
| `process.parent.envp` | 文字列 | プロセスの環境変数 |  |
| `process.parent.envs` | 文字列 | プロセスの環境変数名 |  |
| `process.parent.envs_truncated` | ブール | 環境変数の切り捨てのインジケーター |  |
| `process.parent.euid` | 整数 | プロセスの有効な UID |  |
| `process.parent.euser` | 文字列 | プロセスの有効なユーザー |  |
| `process.parent.file.change_time` | 整数 | ファイルの変更時間 |  |
| `process.parent.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `process.parent.file.gid` | 整数 | ファイルの所有者の GID |  |
| `process.parent.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `process.parent.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `process.parent.file.inode` | 整数 | ファイルの Inode |  |
| `process.parent.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `process.parent.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `process.parent.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `process.parent.file.name` | 文字列 | ファイルのベース名 |  |
| `process.parent.file.name.length` | 整数 | 'process.parent.file.name' の文字列の長さ |  |
| `process.parent.file.path` | 文字列 | ファイルのパス |  |
| `process.parent.file.path.length` | 整数 | 'process.parent.file.path' の文字列の長さ |  |
| `process.parent.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `process.parent.file.uid` | 整数 | ファイルの所有者の UID |  |
| `process.parent.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `process.parent.fsgid` | 整数 | プロセスの FileSystem-gid |  |
| `process.parent.fsgroup` | 文字列 | プロセスの FileSystem-group |  |
| `process.parent.fsuid` | 整数 | プロセスの FileSystem-uid |  |
| `process.parent.fsuser` | 文字列 | プロセスの FileSystem-user |  |
| `process.parent.gid` | 整数 | プロセスの GID |  |
| `process.parent.group` | 文字列 | プロセスのグループ |  |
| `process.parent.interpreter.file.change_time` | 整数 | ファイルの変更時間 |  |
| `process.parent.interpreter.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `process.parent.interpreter.file.gid` | 整数 | ファイルの所有者の GID |  |
| `process.parent.interpreter.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `process.parent.interpreter.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `process.parent.interpreter.file.inode` | 整数 | ファイルの Inode |  |
| `process.parent.interpreter.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `process.parent.interpreter.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `process.parent.interpreter.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `process.parent.interpreter.file.name` | 文字列 | ファイルのベース名 |  |
| `process.parent.interpreter.file.name.length` | 整数 | 'process.parent.interpreter.file.name' の文字列の長さ |  |
| `process.parent.interpreter.file.path` | 文字列 | ファイルのパス |  |
| `process.parent.interpreter.file.path.length` | 整数 | 'process.parent.interpreter.file.path' の文字列の長さ |  |
| `process.parent.interpreter.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `process.parent.interpreter.file.uid` | 整数 | ファイルの所有者の UID |  |
| `process.parent.interpreter.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `process.parent.is_kworker` | ブール | プロセスが kworker であるかどうかを示します |  |
| `process.parent.is_thread` | ブール | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |  |
| `process.parent.pid` | 整数 | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |  |
| `process.parent.ppid` | 整数 | 親プロセス ID |  |
| `process.parent.tid` | 整数 | スレッドのスレッド ID |  |
| `process.parent.tty_name` | 文字列 | プロセスに関連する TTY の名前 |  |
| `process.parent.uid` | 整数 | プロセスの UID |  |
| `process.parent.user` | 文字列 | プロセスのユーザー |  |
| `process.pid` | 整数 | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |  |
| `process.ppid` | 整数 | 親プロセス ID |  |
| `process.tid` | 整数 | スレッドのスレッド ID |  |
| `process.tty_name` | 文字列 | プロセスに関連する TTY の名前 |  |
| `process.uid` | 整数 | プロセスの UID |  |
| `process.user` | 文字列 | プロセスのユーザー |  |

### イベント `bind`

_このイベントタイプは実験的なものであり、将来的に変更される可能性があります。_

バインドが実行された

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `bind.addr.family` | 整数 | アドレスファミリー |  |
| `bind.addr.ip` | IP/CIDR | IP アドレス |  |
| `bind.addr.port` | 整数 | ポート番号 |  |
| `bind.retval` | 整数 | syscall の戻り値 | エラー定数 |

### イベント `bpf`

BPF コマンドが実行された

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `bpf.cmd` | 整数 | BPF コマンド名 | BPF コマンド |
| `bpf.map.name` | 文字列 | eBPF マップの名前 (7.35 で追加) |  |
| `bpf.map.type` | 整数 | eBPF マップのタイプ | BPF マップタイプ |
| `bpf.prog.attach_type` | 整数 | eBPF プログラムのアタッチタイプ | BPF アタッチタイプ |
| `bpf.prog.helpers` | 整数 | eBPF プログラムが使用する eBPF ヘルパー (7.35 で追加) | BPF ヘルパー関数 |
| `bpf.prog.name` | 文字列 | eBPF プログラムの名前 (7.35 で追加) |  |
| `bpf.prog.tag` | 文字列 | eBPF プログラムのハッシュ (sha1) (7.35 で追加) |  |
| `bpf.prog.type` | 整数 | eBPF プログラムのタイプ | BPF プログラムタイプ |
| `bpf.retval` | 整数 | syscall の戻り値 | エラー定数 |

### イベント `capset`

あるプロセスが容量セットを変更した

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `capset.cap_effective` | 整数 | プロセスの有効なケイパビリティセット | カーネルケイパビリティの定数 |
| `capset.cap_permitted` | 整数 | プロセスの許可されたケイパビリティセット | カーネルケイパビリティの定数 |

### イベント `chmod`

ファイルの権限が変更された

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `chmod.file.change_time` | 整数 | ファイルの変更時間 |  |
| `chmod.file.destination.mode` | 整数 | chmod されたファイルの新しいモード/権限 | Chmod モード定数 |
| `chmod.file.destination.rights` | 整数 | chmod されたファイルの新しいモード/権限 | Chmod モード定数 |
| `chmod.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `chmod.file.gid` | 整数 | ファイルの所有者の GID |  |
| `chmod.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `chmod.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `chmod.file.inode` | 整数 | ファイルの Inode |  |
| `chmod.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `chmod.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `chmod.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `chmod.file.name` | 文字列 | ファイルのベース名 |  |
| `chmod.file.name.length` | 整数 | 'chmod.file.name' の文字列の長さ |  |
| `chmod.file.path` | 文字列 | ファイルのパス |  |
| `chmod.file.path.length` | 整数 | 'chmod.file.path' の文字列の長さ |  |
| `chmod.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `chmod.file.uid` | 整数 | ファイルの所有者の UID |  |
| `chmod.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `chmod.retval` | 整数 | syscall の戻り値 | エラー定数 |

### イベント `chown`

ファイルの所有者が変更された

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `chown.file.change_time` | 整数 | ファイルの変更時間 |  |
| `chown.file.destination.gid` | 整数 | chown されたファイルの所有者の新しい GID |  |
| `chown.file.destination.group` | 文字列 | chown されたファイルの所有者の新しいグループ |  |
| `chown.file.destination.uid` | 整数 | chown されたファイルの所有者の新しい UID |  |
| `chown.file.destination.user` | 文字列 | chown されたファイルの所有者の新しいユーザー |  |
| `chown.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `chown.file.gid` | 整数 | ファイルの所有者の GID |  |
| `chown.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `chown.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `chown.file.inode` | 整数 | ファイルの Inode |  |
| `chown.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `chown.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `chown.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `chown.file.name` | 文字列 | ファイルのベース名 |  |
| `chown.file.name.length` | 整数 | 'chown.file.name' の文字列の長さ |  |
| `chown.file.path` | 文字列 | ファイルのパス |  |
| `chown.file.path.length` | 整数 | 'chown.file.path' の文字列の長さ |  |
| `chown.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `chown.file.uid` | 整数 | ファイルの所有者の UID |  |
| `chown.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `chown.retval` | 整数 | syscall の戻り値 | エラー定数 |

### イベント `dns`

DNS リクエストが送信された

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `dns.id` | 整数 | [実験] DNS リクエスト ID |  |
| `dns.question.class` | 整数 | DNS の質問で調べたクラス | DNS qclasses |
| `dns.question.count` | 整数 | DNS リクエストの質問数の合計 |  |
| `dns.question.length` | 整数 | DNS リクエストの合計サイズ (バイト) |  |
| `dns.question.name` | 文字列 | クエリ対象のドメイン名 |  |
| `dns.question.name.length` | 整数 | クエリ対象のドメイン名 |  |
| `dns.question.type` | 整数 | DNS の質問タイプを指定する 2 オクテットのコード | DNS qtypes |

### イベント `exec`

プロセスが実行またはフォークされた

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `exec.args` | 文字列 | プロセスの引数 (文字列) |  |
| `exec.args_flags` | 文字列 | プロセスの引数 (配列) |  |
| `exec.args_options` | 文字列 | プロセスの引数 (配列) |  |
| `exec.args_truncated` | ブール | 引数の切り捨てのインジケーター |  |
| `exec.argv` | 文字列 | プロセスの引数 (配列) |  |
| `exec.argv0` | 文字列 | プロセスの第一引数 |  |
| `exec.cap_effective` | 整数 | プロセスの有効なケイパビリティセット | カーネルケイパビリティの定数 |
| `exec.cap_permitted` | 整数 | プロセスの許可されたケイパビリティセット | カーネルケイパビリティの定数 |
| `exec.comm` | 文字列 | プロセスの Comm 属性 |  |
| `exec.container.id` | 文字列 | コンテナ ID |  |
| `exec.cookie` | 整数 | プロセスのクッキー |  |
| `exec.created_at` | 整数 | プロセス作成時のタイムスタンプ |  |
| `exec.egid` | 整数 | プロセスの有効な GID |  |
| `exec.egroup` | 文字列 | プロセスの有効なグループ |  |
| `exec.envp` | 文字列 | プロセスの環境変数 |  |
| `exec.envs` | 文字列 | プロセスの環境変数名 |  |
| `exec.envs_truncated` | ブール | 環境変数の切り捨てのインジケーター |  |
| `exec.euid` | 整数 | プロセスの有効な UID |  |
| `exec.euser` | 文字列 | プロセスの有効なユーザー |  |
| `exec.file.change_time` | 整数 | ファイルの変更時間 |  |
| `exec.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `exec.file.gid` | 整数 | ファイルの所有者の GID |  |
| `exec.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `exec.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `exec.file.inode` | 整数 | ファイルの Inode |  |
| `exec.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `exec.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `exec.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `exec.file.name` | 文字列 | ファイルのベース名 |  |
| `exec.file.name.length` | 整数 | 'exec.file.name' の文字列の長さ |  |
| `exec.file.path` | 文字列 | ファイルのパス |  |
| `exec.file.path.length` | 整数 | 'exec.file.path' の文字列の長さ |  |
| `exec.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `exec.file.uid` | 整数 | ファイルの所有者の UID |  |
| `exec.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `exec.fsgid` | 整数 | プロセスの FileSystem-gid |  |
| `exec.fsgroup` | 文字列 | プロセスの FileSystem-group |  |
| `exec.fsuid` | 整数 | プロセスの FileSystem-uid |  |
| `exec.fsuser` | 文字列 | プロセスの FileSystem-user |  |
| `exec.gid` | 整数 | プロセスの GID |  |
| `exec.group` | 文字列 | プロセスのグループ |  |
| `exec.interpreter.file.change_time` | 整数 | ファイルの変更時間 |  |
| `exec.interpreter.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `exec.interpreter.file.gid` | 整数 | ファイルの所有者の GID |  |
| `exec.interpreter.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `exec.interpreter.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `exec.interpreter.file.inode` | 整数 | ファイルの Inode |  |
| `exec.interpreter.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `exec.interpreter.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `exec.interpreter.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `exec.interpreter.file.name` | 文字列 | ファイルのベース名 |  |
| `exec.interpreter.file.name.length` | 整数 | 'exec.interpreter.file.name' の文字列の長さ |  |
| `exec.interpreter.file.path` | 文字列 | ファイルのパス |  |
| `exec.interpreter.file.path.length` | 整数 | 'exec.interpreter.file.path' の文字列の長さ |  |
| `exec.interpreter.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `exec.interpreter.file.uid` | 整数 | ファイルの所有者の UID |  |
| `exec.interpreter.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `exec.is_kworker` | ブール | プロセスが kworker であるかどうかを示します |  |
| `exec.is_thread` | ブール | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |  |
| `exec.pid` | 整数 | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |  |
| `exec.ppid` | 整数 | 親プロセス ID |  |
| `exec.tid` | 整数 | スレッドのスレッド ID |  |
| `exec.tty_name` | 文字列 | プロセスに関連する TTY の名前 |  |
| `exec.uid` | 整数 | プロセスの UID |  |
| `exec.user` | 文字列 | プロセスのユーザー |  |

### イベント `exit`

プロセスが終了した

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `exit.args` | 文字列 | プロセスの引数 (文字列) |  |
| `exit.args_flags` | 文字列 | プロセスの引数 (配列) |  |
| `exit.args_options` | 文字列 | プロセスの引数 (配列) |  |
| `exit.args_truncated` | ブール | 引数の切り捨てのインジケーター |  |
| `exit.argv` | 文字列 | プロセスの引数 (配列) |  |
| `exit.argv0` | 文字列 | プロセスの第一引数 |  |
| `exit.cap_effective` | 整数 | プロセスの有効なケイパビリティセット | カーネルケイパビリティの定数 |
| `exit.cap_permitted` | 整数 | プロセスの許可されたケイパビリティセット | カーネルケイパビリティの定数 |
| `exit.cause` | 整数 | プロセス終了の原因 (EXITED、SIGNALED、COREDUMPED のいずれか 1 つ) |  |
| `exit.code` | 整数 | プロセスの終了コード、またはプロセスを終了させたシグナルの番号 |  |
| `exit.comm` | 文字列 | プロセスの Comm 属性 |  |
| `exit.container.id` | 文字列 | コンテナ ID |  |
| `exit.cookie` | 整数 | プロセスのクッキー |  |
| `exit.created_at` | 整数 | プロセス作成時のタイムスタンプ |  |
| `exit.egid` | 整数 | プロセスの有効な GID |  |
| `exit.egroup` | 文字列 | プロセスの有効なグループ |  |
| `exit.envp` | 文字列 | プロセスの環境変数 |  |
| `exit.envs` | 文字列 | プロセスの環境変数名 |  |
| `exit.envs_truncated` | ブール | 環境変数の切り捨てのインジケーター |  |
| `exit.euid` | 整数 | プロセスの有効な UID |  |
| `exit.euser` | 文字列 | プロセスの有効なユーザー |  |
| `exit.file.change_time` | 整数 | ファイルの変更時間 |  |
| `exit.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `exit.file.gid` | 整数 | ファイルの所有者の GID |  |
| `exit.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `exit.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `exit.file.inode` | 整数 | ファイルの Inode |  |
| `exit.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `exit.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `exit.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `exit.file.name` | 文字列 | ファイルのベース名 |  |
| `exit.file.name.length` | 整数 | 'exit.file.name' の文字列の長さ |  |
| `exit.file.path` | 文字列 | ファイルのパス |  |
| `exit.file.path.length` | 整数 | 'exit.file.path' の文字列の長さ |  |
| `exit.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `exit.file.uid` | 整数 | ファイルの所有者の UID |  |
| `exit.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `exit.fsgid` | 整数 | プロセスの FileSystem-gid |  |
| `exit.fsgroup` | 文字列 | プロセスの FileSystem-group |  |
| `exit.fsuid` | 整数 | プロセスの FileSystem-uid |  |
| `exit.fsuser` | 文字列 | プロセスの FileSystem-user |  |
| `exit.gid` | 整数 | プロセスの GID |  |
| `exit.group` | 文字列 | プロセスのグループ |  |
| `exit.interpreter.file.change_time` | 整数 | ファイルの変更時間 |  |
| `exit.interpreter.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `exit.interpreter.file.gid` | 整数 | ファイルの所有者の GID |  |
| `exit.interpreter.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `exit.interpreter.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `exit.interpreter.file.inode` | 整数 | ファイルの Inode |  |
| `exit.interpreter.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `exit.interpreter.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `exit.interpreter.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `exit.interpreter.file.name` | 文字列 | ファイルのベース名 |  |
| `exit.interpreter.file.name.length` | 整数 | 'exit.interpreter.file.name' の文字列の長さ |  |
| `exit.interpreter.file.path` | 文字列 | ファイルのパス |  |
| `exit.interpreter.file.path.length` | 整数 | 'exit.interpreter.file.path' の文字列の長さ |  |
| `exit.interpreter.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `exit.interpreter.file.uid` | 整数 | ファイルの所有者の UID |  |
| `exit.interpreter.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `exit.is_kworker` | ブール | プロセスが kworker であるかどうかを示します |  |
| `exit.is_thread` | ブール | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |  |
| `exit.pid` | 整数 | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |  |
| `exit.ppid` | 整数 | 親プロセス ID |  |
| `exit.tid` | 整数 | スレッドのスレッド ID |  |
| `exit.tty_name` | 文字列 | プロセスに関連する TTY の名前 |  |
| `exit.uid` | 整数 | プロセスの UID |  |
| `exit.user` | 文字列 | プロセスのユーザー |  |

### イベント `link`

ファイルの新しい名前/エイリアスを作成する

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `link.file.change_time` | 整数 | ファイルの変更時間 |  |
| `link.file.destination.change_time` | 整数 | ファイルの変更時間 |  |
| `link.file.destination.filesystem` | 文字列 | ファイルの filesystem |  |
| `link.file.destination.gid` | 整数 | ファイルの所有者の GID |  |
| `link.file.destination.group` | 文字列 | ファイルの所有者のグループ |  |
| `link.file.destination.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `link.file.destination.inode` | 整数 | ファイルの Inode |  |
| `link.file.destination.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `link.file.destination.modification_time` | 整数 | ファイルの修正時間 |  |
| `link.file.destination.mount_id` | 整数 | ファイルのマウント ID |  |
| `link.file.destination.name` | 文字列 | ファイルのベース名 |  |
| `link.file.destination.name.length` | 整数 | 'link.file.destination.name' の文字列の長さ |  |
| `link.file.destination.path` | 文字列 | ファイルのパス |  |
| `link.file.destination.path.length` | 整数 | 'link.file.destination.path' の文字列の長さ |  |
| `link.file.destination.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `link.file.destination.uid` | 整数 | ファイルの所有者の UID |  |
| `link.file.destination.user` | 文字列 | ファイルの所有者のユーザー |  |
| `link.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `link.file.gid` | 整数 | ファイルの所有者の GID |  |
| `link.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `link.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `link.file.inode` | 整数 | ファイルの Inode |  |
| `link.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `link.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `link.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `link.file.name` | 文字列 | ファイルのベース名 |  |
| `link.file.name.length` | 整数 | 'link.file.name' の文字列の長さ |  |
| `link.file.path` | 文字列 | ファイルのパス |  |
| `link.file.path.length` | 整数 | 'link.file.path' の文字列の長さ |  |
| `link.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `link.file.uid` | 整数 | ファイルの所有者の UID |  |
| `link.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `link.retval` | 整数 | syscall の戻り値 | エラー定数 |

### イベント `load_module`

新しいカーネルモジュールがロードされた

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `load_module.file.change_time` | 整数 | ファイルの変更時間 |  |
| `load_module.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `load_module.file.gid` | 整数 | ファイルの所有者の GID |  |
| `load_module.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `load_module.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `load_module.file.inode` | 整数 | ファイルの Inode |  |
| `load_module.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `load_module.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `load_module.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `load_module.file.name` | 文字列 | ファイルのベース名 |  |
| `load_module.file.name.length` | 整数 | 'load_module.file.name' の文字列の長さ |  |
| `load_module.file.path` | 文字列 | ファイルのパス |  |
| `load_module.file.path.length` | 整数 | 'load_module.file.path' の文字列の長さ |  |
| `load_module.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `load_module.file.uid` | 整数 | ファイルの所有者の UID |  |
| `load_module.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `load_module.loaded_from_memory` | ブール | カーネルモジュールがメモリからロードされたかどうかを示す |  |
| `load_module.name` | 文字列 | 新しいカーネルモジュールの名前 |  |
| `load_module.retval` | 整数 | syscall の戻り値 | エラー定数 |

### イベント `mkdir`

ディレクトリが作成された

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `mkdir.file.change_time` | 整数 | ファイルの変更時間 |  |
| `mkdir.file.destination.mode` | 整数 | 新しいディレクトリのモード/権限 | Chmod モード定数 |
| `mkdir.file.destination.rights` | 整数 | 新しいディレクトリのモード/権限 | Chmod モード定数 |
| `mkdir.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `mkdir.file.gid` | 整数 | ファイルの所有者の GID |  |
| `mkdir.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `mkdir.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `mkdir.file.inode` | 整数 | ファイルの Inode |  |
| `mkdir.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `mkdir.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `mkdir.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `mkdir.file.name` | 文字列 | ファイルのベース名 |  |
| `mkdir.file.name.length` | 整数 | 'mkdir.file.name' の文字列の長さ |  |
| `mkdir.file.path` | 文字列 | ファイルのパス |  |
| `mkdir.file.path.length` | 整数 | 'mkdir.file.path' の文字列の長さ |  |
| `mkdir.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `mkdir.file.uid` | 整数 | ファイルの所有者の UID |  |
| `mkdir.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `mkdir.retval` | 整数 | syscall の戻り値 | エラー定数 |

### イベント `mmap`

mmap コマンドが実行された

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `mmap.file.change_time` | 整数 | ファイルの変更時間 |  |
| `mmap.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `mmap.file.gid` | 整数 | ファイルの所有者の GID |  |
| `mmap.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `mmap.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `mmap.file.inode` | 整数 | ファイルの Inode |  |
| `mmap.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `mmap.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `mmap.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `mmap.file.name` | 文字列 | ファイルのベース名 |  |
| `mmap.file.name.length` | 整数 | 'mmap.file.name' の文字列の長さ |  |
| `mmap.file.path` | 文字列 | ファイルのパス |  |
| `mmap.file.path.length` | 整数 | 'mmap.file.path' の文字列の長さ |  |
| `mmap.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `mmap.file.uid` | 整数 | ファイルの所有者の UID |  |
| `mmap.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `mmap.flags` | 整数 | メモリセグメントフラグ | MMap フラグ |
| `mmap.protection` | 整数 | メモリセグメント保護 | 保護定数 |
| `mmap.retval` | 整数 | syscall の戻り値 | エラー定数 |

### イベント `mprotect`

mprotect コマンドが実行された

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `mprotect.req_protection` | 整数 | 新規メモリセグメント保護 | 仮想メモリフラグ |
| `mprotect.retval` | 整数 | syscall の戻り値 | エラー定数 |
| `mprotect.vm_protection` | 整数 | 初期メモリセグメント保護 | 仮想メモリフラグ |

### イベント `open`

ファイルが開かれた

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `open.file.change_time` | 整数 | ファイルの変更時間 |  |
| `open.file.destination.mode` | 整数 | 作成されたファイルのモード | Chmod モード定数 |
| `open.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `open.file.gid` | 整数 | ファイルの所有者の GID |  |
| `open.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `open.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `open.file.inode` | 整数 | ファイルの Inode |  |
| `open.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `open.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `open.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `open.file.name` | 文字列 | ファイルのベース名 |  |
| `open.file.name.length` | 整数 | 'open.file.name' の文字列の長さ |  |
| `open.file.path` | 文字列 | ファイルのパス |  |
| `open.file.path.length` | 整数 | 'open.file.path' の文字列の長さ |  |
| `open.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `open.file.uid` | 整数 | ファイルの所有者の UID |  |
| `open.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `open.flags` | 整数 | ファイルを開く際に使用するフラグ | オープンフラグ |
| `open.retval` | 整数 | syscall の戻り値 | エラー定数 |

### イベント `ptrace`

ptrace コマンドが実行された

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `ptrace.request` | 整数 | ptrace リクエスト | Ptrace 定数 |
| `ptrace.retval` | 整数 | syscall の戻り値 | エラー定数 |
| `ptrace.tracee.ancestors.args` | 文字列 | プロセスの引数 (文字列) |  |
| `ptrace.tracee.ancestors.args_flags` | 文字列 | プロセスの引数 (配列) |  |
| `ptrace.tracee.ancestors.args_options` | 文字列 | プロセスの引数 (配列) |  |
| `ptrace.tracee.ancestors.args_truncated` | ブール | 引数の切り捨てのインジケーター |  |
| `ptrace.tracee.ancestors.argv` | 文字列 | プロセスの引数 (配列) |  |
| `ptrace.tracee.ancestors.argv0` | 文字列 | プロセスの第一引数 |  |
| `ptrace.tracee.ancestors.cap_effective` | 整数 | プロセスの有効なケイパビリティセット | カーネルケイパビリティの定数 |
| `ptrace.tracee.ancestors.cap_permitted` | 整数 | プロセスの許可されたケイパビリティセット | カーネルケイパビリティの定数 |
| `ptrace.tracee.ancestors.comm` | 文字列 | プロセスの Comm 属性 |  |
| `ptrace.tracee.ancestors.container.id` | 文字列 | コンテナ ID |  |
| `ptrace.tracee.ancestors.cookie` | 整数 | プロセスのクッキー |  |
| `ptrace.tracee.ancestors.created_at` | 整数 | プロセス作成時のタイムスタンプ |  |
| `ptrace.tracee.ancestors.egid` | 整数 | プロセスの有効な GID |  |
| `ptrace.tracee.ancestors.egroup` | 文字列 | プロセスの有効なグループ |  |
| `ptrace.tracee.ancestors.envp` | 文字列 | プロセスの環境変数 |  |
| `ptrace.tracee.ancestors.envs` | 文字列 | プロセスの環境変数名 |  |
| `ptrace.tracee.ancestors.envs_truncated` | ブール | 環境変数の切り捨てのインジケーター |  |
| `ptrace.tracee.ancestors.euid` | 整数 | プロセスの有効な UID |  |
| `ptrace.tracee.ancestors.euser` | 文字列 | プロセスの有効なユーザー |  |
| `ptrace.tracee.ancestors.file.change_time` | 整数 | ファイルの変更時間 |  |
| `ptrace.tracee.ancestors.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `ptrace.tracee.ancestors.file.gid` | 整数 | ファイルの所有者の GID |  |
| `ptrace.tracee.ancestors.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `ptrace.tracee.ancestors.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `ptrace.tracee.ancestors.file.inode` | 整数 | ファイルの Inode |  |
| `ptrace.tracee.ancestors.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `ptrace.tracee.ancestors.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `ptrace.tracee.ancestors.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `ptrace.tracee.ancestors.file.name` | 文字列 | ファイルのベース名 |  |
| `ptrace.tracee.ancestors.file.name.length` | 整数 | 'ptrace.tracee.ancestors.file.name' の文字列の長さ |  |
| `ptrace.tracee.ancestors.file.path` | 文字列 | ファイルのパス |  |
| `ptrace.tracee.ancestors.file.path.length` | 整数 | 'ptrace.tracee.ancestors.file.path' の文字列の長さ |  |
| `ptrace.tracee.ancestors.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `ptrace.tracee.ancestors.file.uid` | 整数 | ファイルの所有者の UID |  |
| `ptrace.tracee.ancestors.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `ptrace.tracee.ancestors.fsgid` | 整数 | プロセスの FileSystem-gid |  |
| `ptrace.tracee.ancestors.fsgroup` | 文字列 | プロセスの FileSystem-group |  |
| `ptrace.tracee.ancestors.fsuid` | 整数 | プロセスの FileSystem-uid |  |
| `ptrace.tracee.ancestors.fsuser` | 文字列 | プロセスの FileSystem-user |  |
| `ptrace.tracee.ancestors.gid` | 整数 | プロセスの GID |  |
| `ptrace.tracee.ancestors.group` | 文字列 | プロセスのグループ |  |
| `ptrace.tracee.ancestors.interpreter.file.change_time` | 整数 | ファイルの変更時間 |  |
| `ptrace.tracee.ancestors.interpreter.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `ptrace.tracee.ancestors.interpreter.file.gid` | 整数 | ファイルの所有者の GID |  |
| `ptrace.tracee.ancestors.interpreter.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `ptrace.tracee.ancestors.interpreter.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `ptrace.tracee.ancestors.interpreter.file.inode` | 整数 | ファイルの Inode |  |
| `ptrace.tracee.ancestors.interpreter.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `ptrace.tracee.ancestors.interpreter.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `ptrace.tracee.ancestors.interpreter.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `ptrace.tracee.ancestors.interpreter.file.name` | 文字列 | ファイルのベース名 |  |
| `ptrace.tracee.ancestors.interpreter.file.name.length` | 整数 | 'ptrace.tracee.ancestors.interpreter.file.name' の文字列の長さ |  |
| `ptrace.tracee.ancestors.interpreter.file.path` | 文字列 | ファイルのパス |  |
| `ptrace.tracee.ancestors.interpreter.file.path.length` | 整数 | 'ptrace.tracee.ancestors.interpreter.file.path' の文字列の長さ |  |
| `ptrace.tracee.ancestors.interpreter.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `ptrace.tracee.ancestors.interpreter.file.uid` | 整数 | ファイルの所有者の UID |  |
| `ptrace.tracee.ancestors.interpreter.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `ptrace.tracee.ancestors.is_kworker` | ブール | プロセスが kworker であるかどうかを示します |  |
| `ptrace.tracee.ancestors.is_thread` | ブール | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |  |
| `ptrace.tracee.ancestors.pid` | 整数 | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |  |
| `ptrace.tracee.ancestors.ppid` | 整数 | 親プロセス ID |  |
| `ptrace.tracee.ancestors.tid` | 整数 | スレッドのスレッド ID |  |
| `ptrace.tracee.ancestors.tty_name` | 文字列 | プロセスに関連する TTY の名前 |  |
| `ptrace.tracee.ancestors.uid` | 整数 | プロセスの UID |  |
| `ptrace.tracee.ancestors.user` | 文字列 | プロセスのユーザー |  |
| `ptrace.tracee.args` | 文字列 | プロセスの引数 (文字列) |  |
| `ptrace.tracee.args_flags` | 文字列 | プロセスの引数 (配列) |  |
| `ptrace.tracee.args_options` | 文字列 | プロセスの引数 (配列) |  |
| `ptrace.tracee.args_truncated` | ブール | 引数の切り捨てのインジケーター |  |
| `ptrace.tracee.argv` | 文字列 | プロセスの引数 (配列) |  |
| `ptrace.tracee.argv0` | 文字列 | プロセスの第一引数 |  |
| `ptrace.tracee.cap_effective` | 整数 | プロセスの有効なケイパビリティセット | カーネルケイパビリティの定数 |
| `ptrace.tracee.cap_permitted` | 整数 | プロセスの許可されたケイパビリティセット | カーネルケイパビリティの定数 |
| `ptrace.tracee.comm` | 文字列 | プロセスの Comm 属性 |  |
| `ptrace.tracee.container.id` | 文字列 | コンテナ ID |  |
| `ptrace.tracee.cookie` | 整数 | プロセスのクッキー |  |
| `ptrace.tracee.created_at` | 整数 | プロセス作成時のタイムスタンプ |  |
| `ptrace.tracee.egid` | 整数 | プロセスの有効な GID |  |
| `ptrace.tracee.egroup` | 文字列 | プロセスの有効なグループ |  |
| `ptrace.tracee.envp` | 文字列 | プロセスの環境変数 |  |
| `ptrace.tracee.envs` | 文字列 | プロセスの環境変数名 |  |
| `ptrace.tracee.envs_truncated` | ブール | 環境変数の切り捨てのインジケーター |  |
| `ptrace.tracee.euid` | 整数 | プロセスの有効な UID |  |
| `ptrace.tracee.euser` | 文字列 | プロセスの有効なユーザー |  |
| `ptrace.tracee.file.change_time` | 整数 | ファイルの変更時間 |  |
| `ptrace.tracee.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `ptrace.tracee.file.gid` | 整数 | ファイルの所有者の GID |  |
| `ptrace.tracee.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `ptrace.tracee.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `ptrace.tracee.file.inode` | 整数 | ファイルの Inode |  |
| `ptrace.tracee.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `ptrace.tracee.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `ptrace.tracee.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `ptrace.tracee.file.name` | 文字列 | ファイルのベース名 |  |
| `ptrace.tracee.file.name.length` | 整数 | 'ptrace.tracee.file.name' の文字列の長さ |  |
| `ptrace.tracee.file.path` | 文字列 | ファイルのパス |  |
| `ptrace.tracee.file.path.length` | 整数 | 'ptrace.tracee.file.path' の文字列の長さ |  |
| `ptrace.tracee.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `ptrace.tracee.file.uid` | 整数 | ファイルの所有者の UID |  |
| `ptrace.tracee.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `ptrace.tracee.fsgid` | 整数 | プロセスの FileSystem-gid |  |
| `ptrace.tracee.fsgroup` | 文字列 | プロセスの FileSystem-group |  |
| `ptrace.tracee.fsuid` | 整数 | プロセスの FileSystem-uid |  |
| `ptrace.tracee.fsuser` | 文字列 | プロセスの FileSystem-user |  |
| `ptrace.tracee.gid` | 整数 | プロセスの GID |  |
| `ptrace.tracee.group` | 文字列 | プロセスのグループ |  |
| `ptrace.tracee.interpreter.file.change_time` | 整数 | ファイルの変更時間 |  |
| `ptrace.tracee.interpreter.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `ptrace.tracee.interpreter.file.gid` | 整数 | ファイルの所有者の GID |  |
| `ptrace.tracee.interpreter.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `ptrace.tracee.interpreter.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `ptrace.tracee.interpreter.file.inode` | 整数 | ファイルの Inode |  |
| `ptrace.tracee.interpreter.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `ptrace.tracee.interpreter.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `ptrace.tracee.interpreter.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `ptrace.tracee.interpreter.file.name` | 文字列 | ファイルのベース名 |  |
| `ptrace.tracee.interpreter.file.name.length` | 整数 | 'ptrace.tracee.interpreter.file.name' の文字列の長さ |  |
| `ptrace.tracee.interpreter.file.path` | 文字列 | ファイルのパス |  |
| `ptrace.tracee.interpreter.file.path.length` | 整数 | 'ptrace.tracee.interpreter.file.path' の文字列の長さ |  |
| `ptrace.tracee.interpreter.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `ptrace.tracee.interpreter.file.uid` | 整数 | ファイルの所有者の UID |  |
| `ptrace.tracee.interpreter.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `ptrace.tracee.is_kworker` | ブール | プロセスが kworker であるかどうかを示します |  |
| `ptrace.tracee.is_thread` | ブール | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |  |
| `ptrace.tracee.parent.args` | 文字列 | プロセスの引数 (文字列) |  |
| `ptrace.tracee.parent.args_flags` | 文字列 | プロセスの引数 (配列) |  |
| `ptrace.tracee.parent.args_options` | 文字列 | プロセスの引数 (配列) |  |
| `ptrace.tracee.parent.args_truncated` | ブール | 引数の切り捨てのインジケーター |  |
| `ptrace.tracee.parent.argv` | 文字列 | プロセスの引数 (配列) |  |
| `ptrace.tracee.parent.argv0` | 文字列 | プロセスの第一引数 |  |
| `ptrace.tracee.parent.cap_effective` | 整数 | プロセスの有効なケイパビリティセット | カーネルケイパビリティの定数 |
| `ptrace.tracee.parent.cap_permitted` | 整数 | プロセスの許可されたケイパビリティセット | カーネルケイパビリティの定数 |
| `ptrace.tracee.parent.comm` | 文字列 | プロセスの Comm 属性 |  |
| `ptrace.tracee.parent.container.id` | 文字列 | コンテナ ID |  |
| `ptrace.tracee.parent.cookie` | 整数 | プロセスのクッキー |  |
| `ptrace.tracee.parent.created_at` | 整数 | プロセス作成時のタイムスタンプ |  |
| `ptrace.tracee.parent.egid` | 整数 | プロセスの有効な GID |  |
| `ptrace.tracee.parent.egroup` | 文字列 | プロセスの有効なグループ |  |
| `ptrace.tracee.parent.envp` | 文字列 | プロセスの環境変数 |  |
| `ptrace.tracee.parent.envs` | 文字列 | プロセスの環境変数名 |  |
| `ptrace.tracee.parent.envs_truncated` | ブール | 環境変数の切り捨てのインジケーター |  |
| `ptrace.tracee.parent.euid` | 整数 | プロセスの有効な UID |  |
| `ptrace.tracee.parent.euser` | 文字列 | プロセスの有効なユーザー |  |
| `ptrace.tracee.parent.file.change_time` | 整数 | ファイルの変更時間 |  |
| `ptrace.tracee.parent.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `ptrace.tracee.parent.file.gid` | 整数 | ファイルの所有者の GID |  |
| `ptrace.tracee.parent.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `ptrace.tracee.parent.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `ptrace.tracee.parent.file.inode` | 整数 | ファイルの Inode |  |
| `ptrace.tracee.parent.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `ptrace.tracee.parent.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `ptrace.tracee.parent.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `ptrace.tracee.parent.file.name` | 文字列 | ファイルのベース名 |  |
| `ptrace.tracee.parent.file.name.length` | 整数 | 'ptrace.tracee.parent.file.name' の文字列の長さ |  |
| `ptrace.tracee.parent.file.path` | 文字列 | ファイルのパス |  |
| `ptrace.tracee.parent.file.path.length` | 整数 | 'ptrace.tracee.parent.file.path' の文字列の長さ |  |
| `ptrace.tracee.parent.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `ptrace.tracee.parent.file.uid` | 整数 | ファイルの所有者の UID |  |
| `ptrace.tracee.parent.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `ptrace.tracee.parent.fsgid` | 整数 | プロセスの FileSystem-gid |  |
| `ptrace.tracee.parent.fsgroup` | 文字列 | プロセスの FileSystem-group |  |
| `ptrace.tracee.parent.fsuid` | 整数 | プロセスの FileSystem-uid |  |
| `ptrace.tracee.parent.fsuser` | 文字列 | プロセスの FileSystem-user |  |
| `ptrace.tracee.parent.gid` | 整数 | プロセスの GID |  |
| `ptrace.tracee.parent.group` | 文字列 | プロセスのグループ |  |
| `ptrace.tracee.parent.interpreter.file.change_time` | 整数 | ファイルの変更時間 |  |
| `ptrace.tracee.parent.interpreter.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `ptrace.tracee.parent.interpreter.file.gid` | 整数 | ファイルの所有者の GID |  |
| `ptrace.tracee.parent.interpreter.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `ptrace.tracee.parent.interpreter.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `ptrace.tracee.parent.interpreter.file.inode` | 整数 | ファイルの Inode |  |
| `ptrace.tracee.parent.interpreter.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `ptrace.tracee.parent.interpreter.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `ptrace.tracee.parent.interpreter.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `ptrace.tracee.parent.interpreter.file.name` | 文字列 | ファイルのベース名 |  |
| `ptrace.tracee.parent.interpreter.file.name.length` | 整数 | 'ptrace.tracee.parent.interpreter.file.name' の文字列の長さ |  |
| `ptrace.tracee.parent.interpreter.file.path` | 文字列 | ファイルのパス |  |
| `ptrace.tracee.parent.interpreter.file.path.length` | 整数 | 'ptrace.tracee.parent.interpreter.file.path' の文字列の長さ |  |
| `ptrace.tracee.parent.interpreter.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `ptrace.tracee.parent.interpreter.file.uid` | 整数 | ファイルの所有者の UID |  |
| `ptrace.tracee.parent.interpreter.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `ptrace.tracee.parent.is_kworker` | ブール | プロセスが kworker であるかどうかを示します |  |
| `ptrace.tracee.parent.is_thread` | ブール | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |  |
| `ptrace.tracee.parent.pid` | 整数 | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |  |
| `ptrace.tracee.parent.ppid` | 整数 | 親プロセス ID |  |
| `ptrace.tracee.parent.tid` | 整数 | スレッドのスレッド ID |  |
| `ptrace.tracee.parent.tty_name` | 文字列 | プロセスに関連する TTY の名前 |  |
| `ptrace.tracee.parent.uid` | 整数 | プロセスの UID |  |
| `ptrace.tracee.parent.user` | 文字列 | プロセスのユーザー |  |
| `ptrace.tracee.pid` | 整数 | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |  |
| `ptrace.tracee.ppid` | 整数 | 親プロセス ID |  |
| `ptrace.tracee.tid` | 整数 | スレッドのスレッド ID |  |
| `ptrace.tracee.tty_name` | 文字列 | プロセスに関連する TTY の名前 |  |
| `ptrace.tracee.uid` | 整数 | プロセスの UID |  |
| `ptrace.tracee.user` | 文字列 | プロセスのユーザー |  |

### イベント `removexattr`

拡張属性を削除する

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `removexattr.file.change_time` | 整数 | ファイルの変更時間 |  |
| `removexattr.file.destination.name` | 文字列 | 拡張属性の名前 |  |
| `removexattr.file.destination.namespace` | 文字列 | 拡張属性のネームスペース |  |
| `removexattr.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `removexattr.file.gid` | 整数 | ファイルの所有者の GID |  |
| `removexattr.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `removexattr.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `removexattr.file.inode` | 整数 | ファイルの Inode |  |
| `removexattr.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `removexattr.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `removexattr.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `removexattr.file.name` | 文字列 | ファイルのベース名 |  |
| `removexattr.file.name.length` | 整数 | 'removexattr.file.name' の文字列の長さ |  |
| `removexattr.file.path` | 文字列 | ファイルのパス |  |
| `removexattr.file.path.length` | 整数 | 'removexattr.file.path' の文字列の長さ |  |
| `removexattr.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `removexattr.file.uid` | 整数 | ファイルの所有者の UID |  |
| `removexattr.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `removexattr.retval` | 整数 | syscall の戻り値 | エラー定数 |

### イベント `rename`

ファイル/ディレクトリの名前が変更された

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `rename.file.change_time` | 整数 | ファイルの変更時間 |  |
| `rename.file.destination.change_time` | 整数 | ファイルの変更時間 |  |
| `rename.file.destination.filesystem` | 文字列 | ファイルの filesystem |  |
| `rename.file.destination.gid` | 整数 | ファイルの所有者の GID |  |
| `rename.file.destination.group` | 文字列 | ファイルの所有者のグループ |  |
| `rename.file.destination.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `rename.file.destination.inode` | 整数 | ファイルの Inode |  |
| `rename.file.destination.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `rename.file.destination.modification_time` | 整数 | ファイルの修正時間 |  |
| `rename.file.destination.mount_id` | 整数 | ファイルのマウント ID |  |
| `rename.file.destination.name` | 文字列 | ファイルのベース名 |  |
| `rename.file.destination.name.length` | 整数 | 'rename.file.destination.name' の文字列の長さ |  |
| `rename.file.destination.path` | 文字列 | ファイルのパス |  |
| `rename.file.destination.path.length` | 整数 | 'rename.file.destination.path' の文字列の長さ |  |
| `rename.file.destination.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `rename.file.destination.uid` | 整数 | ファイルの所有者の UID |  |
| `rename.file.destination.user` | 文字列 | ファイルの所有者のユーザー |  |
| `rename.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `rename.file.gid` | 整数 | ファイルの所有者の GID |  |
| `rename.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `rename.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `rename.file.inode` | 整数 | ファイルの Inode |  |
| `rename.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `rename.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `rename.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `rename.file.name` | 文字列 | ファイルのベース名 |  |
| `rename.file.name.length` | 整数 | 'rename.file.name' の文字列の長さ |  |
| `rename.file.path` | 文字列 | ファイルのパス |  |
| `rename.file.path.length` | 整数 | 'rename.file.path' の文字列の長さ |  |
| `rename.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `rename.file.uid` | 整数 | ファイルの所有者の UID |  |
| `rename.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `rename.retval` | 整数 | syscall の戻り値 | エラー定数 |

### イベント `rmdir`

ディレクトリが削除された

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `rmdir.file.change_time` | 整数 | ファイルの変更時間 |  |
| `rmdir.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `rmdir.file.gid` | 整数 | ファイルの所有者の GID |  |
| `rmdir.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `rmdir.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `rmdir.file.inode` | 整数 | ファイルの Inode |  |
| `rmdir.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `rmdir.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `rmdir.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `rmdir.file.name` | 文字列 | ファイルのベース名 |  |
| `rmdir.file.name.length` | 整数 | 'rmdir.file.name' の文字列の長さ |  |
| `rmdir.file.path` | 文字列 | ファイルのパス |  |
| `rmdir.file.path.length` | 整数 | 'rmdir.file.path' の文字列の長さ |  |
| `rmdir.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `rmdir.file.uid` | 整数 | ファイルの所有者の UID |  |
| `rmdir.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `rmdir.retval` | 整数 | syscall の戻り値 | エラー定数 |

### イベント `selinux`

SELinux 操作が実行された

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `selinux.bool.name` | 文字列 | SELinux ブール値名 |  |
| `selinux.bool.state` | 文字列 | SELinux のブール値の新しい値 |  |
| `selinux.bool_commit.state` | ブール | SELinux のブールコミット演算のインジケーター |  |
| `selinux.enforce.status` | 文字列 | SELinux の実行ステータス ("enforcing"、"permissive"、"disabled" のいずれか 1 つ) |  |

### イベント `setgid`

あるプロセスが有効な gid を変更した

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `setgid.egid` | 整数 | プロセスの新しい有効な GID |  |
| `setgid.egroup` | 文字列 | プロセスの新しい有効なグループ |  |
| `setgid.fsgid` | 整数 | プロセスの新しい FileSystem GID |  |
| `setgid.fsgroup` | 文字列 | プロセスの新しい FileSystem グループ |  |
| `setgid.gid` | 整数 | プロセスの新しい GID |  |
| `setgid.group` | 文字列 | プロセスの新しいグループ |  |

### イベント `setuid`

あるプロセスが有効な uid を変更した

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `setuid.euid` | 整数 | プロセスの新しい有効な UID |  |
| `setuid.euser` | 文字列 | プロセスの新しい有効なユーザー |  |
| `setuid.fsuid` | 整数 | プロセスの新しい FileSystem UID |  |
| `setuid.fsuser` | 文字列 | プロセスの新しい FileSystem ユーザー |  |
| `setuid.uid` | 整数 | プロセスの新しい UID |  |
| `setuid.user` | 文字列 | プロセスの新しいユーザー |  |

### イベント `setxattr`

拡張属性を設定する

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `setxattr.file.change_time` | 整数 | ファイルの変更時間 |  |
| `setxattr.file.destination.name` | 文字列 | 拡張属性の名前 |  |
| `setxattr.file.destination.namespace` | 文字列 | 拡張属性のネームスペース |  |
| `setxattr.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `setxattr.file.gid` | 整数 | ファイルの所有者の GID |  |
| `setxattr.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `setxattr.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `setxattr.file.inode` | 整数 | ファイルの Inode |  |
| `setxattr.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `setxattr.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `setxattr.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `setxattr.file.name` | 文字列 | ファイルのベース名 |  |
| `setxattr.file.name.length` | 整数 | 'setxattr.file.name' の文字列の長さ |  |
| `setxattr.file.path` | 文字列 | ファイルのパス |  |
| `setxattr.file.path.length` | 整数 | 'setxattr.file.path' の文字列の長さ |  |
| `setxattr.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `setxattr.file.uid` | 整数 | ファイルの所有者の UID |  |
| `setxattr.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `setxattr.retval` | 整数 | syscall の戻り値 | エラー定数 |

### イベント `signal`

シグナルが送信された

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `signal.pid` | 整数 | ターゲット PID |  |
| `signal.retval` | 整数 | syscall の戻り値 | エラー定数 |
| `signal.target.ancestors.args` | 文字列 | プロセスの引数 (文字列) |  |
| `signal.target.ancestors.args_flags` | 文字列 | プロセスの引数 (配列) |  |
| `signal.target.ancestors.args_options` | 文字列 | プロセスの引数 (配列) |  |
| `signal.target.ancestors.args_truncated` | ブール | 引数の切り捨てのインジケーター |  |
| `signal.target.ancestors.argv` | 文字列 | プロセスの引数 (配列) |  |
| `signal.target.ancestors.argv0` | 文字列 | プロセスの第一引数 |  |
| `signal.target.ancestors.cap_effective` | 整数 | プロセスの有効なケイパビリティセット | カーネルケイパビリティの定数 |
| `signal.target.ancestors.cap_permitted` | 整数 | プロセスの許可されたケイパビリティセット | カーネルケイパビリティの定数 |
| `signal.target.ancestors.comm` | 文字列 | プロセスの Comm 属性 |  |
| `signal.target.ancestors.container.id` | 文字列 | コンテナ ID |  |
| `signal.target.ancestors.cookie` | 整数 | プロセスのクッキー |  |
| `signal.target.ancestors.created_at` | 整数 | プロセス作成時のタイムスタンプ |  |
| `signal.target.ancestors.egid` | 整数 | プロセスの有効な GID |  |
| `signal.target.ancestors.egroup` | 文字列 | プロセスの有効なグループ |  |
| `signal.target.ancestors.envp` | 文字列 | プロセスの環境変数 |  |
| `signal.target.ancestors.envs` | 文字列 | プロセスの環境変数名 |  |
| `signal.target.ancestors.envs_truncated` | ブール | 環境変数の切り捨てのインジケーター |  |
| `signal.target.ancestors.euid` | 整数 | プロセスの有効な UID |  |
| `signal.target.ancestors.euser` | 文字列 | プロセスの有効なユーザー |  |
| `signal.target.ancestors.file.change_time` | 整数 | ファイルの変更時間 |  |
| `signal.target.ancestors.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `signal.target.ancestors.file.gid` | 整数 | ファイルの所有者の GID |  |
| `signal.target.ancestors.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `signal.target.ancestors.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `signal.target.ancestors.file.inode` | 整数 | ファイルの Inode |  |
| `signal.target.ancestors.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `signal.target.ancestors.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `signal.target.ancestors.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `signal.target.ancestors.file.name` | 文字列 | ファイルのベース名 |  |
| `signal.target.ancestors.file.name.length` | 整数 | 'signal.target.ancestors.file.name' の文字列の長さ |  |
| `signal.target.ancestors.file.path` | 文字列 | ファイルのパス |  |
| `signal.target.ancestors.file.path.length` | 整数 | 'signal.target.ancestors.file.path' の文字列の長さ |  |
| `signal.target.ancestors.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `signal.target.ancestors.file.uid` | 整数 | ファイルの所有者の UID |  |
| `signal.target.ancestors.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `signal.target.ancestors.fsgid` | 整数 | プロセスの FileSystem-gid |  |
| `signal.target.ancestors.fsgroup` | 文字列 | プロセスの FileSystem-group |  |
| `signal.target.ancestors.fsuid` | 整数 | プロセスの FileSystem-uid |  |
| `signal.target.ancestors.fsuser` | 文字列 | プロセスの FileSystem-user |  |
| `signal.target.ancestors.gid` | 整数 | プロセスの GID |  |
| `signal.target.ancestors.group` | 文字列 | プロセスのグループ |  |
| `signal.target.ancestors.interpreter.file.change_time` | 整数 | ファイルの変更時間 |  |
| `signal.target.ancestors.interpreter.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `signal.target.ancestors.interpreter.file.gid` | 整数 | ファイルの所有者の GID |  |
| `signal.target.ancestors.interpreter.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `signal.target.ancestors.interpreter.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `signal.target.ancestors.interpreter.file.inode` | 整数 | ファイルの Inode |  |
| `signal.target.ancestors.interpreter.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `signal.target.ancestors.interpreter.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `signal.target.ancestors.interpreter.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `signal.target.ancestors.interpreter.file.name` | 文字列 | ファイルのベース名 |  |
| `signal.target.ancestors.interpreter.file.name.length` | 整数 | 'signal.target.ancestors.interpreter.file.name' の文字列の長さ |  |
| `signal.target.ancestors.interpreter.file.path` | 文字列 | ファイルのパス |  |
| `signal.target.ancestors.interpreter.file.path.length` | 整数 | 'signal.target.ancestors.interpreter.file.path' の文字列の長さ |  |
| `signal.target.ancestors.interpreter.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `signal.target.ancestors.interpreter.file.uid` | 整数 | ファイルの所有者の UID |  |
| `signal.target.ancestors.interpreter.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `signal.target.ancestors.is_kworker` | ブール | プロセスが kworker であるかどうかを示します |  |
| `signal.target.ancestors.is_thread` | ブール | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |  |
| `signal.target.ancestors.pid` | 整数 | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |  |
| `signal.target.ancestors.ppid` | 整数 | 親プロセス ID |  |
| `signal.target.ancestors.tid` | 整数 | スレッドのスレッド ID |  |
| `signal.target.ancestors.tty_name` | 文字列 | プロセスに関連する TTY の名前 |  |
| `signal.target.ancestors.uid` | 整数 | プロセスの UID |  |
| `signal.target.ancestors.user` | 文字列 | プロセスのユーザー |  |
| `signal.target.args` | 文字列 | プロセスの引数 (文字列) |  |
| `signal.target.args_flags` | 文字列 | プロセスの引数 (配列) |  |
| `signal.target.args_options` | 文字列 | プロセスの引数 (配列) |  |
| `signal.target.args_truncated` | ブール | 引数の切り捨てのインジケーター |  |
| `signal.target.argv` | 文字列 | プロセスの引数 (配列) |  |
| `signal.target.argv0` | 文字列 | プロセスの第一引数 |  |
| `signal.target.cap_effective` | 整数 | プロセスの有効なケイパビリティセット | カーネルケイパビリティの定数 |
| `signal.target.cap_permitted` | 整数 | プロセスの許可されたケイパビリティセット | カーネルケイパビリティの定数 |
| `signal.target.comm` | 文字列 | プロセスの Comm 属性 |  |
| `signal.target.container.id` | 文字列 | コンテナ ID |  |
| `signal.target.cookie` | 整数 | プロセスのクッキー |  |
| `signal.target.created_at` | 整数 | プロセス作成時のタイムスタンプ |  |
| `signal.target.egid` | 整数 | プロセスの有効な GID |  |
| `signal.target.egroup` | 文字列 | プロセスの有効なグループ |  |
| `signal.target.envp` | 文字列 | プロセスの環境変数 |  |
| `signal.target.envs` | 文字列 | プロセスの環境変数名 |  |
| `signal.target.envs_truncated` | ブール | 環境変数の切り捨てのインジケーター |  |
| `signal.target.euid` | 整数 | プロセスの有効な UID |  |
| `signal.target.euser` | 文字列 | プロセスの有効なユーザー |  |
| `signal.target.file.change_time` | 整数 | ファイルの変更時間 |  |
| `signal.target.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `signal.target.file.gid` | 整数 | ファイルの所有者の GID |  |
| `signal.target.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `signal.target.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `signal.target.file.inode` | 整数 | ファイルの Inode |  |
| `signal.target.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `signal.target.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `signal.target.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `signal.target.file.name` | 文字列 | ファイルのベース名 |  |
| `signal.target.file.name.length` | 整数 | 'signal.target.file.name' の文字列の長さ |  |
| `signal.target.file.path` | 文字列 | ファイルのパス |  |
| `signal.target.file.path.length` | 整数 | 'signal.target.file.path' の文字列の長さ |  |
| `signal.target.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `signal.target.file.uid` | 整数 | ファイルの所有者の UID |  |
| `signal.target.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `signal.target.fsgid` | 整数 | プロセスの FileSystem-gid |  |
| `signal.target.fsgroup` | 文字列 | プロセスの FileSystem-group |  |
| `signal.target.fsuid` | 整数 | プロセスの FileSystem-uid |  |
| `signal.target.fsuser` | 文字列 | プロセスの FileSystem-user |  |
| `signal.target.gid` | 整数 | プロセスの GID |  |
| `signal.target.group` | 文字列 | プロセスのグループ |  |
| `signal.target.interpreter.file.change_time` | 整数 | ファイルの変更時間 |  |
| `signal.target.interpreter.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `signal.target.interpreter.file.gid` | 整数 | ファイルの所有者の GID |  |
| `signal.target.interpreter.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `signal.target.interpreter.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `signal.target.interpreter.file.inode` | 整数 | ファイルの Inode |  |
| `signal.target.interpreter.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `signal.target.interpreter.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `signal.target.interpreter.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `signal.target.interpreter.file.name` | 文字列 | ファイルのベース名 |  |
| `signal.target.interpreter.file.name.length` | 整数 | 'signal.target.interpreter.file.name' の文字列の長さ |  |
| `signal.target.interpreter.file.path` | 文字列 | ファイルのパス |  |
| `signal.target.interpreter.file.path.length` | 整数 | 'signal.target.interpreter.file.path' の文字列の長さ |  |
| `signal.target.interpreter.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `signal.target.interpreter.file.uid` | 整数 | ファイルの所有者の UID |  |
| `signal.target.interpreter.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `signal.target.is_kworker` | ブール | プロセスが kworker であるかどうかを示します |  |
| `signal.target.is_thread` | ブール | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |  |
| `signal.target.parent.args` | 文字列 | プロセスの引数 (文字列) |  |
| `signal.target.parent.args_flags` | 文字列 | プロセスの引数 (配列) |  |
| `signal.target.parent.args_options` | 文字列 | プロセスの引数 (配列) |  |
| `signal.target.parent.args_truncated` | ブール | 引数の切り捨てのインジケーター |  |
| `signal.target.parent.argv` | 文字列 | プロセスの引数 (配列) |  |
| `signal.target.parent.argv0` | 文字列 | プロセスの第一引数 |  |
| `signal.target.parent.cap_effective` | 整数 | プロセスの有効なケイパビリティセット | カーネルケイパビリティの定数 |
| `signal.target.parent.cap_permitted` | 整数 | プロセスの許可されたケイパビリティセット | カーネルケイパビリティの定数 |
| `signal.target.parent.comm` | 文字列 | プロセスの Comm 属性 |  |
| `signal.target.parent.container.id` | 文字列 | コンテナ ID |  |
| `signal.target.parent.cookie` | 整数 | プロセスのクッキー |  |
| `signal.target.parent.created_at` | 整数 | プロセス作成時のタイムスタンプ |  |
| `signal.target.parent.egid` | 整数 | プロセスの有効な GID |  |
| `signal.target.parent.egroup` | 文字列 | プロセスの有効なグループ |  |
| `signal.target.parent.envp` | 文字列 | プロセスの環境変数 |  |
| `signal.target.parent.envs` | 文字列 | プロセスの環境変数名 |  |
| `signal.target.parent.envs_truncated` | ブール | 環境変数の切り捨てのインジケーター |  |
| `signal.target.parent.euid` | 整数 | プロセスの有効な UID |  |
| `signal.target.parent.euser` | 文字列 | プロセスの有効なユーザー |  |
| `signal.target.parent.file.change_time` | 整数 | ファイルの変更時間 |  |
| `signal.target.parent.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `signal.target.parent.file.gid` | 整数 | ファイルの所有者の GID |  |
| `signal.target.parent.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `signal.target.parent.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `signal.target.parent.file.inode` | 整数 | ファイルの Inode |  |
| `signal.target.parent.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `signal.target.parent.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `signal.target.parent.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `signal.target.parent.file.name` | 文字列 | ファイルのベース名 |  |
| `signal.target.parent.file.name.length` | 整数 | 'signal.target.parent.file.name' の文字列の長さ |  |
| `signal.target.parent.file.path` | 文字列 | ファイルのパス |  |
| `signal.target.parent.file.path.length` | 整数 | 'signal.target.parent.file.path' の文字列の長さ |  |
| `signal.target.parent.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `signal.target.parent.file.uid` | 整数 | ファイルの所有者の UID |  |
| `signal.target.parent.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `signal.target.parent.fsgid` | 整数 | プロセスの FileSystem-gid |  |
| `signal.target.parent.fsgroup` | 文字列 | プロセスの FileSystem-group |  |
| `signal.target.parent.fsuid` | 整数 | プロセスの FileSystem-uid |  |
| `signal.target.parent.fsuser` | 文字列 | プロセスの FileSystem-user |  |
| `signal.target.parent.gid` | 整数 | プロセスの GID |  |
| `signal.target.parent.group` | 文字列 | プロセスのグループ |  |
| `signal.target.parent.interpreter.file.change_time` | 整数 | ファイルの変更時間 |  |
| `signal.target.parent.interpreter.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `signal.target.parent.interpreter.file.gid` | 整数 | ファイルの所有者の GID |  |
| `signal.target.parent.interpreter.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `signal.target.parent.interpreter.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `signal.target.parent.interpreter.file.inode` | 整数 | ファイルの Inode |  |
| `signal.target.parent.interpreter.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `signal.target.parent.interpreter.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `signal.target.parent.interpreter.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `signal.target.parent.interpreter.file.name` | 文字列 | ファイルのベース名 |  |
| `signal.target.parent.interpreter.file.name.length` | 整数 | 'signal.target.parent.interpreter.file.name' の文字列の長さ |  |
| `signal.target.parent.interpreter.file.path` | 文字列 | ファイルのパス |  |
| `signal.target.parent.interpreter.file.path.length` | 整数 | 'signal.target.parent.interpreter.file.path' の文字列の長さ |  |
| `signal.target.parent.interpreter.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `signal.target.parent.interpreter.file.uid` | 整数 | ファイルの所有者の UID |  |
| `signal.target.parent.interpreter.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `signal.target.parent.is_kworker` | ブール | プロセスが kworker であるかどうかを示します |  |
| `signal.target.parent.is_thread` | ブール | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |  |
| `signal.target.parent.pid` | 整数 | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |  |
| `signal.target.parent.ppid` | 整数 | 親プロセス ID |  |
| `signal.target.parent.tid` | 整数 | スレッドのスレッド ID |  |
| `signal.target.parent.tty_name` | 文字列 | プロセスに関連する TTY の名前 |  |
| `signal.target.parent.uid` | 整数 | プロセスの UID |  |
| `signal.target.parent.user` | 文字列 | プロセスのユーザー |  |
| `signal.target.pid` | 整数 | プロセスのプロセス ID (スレッドグループ ID とも呼ばれる) |  |
| `signal.target.ppid` | 整数 | 親プロセス ID |  |
| `signal.target.tid` | 整数 | スレッドのスレッド ID |  |
| `signal.target.tty_name` | 文字列 | プロセスに関連する TTY の名前 |  |
| `signal.target.uid` | 整数 | プロセスの UID |  |
| `signal.target.user` | 文字列 | プロセスのユーザー |  |
| `signal.type` | 整数 | シグナルの種類 (例: SIGHUP、SIGINT、SIGQUIT など) | シグナル定数 |

### イベント `splice`

splice コマンドが実行された

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `splice.file.change_time` | 整数 | ファイルの変更時間 |  |
| `splice.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `splice.file.gid` | 整数 | ファイルの所有者の GID |  |
| `splice.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `splice.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `splice.file.inode` | 整数 | ファイルの Inode |  |
| `splice.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `splice.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `splice.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `splice.file.name` | 文字列 | ファイルのベース名 |  |
| `splice.file.name.length` | 整数 | 'splice.file.name' の文字列の長さ |  |
| `splice.file.path` | 文字列 | ファイルのパス |  |
| `splice.file.path.length` | 整数 | 'splice.file.path' の文字列の長さ |  |
| `splice.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `splice.file.uid` | 整数 | ファイルの所有者の UID |  |
| `splice.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `splice.pipe_entry_flag` | 整数 | splice syscall に渡された "fd_out" パイプのエントリフラグ | パイプバッファフラグ |
| `splice.pipe_exit_flag` | 整数 | splice syscall に渡された "fd_out" パイプの終了フラグ | パイプバッファフラグ |
| `splice.retval` | 整数 | syscall の戻り値 | エラー定数 |

### イベント `unlink`

ファイルが削除された

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `unlink.file.change_time` | 整数 | ファイルの変更時間 |  |
| `unlink.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `unlink.file.gid` | 整数 | ファイルの所有者の GID |  |
| `unlink.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `unlink.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `unlink.file.inode` | 整数 | ファイルの Inode |  |
| `unlink.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `unlink.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `unlink.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `unlink.file.name` | 文字列 | ファイルのベース名 |  |
| `unlink.file.name.length` | 整数 | 'unlink.file.name' の文字列の長さ |  |
| `unlink.file.path` | 文字列 | ファイルのパス |  |
| `unlink.file.path.length` | 整数 | 'unlink.file.path' の文字列の長さ |  |
| `unlink.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `unlink.file.uid` | 整数 | ファイルの所有者の UID |  |
| `unlink.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `unlink.flags` | 整数 |  | アンリンクフラグ |
| `unlink.retval` | 整数 | syscall の戻り値 | エラー定数 |

### イベント `unload_module`

カーネルモジュールが削除された

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `unload_module.name` | 文字列 | 削除されたカーネルモジュールの名前 |  |
| `unload_module.retval` | 整数 | syscall の戻り値 | エラー定数 |

### イベント `utimes`

ファイルのアクセス/変更時間を変更する

| プロパティ | タイプ | 定義 | 定数 |
| -------- | ---- | ---------- | --------- |
| `utimes.file.change_time` | 整数 | ファイルの変更時間 |  |
| `utimes.file.filesystem` | 文字列 | ファイルの filesystem |  |
| `utimes.file.gid` | 整数 | ファイルの所有者の GID |  |
| `utimes.file.group` | 文字列 | ファイルの所有者のグループ |  |
| `utimes.file.in_upper_layer` | ブール | ファイルレイヤーのインジケーター (例えば OverlayFS の場合) |  |
| `utimes.file.inode` | 整数 | ファイルの Inode |  |
| `utimes.file.mode` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `utimes.file.modification_time` | 整数 | ファイルの修正時間 |  |
| `utimes.file.mount_id` | 整数 | ファイルのマウント ID |  |
| `utimes.file.name` | 文字列 | ファイルのベース名 |  |
| `utimes.file.name.length` | 整数 | 'utimes.file.name' の文字列の長さ |  |
| `utimes.file.path` | 文字列 | ファイルのパス |  |
| `utimes.file.path.length` | 整数 | 'utimes.file.path' の文字列の長さ |  |
| `utimes.file.rights` | 整数 | ファイルのモード/権限 | Chmod モード定数 |
| `utimes.file.uid` | 整数 | ファイルの所有者の UID |  |
| `utimes.file.user` | 文字列 | ファイルの所有者のユーザー |  |
| `utimes.retval` | 整数 | syscall の戻り値 | エラー定数 |


## 定数

定数は、ルールの可読性を向上させるために使用します。定数には、すべてのアーキテクチャに共通するものと、いくつかのアーキテクチャに固有のものがあります。

### `BPF attach types`

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

### `BPF commands`

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

### `BPF helper functions`

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

### `BPF map types`

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

### `BPF program types`

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

### `Chmod mode constants`

Chmod モード定数は、chmod syscall でサポートされているモードです。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `S_IFBLK` | すべて |
| `S_IFCHR` | すべて |
| `S_IFDIR` | すべて |
| `S_IFIFO` | すべて |
| `S_IFLNK` | すべて |
| `S_IFMT` | すべて |
| `S_IFREG` | すべて |
| `S_IFSOCK` | すべて |
| `S_IRGRP` | すべて |
| `S_IROTH` | すべて |
| `S_IRUSR` | すべて |
| `S_IRWXG` | すべて |
| `S_IRWXO` | すべて |
| `S_IRWXU` | すべて |
| `S_ISGID` | すべて |
| `S_ISUID` | すべて |
| `S_ISVTX` | すべて |
| `S_IWGRP` | すべて |
| `S_IWOTH` | すべて |
| `S_IWUSR` | すべて |
| `S_IXGRP` | すべて |
| `S_IXOTH` | すべて |
| `S_IXUSR` | すべて |

### `DNS qclasses`

DNS qclasses は、サポートされている DNS クエリクラスです。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `CLASS_INET` | すべて |
| `CLASS_CSNET` | すべて |
| `CLASS_CHAOS` | すべて |
| `CLASS_HESIOD` | すべて |
| `CLASS_NONE` | すべて |
| `CLASS_ANY` | すべて |

### `DNS qtypes`

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

### `Error Constants`

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

### `Kernel Capability constants`

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
| `CAP_LAST_CAP` | すべて |
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

### `L3 protocols`

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

### `L4 protocols`

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

### `MMap flags`

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

### `Network Address Family constants`

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

### `Open flags`

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

### `Pipe buffer flags`

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

### `Protection constants`

保護定数は、mmap syscall でサポートされている保護です。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `PROT_NONE` | すべて |
| `PROT_READ` | すべて |
| `PROT_WRITE` | すべて |
| `PROT_EXEC` | すべて |
| `PROT_GROWSDOWN` | すべて |
| `PROT_GROWSUP` | すべて |

### `Ptrace constants`

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

### `SecL constants`

SecL 定数は、サポートされている汎用 SecL 定数です。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `true` | すべて |
| `false` | すべて |

### `Signal constants`

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

### `Unlink flags`

アンリンクフラグは、アンリンク syscall でサポートされているフラグです。

| 名前 | アーキテクチャ |
| ---- |---------------|
| `AT_REMOVEDIR` | すべて |

### `Virtual Memory flags`

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