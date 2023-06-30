---
app_id: iis
app_uuid: 4620121f-b5ca-4b9c-aca2-c69bf18bc362
assets:
  dashboards:
    IIS-Overview: assets/dashboards/iis_overview.json
    iis: assets/dashboards/iis_dashboard.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: iis.uptime
      metadata_path: metadata.csv
      prefix: iis.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: IIS
  logs:
    source: iis
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
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/iis/README.md
display_on_public_website: true
draft: false
git_integration_title: iis
integration_id: iis
integration_title: IIS
integration_version: 2.18.3
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: iis
oauth: {}
public_title: IIS
short_description: 全体またはサイトごとのメトリクスを追跡し、各サイトの稼働/停止状態を監視。
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Supported OS::Windows
  configuration: README.md#Setup
  description: 全体またはサイトごとのメトリクスを追跡し、各サイトの稼働/停止状態を監視。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: IIS
---



![IIS グラフ][1]

## 概要

すべてのサイトを集計して、またはサイトごとに IIS メトリクスを収集します。IIS Agent チェックは、アクティブな接続数、送信および受信バイト数、HTTP メソッド別のリクエスト数などのメトリクスを収集します。サイトごとのサービスチェックも送信されるため、サイトが稼働しているか停止しているかを把握できます。

## セットアップ

### APM に Datadog Agent を構成する

IIS チェックは Agent にパッケージ化されています。IIS メトリクスとログの収集を開始するには、[Agent をインストールします][2]。

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

1. IIS のサイトデータの収集を開始するには、[Agent の構成ディレクトリ][4]のルートにある [Agent の `conf.d` ディレクトリ][3]の `iis.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル iis.d/conf.yaml][5] を参照してください。

2. [Agent を再起動][6]すると、Datadog への IIS メトリクスの送信が開始されます。

**注**: このチェックのバージョン 2.14.0 以降では、メトリクスの収集に新しい実装を使用し、これには Python 3 が必要です。Python 3 の使用が不可能なホストの場合や、このチェックのレガシーバージョンを使用する場合は、以下の[コンフィグ][7]を参照してください。

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

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべての構成オプションの詳細については、[サンプル iis.d/conf.yaml][5] を参照してください。

3. [Agent を再起動します][6]。

**注**: `datadog-agent` ユーザーが、収集したいログファイルを追跡するための読み取りアクセス権を持っていることを確認してください。詳細は、[ログファイルの追跡における権限の問題][8]を参照してください。


### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `iis` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "iis" >}}


### イベント

IIS チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "iis" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/iis/images/iisgraph.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/windows/#agent-check-directory-structure
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/iis/datadog_checks/iis/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://github.com/DataDog/integrations-core/blob/7.33.x/iis/datadog_checks/iis/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/logs/guide/log-collection-troubleshooting-guide/#permission-issues-tailing-log-files
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/iis/metadata.csv
[11]: https://github.com/DataDog/integrations-core/blob/master/iis/assets/service_checks.json
[12]: https://docs.datadoghq.com/ja/help/