---
"assets":
  "dashboards":
    "Algorithmia": assets/dashboards/algorithmia.json
  "logs": {}
  "metrics_metadata": metadata.csv
  "monitors":
    "Algorithmia": assets/monitors/algorithm_duration.json
  "saved_views": {}
  "service_checks": assets/service_checks.json
"categories":
- モニタリング
"creates_events": false
"ddtype": "crawler"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/algorithmia/README.md"
"display_name": "Algorithmia"
"draft": false
"git_integration_title": "algorithmia"
"guid": "bb9defff-03ae-4a22-93a7-6db498d37cd7"
"integration_id": "algorithmia"
"integration_title": "Algorithmia"
"is_public": true
"kind": "インテグレーション"
"maintainer": "support@algorithmia.io"
"manifest_version": "1.0.0"
"metric_prefix": "algorithmia."
"metric_to_check": "algorithmia.duration_milliseconds"
"name": "algorithmia"
"public_title": "Datadog-Algorithmia インテグレーション"
"short_description": "本番環境の機械学習モデルのメトリクスを監視"
"support": "contrib"
"supported_os":
- linux
---



## 概要

[Algorithmia][1] は、本番環境で機械学習をはじめとする確率モデルをデプロイ、
管理、制御し、セキュリティを確保するための機能を含む、データサイエンティスト、
アプリ開発者、IT オペレーターのための MLOps プラットフォームです。

![Datadog で Algorithmia Insights を利用][2]

Algorithmia Enterprise の機能のひとつである Algorithmia Insights は、
機械学習モデルをインスツルメントして計測、監視するために使用される
メトリクスのパイプラインを提供します。機械学習モデルからの推論関連の
メトリクスの監視ユースケースには、モデルドリフトの検出、データドリフト、
モデルバイアスなどがあります。

このインテグレーションにより、運用メトリクスのほか、ユーザー定義に
よる推論関連のメトリクスを Algorithmia から Kafka へ、さらに Datadog の
メトリクス API へストリーミングすることができます。

## セットアップ

1. Algorithmia インスタンスから、Algorithmia Insights を構成して
   Kafka Broker (Algorithmia の外部) へ接続します。

2. 詳しくは、
   [Algorithmia インテグレーションレポジトリのドキュメント][3]を参照
   して、このインテグレーションに使用される Datadog のメッセージ転送サービスをインストール、構成、起動してください。
   Kafka トピックからのメトリクスが
   Datadog のメトリクス API へ転送されます。


### 検証

1. Algorithmia で、Insights が有効化されたアルゴリズムのクエリを実行します。
2. Datadog インターフェイスで、**Metrics** サマリーページを開きます。
3. 次でフィルタリングし、Insights からのメトリクスが Datadog に存在することを確認します。
   `algorithmia`

### メトリクスのストリーミング

このインテグレーションでは、Insights が有効になっているモデルにクエリが
実行されると、Algorithmia からメトリクスがストリーミングされます。
各ログエントリには、運用メトリクスと推論関連メトリクスが含まれます。

`duration_milliseconds` メトリクスは、Algorithmia からのデフォルトのペイロードに
含まれる運用メトリクスのひとつです。スムーズにご利用を開始いただけるよう、
インテグレーションにはのデフォルトのメトリクス用ダッシュボードおよび
モニターも含まれています。

その他のメトリクスには、アルゴリズム開発者による Algorithmia 特有の
ユーザー定義の推論関連メトリクスもあります。ユーザー定義のメトリクスは、
ご使用の機械学習フレームワークおよびユースケースによりますが、
scikit-learn の回帰モデルからの予測可能性、TensorFlow の画像認識における
信頼度スコア、または受信した API リクエストの入力データなどの値が
含まれます。また、このインテグレーションで提供されるメッセージ転送
スクリプトには、Datadog でユーザー定義のメトリクスに `algorithmia.` の
プレフィックスが追加されます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "algorithmia" >}}


### サービスのチェック

Algorithmia チェックには、サービスのチェック機能は含まれません。

### イベント

Algorithmia チェックには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Algorithmia サポートチーム][5]までお問い合わせください。

[1]: https://algorithmia.com/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/algorithmia/images/algorithmia-insights-datadog.png
[3]: https://github.com/algorithmiaio/integrations
[4]: https://github.com/DataDog/integrations-extras/blob/master/algorithmia/metadata.csv
[5]: https://algorithmia.com/contact

