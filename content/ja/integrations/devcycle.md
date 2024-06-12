---
app_id: devcycle
app_uuid: a550d328-e35d-445b-8d13-d12b2c7da5d2
assets: {}
author:
  homepage: https://devcycle.com
  name: DevCycle
  sales_email: sales@devcycle.com
  support_email: support@devcycle.com
categories:
- 構成 & デプロイ
- notifications
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/devcycle/README.md
display_on_public_website: true
draft: false
git_integration_title: devcycle
integration_id: devcycle
integration_title: DevCycle
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: devcycle
public_title: DevCycle
short_description: コード通りに動作する機能フラグ
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Notifications
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: コード通りに動作する機能フラグ
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: DevCycle
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

DevCycle は、Datadog と以下のインテグレーションを提供しています。

### 機能フラグ追跡インテグレーション

DevCycle の機能フラグ追跡インテグレーションは、RUM データを機能の変数評価で強化し、パフォーマンスの監視と行動の変化を可視化します。どのユーザーに特定のユーザーエクスペリエンスが表示され、それがユーザーのパフォーマンスに悪影響を及ぼしているかどうかを判断します。

## 計画と使用

### 機能フラグ追跡の設定

機能フラグ追跡は、RUM ブラウザ SDK で利用可能です。詳細なセットアップ方法は、[RUM での機能フラグデータの概要][1]ガイドをご覧ください。

1. ブラウザ RUM SDK バージョン 4.25.0 以上に更新します。
2. RUM SDK を初期化し、`["feature_flags"]` で `enableExperimentalFeatures` 初期化パラメーターを構成します。
3. DevCycle の SDK を初期化し、`variableEvaluated` イベントにサブスクライブして、サブスクリプションコールバック内から `addFeatureFlagEvaluation` を呼び出します。

```
// dvcClient を初期化します

const user = { user_id: "my_user" };
const dvcOptions = { logLevel: "debug" };
const dvcClient = initialize("<DVC_CLIENT_SDK_KEY>", user, dvcOptions); 

// すべての変数評価に対して

dvcClient.subscribe(
    "variableEvaluated:*",
    (key, variable) => {
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)

// 特定の変数の評価に対して

dvcClient.subscribe(
    "variableEvaluated:my-variable-key",
    (key, variable) => {
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)
```

## リアルユーザーモニタリング

### データセキュリティ

DevCycle インテグレーションには、メトリクスは含まれません。

### ヘルプ

DevCycle インテグレーションには、イベントは含まれません。

### ヘルプ

DevCycle インテグレーションには、サービスのチェック機能は含まれません。

## Agent

ご不明な点は、[Datadog のサポートチーム][2]までお問い合わせください。

## その他の参考資料

[DevCycle][3] と [DataDog RUM インテグレーション][4]の詳細をご覧ください。

[1]: https://docs.datadoghq.com/ja/real_user_monitoring/guide/setup-feature-flag-data-collection/
[2]: https://docs.datadoghq.com/ja/help/
[3]: https://devcycle.com
[4]: https://docs.devcycle.com/tools-and-integrations/datadog-rum