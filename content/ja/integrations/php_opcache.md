---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors:
    '[php_opcache] Cache Full has been detected': assets/monitors/php-opcache_expunges.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - ''
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/php_opcache/README.md'
display_name: PHP OPcache
draft: false
git_integration_title: php_opcache
guid: 323518fd-be8d-4b5e-b35d-829107a1c416
integration_id: php-opcache
integration_title: PHP OPcache
is_public: true
kind: integration
maintainer: noname@withgod.jp
manifest_version: 1.0.0
metric_prefix: php_opcache.
metric_to_check: php_opcache.memory_usage.used_memory
name: php_opcache
public_title: Datadog-PHP OPcache インテグレーション
short_description: PHP OPcache バイトコードキャッシュシステムを監視します。
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Datadog Agent を通じて [PHP OPcache][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

`php_opcache` チェックをホストにインストールするには


1. [開発ツールキット][3]をインストールします。
 どのマシンでも。

2. `ddev release build php_opcache` を実行してパッケージをビルドします。

3. [Datadog Agent をダウンロードします][4]。

4. ビルドの成果物を Agent をインストール済みのホストにアップロードし、以下を実行します。
 `datadog-agent integration install -w
 path/to/php_opcache/dist/<ARTIFACT_NAME>.whl`.

#### OPcache のセットアップ


OPcache はデフォルトでメトリクスを公開しないため、このインテグレーションには、次の場所にあるメトリクスエクスポーターが含まれます。

```
/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_opcache/assets/exporter/opcache-dd-handler.php
```
エクスポーターは[こちら][5]からダウンロードできます。

Agent を構成するとき (次に説明する `instances` 設定)、このファイル名でエクスポーターを直接参照するか、Web サーバーで Agent のエイリアスを構成できます。たとえば、Apache を使用している場合、Web サーバーコンフィギュレーションファイルのエイリアスは次のようになります。

```
Alias /opcache-status /opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_opcache/assets/exporter/opcache-dd-handler.php
<Location /opcache-status>
    Require all denied
    Require local
</Location>
```

### コンフィギュレーション

1. `php_opcache` のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `php_opcache.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル `php_opcache.d/conf.yaml` ファイル][6]を参照してください。
    ```
    instances
      - url: http://localhost/opcache-status
    ```
2. [Agent を再起動します][7]。

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションの `php_opcache` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "php_opcache" >}}


### サービスのチェック

`php_opcache` には、サービスのチェック機能は含まれません。

### イベント

`php_opcache` には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://www.php.net/manual/en/book.opcache.php
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/php_opcache/datadog_checks/php_opcache/assets/exporter/opcache-dd-handler.php
[6]: https://github.com/DataDog/integrations-extras/blob/master/php_opcache/datadog_checks/php_opcache/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/php_opcache/metadata.csv
[10]: https://docs.datadoghq.com/ja/help/