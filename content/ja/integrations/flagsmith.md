---
app_id: flagsmith
app_uuid: 0ad66873-2958-4ca5-ae25-ee893b4c6e31
assets:
  integration:
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: flagsmith.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Flagsmith
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Flagsmith
  sales_email: support@flagsmith.com
  support_email: support@flagsmith.com
categories:
- notification
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/flagsmith/README.md
display_on_public_website: true
draft: false
git_integration_title: flagsmith
integration_id: flagsmith
integration_title: Flagsmith
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: flagsmith
oauth: {}
public_title: Flagsmith
short_description: Flagsmith のフラグ変更イベントが Datadog に表示されます
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
  - Category::Notification
  configuration: README.md#Setup
  description: Flagsmith のフラグ変更イベントが Datadog に表示されます
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Flagsmith
---



{{< callout url="#" btn_hidden="true" header="機能フラグ追跡のベータ版に参加しよう！">}}
Flagsmith 機能フラグで RUM データを補強し、パフォーマンス監視や行動の変化を可視化するには、<a href="https://docs.datadoghq.com/real_user_monitoring/guide/setup-feature-flag-data-collection/">機能フラグ追跡</a>の非公開ベータ版に参加しましょう。アクセス権をリクエストするには、Datadog サポート (support@datadoghq.com) までご連絡ください。

{{< /callout >}}

## 概要

[Flagsmith][1] は、Web、モバイル、およびサーバー側のアプリケーション全体の機能管理を容易にします。Datadog Flagsmith インテグレーションにより、Datadog 内でフラグの変更に関する情報を直接表示できるようになります。

Flagsmith は、Datadog と以下のインテグレーションを提供しています。

### イベントインテグレーション

すべてのフラグ変更イベントは Datadog に送信されます。これらのイベントは、変更された環境でタグ付けされています。

### 機能フラグ追跡インテグレーション

Flagsmith の機能フラグ追跡インテグレーションは、RUM データを機能フラグで強化し、パフォーマンスの監視と行動の変化を可視化します。どのユーザーにユーザーエクスペリエンスが表示され、それがユーザーのパフォーマンスに悪影響を及ぼしているかどうかを判断します。

## セットアップ

[Flagsmith ダッシュボード][2]の Integrations Menu を選択し、Datadog Integration を追加します。[Datadog API キー][3]を入力します。Base URL には、US Datadog サイトを使用している場合は `https://api.datadoghq.com`、EU Datadog サイトを使用している場合は `https://api.datadoghq.eu` を入力します。

### 機能フラグの追跡設定

機能フラグ追跡は、RUM ブラウザ SDK で利用可能です。詳細なセットアップ方法は、[RUM での機能フラグデータの概要][4]ガイドをご覧ください。

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

## 収集データ

### メトリクス

Flagsmith インテグレーションには、メトリクスは含まれません。

### サービスのチェック

Flagsmith インテグレーションには、サービスのチェック機能は含まれません。

### イベント

すべての Flagsmith イベントが Datadog のイベントストリームに送信されます。

## トラブルシューティング

サポートが必要な場合は、 [Flagsmith のドキュメント][5]をご覧いただくか、[Datadog サポート][6]までお問い合わせください。

[1]: https://www.flagsmith.com/
[2]: https://app.flagsmith.com/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.datadoghq.com/ja/real_user_monitoring/guide/setup-feature-flag-data-collection/
[5]: https://docs.flagsmith.com/integrations/datadog/
[6]: https://docs.datadoghq.com/ja/help/