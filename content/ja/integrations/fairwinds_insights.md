---
"assets":
  "dashboards":
    "Insights Overview": assets/dashboards/overview.json
  "metrics_metadata": metadata.csv
  "monitors": {}
  "saved_views": {}
  "service_checks": assets/service_checks.json
"author":
  "homepage": "https://www.fairwinds.com"
  "name": Fairwinds
"categories":
- マーケットプレイス
- containers
- コスト管理
- security
"creates_events": true
"ddtype": "crawler"
"dependencies": []
"display_name": "Fairwinds Insights"
"draft": false
"git_integration_title": "fairwinds_insights"
"guid": "fd4bd190-d57d-449b-9880-76cbf8325a3e"
"integration_id": "fairwinds-insights"
"integration_title": "Fairwinds Insights"
"is_public": true
"kind": "integration"
"maintainer": "insights@fairwinds.com"
"manifest_version": "1.0.0"
"metric_prefix": "fairwinds.insights."
"metric_to_check": "fairwinds.insights.action_items"
"name": "fairwinds_insights"
"pricing":
- "billing_type": tag_count
  "metric": datadog.marketplace.fairwinds.insights
  "tag": insights_cluster
  "unit_label": Kubernetes クラスター
  "unit_price": !!int "699"
"public_title": "Fairwinds Insights"
"short_description": "業務の遂行に不可欠な Kubernetes アプリケーションを保護、最適化します。"
"support": "パートナー"
"supported_os":
- linux
- mac_os
- windows
"terms":
  "eula": assets/eula.pdf
  "legal_email": datadog-marketplace@fairwinds.com
---



## 概要

{{< img src="marketplace/fairwinds_insights/images/dashboard.png" alt="ダッシュボード" >}}

### 業務の遂行に不可欠な Kubernetes アプリケーションを保護、最適化するためのソフトウェア。

#### 開発からオペレーションまでのハンドオフを効率化

* 複数のクラスター内のカスタムポリシーを定義、制御
* 管理コントローラで防御策およびベストプラクティスを実行
* インテグレーションコンテナのスキャニングおよび CI/CD ワークフローへのデプロイ確認

#### Kubernetes コストの監視と最適化

* ワークロードリソースの使用量および推定コストを視覚化
* ワークロードに適切な CPU とメモリ設定を決定

#### 時間を節約

* Datadog ダッシュボードに Kubernetes の推奨コンフィギュレーションを統合
* Slack インテグレーションでコラボレーションを向上

#### リスクを削減

* コンテナ内の既知の脆弱性を監視
* Kubernetes のデプロイメントコンフィギュレーションを確認

## 収集データ

### メトリクス

Fairwinds Insights インサイトのアクションアイテムは、タグと共に Datadog に表示されるため、必要な分析を行うことができます。

### サービスのチェック

Fairwinds Insights にサービスのチェックは含まれません。

### イベント

* 最初のイベントは、インテグレーションのセットアップを完了すると表示されます
* Fairwinds Insights の新しいアクションアイテムごとのイベント
* Fairwinds Insights のイベント修正済みアクションアイテムごとのイベント

## サポート

サポートまたはリクエストをご希望の場合は、以下のチャンネルから Fairwinds にお問い合わせください。

電話: +1 617-202-3659 メール: sales@fairwinds.com

[こちら](https://insights.docs.fairwinds.com/)でドキュメントをご確認いただけます。セットアップ、インテグレーションのほか、Fairwinds Insights を最大限に活用するための実際の使用法などをご紹介しています。

---
このアプリケーションは、マーケットプレイスにて利用可能で、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、[こちらをクリック](https://app.datadoghq.com/marketplace/app/fairwinds-insights/pricing)してください。

### よくある質問

**Fairwinds Insights の仕組みについて教えてください。**

Fairwinds Insights は、Kubernetes コンフィギュレーションの 3 つの課題領域（セキュリティ、効率、信頼性）に対する統一されたマルチクラスタービューを提供します。Fairwinds Insights を使用すると、単一の Helm インストールで複数のオープンソースツールを簡単にデプロイすることができます。一度インストールすれば、各ツールのカスタマイズや構成の作業の必要がなくなります。また、ソフトウェアによりポリシー管理機能が追加されるため、エンジニアチームは Kubernetes クラスターへのデプロイに対する防御策を定義し実行できます。

**プラグインとは？**

Fairwinds Insights は、ソフトウェアと統合したツールを「プラグイン」として参照します。

**Agent とは？**

Fairwinds Insights は、含まれる Helm チャートを「Fairwinds Insights Agent」として参照します。

**データはどうなりますか？**

Fairwinds Insights では、各プラグインからの結果が集計され、複数クラスタービューに公開されるため、簡単に消費、優先度付け、そして問題の追跡ができます。

**Fairwinds Insights に含まれるプラグインは？**

Fairwinds Insights は、広く使用されているさまざまな素晴らしいオープンソースツールのインテグレーションを提供します（[Polaris](https://github.com/FairwindsOps/polaris)、[Goldilocks](https://github.com/FairwindsOps/goldilocks/)、[Open Policy Agent](https://www.openpolicyagent.org/)、[Trivy Container Scanning](https://github.com/aquasecurity/trivy) など）。含まれるすべてのプラグイン一覧は、[Fairwinds Insights ドキュメントセンター](https://insights.docs.fairwinds.com/)でご覧いただけます。以下は、結果例の一部です。

* コンテナの脆弱性
* Kubernetes デプロイに関するセキュリティの問題（例: デプロイメントがルートとして実行するよう構成されていた）
* クラスターレベルの脆弱性（例: 公開されたポッド、情報開示など）
* Kubernetes CVE
* 古くなった Helm チャートの自動通知
* カスタム Kubernetes ポリシーおよびコンフィギュレーションチェック

[1]: https://insights.fairwinds.com

### 返金ポリシー

Insights のキャンセルおよび返金ポリシー:

Fairwinds Insights は月々の定額利用で提供されるため、お客様は Datadog マーケットプレイスのアカウントを使用していつでもご利用を中止することが可能です。定額利用を中止した場合、その時点で有効な月間利用期間の残りの分のみが請求されます。Insights では、すでにお支払いいただいた料金の返金はいたしかねます。

