---
app_id: apache-apisix
app_uuid: b842d639-caf6-4b3a-8115-52458b9a0753
assets:
  dashboards:
    Apache APISIX Dashboard: assets/dashboards/apache-apisix_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - apisix.request.counter
      - apisix.request.latency
      - apisix.upstream.latency
      - apisix.apisix.latency
      - apisix.ingress.size
      - apisix.egress.size
      metadata_path: metadata.csv
      prefix: apisix.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10244
    source_type_name: Apache APISIX
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: dev@apisix.apache.org
  support_email: dev@apisix.apache.org
categories:
- クラウド
- メトリクス
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/apache-apisix/README.md
display_on_public_website: true
draft: false
git_integration_title: apache-apisix
integration_id: apache-apisix
integration_title: Apache APISIX
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: apache-apisix
public_title: Apache APISIX
short_description: Datadog-APISIX インテグレーション
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Datadog-APISIX インテグレーション
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Apache APISIX
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Apache APISIX は動的でリアルタイムな高性能 API ゲートウェイであり、ロードバランシング、ダイナミックアップストリーム、カナリアリリース、サーキットブレーキング、認証、観測性などの豊富なトラフィック管理機能を提供します。例えば、Apache APISIX を使用して、従来の南北方向のトラフィックだけでなく、サービス間の東西方向のトラフィックも処理することができます。また、Kubernetes のイングレスコントローラーとしても使用できます。

[APISIX-Datadog プラグイン][1]は、Datadog Agent にバンドルされている DogStatsD サーバーに、UDP 接続でカスタムメトリクスをプッシュします。DogStatsD は StatsD プロトコルの実装です。[Apache APISIX][2] Agent のカスタムメトリクスを収集し、1 つのデータポイントに集約して、設定された Datadog サーバーに送信します。

## 計画と使用

### インフラストラクチャーリスト

以下の構成方法に従ってください。

### ブラウザトラブルシューティング

1. すでに Datadog を使用していて、Datadog Agent がインストールされている場合は、ポート 8125/UDP がファイアウォールで許可されていることを確認してください。例えば、Apache APISIX Agent は、Datadog Agent のポート 8125 に到達することができます。すでにこれを構成している場合は、ステップ 3 までスキップできます。

> Datadog Agent のインストール方法の詳細については、[Agent のドキュメント][3]を参照してください。

2. Datadog を初めて利用する場合

   1. まず、[Datadog のウェブサイト][4]にアクセスし、Get Started Free ボタンをクリックしてアカウントを作成します。
   2. API キーを生成します。
      ![API キーの生成][5]。

3. APISIX-Datadog プラグインは標準的な UDP ソケットを介して statsd プロトコルに従って DogStatsD サーバーに非同期にメトリクスを送信するので、`datadog/agent` の DogStatsD コンポーネントのみを必要とします。これが APISIX が完全な Agent を使うのではなく、スタンドアロンの `datadog/dogstatsd` イメージを使うことを推奨している理由です。`datadog/agent` イメージの ~2.8GB に比べて非常に軽量です (サイズは ~11MB のみ)。

コンテナとして実行するには

```shell
# 最新イメージをプルします
$ docker pull datadog/dogstatsd:latest
# 切り離されたコンテナを実行します
$ docker run -d --name dogstatsd-agent -e DD_API_KEY=<Your API Key from step 2> -p 8125:8125/udp  datadog/dogstatsd
```

Kubernetes を使用している場合、`dogstatsd` を Apache APISIX Agent と一緒に `Daemonset` または `Multi-Container Pod` としてデプロイすることができます。

4. 以下は、特定のルートに対して Datadog プラグインを有効化する方法の例です。これは、`dogstatsd` Agent が既に稼働していることを前提としています。

```shell
# 特定のルートでプラグインを有効にします
$ curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
  "plugins": {
    "datadog": {}
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "127.0.0.1:1980": 1
    }
  },
  "uri": "/hello"
}'
```

これで、エンドポイント URI である `/hello` へのリクエストがあれば、上記のメトリクスが生成され、Datadog Agent のローカル DogStatsD サーバーにプッシュされるようになります。

5. プラグインを無効にするには、プラグインコンフィギュレーション内の対応する JSON コンフィギュレーションを削除して `datadog` を無効にしてください。APISIX のプラグインはホットロードされるため、APISIX を再起動する必要はありません。

```shell
# ルートに対してプラグインを無効にします
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
  "uri": "/hello",
  "plugins": {},
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "127.0.0.1:1980": 1
    }
  }
}'
```

5. その他のカスタム構成オプションについては、[Datadog Plugin][1] のドキュメントを参照してください。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `apisix` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "apache-apisix" >}}


### ヘルプ

Apache APISIX チェックにはイベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

- [Apache APISIX における Datadog によるクラウドモニタリング][9]

[1]: https://apisix.apache.org/docs/apisix/plugins/datadog
[2]: https://apisix.apache.org/
[3]: https://docs.datadoghq.com/ja/agent/
[4]: https://www.datadoghq.com/
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apache-apisix/images/screenshot_1.png
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-extras/blob/master/apache-apisix/metadata.csv
[8]: https://docs.datadoghq.com/ja/help/
[9]: https://apisix.apache.org/blog/2021/11/12/apisix-datadog