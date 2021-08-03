---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    varnish: assets/dashboards/varnish_dashboard.json
  logs:
    source: varnish
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    bot_errors: assets/saved_views/bot_errors.json
    status_code_overview: assets/saved_views/status_code_overview.json
    varnish_processes: assets/saved_views/varnish_processes.json
  service_checks: assets/service_checks.json
categories:
  - web
  - caching
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/varnish/README.md'
display_name: Varnish
draft: false
git_integration_title: varnish
guid: d2052eae-89b8-4cb1-b631-f373010da4b8
integration_id: varnish
integration_title: Varnish
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: varnish.
metric_to_check: varnish.n_backend
name: varnish
process_signatures:
  - service varnish start
  - varnishd
public_title: Datadog-Varnish インテグレーション
short_description: クライアントとバックエンドの接続数、キャッシュミス数、エビクション数などを追跡。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Varnish のデフォルトのダッシュボード][1]

## 概要

このチェックは、以下に関する Varnish メトリクスを収集します。

- クライアント: 接続数とリクエスト数
- キャッシュパフォーマンス: ヒット数、エビクション数など
- スレッド: 作成数、失敗数、キューにあるスレッド数
- バックエンド: 成功、失敗、および再試行接続数

また、各バックエンドの健全性に関するサービスチェックも送信します。

## セットアップ

### インストール

Varnish チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### Varnish の準備

Varnish 4.1 以上を実行している場合は、以下を使用して、`dd-agent` システムユーザーを Varnish グループに追加します。

```text
sudo usermod -G varnish -a dd-agent
```

##### メトリクスの収集

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `varnish.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル varnish.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
     - varnishstat: /usr/bin/varnishstat
       varnishadm: <PATH_TO_VARNISHADM_BIN>
   ```

    **注**: `varnishadm` を設定しないと、Agent はバックエンドの健全性をチェックしません。設定する場合は、バイナリをルート権限で実行するための権限が Agent に必要です。`/etc/sudoers` ファイルに以下を追加します。

   ```shell
     dd-agent ALL=(ALL) NOPASSWD:/usr/bin/varnishadm
   ```

2. [Agent を再起動します][3]。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Varnish のログ記録を有効にするには、`/etc/default/varnishncsa` で次の行のコメントを解除します。

   ```text
     VARNISHNCSA_ENABLED=1
   ```

2. 同じファイルの末尾に以下を追加します。

   ```text
     LOG_FORMAT="{\"date_access\": \"%{%Y-%m-%dT%H:%M:%S%z}t\", \"network.client.ip\":\"%h\", \"http.auth\" : \"%u\", \"varnish.x_forwarded_for\" : \"%{X-Forwarded-For}i\", \"varnish.hit_miss\":  \"%{Varnish:hitmiss}x\", \"network.bytes_written\": %b, \"http.response_time\": %D, \"http.status_code\": \"%s\", \"http.url\": \"%r\", \"http.ident\": \"%{host}i\", \"http.method\": \"%m\", \"varnish.time_first_byte\" : %{Varnish:time_firstbyte}x, \"varnish.handling\" : \"%{Varnish:handling}x\", \"http.referer\": \"%{Referer}i\", \"http.useragent\": \"%{User-agent}i\" }"

     DAEMON_OPTS="$DAEMON_OPTS -c -a -F '${LOG_FORMAT}'"
   ```

3. `varnishncsa` ユーティリティを再起動して変更を適用します。

4. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

5. Varnish のログの収集を開始するには、次の構成ブロックを `varnish.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: /var/log/varnish/varnishncsa.log
       source: varnish
       service: varnish
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に応じて構成します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル varnish.yaml][2] を参照してください。

6. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/varnish/datadog_checks/varnish/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境では、オートディスカバリーを使用した Varnish チェックの構成はサポートされていません。このような環境でメトリクスを収集するには、StatsD プラグインを使用してメトリクスを DogStatsD へプッシュします。次のサードパーティ製プラグインがあります。

- [libvmod-statsd][1]
- [prometheus_varnish_exporter][2]

[1]: https://github.com/jib/libvmod-statsd
[2]: https://github.com/jonnenauha/prometheus_varnish_exporter
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションで `varnish` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "varnish" >}}


### イベント

Varnish チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "varnish" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Varnish の主要なパフォーマンスメトリクス][5]
- [Varnish メトリクスの収集方法][6]
- [Datadog を使用した Varnish の監視][7]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/varnish/images/varnish.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://www.datadoghq.com/blog/top-varnish-performance-metrics
[6]: https://www.datadoghq.com/blog/how-to-collect-varnish-metrics
[7]: https://www.datadoghq.com/blog/monitor-varnish-using-datadog