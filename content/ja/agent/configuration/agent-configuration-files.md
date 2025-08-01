---
algolia:
  category: ガイド
  rank: 80
  subcategory: Agent 構成ファイル
  tags:
  - Agent 構成
  - Agent 構成
  - Agent ディレクトリ
aliases:
- /ja/agent/faq/agent-configuration-files
- /ja/agent/guide/agent-configuration-files
title: Agent 構成ファイル
---

## メイン構成ファイル

Agent 構成ファイルの場所は、オペレーティング システムによって異なります。

| プラットフォーム                             | コマンド                              |
|:-------------------------------------|:-------------------------------------|
| AIX                                  | `/etc/datadog-agent/datadog.yaml`    |
| Linux                                | `/etc/datadog-agent/datadog.yaml`    |
| macOS                                | `~/.datadog-agent/datadog.yaml`      |
| Windows                              | `%ProgramData%\Datadog\datadog.yaml` |

使用可能なすべての構成オプションの詳細については、[サンプル `config_template.yaml` ファイル][1]を参照してください。

## Agent の構成ディレクトリ

Agent チェックおよびインテグレーションの構成ファイルは `conf.d` ディレクトリに格納されます。このディレクトリの場所は、オペレーティング システムによって異なります。

| プラットフォーム                             | コマンド                        |
|:-------------------------------------|:-------------------------------|
| AIX                                  | `/etc/datadog-agent/conf.d/`   |
| Linux                                | `/etc/datadog-agent/conf.d/`   |
| CentOS                               | `/etc/datadog-agent/conf.d/`   |
| Debian                               | `/etc/datadog-agent/conf.d/`   |
| Fedora                               | `/etc/datadog-agent/conf.d/`   |
| macOS                                | `~/.datadog-agent/conf.d/`     |
| RedHat                               | `/etc/datadog-agent/conf.d/`   |
| ソース                               | `/etc/datadog-agent/conf.d/`   |
| Suse                                 | `/etc/datadog-agent/conf.d/`   |
| Ubuntu                               | `/etc/datadog-agent/conf.d/`   |
| Windows                              | `%ProgramData%\Datadog\conf.d` |

**注**: このディレクトリにあるサイズ 0 のファイルは Agent によって無視されます。これにより、空のテンプレート出力をスキップできないプロビジョニング システムでも対応可能になります。

### チェックのコンフィギュレーションファイル

各 Agent チェックのコンフィギュレーションファイルの例は、対応する `<CHECK_NAME>.d/` フォルダーの `conf.yaml.example` ファイルにあります。関連するチェックを有効にするには、このファイル名を `conf.yaml` に変更します。**注**: Agent は、フォルダー `/etc/datadog-agent/conf.d/<CHECK_NAME>.d/` に含まれる有効な YAML ファイルを読み込むため、複雑なコンフィギュレーションは複数ファイルに分割することができます。たとえば、`http_check` のコンフィギュレーションは次のようになります。

```text
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

特別なケースは、YAML ファイルに `.default` のサフィックスがある場合です。このようなファイルは、デフォルトで Agent によりロードされ、常に有効であるチェックのコアセットの定義に役立ちます (CPU、メモリ、アップタイムなど)。チェックに他の構成が見つかった場合、それらは無視されるため、安心して無視できます。デフォルトのチェックを無効にするには、該当ファイルを削除します。これらのチェックを構成するには、ベースとして `conf.yaml.example` を使用します。

オートディスカバリーテンプレートファイルは、`auto_conf.yaml` ファイルのある構成フォルダーに保存されています。たとえば Redis チェックの場合、`redisdb.d/` のコンフィギュレーションは次のとおりです。

```text
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

ログ収集の場合、Datadog に重複ログが送信されないよう Agent は同じログソースを送信先とする複数の YAML ファイルを許可しません。1 つ以上の YAML ファイルが同じログソースを送信先としている場合、Agent はファイルをアルファベット順に処理し、一番上のファイルを使用します。

## JMX 構成ファイル

JMX Agent チェックには、独自の構成フォルダーに追加の `metrics.yaml` ファイルがあります。これは、Datadog Agent がデフォルトで収集するすべての Bean のリストです。これにより、[Docker ラベルまたは k8s アノテーション][2]によってチェックを構成する際に、すべての Bean を手動でリストする必要がなくなります。

[1]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[2]: /ja/agent/kubernetes/integrations/#configuration