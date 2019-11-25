---
assets:
  dashboards: {}
  monitors: {}
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
git_integration_title: varnish
guid: d2052eae-89b8-4cb1-b631-f373010da4b8
integration_id: varnish
integration_title: Varnish
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: varnish.
metric_to_check: varnish.n_backend
name: varnish
process_signatures:
  - service varnish start
public_title: Datadog-Varnish インテグレーション
short_description: クライアントとバックエンドの接続数、キャッシュミス数、エビクション数などを追跡 and more.
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Varnish のデフォルトのダッシュボード][1]

## 概要

このチェックは、以下に関する Varnish のメトリクスを収集します。

* クライアント: 接続数とリクエスト数
* キャッシュパフォーマンス: ヒット数、エビクション数など
* スレッド: 作成数、失敗数、キューにあるスレッド数
* バックエンド: 成功、失敗、および再試行接続数

また、各バックエンドの健全性に関するサービスチェックも送信します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Varnish チェックは [Datadog Agent][3] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィグレーション

1. Varnish の[メトリクス](#metric-collection)と[ログ](#log-collection)の収集を開始するには、[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `varnish.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル varnish.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

#### Varnish の準備

Varnish 4.1 以上を実行している場合は、以下を使用して、`dd-agent` システムユーザーを Varnish グループに追加します。

```
sudo usermod -G varnish -a dd-agent
```

#### メトリクスの収集

* [Varnish のメトリクス](#metrics)の収集を開始するには、`varnish.d/conf.yaml` ファイルに次の構成ブロックを追加します。

  ```
  init_config:

  instances:
    - varnishstat: /usr/bin/varnishstat        # or wherever varnishstat lives
      varnishadm: <PATH_TO_VARNISHADM_BIN>     # to submit service checks for the health of each backend
  #   secretfile: <PATH_TO_VARNISH_SECRETFILE> # if you configured varnishadm and your secret file isn't /etc/varnish/secret
  #   tags:
  #     - instance:production
  ```

  `varnishadm` を設定しない場合、Agent はバックエンドの健全性をチェックしません。設定する場合は、Agent にバイナリをルート権限で実行するための権限が必要です。`/etc/sudoers` ファイルに以下を追加します。

  ```
  dd-agent ALL=(ALL) NOPASSWD:/usr/bin/varnishadm
  ```

  使用可能なすべての構成オプションの詳細については、[サンプル varnish.yaml][5] を参照してください。

* [Agent を再起動][6]すると、Datadog への Varnish メトリクスおよびサービスチェックの送信が開始されます。

##### オートディスカバリー

コンテナ環境では、オートディスカバリーを使用した Varnish チェックの構成はサポートされていません。このような環境でメトリクスを収集するには、StatsD プラグインを使用してメトリクスを DogStatsD へプッシュします。次のサードパーティ製プラグインがあります。

* [libvmod-statsd][7]
* [prometheus_varnish_exporter][8]

#### ログの収集

**Agent 6.0 以上で使用可能**

1. Varnish のログ記録を有効にするには、`/etc/default/varnishncsa` で次の行のコメントを解除します。

    ```
      VARNISHNCSA_ENABLED=1
    ```

2. 同じファイルの末尾に以下を追加します。

    ```
      LOG_FORMAT="{\"date_access\": \"%{%Y-%m-%dT%H:%M:%S%z}t\", \"network.client.ip\":\"%h\", \"http.auth\" : \"%u\", \"varnish.x_forwarded_for\" : \"%{X-Forwarded-For}i\", \"varnish.hit_miss\":  \"%{Varnish:hitmiss}x\", \"network.bytes_written\": %b, \"http.response_time\": %D, \"http.status_code\": \"%s\", \"http.url\": \"%r\", \"http.ident\": \"%{host}i\", \"http.method\": \"%m\", \"varnish.time_first_byte\" : %{Varnish:time_firstbyte}x, \"varnish.handling\" : \"%{Varnish:handling}x\", \"http.referer\": \"%{Referer}i\", \"http.useragent\": \"%{User-agent}i\" }"

      DAEMON_OPTS="$DAEMON_OPTS -c -a -F '${LOG_FORMAT}'"
    ```

3. Varnishncsa を再起動して変更を適用します。


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
          sourcecategory: http_web_access
          service: varnish
    ```
    `path` と `service` のパラメーター値を変更し、環境に合わせて構成してください。
    使用可能なすべての構成オプションの詳細については、[サンプル varnish.yaml][5] を参照してください。

6. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][10]し、Checks セクションで `varnish` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "varnish" >}}


### イベント
Varnish チェックには、イベントは含まれません。

### サービスのチェック
**varnish.backend_healthy**:<br>
`varnishadm` が構成されている場合、Agent は、このサービスチェックを送信します。各 Varnish バックエンドに関するサービスチェックが、`backend:<backend_name>` のタグを付けて送信されます。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

## その他の参考資料
お役に立つドキュメント、リンクや記事:

* [Varnish の主要なパフォーマンスメトリクス][13]
* [Varnish メトリクスの収集方法][14]
* [Datadog を使用した Varnish の監視][15]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/varnish/images/varnish.png
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/varnish/datadog_checks/varnish/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://github.com/jib/libvmod-statsd
[8]: https://github.com/jonnenauha/prometheus_varnish_exporter
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/varnish/metadata.csv
[12]: https://docs.datadoghq.com/ja/help
[13]: https://www.datadoghq.com/blog/top-varnish-performance-metrics
[14]: https://www.datadoghq.com/blog/how-to-collect-varnish-metrics
[15]: https://www.datadoghq.com/blog/monitor-varnish-using-datadog


{{< get-dependencies >}}