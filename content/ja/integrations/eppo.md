---
app_id: eppo
app_uuid: 1d7b7957-82d6-4e9d-8ba1-b697f01fc850
assets:
  dashboards:
    Eppo Dashboard: assets/dashboards/eppo_dashboard.json
author:
  homepage: https://www.geteppo.com/
  name: Eppo
  sales_email: support@geteppo.com
  support_email: support@geteppo.com
categories:
- 構成とデプロイ
- 開発ツール
- イベント管理
- クラウド
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/eppo/README.md
display_on_public_website: true
draft: false
git_integration_title: eppo
integration_id: eppo
integration_title: Eppo
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: eppo
public_title: Eppo
short_description: Datadog の RUM データを Eppo の機能フラグ情報で拡充する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Category::Configuration & Deployment
  - Category::Developer Tools
  - Category::Event Management
  - Category::Cloud
  - Submitted Data Type::Traces
  configuration: README.md#Setup
  description: Datadog の RUM データを Eppo の機能フラグ情報で拡充する
  media:
  - caption: Datadog RUM と Eppo Flags の概要
    image_url: images/eppo_datadog1.png
    media_type: image
  - caption: Datadog RUM と Eppo Flags の詳細
    image_url: images/eppo_datadog2.png
    media_type: image
  - caption: Eppo Flags のセッションビューを含む Datadog RUM
    image_url: images/eppo_datadog3.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Eppo
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Eppo][1] は、組織内の誰もが高度な A/B テストを利用できるようにする実験および機能管理プラットフォームです。

Datadog Eppo RUM インテグレーションは、フラグ名やバリエーションなどの機能フラグ情報を Datadog RUM データに追加し、パフォーマンスモニタリングや動作の変化の可視化を提供します。これを使用して、どのユーザーに機能が表示されているか、その機能がユーザーのパフォーマンスに悪影響を与えているかどうかを判断することができます。

## セットアップ

機能フラグ追跡は、RUM ブラウザ SDK で利用可能です。詳細なセットアップ方法は、[RUM での機能フラグデータの概要][2]ガイドをご覧ください。

1. ブラウザ RUM SDK バージョンを 4.25.0 以上に更新します。
2. RUM SDK を初期化し、`["feature_flags"]` で `enableExperimentalFeatures` 初期化パラメーターを構成します。
3. Eppo の SDK を `datadogRum` オプション付きで初期化し、Datadog に機能フラグの評価を報告します。

以下は JavaScript の例です。

```typescript
const assignmentLogger: IAssignmentLogger = {
  logAssignment(assignment) {
    // 顧客のイベントログに割り当てイベントを送信
    analytics.track({
      userId: assignment.subject,
      event: "Eppo Randomized Assignment",
      type: "track",
      properties: { ...assignment },
    });

    // このコンテキストで `exposure` が定義され、プロパティ `variation` を持つと仮定
    datadogRum.addFeatureFlagEvaluation(assignment.experiment, exposure.variation);
  },
};

await eppoInit({
  apiKey: "<API_KEY>",
  assignmentLogger,
});
```

## トラブルシューティング

サポートが必要な場合は、[Eppo のドキュメント][3]をご覧ください。

[1]: https://www.geteppo.com/
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/guide/setup-feature-flag-data-collection/
[3]: https://docs.geteppo.com/sdks/datadog