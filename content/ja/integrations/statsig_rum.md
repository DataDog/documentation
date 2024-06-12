---
app_id: statsig-rum
app_uuid: 86a69c7d-8042-4f93-96b1-f139b2058644
assets:
  dashboards:
    statsig_rum: assets/dashboards/statsig_rum_overview.json
author:
  homepage: https://statsig.com
  name: Statsig
  sales_email: support@statsig.com
  support_email: support@statsig.com
categories:
- 構成とデプロイ
- 開発ツール
- イベント管理
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/statsig_rum/README.md
display_on_public_website: true
draft: false
git_integration_title: statsig_rum
integration_id: statsig-rum
integration_title: Statsig - RUM
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: statsig_rum
public_title: Statsig - RUM
short_description: Datadog の RUM データを Statsig の機能ゲート情報でリッチ化
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
  - Submitted Data Type::Traces
  configuration: README.md#Setup
  description: Datadog の RUM データを Statsig の機能ゲート情報でリッチ化
  media:
  - caption: ユーザーセッションの検査と有効化された機能ゲートを表示する Datadog のダッシュボード
    image_url: images/dd-view-1.jpg
    media_type: image
  - caption: すべてのゲートと各ゲートに割り当てられたユーザーボリュームの概要を表示する Datadog ダッシュボード
    image_url: images/dd-view-2.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Statsig - RUM
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 概要

Statsig の機能フラグ追跡インテグレーションは、Datadog RUM データに機能ゲート情報を追加し、製品機能とシステムおよびパフォーマンスメトリクスの因果関係を測定することができます。

## 計画と使用

### 機能フラグ追跡の設定

機能フラグ追跡は、RUM ブラウザ SDK で利用可能です。詳細なセットアップ方法は、[RUM での機能フラグデータの概要][1]をご覧ください。

1. ブラウザ RUM SDK バージョンを 4.25.0 以上に更新します。
2. RUM SDK を初期化し、`["feature_flags"]` で `enableExperimentalFeatures` 初期化パラメーターを構成します。
3. Statsig の SDK (`>= v4.34.0`) を初期化し、以下のように `gateEvaluationCallback` オプションを実装します。

```js
await statsig.initialize('client-<STATSIG CLIENT KEY>',
  {userID: '<USER ID>'},
  {     
    gateEvaluationCallback: (key, value) => {
      datadogRum.addFeatureFlagEvaluation(key, value);
    }
  }
); 
```

## サポート

[Statsig Slack コミュニティ][2]に参加して、このインテグレーションを有効にするためのサポートを受けてください。[1]: https://docs.datadoghq.com/real_user_monitoring/guide/setup-feature-flag-data-collection
[2]: https://join.slack.com/t/statsigcommunity/shared_invite/zt-pbp005hg-VFQOutZhMw5Vu9eWvCro9g