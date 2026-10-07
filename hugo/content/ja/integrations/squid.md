---
app_id: squid
app_uuid: de18c581-69ee-48cf-ba23-7794bfb7a4bd
assets:
  dashboards:
    Squid: assets/dashboards/squid.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: squid.cachemgr.cpu_time
      metadata_path: metadata.csv
      prefix: squid.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10022
    source_type_name: Squid
  logs:
    source: squid
  monitors:
    CPU usage exceeded: assets/monitors/cpu_usage_exceeded.json
    High latency requests: assets/monitors/high_latency_requests.json
    High rate of client HTTP errors: assets/monitors/high_rate_of_client_http_errors.json
    High rate of server errors: assets/monitors/high_rate_of_server_errors.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- log collection
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/squid/README.md
display_on_public_website: true
draft: false
git_integration_title: squid
integration_id: squid
integration_title: Squid
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: squid
public_title: Squid
short_description: Datadog を使用した Squid キャッシュサーバーのメトリクスの追跡
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::キャッシュ
  - Category::ログの収集
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Datadog を使用した Squid キャッシュサーバーのメトリクスの追跡
  media:
  - caption: Squid
    image_url: images/squid.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Squid
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要
[Squid][1] は、ネットワーク上のクライアントとサーバーの間に位置し、キャッシュおよびフォワーディングを行うオープンソースの Web プロキシサーバーです。ゲートウェイとして機能し、クライアントがウェブサイトやファイルなどのサーバー上のさまざまなインターネットリソースにアクセスできるようにします。

このインテグレーションは Squid のログに対するエンリッチメントと可視化を提供します。既成のダッシュボードや検出ルールを通じて Squid ログ分析の詳細なインサイトを可視化し、検知と対応の能力を強化します。

さらに、以下の状況に対して事前に構成されたモニターを備えており、能動的な通知を行います。

1. サーバーエラーの発生率が高い
2. CPU 使用率の上限超過
3. 応答遅延が高いリクエスト
4. クライアント HTTP エラーの発生率が高い


このチェックは、Datadog Agent を通してキャッシュマネージャーから取得された [Squid][1] メトリクスを監視します。

## セットアップ

### インストール

Agent の Squid チェックは [Datadog Agent][2] パッケージに含まれています。Squid サーバーに追加でインストールする必要はありません。

### 構成

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

##### メトリクスの収集

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `squid.d/conf.yaml` を編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル squid.d/conf.yaml][2] を参照してください。

2. [Agent を再起動します][3]。

##### ログ収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. `squid.d/conf.yaml` の下部にある、コンフィギュレーションブロックのコメントを解除して編集します。

   ```yaml
   logs:
     - type: file
       path: /var/log/squid/cache.log
       service: "<SERVICE-NAME>"
       source: squid
     - type: file
       path: /var/log/squid/access.log
       service: "<SERVICE-NAME>"
       source: squid
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成します。

3. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/squid/datadog_checks/squid/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `squid`                                                                |
| `<INIT_CONFIG>`      | 空白または `{}`                                                          |
| `<INSTANCE_CONFIG>`  | `{"name": "<SQUID_INSTANCE_NAME>", "host": "%%host%%", "port":"3128"}` |

##### ログ収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "squid", "service": "<YOUR_APP_NAME>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=containerinstallation#setup
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションで `squid` を探します。

## 収集データ

### ログ
Squid インテグレーションはアクセスログとキャッシュログを収集します。

#### サポートされているアクセスログ形式
|名前                 | フォーマット仕様|
|---------------------|------------------------------|
| Squid      |`%ts.%03tu %6tr %>a %Ss/%03>Hs %<st %rm %ru %[un %Sh/%<a %mt`|
| common     |`%>a - %[un [%tl] "%rm %ru HTTP/%rv" %>Hs %<st %Ss:%Sh`|
| combined   |`%>a - %[un [%tl] "%rm %ru HTTP/%rv" %>Hs %<st "%{Referer}>h" "%{User-Agent}>h" %Ss:%Sh`|

詳しくは [Squid ログ形式][4]を参照してください。

**注**: 既定の `logformat` タイプは `squid` です。サポートされるログ形式は `/etc/squid/squid.conf` で更新し、Squid を再起動することができます。

`logformat` に `combined` タイプを使用する場合は、`/etc/squid/squid.conf` ファイルに以下の行を追加してください。

```
logformat combined   %>a %[ui %[un [%tl] "%rm %ru HTTP/%rv" %>Hs %<st "%{Referer}>h" "%{User-Agent}>h" %Ss:%Sh
access_log /var/log/squid/access.log combined
```
続いて、以下のコマンドを使用して `squid` サービスを再起動します。

```shell
sudo systemctl restart squid
```  

**注**:

- `Top Avg Request Duration by URL Host` パネルは、`logformat` が既定の `squid` タイプに設定されている場合のみ読み込まれます。
- `Top Browsers` と `Top HTTP Referrer` パネルは、`logformat` が `combined` タイプに設定されている場合のみ読み込まれます。


### メトリクス
{{< get-metrics-from-git "squid" >}}


### イベント

Squid チェックには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "squid" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。



[1]: http://www.squid-cache.org/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://www.squid-cache.org/Doc/config/logformat/
[5]: https://docs.datadoghq.com/ja/help/