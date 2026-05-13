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
description: Datadog Agent の構成ファイルの場所、構造、およびチェックとインテグレーションの設定方法に関するガイド。
title: Agent 構成ファイル
---
## メイン構成ファイル {#main-configuration-file}

Agent 構成ファイルの場所は、オペレーティング システムによって異なります。

| プラットフォーム                             | コマンド                              |
|:-------------------------------------|:-------------------------------------|
| AIX                                  | `/etc/datadog-agent/datadog.yaml`    |
| Linux                                | `/etc/datadog-agent/datadog.yaml`    |
| macOS                                | `~/.datadog-agent/datadog.yaml`      |
| Windows                              | `%ProgramData%\Datadog\datadog.yaml` |

使用可能なすべての構成オプションの詳細については、[サンプル `config_template.yaml` ファイル][1] を参照してください。

## Datadog Agent の構成ディレクトリ {#agent-configuration-directory}

Datadog Agent のチェックおよびインテグレーション用構成ファイルは `conf.d` ディレクトリに格納されています。ディレクトリの場所は OS によって異なります。

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

**注意**: このディレクトリ内の長さがゼロのファイルはエージェントによって無視されます。これにより、空のテンプレート出力のスキップ機能を持たないプロビジョニングシステムでも利用できるようになります。

### 構成ファイルを確認してください {#check-configuration-files}

各エージェントチェック構成ファイルの例は、対応する `conf.yaml.example` フォルダー内の `<CHECK_NAME>.d/` ファイルにあります。このファイルの名前を `conf.yaml` に変更して、関連するチェックを有効にします。**注意**: Datadog Agentはフォルダー内の有効な YAML ファイルを読み込みます: `/etc/datadog-agent/conf.d/<CHECK_NAME>.d/`。これにより、複雑な構成を複数のファイルに分割できます。例えば、`http_check` の構成は次のようになります:

```text
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

特別なケースは、接尾辞 `.default` を持つYAMLファイルです。これらのファイルはデフォルトでDatadog Agentによって読み込まれ、常に有効なコアチェックのセット（CPU、メモリ、稼働時間など）を定義するのに役立ちます。他の構成がそのチェックに対して見つかった場合、これらは無視されるため、安全に無視できます。デフォルトのチェックの1つを無効にしたい場合は、そのファイルを削除してください。これらのチェックを構成するには、`conf.yaml.example` をベースとして使用する必要があります。

Autodiscovery テンプレートファイルは、`auto_conf.yaml` ファイルを含む構成フォルダーに保存されます。例えば、Redisチェックの場合、`redisdb.d/` の構成は次のようになります:

```text
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

ログ収集の場合、Datadog Agentは同じログソースを指す複数のYAMLファイルを受け入れず、重複したログがDatadogに送信されるのを防ぎます。同じログソースを指すYAMLファイルが複数ある場合、Datadog Agentはアルファベット順にファイルを考慮し、最初のファイルを使用します。

## JMX構成ファイル {#jmx-configuration-file}

JMX Agentチェックには、構成フォルダーに追加の `metrics.yaml` ファイルがあります。これは、Datadog Agentがデフォルトで収集するすべてのビーンのリストです。この方法では、[Dockerラベルやk8sアノテーション][2]を通じてチェックを設定する際に、すべてのビーンを手動でリストする必要がありません。

[1]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[2]: /ja/agent/kubernetes/integrations/#configuration