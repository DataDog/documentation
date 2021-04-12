---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    IIS-Overview: assets/dashboards/iis_overview.json
    iis: assets/dashboards/iis_dashboard.json
  logs:
    source: iis
  metrics_metadata: metadata.csv
  monitors:
    '[IIS] Anomalous amount of requests for site: {{site.name}}': assets/monitors/req.json
    '[IIS] Increase of locked error per second for site: {{site.name}}': assets/monitors/lock.json
    '[IIS] Increase of not found error per second for site: {{site.name}}': assets/monitors/err.json
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    bot_errors: assets/saved_views/bot_errors.json
    response_time_overview: assets/saved_views/response_time.json
    status_code_overview: assets/saved_views/status_code_overview.json
  service_checks: assets/service_checks.json
categories:
  - web
  - ログの収集
  - オートディスカバリー
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/iis/README.md'
display_name: IIS
draft: false
git_integration_title: iis
guid: 6ad932f0-8816-467a-8860-72af44d4f3ba
integration_id: iis
integration_title: IIS
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: iis.
metric_to_check: iis.uptime
name: iis
public_title: Datadog-IIS インテグレーション
short_description: 全体またはサイトごとのメトリクスを追跡し、各サイトの稼働/停止状態を監視。
support: コア
supported_os:
  - windows
---
![IIS グラフ][1]

## 概要

すべてのサイトを集計して、またはサイトごとに IIS メトリクスを収集します。IIS Agent チェックは、アクティブな接続数、送信および受信バイト数、HTTP メソッド別のリクエスト数などのメトリクスを収集します。サイトごとのサービスチェックも送信されるため、サイトが稼働しているか停止しているかを把握できます。

## セットアップ

### インストール

IIS チェックは Agent にパッケージ化されています。IIS メトリクスとログの収集を開始するには、[Agent をインストールします][2]。

{{< tabs >}}    
{{% tab "Host" %}}  

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

1. IIS のサイトデータの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][2]のルートにある [Agent の `conf.d` ディレクトリ][1]の `iis.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル iis.d/conf.yaml][3] を参照してください。

2. [Agent を再起動][4]すると、Datadog への IIS メトリクスの送信が開始されます。

##### ログの収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. IIS のログの収集を開始するには、次の構成ブロックを `iis.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: C:\inetpub\logs\LogFiles\W3SVC1\u_ex*
       service: myservice
       source: iis
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル iis.d/conf.yaml][3] を参照してください。

3. [Agent を再起動します][4]。

[1]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/windows/#agent-check-directory-structure
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/iis/datadog_checks/iis/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                  |
| -------------------- | ---------------------- |
| `<インテグレーション名>` | `iis`                  |
| `<初期コンフィギュレーション>`      | 空白または `{}`          |
| `<インスタンスコンフィギュレーション>`  | `{"host": "%%host%%"}` |

##### ログの収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][2]を参照してください。

| パラメーター      | 値                                            |
| -------------- | ------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "iis", "service": "<サービス名>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションで `iis` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "iis" >}}


### イベント

IIS チェックには、イベントは含まれません。

### サービスのチェック

**iis.site_up**:<br>
Agent は、`iis.yaml` で構成されたサイトごとにこのサービスチェックを送信します。サイトのアップタイムがゼロの場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/iis/images/iisgraph.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/