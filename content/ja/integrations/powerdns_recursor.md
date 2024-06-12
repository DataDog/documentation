---
app_id: powerdns
app_uuid: 44e491e1-f7c3-447a-b597-e740196479e0
assets:
  dashboards:
    powerdns: assets/dashboards/powerdns_dashboard.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: powerdns.recursor.questions
      metadata_path: metadata.csv
      prefix: powerdns.
    process_signatures:
    - pdns_server
    - systemctl start pdns@
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: PowerDNS Recursor
  logs:
    source: powerdns
  saved_views:
    powerdns_processes: assets/saved_views/powerdns_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- log collection
- network
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/powerdns_recursor/README.md
display_on_public_website: true
draft: false
git_integration_title: powerdns_recursor
integration_id: powerdns
integration_title: Power DNS Recursor
integration_version: 2.3.1
is_public: true
manifest_version: 2.0.0
name: powerdns_recursor
public_title: Power DNS Recursor
short_description: PowerDNS Recursor の異常な送受信トラフィックを常に監視。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::キャッシュ
  - Category::ログの収集
  - Category::ネットワーク
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: PowerDNS Recursor の異常な送受信トラフィックを常に監視。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Power DNS Recursor
---



## 概要

PowerDNS Recursor のパフォーマンスを追跡し、異常または注意が必要なトラフィックを監視します。この Agent チェックでは、Recursor から以下のような多様なメトリクスを収集することができます。

- クエリ回答時間: 1 ミリ秒、10 ミリ秒、100 ミリ秒、1 秒未満、および 1 秒以上の時間がかかった応答の数を確認します。
- クエリのタイムアウト
- キャッシュヒット数およびミス数
- タイプごとの回答率: SRVFAIL、NXDOMAIN、NOERROR
- 無視および削除されたパケット数

その他にも多数あります。

## セットアップ

### インストール

PowerDNS Recursor チェックは [Datadog Agent][1] パッケージに含まれています。Recursor に追加でインストールする必要はありません。

### コンフィギュレーション

#### PowerDNS の準備

このチェックは、PowerDNS Recursor の統計 API を使ってパフォーマンス統計を収集します。4.1 より前のバージョンの pdns_recursor は、デフォルトで統計 API が有効ではありません。古いバージョンを実行している場合は、Recursor 構成ファイル (たとえば `/etc/powerdns/recursor.conf`) に次の行を追加して有効にしてください。

```conf
webserver=yes
api-key=changeme             # v4.0 以降でのみ使用可能
webserver-readonly=yes       # デフォルトは no
#webserver-port=8081         # デフォルトは 8082
#webserver-address=0.0.0.0   # デフォルトは 127.0.0.1
```

pdns_recursor 3.x を実行している場合は、これらのオプション名の前に `experimental-` を付けてください。たとえば、`experimental-webserver=yes` とします。

pdns_recursor 4.1 以上を実行している場合は、`api-key` のみを設定します。

Recursor を再起動すると、統計 API が有効になります。

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `powerdns_recursor.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル powerdns_recursor.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param host - string - required
     ## Host running the recursor.
     #
     - host: 127.0.0.1

       ## @param port - integer - required
       ## Recursor web server port.
       #
       port: 8082

       ## @param api_key - string - required
       ## Recursor web server api key.
       #
       api_key: "<POWERDNS_API_KEY>"

       ## @param version - integer - required - default: 3
       ## Version 3 or 4 of PowerDNS Recursor to connect to.
       ## The PowerDNS Recursor in v4 has a production ready web server that allows for
       ## statistics gathering. In version 3.x the server was marked as experimental.
       ##
       ## As the server was marked as experimental in version 3 many of the metrics have
       ## changed names and the API structure (paths) have also changed. With these changes
       ## there has been a need to separate the two concerns. The check now has a key value
       ## version: which if set to version 4 queries with the correct API path on the
       ## non-experimental web server.
       ##
       ## https://doc.powerdns.com/md/httpapi/api_spec/#url-apiv1serversserver95idstatistics
       #
       version: 3
   ```

2. [Agent を再起動します][3]。

##### ログの収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にする必要があります。

   ```yaml
   logs_enabled: true
   ```

2. 以下を実行して、`systemd-journal` グループに `dd-agent` ユーザーを追加します。
   ```text
   usermod -a -G systemd-journal dd-agent
   ```

3. PowerDNS Recursor のログの収集を開始するには、次のコンフィギュレーションブロックを `powerdns_recursor.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: journald
       source: powerdns
   ```

    使用可能なすべての構成オプションの詳細については、[サンプル powerdns_recursor.d/conf.yaml][2] を参照してください。

4. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/powerdns_recursor/datadog_checks/powerdns_recursor/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| `<インテグレーション名>` | `powerdns_recursor`                                                              |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                                    |
| `<インスタンスコンフィギュレーション>`  | `{"host":"%%host%%", "port":8082, "api_key":"<POWERDNS_API_KEY>", "version": 3}` |

##### ログの収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "powerdns"}`                  |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の `status` サブコマンドを実行][2]し、Checks セクションで `powerdns_recursor` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "powerdns_recursor" >}}


### イベント

PowerDNS Recursor チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "powerdns_recursor" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ja/help/