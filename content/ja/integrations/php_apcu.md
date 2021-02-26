---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors:
    '[php_apcu] Cache Full has been detected': assets/monitors/php-apcu_expunges.json
    '[php_apcu] Detected High Cache Usage': assets/monitors/php-apcu_high_usage.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - ''
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/php_apcu/README.md'
display_name: PHP APCu
draft: true
git_integration_title: php_apcu
guid: d6b2f21e-8a91-4c5a-98c3-647af53065b7
integration_id: php-apcu
integration_title: PHP APCu
is_public: false
kind: インテグレーション
maintainer: noname@withgod.jp
manifest_version: 1.0.0
metric_prefix: php_apcu.
metric_to_check: php_apcu.cache.mem_size
name: php_apcu
public_title: Datadog-PHP APCu インテグレーション
short_description: PHP APCu のメモリ内データキャッシュを監視します。
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Datadog Agent を通じて [PHP APCu][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに `php_apcu` チェックをインストールしてください。[バージョン 6.8 以前の Agent][4] または [Docker Agent][5] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][3]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードします][6]。

2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
      datadog-agent integration install -t datadog-php_apcu==<INTEGRATION_VERSION>
   ```

3. [他のパッケージ化されたインテグレーション][7]と同様にインテグレーションを構成します。


#### APCu のセットアップ


APCu はデフォルトでメトリクスを公開しないため、このインテグレーションには、次の場所にあるメトリクスエクスポーターが含まれます。

```
/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_apcu/assets/exporter/apcu-dd-handler.php
```
エクスポーターは[こちら][5]からダウンロードできます。

Agent を構成するとき (次に説明する `instances` 設定)、このファイル名でエクスポーターを直接参照するか、Web サーバーで Agent のエイリアスを構成できます。たとえば、Apache を使用している場合、Web サーバーコンフィギュレーションファイルのエイリアスは次のようになります。

```
Alias /apcu-status /opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_apcu/assets/exporter/apcu-dd-handler.php
<Location /apcu-status>
    Require all denied
    Require local
</Location>
```

### コンフィギュレーション

1. `php_apcu` のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `php_apcu.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル `php_apcu.d/conf.yaml` ファイル][8]を参照してください。
    ```
    instances
      - url: http://localhost/apcu-status
    ```

2. [Agent を再起動します][9]。

### 検証

[Agent の status サブコマンドを実行][10]し、Checks セクションで `php_apcu` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "php_apcu" >}}


### サービスのチェック

`php_apcu` には、サービスのチェック機能は含まれません。

### イベント

`php_apcu` には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://www.php.net/manual/en/book.apcu.php
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[5]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://docs.datadoghq.com/ja/getting_started/integrations/
[8]: https://github.com/DataDog/integrations-extras/blob/master/php_apcu/datadog_checks/php_apcu/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-extras/blob/master/php_apcu/metadata.csv
[12]: https://docs.datadoghq.com/ja/help/