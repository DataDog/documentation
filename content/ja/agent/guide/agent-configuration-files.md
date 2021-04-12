---
title: Agent 構成ファイル
kind: ガイド
aliases:
  - /ja/agent/faq/agent-configuration-files
---
## Agent のメイン構成ファイル

Agent v6 の構成ファイルは、**YAML** を使用することで、複雑な構成に対するサポートを強化しています。また、チェックも YAML 構成ファイルを使用するため、一貫性のある構成エクスペリエンスが提供されます。このため、`datadog.conf` (v5) に代わって `datadog.yaml` (v6) が使用されるようになりました。

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| プラットフォーム                             | コマンド                              |
|:-------------------------------------|:-------------------------------------|
| AIX                                  | `/etc/datadog-agent/datadog.yaml`    |
| Linux                                | `/etc/datadog-agent/datadog.yaml`    |
| CentOS                               | `/etc/datadog-agent/datadog.yaml`    |
| Debian                               | `/etc/datadog-agent/datadog.yaml`    |
| Fedora                               | `/etc/datadog-agent/datadog.yaml`    |
| macOS                                | `~/.datadog-agent/datadog.yaml`      |
| RedHat                               | `/etc/datadog-agent/datadog.yaml`    |
| Source                               | `/etc/datadog-agent/datadog.yaml`    |
| Suse                                 | `/etc/datadog-agent/datadog.yaml`    |
| Ubuntu                               | `/etc/datadog-agent/datadog.yaml`    |
| Windows Server 2008/Vista 以降 | `%ProgramData%\Datadog\datadog.yaml` |
| Windows Server 2003/XP 以前     | サポートされないプラットフォーム               |

{{% /tab %}}
{{% tab "Agent v5" %}}

| プラットフォーム                             | コマンド                                                                    |
|:-------------------------------------|:---------------------------------------------------------------------------|
| Linux                                | `/etc/dd-agent/datadog.conf`                                               |
| CentOS                               | `/etc/dd-agent/datadog.conf`                                               |
| Debian                               | `/etc/dd-agent/datadog.conf`                                               |
| Fedora                               | `/etc/dd-agent/datadog.conf`                                               |
| macOS                                | `~/.datadog-agent/datadog.conf`                                            |
| RedHat                               | `/etc/dd-agent/datadog.conf`                                               |
| Source                               | `/etc/dd-agent/datadog.conf`                                               |
| Suse                                 | `/etc/dd-agent/datadog.conf`                                               |
| Ubuntu                               | `/etc/dd-agent/datadog.conf`                                               |
| Windows Server 2008/Vista 以降 | `%ProgramData%\Datadog\datadog.conf`                                       |
| Windows Server 2003/XP 以前     | `\\Documents and Settings\All Users\Application Data\Datadog\datadog.conf` |

{{% /tab %}}
{{< /tabs >}}

注: [`datadog.yaml` ファイルの完全なサンプルは、`datadog-agent` Github リポジトリにあります][1]。

## Agent の構成ディレクトリ

Datadog Agent の以前のリリースでは、構成ファイルは `/dd-agent/conf.d/` に保存されました。6.0 リリース以降は、構成ファイルは `/etc/datadog-agent/conf.d/<名前_チェック>.d/` に保存されます。

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

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
| Windows Server 2008/Vista 以降 | `%ProgramData%\Datadog\conf.d` |
| Windows Server 2003/XP 以前     | サポートされないプラットフォーム         |

### Agent 6 のチェック構成ファイル

各 Agent チェックのコンフィギュレーションファイルの例は、対応する `<CHECK_NAME>.d/` フォルダーの `conf.yaml.example` ファイルにあります。関連するチェックを有効にするには、このファイル名を `conf.yaml` に変更します。Agent は、フォルダー `/etc/datadog-agent/conf.d/<CHECK_NAME>.d/` に含まれる有効な YAML ファイルを読み込むため、複雑なコンフィギュレーションは複数ファイルに分割することができます。たとえば、`http_check` のコンフィギュレーションは次のようになります。

```text
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

特別なケースは、YAML ファイルに `.default` のサフィックスがある場合です。このようなファイルは、デフォルトで Agent によりロードされ、常に有効であるチェックのコアセットの定義に役立ちます（CPU、メモリ、アップタイムなど）。チェックに別のコンフィギュレーションがあり、正常に無視することが可能な場合は、無視されます。デフォルトのチェックを無効にするには、該当ファイルを削除します。これらのチェックを構成するには、ベースとして `conf.yaml.example` を使用します。

オートディスカバリーテンプレートファイルは、`auto_conf.yaml` ファイルのある構成フォルダーに保存されています。たとえば Redis チェックの場合、`redisdb.d/` のコンフィギュレーションは次のとおりです。

```text
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

**注**: ログ収集の場合、Datadog に重複ログが送信されないよう Agent は同じログソースを送信先とする複数の YAML ファイルを許可しません。1 つ以上の YAML ファイルが同じログソースを送信先としている場合、Agent はファイルをアルファベット順に処理し、一番上のファイルを使用します。

下位互換性を維持するため、Agent では依然として `/etc/datadog-agent/conf.d/<名前_チェック>.yaml` 形式の構成ファイルを処理しますが、新しいレイアウトへの移行を強くおすすめします。

{{% /tab %}}
{{% tab "Agent v5" %}}

| プラットフォーム                             | コマンド                                                              |
|:-------------------------------------|:---------------------------------------------------------------------|
| Linux                                | `/etc/dd-agent/conf.d/`                                              |
| CentOS                               | `/etc/dd-agent/conf.d/`                                              |
| Debian                               | `/etc/dd-agent/conf.d/`                                              |
| Fedora                               | `/etc/dd-agent/conf.d/`                                              |
| macOS                                | `~/.datadog-agent/conf.d/`                                           |
| RedHat                               | `/etc/dd-agent/conf.d/`                                              |
| ソース                               | `/etc/dd-agent/conf.d/`                                              |
| Suse                                 | `/etc/dd-agent/conf.d/`                                              |
| Ubuntu                               | `/etc/dd-agent/conf.d/`                                              |
| Windows Server 2008/Vista 以降 | `%ProgramData%\Datadog\conf.d`                                       |
| Windows Server 2003/XP 以前     | `\\Documents and Settings\All Users\Application Data\Datadog\conf.d` |

{{% /tab %}}
{{< /tabs >}}

## JMX 構成ファイル

JMX Agent チェックには、独自の構成フォルダーに追加の `metrics.yaml` ファイルがあります。これは、Datadog Agent がデフォルトで収集するすべての Bean のリストです。これにより、[Docker ラベルまたは k8s アノテーション][2]によってチェックを構成する際に、すべての Bean を手動でリストする必要がなくなります。

[1]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[2]: /ja/agent/kubernetes/integrations/#configuration