---
"algolia":
  "subcategory": Marketplace Integrations
"app_id": "fairwinds-insights"
"app_uuid": "a488d774-fd45-4765-b947-e48792c6ab32"
"assets":
  "dashboards":
    "Insights Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": false
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": fairwinds.insights.action_items
      "metadata_path": metadata.csv
      "prefix": fairwinds.insights.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10112"
    "source_type_name": Fairwinds Insights
"author":
  "homepage": "https://www.fairwinds.com"
  "name": Fairwinds
  "sales_email": datadog-marketplace@fairwinds.com
  "support_email": insights@fairwinds.com
  "vendor_id": fairwinds
"categories":
- containers
- cost management
- kubernetes
- marketplace
- provisioning
- security
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "fairwinds_insights"
"integration_id": "fairwinds-insights"
"integration_title": "Fairwinds Insights"
"integration_version": ""
"is_public": true
"legal_terms":
  "eula": assets/eula.pdf
"manifest_version": "2.0.0"
"name": "fairwinds_insights"
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.fairwinds.insights
  "product_id": insights
  "short_description": Kubernetes security and governance software
  "tag": insights_node
  "unit_label": Kubernetes Node
  "unit_price": !!int "100"
"public_title": "Fairwinds Insights"
"short_description": "Protects and optimizes your mission critical Kubernetes applications"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Containers"
  - "Category::Cost Management"
  - "Category::Kubernetes"
  - "Category::Marketplace"
  - "Category::Provisioning"
  - "Category::Security"
  - "Offering::Integration"
  - "Offering::Software License"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Events"
  "configuration": "README.md#Setup"
  "description": Protects and optimizes your mission critical Kubernetes applications
  "media":
  - "caption": Fairwinds Insights is Kubernetes governance and security software that offers security alerting, guardrails and compliance findings and cost optimization advice. Fairwinds Insights integrates with Datadog so you have a single location to view all of your reports.
    "image_url": images/Video_Front_Cover.png
    "media_type": video
    "vimeo_id": !!int "619368230"
  - "caption": The Fairwinds Insights Admission Controller runs every time a new resource is added to the cluster. If the resource violates your organization’s policies, the Admission Controller will reject it and notify the client.
    "image_url": images/Fairwinds_Insights_Admission_Controller_Image_v1.png
    "media_type": image
  - "caption": Fairwinds Insights continuously monitors multiple clusters against security configurations to reduce risk and ensure best practices are followed. Insights pinpoints your container and Kubernetes risks, prioritizes risks, provides remediation guidance and status tracking.
    "image_url": images/Fairwinds_Insights_Automate_Kubernetes_Policies_Image_v1.png
    "media_type": image
  - "caption": Teams can build and enforce customized policies via OPA and integrate into every part of Fairwinds Insights including CI/CD pipelines, the admission controller and the in-cluster agent. Insights includes a library of OPA templates.
    "image_url": images/Fairwinds_Insights_Customize_Open_Policy_Agent_Image_v1.png
    "media_type": image
  - "caption": Insights monitors CPU and memory usage to provide recommendations on resource limits and requests. Maximize the efficiency of CPU and memory utilization for your Kubernetes workloads.
    "image_url": images/Fairwinds_Insights_Optimize_Kubernetes_Resources_Image_v1.png
    "media_type": image
  - "caption": Fairwinds Insights tightly integrates into your CI/CD pipeline to shift security left. DevOps teams can prevent misconfigurations throughout CI/CD and provide remediation advice to developers, free from manual intervention. Developers are free to develop with safety nets in place.
    "image_url": images/Fairwinds_Insights_Shift_Left_Security_Image_v1.png
    "media_type": image
  - "caption": Fairwinds Insights delivers container runtime monitoring and integrates into the CI/CD process. Insights tracks known vulnerabilities in containers, prioritizes findings by severity and offers remediation. It integrates with ticketing and assignment workflows for status tracking of remediation.
    "image_url": images/Fairwinds_Insights_VulnerabilityScanning_Image_v1.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/fairwinds-insights-datadog-marketplace/"
  - "resource_type": documentation
    "url": "https://insights.docs.fairwinds.com/"
  "support": "README.md#Support"
  "title": Fairwinds Insights
  "uninstallation": "README.md#Uninstallation"
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

## 収集データ

### メトリクス

Fairwinds Insights インサイトのアクションアイテムは、タグと共に Datadog に表示されるため、必要な分析を行うことができます。

### サービスチェック

Fairwinds Insights にサービスのチェックは含まれません。

### イベント

* 最初のイベントは、インテグレーションのセットアップを完了すると表示されます
* Fairwinds Insights の新しいアクションアイテムごとのイベント
* Fairwinds Insights のイベント修正済みアクションアイテムごとのイベント

## サポート

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
