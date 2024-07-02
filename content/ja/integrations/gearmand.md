---
"app_id": "gearman"
"app_uuid": "7e1b6c42-8f40-4f4c-8d58-a3f7f39cb3e5"
"assets":
  "dashboards":
    "gearman": "assets/dashboards/gearman_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "gearman.unique_tasks"
      "metadata_path": "metadata.csv"
      "prefix": "gearman."
    "process_signatures":
    - "gearmand"
    - "gearman"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "52"
    "source_type_name": "Gearman"
  "saved_views":
    "gearman_processes": "assets/saved_views/gearman_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "log collection"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/gearmand/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "gearmand"
"integration_id": "gearman"
"integration_title": "Gearman"
"integration_version": "3.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "gearmand"
"public_title": "Gearman"
"short_description": "実行中およびキューにあるジョブの合計数またはタスクごとの数を追跡。"
"supported_os":
- "linux"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::ログの収集"
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "実行中およびキューにあるジョブの合計数またはタスクごとの数を追跡。"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Gearman"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Gearman のメトリクスを収集して、以下のことができます。

- Gearman のパフォーマンスを視覚化できます。
- キューに置かれているタスクまたは実行中のタスクの数を知ることができます。
- Gearman のパフォーマンスをアプリケーションの他の部分と関連付けることができます。

## セットアップ

### インストール

Gearman チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### 構成

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

1. Gearman のパフォーマンスデータを収集するには、[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーで `gearmand.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル gearmand.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
     - server: localhost
       port: 4730
   ```

2. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/gearmand/datadog_checks/gearmand/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                  |
| -------------------- | -------------------------------------- |
| `<INTEGRATION_NAME>` | `gearmand`                             |
| `<INIT_CONFIG>`      | 空白または `{}`                          |
| `<INSTANCE_CONFIG>`  | `{"server":"%%host%%", "port":"4730"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### ログ収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
    logs_enabled: true
    ```

2. Gearman ログの収集を開始するには、次のコンフィギュレーションブロックを `gearmand.d/conf.yaml` ファイルに追加します。

    ```yaml
    logs:
      - type: file
        path: /var/log/gearmand.log
        source: gearman
    ```

    `path` パラメーターの値を環境に合わせて変更します。使用可能なすべてのコンフィギュレーションオプションについては、[gearmand.d/conf.yaml のサンプル][2]を参照してください。

3. [Agent を再起動します][3]。

Kubernetes 環境でのログ収集のための Agent の構成については、[Kubernetes のログ収集][4]を参照してください。

### 検証

[Agent の `status` サブコマンドを実行][5]し、Checks セクションで `gearmand` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "gearmand" >}}


### イベント

Gearman チェックには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "gearmand" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/integrations-core/blob/master/gearmand/datadog_checks/gearmand/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/agent/kubernetes/log/
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/help/
