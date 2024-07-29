---
app_id: php-opcache
app_uuid: 392e54ac-60d4-4225-ab5a-d75245e0ea06
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: php_opcache.memory_usage.used_memory
      metadata_path: metadata.csv
      prefix: php_opcache.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10141
    source_type_name: PHP OPcache
  monitors:
    '[php_opcache] Cache Full has been detected': assets/monitors/php-opcache_expunges.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: noname@withgod.jp
  support_email: noname@withgod.jp
categories: []
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/php_opcache/README.md
display_on_public_website: true
draft: false
git_integration_title: php_opcache
integration_id: php-opcache
integration_title: PHP OPcache
integration_version: 0.0.1
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: php_opcache
public_title: PHP OPcache
short_description: PHP OPcache バイトコードキャッシュシステムを監視します。
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  configuration: README.md#Setup
  description: PHP OPcache バイトコードキャッシュシステムを監視します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: PHP OPcache
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックは、Datadog Agent を通じて [PHP OPcache][1] を監視します。

## 計画と使用

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インフラストラクチャーリスト

`php_opcache` チェックをホストにインストールするには


1. [開発ツールキット][3]をインストールします。
 どのマシンでも。

2. `ddev -e release build php_opcache` を実行してパッケージをビルドします。

3. [Datadog Agent をダウンロードします][4]。

4. ビルドの成果物を Agent をインストール済みのホストにアップロードし、以下を実行します。
 `datadog-agent integration install -w
 path/to/php_opcache/dist/<ARTIFACT_NAME>.whl`.

#### OPcache

OPcache はデフォルトでメトリクスを公開しないため、このインテグレーションには、次の場所にあるメトリクスエクスポーターが含まれます。

```
/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_opcache/assets/exporter/opcache-dd-handler.php
```
Datadog [integrations-extras][5] リポジトリからエクスポーターをダウンロードできます。

Agent を[構成する](#configuration) とき、このファイル名でエクスポーターを直接参照するか、Web サーバーで Agent のエイリアスを構成できます。たとえば、Apache を使用している場合、Web サーバーコンフィギュレーションファイルのエイリアスは次のようになります。

```
Alias /opcache-status /opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_opcache/assets/exporter/opcache-dd-handler.php
<Location /opcache-status>
    Require all denied
    Require local
</Location>
```

### ブラウザトラブルシューティング

1. `php_opcache` のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `php_opcache.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル `php_opcache.d/conf.yaml` ファイル][6]を参照してください。
    ```
    instances
      - url: http://localhost/opcache-status
    ```
2. [Agent を再起動します][7]。

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションの `php_opcache` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "php_opcache" >}}


### ヘルプ

PHP OPcache インテグレーションには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "php_opcache" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。


[1]: https://www.php.net/manual/en/book.opcache.php
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/developers/integrations/python/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://github.com/DataDog/integrations-extras/blob/master/php_opcache/datadog_checks/php_opcache/assets/exporter/opcache-dd-handler.php
[6]: https://github.com/DataDog/integrations-extras/blob/master/php_opcache/datadog_checks/php_opcache/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/php_opcache/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/php_opcache/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/help/