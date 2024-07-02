---
description: Agent expression attributes and operators for CSM Threats Rules
disable_edit: true
further_reading:
- link: /security/cloud_workload_security/getting_started/
  tag: ドキュメント
  text: Get started with Datadog CSM Threats
kind: documentation
title: Agent ルール式の作成
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-agent -->


## Create custom rules using the Assisted rule creator

The **Assisted rule creator** option helps you create the Agent and dependent detection rules together, and ensures that the Agent rule is referenced in the detection rules. Using this tool is faster than the advanced method of creating the Agent and detection rules separately.

For details, see [Creating Custom Detection Rules][1].

## Agent 式の構文
Cloud Security Management Threats (CSM Threats) first evaluates activity within the Datadog Agent against Agent expressions to decide what activity to collect. This portion of a CSM Threats rule is called the Agent expression. Agent expressions use Datadog's Security Language (SECL). The standard format of a SECL expression is as follows:

{{< code-block lang="javascript" >}}
<event-type>.<event-attribute> <operator> <value> [<operator> <event-type>.<event-attribute>] ...

{{< /code-block >}}

Using this format, an example rule for a Linux system looks like this:

{{< code-block lang="javascript" >}}
open.file.path == "/etc/shadow" && process.file.path not in ["/usr/sbin/vipw"]

{{< /code-block >}}

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
| `~"pattern"`     | `~"httpd.*"`         | All                | 7.27          |
| `r"regexp"`      | `r"rc[0-9]+"`        | `.path` を除くすべて | 7.27          |

`.path` フィールドのパターンは Glob として使用されます。`*` は同じレベルのファイルやフォルダにマッチします。7.34 で導入された `**` は、すべてのファイルとサブフォルダにマッチさせるためにパスの末尾に使用することができます。

## Duration
SECL を使用すると、特定の期間に発生したイベントをトリガーとする継続時間ベースのルールを記述することができます。例えば、プロセスが作成された後、一定時間以上秘密ファイルにアクセスした場合にトリガーします。
このようなルールは、次のように書くことができます。

{{< code-block lang="javascript" >}}
open.file.path == "/etc/secret" && process.file.name == "java" && process.created_at > 5s

{{< /code-block >}}

期間は、数値に単位の接尾辞をつけたものです。対応するサフィックスは "s"、"m"、"h" です。

## Platform specific syntax

SECL expressions support several platforms. You can use the documentation below to see what attributes and helpers are available for each.

* [Linux][2]
* [Windows][3]

[1]: /security/threats/workload_security_rules/custom_rules
[2]: /security/threats/linux_expressions
[3]: /security/threats/windows_expressions
