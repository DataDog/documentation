---
app_id: firefly
app_uuid: 58481132-c79e-4659-8064-7cdaabbbc999
assets: {}
author:
  homepage: https://gofirefly.io
  name: Firefly
  sales_email: contact@gofirefly.io
  support_email: contact@gofirefly.io
categories:
- 自動化
- クラウド
- developer tools
- google cloud
- AWS
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/firefly/README.md
display_on_public_website: true
draft: false
git_integration_title: firefly
integration_id: firefly
integration_title: Firefly
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: firefly
oauth: {}
public_title: Firefly
short_description: クラウドを規約に準拠させる
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Cloud
  - Category::Developer Tools
  - Category::Google Cloud
  - Category::AWS
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  configuration: README.md#Setup
  description: クラウドを規約に準拠させる
  media:
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
---



## 概要
Firefly は、クラウドチームがクラウドのフットプリント (AWS、GCP、Kubernetes、Datadog など) を検出し、リソースを Infrastructure-as-Code に自動的に変換し、ドリフトやポリシー違反を検出し、クラウドを望ましい状態に調整できるようにする、クラウドアセットマネジメントソリューションです。
Firefly は、Datadog のアセットを任意の Infrastructure-as-Code (IaC) ツールのコードとして管理することで、チームが Datadog のアセットを不変、バージョン管理、拡張性、監視状態を維持できるように支援します。

### フルクラウドインベントリ
AWS、K8s、GCP、Okta など、他のクラウドアセットと一緒に、すべての Datadog アセットの完全検索可能なインベントリを取得します。

### 自動コード化
Terraform、Pulumi、Cloudformation、CDK 仕様など、単一または複数の Datadog アセットを自動でコード化します。

### ドリフトの検出と修正
Infrastructure-as-Code と実際のクラウドの状態に差異がある場合、リアルタイムで通知され、ドリフトが発生すると、リポジトリに直接修正をプッシュします。

### ポリシー違反の検出と修正
Firefly の統合ポリシーエンジンにより、危険な構成ミスやコストのかかる使用不足を発見し、カスタムポリシーと既成ポリシーの両方でポリシー違反のアラートを受け取ることができます。

## セットアップ

### Firefly - Datadog インテグレーションの構成
1. Datadog のアプリケーションキーと API キーを新規に作成します。
2. Firefly UI で、**Settings > Integrations > Datadog** に移動します。
3. アプリケーションキーをコピーして、専用の行に貼り付けます。
4. API キーをコピーして、専用の行に貼り付けます。
5. **Done** をクリックします。

## サポート
何か質問はありますか？メール [contact@gofirefly.io][1] またはアプリ内チャットをご利用ください。

[1]: mailto:contact@gofirefly.io