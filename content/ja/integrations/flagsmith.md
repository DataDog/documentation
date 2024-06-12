---
app_id: flagsmith
app_uuid: 0ad66873-2958-4ca5-ae25-ee893b4c6e31
assets:
  dashboards:
    Flagsmith Dashboard: assets/dashboards/flagsmith-dashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: flagsmith.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10137
    source_type_name: Flagsmith
author:
  homepage: https://flagsmith.com/
  name: Flagsmith
  sales_email: support@flagsmith.com
  support_email: support@flagsmith.com
categories:
- 問題追跡
- developer tools
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/flagsmith/README.md
display_on_public_website: true
draft: false
git_integration_title: flagsmith
integration_id: flagsmith
integration_title: Flagsmith
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: flagsmith
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
  - Category::Issue Tracking
  - Category::Developer Tools
  - Offering::UI Extension
  - Offering::Integration
  configuration: README.md#Setup
  description: Flagsmith のフラグ変更イベントが Datadog に表示されます
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Flagsmith
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Flagsmith][1] は、Web、モバイル、およびサーバー側のアプリケーション全体の機能管理を容易にします。Datadog Flagsmith インテグレーションにより、Datadog 内でフラグの変更に関する情報を直接表示できるようになります。

Flagsmith は、Datadog と以下のインテグレーションを提供しています。

### イベントインテグレーション

すべてのフラグ変更イベントは Datadog に送信されます。これらのイベントは、変更された環境でタグ付けされています。

### ダッシュボードウィジェット

Flagsmith のダッシュボードウィジェットを使用すると、Flagsmith のフラグと監査ログを Datadog で直接確認することができます。

## 計画と使用

[Flagsmith ダッシュボード][2]の Integrations Menu を選択し、Datadog Integration を追加します。[Datadog API キー][3]を入力します。Base URL には、US Datadog サイトを使用している場合は `https://api.datadoghq.com`、EU Datadog サイトを使用している場合は `https://api.datadoghq.eu` を入力します。

### Flagsmith ダッシュボードウィジェット

1. [Flagsmith インテグレーションタイル][4]で、Flagsmith インテグレーションがインストールされていることを確認します。
1. Datadog で確認したいアカウントで Flagsmith にログインしていることを確認します。
1. Datadog で、既存のダッシュボードに移動するか、新しいダッシュボードを作成します。
1. **Add Widgets** ボタンを押すと、ウィジェットドローワが表示されます。
1. **Flagsmith** と検索すると、ウィジェットドローワの **Apps** セクションに Flagsmith ウィジェットが見つかります。
1. **Flagsmith ウィジェットアイコン**を選択すると、ダッシュボードに追加され、**Flagsmith エディタ**モーダルが表示されます。Flag または監査ログビューアウィジェットのいずれかを選択して追加することができます。
1. ダッシュボードに追加したい Flagsmith Organisation、Project、Environment を選択します。
1. 選択したら、**Project ID** と **Environment ID** をコピーして Datadog に貼り付けます。
1. ページサイズと、オプションでフィルターにかけるウィジェットタイトルと Flagsmith Tag を選択します。
1. **Save** をクリックして、ダッシュボードウィジェットの構成を完了します。

## リアルユーザーモニタリング

### データセキュリティ

Flagsmith インテグレーションには、メトリクスは含まれません。

### ヘルプ

Flagsmith インテグレーションには、サービスのチェック機能は含まれません。

### ヘルプ

すべての Flagsmith イベントが Datadog のイベントストリームに送信されます。

## ヘルプ

サポートが必要な場合は、 [Flagsmith のドキュメント][5]をご覧いただくか、[Datadog サポート][6]までお問い合わせください。

[1]: https://www.flagsmith.com/
[2]: https://app.flagsmith.com/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/integrations/flagsmith
[5]: https://docs.flagsmith.com/integrations/datadog/
[6]: https://docs.datadoghq.com/ja/help/