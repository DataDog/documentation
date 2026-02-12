---
description: CSM Threats Rules 向けのエージェント式の属性と演算子
disable_edit: true
further_reading:
- link: /security/cloud_workload_security/getting_started/
  tag: ドキュメント
  text: Datadog CSM Threats の開始
title: Agent ルール式の作成
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-agent -->


## Assisted rule creator を使用してカスタムルールを作成

**Assisted rule creator** オプションを使用すると、Agent ルールと依存する検出ルールを同時に作成でき、Agent ルールが検出ルールで適切に参照されます。このツールを使うと、Agent ルールと検出ルールを個別に作成する高度な方法よりも作業が迅速に完了します。

詳細については、[カスタム検出ルールの作成][1]を参照してください。

## Agent 式の構文
Cloud Security Management Threats (CSM Threats) はまず、Datadog Agent 内のアクティビティをエージェント式に基づいて評価し、どのアクティビティを収集するかを判断します。CSM Threats ルールのこの部分は「エージェント式」と呼ばれます。エージェント式は Datadog のセキュリティ言語 (SECL) を使用します。SECL 式の標準形式は次のとおりです。

{{< code-block lang="javascript" >}}
<event-type>.<event-attribute> <operator> <value> [<operator> <event-type>.<event-attribute>] ...

{{< /code-block >}}

この形式を用いた Linux システム向けの例となるルールは、次のようになります。

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

## プラットフォーム固有の構文

SECL 式は複数のプラットフォームをサポートしています。以下のドキュメントを参照して、各プラットフォームで使用可能な属性とヘルパーを確認できます。

* [Linux][2]
* [Windows][3]

[1]: /ja/security/threats/workload_security_rules/custom_rules
[2]: /ja/security/threats/linux_expressions
[3]: /ja/security/threats/windows_expressions