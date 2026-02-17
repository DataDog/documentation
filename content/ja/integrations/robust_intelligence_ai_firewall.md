---
app_id: robust-intelligence-ai-firewall
app_uuid: 1d208134-9005-4a79-bbc1-445950d1a5c7
assets:
  dashboards:
    ai_firewall_results: assets/dashboards/robust_intelligence_ai_firewall_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: robust_intelligence_ai_firewall.firewall_requests.count
      metadata_path: metadata.csv
      prefix: robust_intelligence_ai_firewall.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10418
    source_type_name: Robust Intelligence AI Firewall
author:
  homepage: https://www.robustintelligence.com/
  name: Robust Intelligence
  sales_email: contact@robustintelligence.com
  support_email: help@robustintelligence.com
categories:
- ai/ml
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/robust_intelligence_ai_firewall/README.md
display_on_public_website: true
draft: false
git_integration_title: robust_intelligence_ai_firewall
integration_id: robust-intelligence-ai-firewall
integration_title: Robust Intelligence AI Firewall
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: robust_intelligence_ai_firewall
public_title: Robust Intelligence AI Firewall
short_description: Datadog を使用して AI Firewall の結果を監視する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::AI/ML
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Datadog を使用して AI Firewall の結果を監視する
  media:
  - caption: Robust Intelligence AI Firewall
    image_url: images/ai-firewall.png
    media_type: image
  - caption: Robust Intelligence AI Firewall の結果ダッシュボード
    image_url: images/firewall-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Robust Intelligence AI Firewall
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Robust Intelligence AI Firewall][1] は、AI モデルを保護するレイヤーです。

AI Firewall は、ユーザーからの入力プロンプトを検査し、プロンプトインジェクションやプロンプト抽出、個人情報の検出を試みる悪意のあるペイロードをブロックします。また、LLM モデルの出力をスキャンし、誤情報や機密データ、有害なコンテンツが含まれていないことを確認します。組織の基準に合致しない応答はアプリケーションでブロックされます。

このインテグレーションは、Datadog Agent を通じて AI Firewall の結果を監視し、許可されたデータポイントやブロックされたデータポイントのメトリクス、各データポイントがブロックされた理由に関する洞察など、AI セキュリティ問題の可観測性をユーザーに提供します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Robust Intelligence AI Firewall チェックをホストにインストールします。Docker Agent または上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-robust-intelligence-ai-firewall==1.0.0
   ```

2. インテグレーションの構成は、コアの[インテグレーション][2]と同様に行ってください。このインテグレーション固有の手順については、以下の構成セクションを参照してください。

### 構成

1. Robust Intelligence AI Firewall のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `robust_intelligence_ai_firewall.d/conf.yaml` ファイルを編集します。
    ```yaml
    init_config:

    instances:
        ## @param metrics_endpoint - string - required
        ## The URL to Robust Intelligence AI Firewall 
        ## internal metrics per loaded plugin in Prometheus
        ## format.
        #
      - openmetrics_endpoint: http://localhost:8080/metrics
    ```
   使用可能なすべてのコンフィギュレーションオプションについては、[サンプル robust_intelligence_ai_firewall.d/conf.yaml][4] ファイルを参照してください。

2. コンテナ化された環境で実行する AI Firewall のインテグレーションを構成するには、ポッドに以下のアノテーションを追加します。
   ```yaml
   apiVersion: v1
   kind: Pod
   # (...)
   metadata:
     name: '<POD_NAME>'
     annotations:
       ad.datadoghq.com/<CONTAINER_IDENTIFIER>.checks: |
         {
           "robust_intelligence_ai_firewall": {
             "init_config": {},
             "instances": [
               {
                 "openmetrics_endpoint": "http://%%host%%:8080/metrics"
               }
             ]
           }
         }
       # (...)
   ```

3. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `robust_intelligence_ai_firewall` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "robust-intelligence-ai-firewall" >}}


### サービスチェック

Robust Intelligence AI Firewall には、サービスのチェック機能は含まれません。

### イベント

Robust Intelligence AI Firewall には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Robust Intelligence サポート][8]までお問い合わせください。


[1]: https://www.robustintelligence.com/platform/ai-firewall
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-extras/blob/master/robust_intelligence_ai_firewall/datadog_checks/robust_intelligence_ai_firewall/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-extras/blob/master/robust_intelligence_ai_firewall/metadata.csv
[8]: mailto:help@robustintelligence.com