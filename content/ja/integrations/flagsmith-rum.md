---
app_id: flagsmith-rum
app_uuid: a88f10b6-aef7-41df-979e-d70b720c6752
assets: {}
author:
  homepage: https://flagsmith.com/
  name: Flagsmith
  sales_email: support@flagsmith.com
  support_email: support@flagsmith.com
categories:
- 構成 & デプロイ
- 問題追跡
- developer tools
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/flagsmith-rum/README.md
display_on_public_website: true
draft: false
git_integration_title: flagsmith-rum
integration_id: flagsmith-rum
integration_title: Flagsmith
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: flagsmith-rum
public_title: Flagsmith
short_description: Flagsmith の機能フラグで RUM データを強化
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
  description: Flagsmith の機能フラグで RUM データを強化
  media:
  - caption: Datadog RUM と Flagsmith Flags の概要
    image_url: images/flag_rum_overview.png
    media_type: image
  - caption: Datadog RUM と Flagsmith Flags の詳細
    image_url: images/flag_rum_details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Flagsmith
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Flagsmith][1] は、Web、モバイル、サーバー側のアプリケーションにまたがる機能管理を容易にします。

Datadog Flagsmith RUM インテグレーションは、RUM データを機能フラグで強化し、パフォーマンスの監視と行動の変化を可視化します。どのユーザーにユーザーエクスペリエンスが表示され、それがユーザーのパフォーマンスに悪影響を及ぼしているかどうかを判断します。

## 計画と使用

機能フラグ追跡は、RUM ブラウザ SDK で利用可能です。詳細なセットアップ方法は、[RUM での機能フラグデータの概要][2]ガイドをご覧ください。

1. ブラウザ RUM SDK バージョンを 4.25.0 以上に更新します。
2. RUM SDK を初期化し、`["feature_flags"]` で `enableExperimentalFeatures` 初期化パラメーターを構成します。
3. Flagsmith の SDK に `datadogRum` オプションを付けて初期化すると、以下に示すコードのスニペットを使用して Datadog に機能フラグの評価を報告することができるようになります。

```javascript
flagsmith.init({
     datadogRum: {
        client: datadogRum,
        trackTraits: true,
    },
    ...
})
```

## ヘルプ

サポートが必要な場合は、 [Flagsmith のドキュメント][3]をご覧いただくか、[Datadog サポート][4]までお問い合わせください。

[1]: https://flagsmith.com/
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/guide/setup-feature-flag-data-collection/
[3]: https://docs.flagsmith.com/clients/javascript#datadog-rum-javascript-sdk-integration
[4]: https://docs.datadoghq.com/ja/help/