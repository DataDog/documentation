---
app_id: superwise
app_uuid: 814d45d4-bf11-46c9-98a2-5fab9c997c94
assets:
  dashboards:
    Superwise: assets/dashboards/superwise.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: superwise.metric.overall.quantity
      metadata_path: metadata.csv
      prefix: superwise.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10246
    source_type_name: Superwise
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Superwise
  sales_email: support@superwise.ai
  support_email: support@superwise.ai
categories:
- インシデント
- ai/ml
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/superwise/README.md
display_on_public_website: true
draft: false
git_integration_title: superwise
integration_id: superwise
integration_title: Superwise
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: superwise
public_title: Superwise
short_description: 本番環境の機械学習モデルのためのモデル観測プラットフォーム
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Incidents
  - Category::AI/ML
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 本番環境の機械学習モデルのためのモデル観測プラットフォーム
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Superwise
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要
[Superwise][1] は、大規模な機械学習 (ML) 運用のためのモデル観測性を提供します。
Superwise のモデル観測機能により、モデルの挙動を可視化し、コンテキストを提供することで、様々なユースケースに基づくモデルリスクを容易に監視することができます。Superwise を使用することで、データサイエンティスト、ML エンジニア、ビジネスオペレーションは、アラートに疲れることなくモデル観測性を得られるので、モデル管理について自信を持つことができます。

![Superwise ダッシュボード][2]

Superwise のモデルメトリクスとインシデントのインテグレーションは、ドリフト、アクティビティ、インシデント、カスタムメトリクスなど、すぐに使えるモデルメトリクスを Datadog に直接送信します。ユースケース、ロジック、セグメンテーション、しきい値、感度を任意に構成し、どのモデルが期待通りの結果を予測できていないかの概要を得ることができます。

Superwise で Datadog インテグレーションを構成すると、標準的なモデルメトリクスが Datadog に送信され、ユーザーは Datadog でモデル観測性のダッシュボードを取得できます。特定のモデルメトリクスやインシデントポリシーを構成し、Datadog に送信することで、ユースケースに合わせたモデル観測性を実現することが可能です。

## 計画と使用

1. [Superwise ポータル][3]で、**Integrations** を選択します。

2. **Create a new channel** をクリックし、**Datadog** を選択します。

    ![Superwise - 新しいインテグレーションを追加する][4]

3. Datadog の API キーとアプリケーションキーを入力し、**Test** をクリックします。インテグレーションを検証するために、Datadog アカウントにテストリクエストが送信されます。リクエストの送信が成功した場合、Superwise にテストが正常に配信された旨のメッセージが表示されます。セットアップを終了するには、**Create channel** をクリックします。

    ![Superwise - Datadog の新しいチャンネルを追加する][5]

4. セットアップが完了すると、新しい Datadog インテグレーションウィジェットが利用できるようになります。

    ![Superwise インテグレーション][6]

### 検証
Datadog の **Metrics Explorer** で、メトリクス `superwise.integration.test` を検索して、Superwise と Datadog 間のインテグレーションが機能していることを確認します。

![Datadog の superwise.integration.test グラフ][7]

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "superwise" >}}


### ヘルプ

Superwise インテグレーションには、イベントは含まれません。

### ヘルプ

Superwise インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

サポートが必要な場合は、[Superwise のドキュメント][9]をご覧ください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog マーケットプレイスで Superwise が提供するモデルパフォーマンスの監視][10]

[1]: https://www.superwise.ai/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/superwise/images/5.png
[3]: https://portal.superwise.ai/
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/superwise/images/2.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/superwise/images/6.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/superwise/images/3.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/superwise/images/4.png
[8]: https://github.com/DataDog/integrations-extras/blob/master/superwise/metadata.csv
[9]: https://docs.superwise.ai
[10]: https://www.datadoghq.com/blog/superwise-datadog-marketplace/