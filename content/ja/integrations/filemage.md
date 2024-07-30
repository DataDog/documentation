---
app_id: filemage
app_uuid: e8ffcc16-9430-4d73-8e01-4e135a872384
assets:
  dashboards:
    Filemage Overview Dashboard: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: filemage.ftp.get
      metadata_path: metadata.csv
      prefix: filemage.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10319
    source_type_name: filemage
  logs:
    source: filemage
author:
  homepage: https://dopensource.com/
  name: コミュニティ
  sales_email: info@dopensource.com
  support_email: tmoore@dopensource.com
categories:
- クラウド
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/filemage/README.md
display_on_public_website: true
draft: false
git_integration_title: filemage
integration_id: filemage
integration_title: FileMage
integration_version: 1.0.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: filemage
public_title: FileMage
short_description: FileMage サービス用モニタリング Agent
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: FileMage サービス用モニタリング Agent
  media:
  - caption: カルーセルロゴ
    image_url: images/carousel-logo.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: FileMage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックは [FileMage][1] を監視します。

## 計画と使用

### パッケージのインストール

Datadog Agent v7.21 または v6.21 以降の場合、以下の手順に従ってホストに Filemage インテグレーションをインストールします。
Datadog Agent 以前のバージョンでインストールする場合は、[コミュニティインテグレーションを利用する][2]を参照してください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

```shell
datadog-agent integration install -t datadog-filemage==1.0.0
```

2. Agent ベースの[インテグレーション][3]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

1. FileMage の[メトリクス](#metrics)の収集を開始するには、[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `filemage.d/conf.yaml.example` ファイルを編集します。
   完了したら、変更したファイルを `filemage.d/conf.yaml` という名前で保存します。
   使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル filemage conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の `status` サブコマンドを実行][7]し、Running Checks セクションで `filemage` を探します。


```text
...

  Running Checks
  ==============

    ...

    filemage (1.0.0)
    ----------------
      Instance ID: filemage:ac55127bf7bd70b9 [OK]
      Configuration Source: file:/etc/datadog-agent/conf.d/filemage.d/conf.yaml
      Total Runs: 1,298
      Metric Samples: Last Run: 0, Total: 0
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 2, Total: 2,594
      Average Execution Time : 41ms
      Last Execution Date : 2022-11-23 15:59:22 EST / 2022-11-23 20:59:22 UTC (1669237162000)
      Last Successful Execution Date : 2022-11-23 15:59:22 EST / 2022-11-23 20:59:22 UTC (1669237162000)
```


## リアルユーザーモニタリング

このインテグレーションは、各 FTP コマンドの実行回数を追跡します。

### データセキュリティ
{{< get-metrics-from-git "filemage" >}}


### ヘルプ

FileMage インテグレーションには、イベントは含まれません。

## ヘルプ

ヘルプが必要な場合は、[dOpenSource][10] までお問い合わせください。


[1]: https://www.filemage.io/
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/filemage/datadog_checks/filemage/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/filemage/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/filemage/assets/service_checks.json
[10]: https://dopensource.com/