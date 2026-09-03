---
algolia:
  category: guide
  rank: 80
  subcategory: Agent Configuration Files
  tags:
  - agent config
  - agent configuration
  - agent directory
aliases:
- /ja/agent/faq/agent-configuration-files
- /ja/agent/guide/agent-configuration-files
description: Datadog Agent の構成ファイルの場所、構造、およびチェックやインテグレーションの設定方法に関するガイド。
title: Agent 構成ファイル
---
## メイン構成ファイル {#main-configuration-file}

Agent 構成ファイルの場所は、オペレーティングシステムによって異なります。

| プラットフォーム                             | コマンド                              |
|:-------------------------------------|:-------------------------------------|
| AIX                                  | `/etc/datadog-agent/datadog.yaml`    |
| Linux                                | `/etc/datadog-agent/datadog.yaml`    |
| macOS                                | `~/.datadog-agent/datadog.yaml`      |
| Windows                              | `%ProgramData%\Datadog\datadog.yaml` |

使用可能なすべての構成オプションの詳細については、[サンプル `config_template.yaml` ファイル][1] を参照してください。

## Agent 構成ディレクトリ {#agent-configuration-directory}

Agent チェックおよびインテグレーション用の構成ファイルは `conf.d` ディレクトリに格納されています。ディレクトリの場所はオペレーティングシステムによって異なります。

| プラットフォーム                             | コマンド                        |
|:-------------------------------------|:-------------------------------|
| AIX                                  | `/etc/datadog-agent/conf.d/`   |
| Linux                                | `/etc/datadog-agent/conf.d/`   |
| CentOS                               | `/etc/datadog-agent/conf.d/`   |
| Debian                               | `/etc/datadog-agent/conf.d/`   |
| Fedora                               | `/etc/datadog-agent/conf.d/`   |
| macOS                                | `~/.datadog-agent/conf.d/`     |
| RedHat                               | `/etc/datadog-agent/conf.d/`   |
| Source                               | `/etc/datadog-agent/conf.d/`   |
| Suse                                 | `/etc/datadog-agent/conf.d/`   |
| Ubuntu                               | `/etc/datadog-agent/conf.d/`   |
| Windows                              | `%ProgramData%\Datadog\conf.d` |

**注**: このディレクトリ内の長さがゼロのファイルは Agent によって無視されます。これにより、空のテンプレート出力のスキップがサポートされていないプロビジョニングシステムにも対応できます。

### チェック構成ファイル {#check-configuration-files}

各 Agent チェック構成ファイルの例は、対応する `<CHECK_NAME>.d/` フォルダー内の `conf.yaml.example` ファイルにあります。このファイルの名前を `conf.yaml` に変更して、関連するチェックを有効にします。**注**: Agent は、`/etc/datadog-agent/conf.d/<CHECK_NAME>.d/` フォルダー内の有効な YAML ファイルを読み込みます。これにより、複雑な構成を複数のファイルに分割できます。たとえば、`http_check` の構成は次のようになります:

```text
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

特別なケースは、`.default` がサフィックスの YAML ファイルです。これらのファイルはデフォルトで Agent によって読み込まれ、常に有効化される基本的なチェック (CPU、メモリ、稼働時間など) を定義するために使用されます。そのチェックに対して別の構成が見つかった場合は無視されるため、そのまま無視して構いません。デフォルトのチェックの 1 つを無効にしたい場合は、そのファイルを削除してください。これらのチェックを構成するには、`conf.yaml.example` をベースとして使用する必要があります。

Autodiscovery テンプレートファイルは、`auto_conf.yaml` ファイルとして構成フォルダーに保存されます。たとえば、Redis チェックの場合、`redisdb.d/` 内の構成は次のようになります。

```text
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

ログ収集の場合、Agent は同じログソースを指す複数の YAML ファイルを受け入れず、重複したログが Datadog に送信されるのを防ぎます。同じログソースを指す YAML ファイルが複数ある場合、Agent はアルファベット順にファイルを処理し、最初のファイルを使用します。

## JMX 構成ファイル {#jmx-configuration-file}

JMX Agent チェックには、構成フォルダーに追加の `metrics.yaml` ファイルがあります。これは、Datadog Agent がデフォルトで収集するすべての Bean のリストです。そのため、[Docker ラベルや k8s アノテーション][2] を通じてチェックを設定する際に、すべての Bean を手動でリストアップする必要がありません。

[1]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[2]: /ja/agent/kubernetes/integrations/#configuration