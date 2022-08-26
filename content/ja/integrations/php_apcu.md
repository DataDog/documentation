---
app_id: php-apcu
app_uuid: ec09379e-851f-4ecc-be78-de5297087994
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: php_apcu.cache.mem_size
      metadata_path: metadata.csv
      prefix: php_apcu.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: PHP APCu
  monitors:
    '[php_apcu] Cache Full has been detected': assets/monitors/php-apcu_expunges.json
    '[php_apcu] Detected High Cache Usage': assets/monitors/php-apcu_high_usage.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 不明
  sales_email: noname@withgod.jp
  support_email: noname@withgod.jp
categories: []
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/php_apcu/README.md
display_on_public_website: true
draft: false
git_integration_title: php_apcu
integration_id: php-apcu
integration_title: PHP APCu
integration_version: 0.0.2
is_public: true
kind: integration
manifest_version: 2.0.0
name: php_apcu
oauth: {}
public_title: PHP APCu
short_description: PHP APCu のメモリ内データキャッシュを監視します。
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
  description: PHP APCu のメモリ内データキャッシュを監視します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: PHP APCu
---



## 概要

このチェックは、Datadog Agent を通じて [PHP APCu][1] を監視します。

## セットアップ

PHP APCu チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い PHP APCu チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-php_apcu==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

#### APCu

APCu はデフォルトでメトリクスを公開しないため、このインテグレーションには、次の場所にあるメトリクスエクスポーターが含まれます。

```
/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_apcu/assets/exporter/apcu-dd-handler.php
```

Agent を[構成する](#configuration) とき、このファイル名でエクスポーターを直接参照するか、Web サーバーで Agent のエイリアスを構成できます。たとえば、Apache を使用している場合、Web サーバーコンフィギュレーションファイルのエイリアスは次のようになります。

```
Alias /apcu-status /opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_apcu/assets/exporter/apcu-dd-handler.php
<Location /apcu-status>
    Require all denied
    Require local
</Location>
```

### コンフィギュレーション

1. `php_apcu` のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `php_apcu.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル `php_apcu.d/conf.yaml` ファイル][5]を参照してください。
    ```
    instances
      - url: http://localhost/apcu-status
    ```

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンド][7]を実行し、Checks セクションで `php_apcu` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "php_apcu" >}}


### イベント

PHP APCu インテグレーションには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "php_apcu" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://www.php.net/manual/en/book.apcu.php
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/php_apcu/datadog_checks/php_apcu/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/php_apcu/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/php_apcu/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/