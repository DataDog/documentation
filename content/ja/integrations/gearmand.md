---
aliases:
  - /ja/integrations/gearman
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: gearman
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
  - autodiscovery
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/gearmand/README.md'
display_name: Gearman
draft: false
git_integration_title: gearmand
guid: bdd65394-92ff-4d51-bbe3-ba732663fdb2
integration_id: gearman
integration_title: Gearman
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: gearman.
metric_to_check: gearman.unique_tasks
name: gearmand
process_signatures:
  - gearmand
  - gearman
public_title: Datadog-Gearman インテグレーション
short_description: 実行中およびキューにあるジョブの合計数またはタスクごとの数を追跡。
support: コア
supported_os:
  - linux
  - mac_os
---
## 概要

Gearman のメトリクスを収集して、以下のことができます。

- Gearman のパフォーマンスを視覚化できます。
- キューに置かれているタスクまたは実行中のタスクの数を知ることができます。
- Gearman のパフォーマンスをアプリケーションの他の部分と関連付けることができます。

## セットアップ

### インストール

Gearman チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

1. Gearman のパフォーマンスデータを収集するには、[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーで `gearmand.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル gearmand.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
     - server: localhost
       port: 4730
   ```

2. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/gearmand/datadog_checks/gearmand/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                  |
| -------------------- | -------------------------------------- |
| `<インテグレーション名>` | `gearmand`                             |
| `<初期コンフィギュレーション>`      | 空白または `{}`                          |
| `<インスタンスコンフィギュレーション>`  | `{"server":"%%host%%", "port":"4730"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### ログの収集

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

Kubernetes 環境でログを収集する Agent を構成するためのその他の情報については、[Datadog ドキュメント][4]を参照してください。

### 検証

[Agent の `status` サブコマンドを実行][5]し、Checks セクションで `gearmand` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "gearmand" >}}


### イベント

Gearmand チェックには、イベントは含まれません。

### サービスのチェック

**gearman.can_connect**:<br>
Agent が Gearman に接続してメトリクスを収集できない場合は、`CRITICAL` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-core/blob/master/gearmand/datadog_checks/gearmand/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/help/