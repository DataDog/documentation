---
app_id: cloudzero
app_uuid: 6f1a61c2-e875-42f7-b8ba-94b191786846
assets:
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.cloudzero.com/
  name: CloudZero
  sales_email: sales@cloudzero.com
  support_email: support@cloudzero.com
categories:
- コスト管理
- クラウド
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cloudzero/README.md
display_on_public_website: true
draft: false
git_integration_title: cloudzero
integration_id: cloudzero
integration_title: CloudZero
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: cloudzero
public_title: CloudZero
short_description: Datadog のコストを CloudZero プラットフォームで表示・分析する
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
  - Offering::Integration
  - Category::Cost Management
  - Category::Cloud
  configuration: README.md#Setup
  description: Datadog のコストを CloudZero プラットフォームで表示・分析する
  media:
  - caption: クラウドのコスト - プロバイダー別グループ分け
    image_url: images/CloudZero1.png
    media_type: image
  - caption: Datadog のコスト - サービス別グループ分け
    image_url: images/CloudZero2.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: CloudZero
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

CloudZero は、エンジニアリングチームが費用対効果の高いソフトウェアを構築できるよう支援します。CloudZero のプラットフォームを使用することで、タグ付けの品質に関係なく、クラウド、PaaS、SaaS のコストを 100% 割り当て、単一の統一ビューで表示することができます。1 時間単位のコストデータをビジネスレベルおよびシステムレベルのテレメトリーと組み合わせることで、顧客単価、製品単価、機能単価、チーム単価などの正確な単価メトリクスを通じて、クラウドデータをビジネスのコンテキストの中で捉えることができます。CloudZero の AI を活用した異常検知機能は、影響を受けるインフラストラクチャーを直接示す形でエンジニアに異常な支出イベントを警告し、クラウドコスト管理へのエンジニアの関与を促します。

### 利益

CloudZero プラットフォームが接続されると、すべての Datadog 製品を対象に、確約コストとオンデマンドコストの両方について、Datadog の請求情報が定期的に取り込まれます。CloudZero はこのデータを他のクラウドコストと統合し、クラウド投資総額を包括的に評価します。CloudZero プラットフォームは、すべてのクラウド費用をさまざまな分析機能で分析することで、効率化の余地を明らかにし、ユーザーによるカスタムレポートの作成と送信を可能にします。

## 計画と使用

### インフラストラクチャーリスト

[Datadog インテグレーションタイル][1]の **Install Integration* をクリックします。インテグレーション がインストールされたら、**Configure** タブの下にある **Connect Accounts** をクリックして、CloudZero に Datadog アカウントへのアクセスを許可します。CloudZero アプリケーションが開いたら接続を作成して、名前を追加し、Datadog の親アカウントが割り当てられているサイトを選択します。

接続が作成されたら、**Continue** をクリックして、CloudZero が Datadog アカウントから CloudZero プラットフォームにデータを取り込むことを許可します。

### ブラウザトラブルシューティング

CloudZero の Datadog 接続の詳細ページから設定を調整できます。

### 検証

1. [接続][2]のリストから、Datadog への接続状況を確認できます。
2. Datadog から取得したデータの量とタイミングの詳細を表示するには、Datadog の接続名をクリックしてください。
3. データの取り込みが正常に実行されたら、[Cost Explorer][3] に含まれるDatadog コストを参照してください。

## アンインストール

- このインテグレーションをアンインストールすると、それ以前に与えられた認可は全て取り消されます。
- また、[API Keys ページ][4]でインテグレーション名を検索して、このインテグレーションに紐付けられた全ての API キーが無効になったことを確認してください。

## ヘルプ

ご不明な点は、[CloudZero サポート][5]までお問い合わせください。

[1]: https://app.datadoghq.com/integrations/cloudzero
[2]: https://app.cloudzero.com/organization/connections
[3]: https://app.cloudzero.com/explorer
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: mailto:support@cloudzero.com