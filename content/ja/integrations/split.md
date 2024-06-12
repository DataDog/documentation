---
app_id: split
app_uuid: 690989fe-dca5-4394-b38a-86f9770dd470
assets:
  integration:
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: split.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Split
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Split
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- configuration & deployment
- notification
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/split/README.md
display_on_public_website: true
draft: false
git_integration_title: split
integration_id: split
integration_title: Split
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: split
public_title: Split
short_description: エンジニアリングチームや製品チームに実験用プラットフォームを提供。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::構成 & デプロイ
  - Category::通知
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: エンジニアリングチームや製品チームに実験用プラットフォームを提供。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Split
---



## 概要

[Split][1] は、[ロールアウトを制御して行う][2]ためのプラットフォームです。目的の機能を簡単かつ安全な方法で顧客に提供でき、ビジネスの規模に関係なく、極めて優れたユーザーエクスペリエンスを実現すると共にリスクを軽減します。

Split を Datadog と統合すると、以下のことができます。

- イベントストリームに Split の changelog を追加することで、機能の変更の前後関係を確認できます。
- 機能の影響をアプリケーションのパフォーマンスと関連付けることができます。
- 重要な問題が発生する前にそれを回避できます。Datadog のメトリクスとアラートに基づいて、機能を事前に無効にできます。
- RUM データを Split 機能フラグで強化し、パフォーマンス監視や動作変化の可視化を実現

## セットアップ

- **Datadog で**: API キー <span class="hidden-api-key">\${api_key}</span>を作成

- **Split で**: **Admin Settings** で **Integrations** をクリックし、Marketplace に移動します。Datadog の横にある Add をクリックします。<br/>

![Split のスクリーンショット][3]

- Datadog API キーを貼り付け、Save をクリックします。

![Split のスクリーンショット][4]

Split のデータが Datadog に届きます。

### 機能フラグ追跡インテグレーション
Split の機能フラグ追跡インテグレーションは、RUM データを機能フラグで強化し、パフォーマンスの監視と行動の変化を可視化します。どのユーザーにユーザーエクスペリエンスが表示され、それがユーザーのパフォーマンスに悪影響を及ぼしているかどうかを判断します。

機能フラグ追跡は、RUM ブラウザ SDK で利用可能です。詳細なセットアップ方法は、[RUM での機能フラグデータの概要][5]ガイドをご覧ください。

1. ブラウザ RUM SDK バージョンを 4.25.0 以上に更新します。
2. RUM SDK を初期化し、`["feature_flags"]` で `enableExperimentalFeatures` 初期化パラメーターを構成します。
3. Split の SDK を初期化し、次のコードのスニペットを使用して Datadog に機能フラグの評価を報告するインプレッションリスナーを作成します

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

## 収集データ

### メトリクス

Split チェックには、メトリクスは含まれません。

### イベント

Split リスト/リスト除外イベントを [Datadog のイベントストリーム][6]にプッシュします。

### サービスのチェック

Split チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

[1]: http://www.split.io
[2]: http://www.split.io/articles/controlled-rollout
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/split/images/in-split.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/split/images/integrations-datadog.png
[5]: https://docs.datadoghq.com/ja/real_user_monitoring/guide/setup-feature-flag-data-collection/
[6]: https://docs.datadoghq.com/ja/events/
[7]: https://docs.datadoghq.com/ja/help/