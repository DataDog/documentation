---
algolia:
  subcategory: Marketplace インテグレーション
app_id: firefly-license
app_uuid: 58481132-c79e-4659-8064-7cdaabbbc777
assets: {}
author:
  homepage: https://gofirefly.io
  name: Firefly
  sales_email: contact@gofirefly.io
  support_email: contact@gofirefly.io
  vendor_id: firefly
categories:
- 自動化
- クラウド
- 構成 & デプロイ
- マーケットプレイス
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: firefly_license
integration_id: firefly-license
integration_title: Firefly
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: firefly_license
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: firefly-license
  short_description: Firefly スタートアッププラン - 最大 6,000 アセット
  unit_price: 699
public_title: Firefly
short_description: クラウドを規約に準拠させる
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Cloud
  - Category::Configuration & Deployment
  - Category::Marketplace
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: クラウドを規約に準拠させる
  media:
  - caption: IaC ダッシュボード
    image_url: images/FF-dashboard.png
    media_type: image
  - caption: フルクラウドインベントリ
    image_url: images/FF-inventory.png
    media_type: image
  - caption: 自動コード化
    image_url: images/FF-codification.png
    media_type: image
  - caption: ドリフトの検出と修正
    image_url: images/FF-fix-drifts.png
    media_type: image
  - caption: ポリシー違反の検出と修正
    image_url: images/FF-insights.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Firefly
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
Firefly は、クラウドチームがクラウドのフットプリント (AWS、GCP、Kubernetes、Datadog など) を検出し、リソースを Infrastructure-as-Code に自動的に変換し、ドリフトやポリシー違反を検出し、クラウドを望ましい状態に調整できるようにする、クラウドアセットマネジメントソリューションです。
Firefly は、Datadog のアセットを任意の Infrastructure-as-Code (IaC) ツールのコードとして管理することで、チームが Datadog のアセットを不変、バージョン管理、拡張性、監視状態を維持できるように支援します。

### フルクラウドインベントリ
AWS、K8s、GCP、Okta など、他のクラウドアセットと一緒に、すべての Datadog アセットの完全検索可能なインベントリを取得します。

### 自動コード化
[Firefly Datadog インテグレーション][2]を使用すると、Terraform、Pulumi、Cloudformation、CDK 仕様など、単一または複数の Datadog アセットを自動でコード化することができます。

### ドリフトの検出と修正
Infrastructure-as-Code と実際のクラウドの状態に差異がある場合、リアルタイムで通知され、ドリフトが発生すると、リポジトリに直接修正をプッシュします。

### ポリシー違反の検出と修正
Firefly の統合ポリシーエンジンにより、危険な構成ミスやコストのかかる使用不足を発見し、カスタムポリシーと既成ポリシーの両方でポリシー違反のアラートを受け取ることができます。

## Agent
何か質問はありますか？メール [contact@gofirefly.io][1] またはアプリ内チャットをご利用ください。

[1]: mailto:contact@gofirefly.io
[2]: https://app.datadoghq.com/integrations/firefly

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/firefly-license" target="_blank">こちらをクリック</a>してください。