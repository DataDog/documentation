---
algolia:
  subcategory: Marketplace インテグレーション
app_id: fairwinds-insights
app_uuid: a488d774-fd45-4765-b947-e48792c6ab32
assets:
  dashboards:
    Insights Overview: assets/dashboards/overview.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: fairwinds.insights.action_items
      metadata_path: metadata.csv
      prefix: fairwinds.insights.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10112
    source_type_name: Fairwinds Insights
author:
  homepage: https://www.fairwinds.com
  name: Fairwinds
  sales_email: datadog-marketplace@fairwinds.com
  support_email: insights@fairwinds.com
  vendor_id: fairwinds
categories:
- コンテナ
- コスト管理
- kubernetes
- マーケットプレイス
- プロビジョニング
- セキュリティ
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: fairwinds_insights
integration_id: fairwinds-insights
integration_title: Fairwinds Insights
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: fairwinds_insights
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.fairwinds.insights
  product_id: insights
  short_description: Kubernetes セキュリティ・ガバナンスソフトウェア
  tag: insights_node
  unit_label: Kubernetes ノード
  unit_price: 100
public_title: Fairwinds Insights
short_description: 業務の遂行に不可欠な Kubernetes アプリケーションを保護、最適化します
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Cost Management
  - Category::Kubernetes
  - Category::Marketplace
  - Category::Provisioning
  - Category::Security
  - Offering::Integration
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: 業務の遂行に不可欠な Kubernetes アプリケーションを保護、最適化します
  media:
  - caption: Fairwinds Insights は、セキュリティアラート、ガードレール、コンプライアンスの知見とコスト最適化のアドバイスを提供する
      Kubernetes ガバナンスおよびセキュリティソフトウェアです。Fairwinds Insights は Datadog と統合するため、一箇所ですべてのレポートを確認することができます。
    image_url: images/Video_Front_Cover.png
    media_type: ビデオ
    vimeo_id: 619368230
  - caption: Fairwinds Insights Admission Controller は、新しいリソースがクラスターに追加されるたびに実行されます。リソースが組織のポリシーに違反している場合、Admission
      Controller はそれを拒否し、クライアントに通知します。
    image_url: images/Fairwinds_Insights_Admission_Controller_Image_v1.png
    media_type: image
  - caption: Fairwinds Insights は、複数のクラスターをセキュリティ設定に照らして継続的に監視し、リスクを低減してベストプラクティスが守られているかどうかを確認します。Insights
      は、コンテナと Kubernetes のリスクをピンポイントで特定し、リスクに優先順位を付け、修正ガイダンスとステータスの追跡を提供します。
    image_url: images/Fairwinds_Insights_Automate_Kubernetes_Policies_Image_v1.png
    media_type: image
  - caption: チームは、OPA を介してカスタマイズされたポリシーを構築し、施行することができ、CI/CD パイプライン、アドミッションコントローラー、クラスター内エージェントを含む
      Fairwinds Insights のあらゆる部分に統合することができます。Insights には、OPA テンプレートのライブラリが含まれています。
    image_url: images/Fairwinds_Insights_Customize_Open_Policy_Agent_Image_v1.png
    media_type: image
  - caption: Insights は、CPU とメモリの使用状況を監視し、リソースの制限や要求に関する推奨事項を提供します。Kubernetes のワークロードの
      CPU とメモリの使用効率を最大化します。
    image_url: images/Fairwinds_Insights_Optimize_Kubernetes_Resources_Image_v1.png
    media_type: image
  - caption: Fairwinds Insights は CI/CD パイプラインに緊密に統合され、セキュリティを左遷します。DevOps チームは、CI/CD
      を通じて設定ミスを防ぎ、手動で介入することなく、開発者に修正アドバイスを提供することができます。開発者はセーフティネットがある状態で自由に開発することができます。
    image_url: images/Fairwinds_Insights_Shift_Left_Security_Image_v1.png
    media_type: image
  - caption: Fairwinds Insights は、コンテナランタイムの監視と CI/CD プロセスへの統合を実現します。Insights は、コンテナ内の既知の脆弱性を追跡し、発見された脆弱性を重要度によって優先順位付けし、改善策を提供します。Insights
      は、チケッティングや割り当てワークフローと統合し、修復のステータスを追跡します。
    image_url: images/Fairwinds_Insights_VulnerabilityScanning_Image_v1.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Fairwinds Insights
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

業務の遂行に不可欠な Kubernetes アプリケーションを保護、最適化するためのソフトウェア。

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

## リアルユーザーモニタリング

### データセキュリティ

Fairwinds Insights インサイトのアクションアイテムは、タグと共に Datadog に表示されるため、必要な分析を行うことができます。

### ヘルプ

Fairwinds Insights にサービスのチェックは含まれません。

### ヘルプ

* 最初のイベントは、インテグレーションのセットアップを完了すると表示されます
* Fairwinds Insights の新しいアクションアイテムごとのイベント
* Fairwinds Insights のイベント修正済みアクションアイテムごとのイベント

## Agent

サポートまたはリクエストをご希望の場合は、以下のチャンネルから Fairwinds にお問い合わせください。

- 電話: +1 617-202-3659 
- メール: [sales@fairwinds.com][2]

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

### 返金ポリシー

Insights のキャンセルおよび返金ポリシー:

Fairwinds Insights は月々の定額利用で提供されるため、お客様は Datadog マーケットプレイスのアカウントを使用していつでもご利用を中止することが可能です。定額利用を中止した場合、その時点で有効な月間利用期間の残りの分のみが請求されます。Insights では、すでにお支払いいただいた料金の返金はいたしかねます。

### その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog Marketplace で Fairwinds Insights の製品を使って Kubernetes を監視する][2]
- [Fairwinds Insights のドキュメント][3]

[1]: https://insights.fairwinds.com
[2]: https://www.datadoghq.com/blog/fairwinds-insights-datadog-marketplace/
[3]: https://insights.docs.fairwinds.com/
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/fairwinds-insights" target="_blank">こちらをクリック</a>してください。