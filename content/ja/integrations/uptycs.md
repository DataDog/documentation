---
app_id: uptycs
app_uuid: d27ee4b6-649d-42bd-b7ac-fb40537d7031
assets:
  dashboards:
    Uptycs Events Dashboard: assets/dashboards/uptycs.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10400
    source_type_name: Uptycs
author:
  homepage: https://www.uptycs.com
  name: Uptycs
  sales_email: sales@uptycs.com
  support_email: support@uptycs.com
categories:
- クラウド
- コラボレーション
- slos
- コンプライアンス
- セキュリティ
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/uptycs/README.md
display_on_public_website: true
draft: false
git_integration_title: uptycs
integration_id: uptycs
integration_title: Uptycs
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: uptycs
public_title: Uptycs
short_description: Uptycs からアラートと検出を収集する
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Collaboration
  - Category::Alerting
  - カテゴリ::コンプライアンス
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Uptycs からアラートと検出を収集する
  media:
  - caption: Uptycs イベントダッシュボード
    image_url: images/integration_dashboard_1.png
    media_type: image
  - caption: ホストごとの Uptycs イベントのトレンドグラフ
    image_url: images/integration_dashboard_2.png
    media_type: image
  - caption: Datadog イベントとしての Uptycs 検出
    image_url: images/data_collected_1.png
    media_type: image
  - caption: Datadog イベントとしての Uptycs アラート
    image_url: images/data_collected_2.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Uptycs
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Uptycs は、脅威、脆弱性、誤構成、機密データの漏洩、およびコンプライアンス要件に対する対応を優先することで、現代の攻撃対象領域全体でのリスクを軽減します。これらの情報は、1 つのユーザーインターフェイスとデータモデルを通じてアクセス可能です。これには、オンプレミスとクラウドの境界を横断する脅威アクティビティを相関付ける機能も含まれ、より包括的な企業全体のセキュリティポスチャを提供します。

略語でのサポートが必要ですか？CNAPP、CWPP、CSPM、KSPM、CIEM、CDR、XDR で対応します。Detection Cloud からスタートし、Google 風の検索機能を使って、今日あなたが必要としている攻撃対象範囲を把握しましょう。

詳しくは [Uptycs の Web サイト][1]をご覧ください。

Uptycs インテグレーションにより、Uptycs のアラートや検出を Datadog のイベントに取り込むことができます。

### アラート詳細

各アラートには、以下の主要なコンポーネントが含まれています。
   1. タイトル
   2. 説明
   3. Id: Uptycs アラート ID。
   4. Uptycs アラートコード。
   5. アラートの重大度。
   6. アラートキーと値。
   7. Asset details: アセット ID とホスト名。
   8. Uptycs プラットフォームに移動するための Uptycs URL。

### 検出の詳細

各検出には、以下の主要なコンポーネントが含まれています。
   1. タイトルまたは名前
   2. Id: Uptycs 検出 ID。
   3. Score: Uptycs が算出したスコア。
   4. Alerts: 検出に関連するアラートのリスト。
   5. Events: 検出に関連するイベントのリスト。
   5. Attack Matrix: アラートやイベントに関連するテクニック。
   7. Asset details: アセット ID とホスト名。
   8. Uptycs プラットフォームに移動するための Uptycs URL。

## 計画と使用

このインテグレーションをセットアップするには、Uptycs のアカウントが必要です。Uptycs をご利用でない場合は、[お問い合わせ][2]から Uptycs アカウントを取得してください。
また、Datadog API キーも必要です。

### ブラウザトラブルシューティング

1. [Datadog API キー][3]を作成します。
2. Datadog API キーを使用して、Uptycs プラットフォーム上に Datadog インテグレーションの宛先を作成します。
   1. Configuration > Destinations に移動します。
   2. New destination をクリックします。
   3. **Datadog** 宛先タイプを選択します。
   4. 宛先の名前、Datadog ドメイン、API キーを入力します。テンプレートフィールドには、アラートや検出用のカスタムテンプレートを追加することもできます。

      ![インテグレーションセットアップその 1][4]

   5. **Save** をクリックします。
3. 宛先をセットアップしたら、その宛先の転送ルールを作成します。
   1. Configuration > Detection Forwarding Rules > New rule に移動します。
   2. 名前と説明を入力し、ルールの関連条件を選択します。
   3. 'Destinations' オプションで、新しく作成した宛先を選択します。

      ![インテグレーションセットアップその 2][5]

   4. Enable Rule を選択し、**Save** をクリックします。
4. 作成された宛先はアラート転送に使用できます。
   1. Configuration > Alert Rules に移動します。
   2. アラートルールを選択するか、複数のルールを一括選択します。
   3. 'Destinations' オプションで、新しく作成した宛先を選択します。
   4. 'Notify on Every Alert' (アラートごとに通知) と 'Close After Delivery' (配信後に閉じる) のオプションを選択します。

      ![インテグレーションセットアップその 3][6]

   5. **Save** をクリックします。
6. Uptycs がアラートや検出を生成すると、Datadog イベントとして配信されます。

## ヘルプ

ヘルプが必要な場合は、[サポート][7]までお問い合わせください。

[1]: https://www.uptycs.com
[2]: https://www.uptycs.com/about/contact/
[3]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#add-an-api-key-or-client-token
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/uptycs/images/integration_setup_1.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/uptycs/images/integration_setup_2.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/uptycs/images/integration_setup_3.png
[7]: mailto:support@uptycs.com