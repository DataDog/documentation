---
app_id: split-rum
app_uuid: 750d9e38-2856-44fe-98d0-9fbbc617d876
assets: {}
author:
  homepage: https://split.io/
  name: Split
  sales_email: partners@split.io
  support_email: support@split.io
categories:
- 構成とデプロイ
- 問題追跡
- 開発ツール
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/split-rum/README.md
display_on_public_website: true
draft: false
git_integration_title: split-rum
integration_id: split-rum
integration_title: Split - RUM
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: split-rum
public_title: Split - RUM
short_description: Split の機能フラグで RUM データをリッチ化する
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
  - Category::Configuration & Deployment
  - Category::Issue Tracking
  - Category::Developer Tools
  - Offering::Integration
  configuration: README.md#Setup
  description: Split の機能フラグで RUM データをリッチ化する
  media:
  - caption: Datadog RUM と Split 機能フラグの概要 (フラグのリスト)
    image_url: images/split-feature-flags-list-in-dd-rum.png
    media_type: image
  - caption: Datadog RUM と Split 機能フラグの詳細
    image_url: images/split-feature-flag-detail-in-dd-rum.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Troubleshooting
  title: Split - RUM
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->

## 概要

[Split][1] は、機能フラグのスピードと信頼性を、各機能の影響を測定するデータと組み合わせるインテリジェントな機能管理[プラットフォーム][2]です。Split を使用することで、組織は機能をリリースし、そのターゲットを顧客に絞り、機能がカスタマーエクスペリエンスのメトリクスに与える影響を測定する安全な方法を手に入れることができます。

Datadog Split RUM インテグレーションにより、製品チームは機能フラグ情報を RUM データにオーバーレイして表示することができます。これにより、個々のユーザーのアクティビティとエクスペリエンスをリアルタイムでプロアクティブにモニタリングし、必要に応じて、機能低下の原因となっている可能性のある機能を迅速にロールバックまたは停止することができます。

## 計画と使用

機能フラグ追跡は、RUM ブラウザ SDK で利用可能です。詳細なセットアップ方法は、[RUM での機能フラグデータの概要][3]ガイドをご覧ください。

1. ブラウザ RUM SDK バージョンを 4.25.0 以降に更新します。
2. RUM SDK を初期化し、`["feature_flags"]` で `enableExperimentalFeatures` 初期化パラメーターを構成します。
3. Split SDK を初期化し、次のコードのスニペットを使用して Datadog に機能フラグの評価を報告するインプレッションリスナーを作成します。


```javascript
const factory = SplitFactory({
    core: {
      authorizationKey: "<APP_KEY>",
      key: "<USER_ID>",
    },
    impressionListener: {
      logImpression(impressionData) {              
          datadogRum
              .addFeatureFlagEvaluation(
                   impressionData.impression.feature,
                   impressionData.impression.treatment
              );
     },
  },
});

const client = factory.client();
```

## ヘルプ

サポートが必要な場合は、Split ドキュメントの [JavaScript SDK ページ][4]を参照するか、[Datadog サポート][5]にお問い合わせください。

[1]: https://split.io
[2]: https://www.split.io/product/
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/guide/setup-feature-flag-data-collection/
[4]: https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#2-instantiate-the-sdk-and-create-a-new-split-client
[5]: https://docs.datadoghq.com/ja/help/