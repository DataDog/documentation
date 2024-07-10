---
app_id: rigor
app_uuid: f9ab0c97-235c-4f88-8b92-89eb563e18ba
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: rigor.http.dns_time
      metadata_path: metadata.csv
      prefix: rigor.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10029
    source_type_name: Rigor
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Rigor
  sales_email: support@rigor.com
  support_email: support@rigor.com
categories:
- テスト
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rigor/README.md
display_on_public_website: true
draft: false
git_integration_title: rigor
integration_id: rigor
integration_title: Rigor
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: rigor
public_title: Rigor
short_description: Rigor は、開発ライフサイクル全体の総合的な監視および最適化を提供
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Testing
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Rigor は、開発ライフサイクル全体の総合的な監視および最適化を提供
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Rigor
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 概要

Rigor により、開発ライフサイクル全体で総合的な監視と最適化を実施できます。

![timeboard][1]

Rigor を使用すると、総合的なフロントエンドパフォーマンスメトリクスを収集して、そのメトリクスを Datadog にプッシュできます。アラートをイベントとして Datadog にプッシュすることもできます。

## 計画と使用

Rigor と Datadog とのインテグレーションには、メトリクスインテグレーションとイベントインテグレーションの 2 種類があります。

### ブラウザトラブルシューティング
#### メトリクスの収集

管理者として、画面右上の "Admin Tools" メニューをクリックし、"Integrations" を選択します。

![admin-menu][2]

"New" ボタンをクリックして新しいインテグレーションを追加すると、インテグレーションのコンフィギュレーションができるようになります。

![push-configuration][3]

このインテグレーションに一意の名前と Datadog の API キーを追加します。次に、送信するタグとメトリクスを選択します。以下の点に注意してください。

- デフォルトのタグとして、正規化されたチェック名が含まれています。
- マルチステップチェック (Real Browser および API チェック) には、メトリクスの送信元になるリクエストの場所が含まれます。
- アップタイムチェックには、HTTP、ポート、および API のチェックが含まれます。
- ポートチェックは、「応答時間」メトリクスのみを報告します。
- すべてのブラウザがすべてのメトリクスをサポートするわけではありません。

Real Browser チェックで [User Timings API][4] からタイミングを報告する場合は、必ず "Send All User Timings?" を選択します。マークは `rigor.real_browser.marks` ネームスペース配下に、メジャーは `rigor.real_browser.measures` ネームスペース配下に報告されます。**注**: このオプションを選択しており、特にテスト中のサイトでマークとメジャーが動的に生成される場合は、新しい系列が Datadog に多数送信されることがあります。

インテグレーションを構成したら、Real Browser、HTTP、ポート、または API チェックに追加できます。チェックを編集し、"Notifications" タブに移動します。ここで、今作成したインテグレーションを追加できます。

![add-integration-to-check][5]

#### イベント収集

管理者として、画面右上の "Admin Tools" メニューをクリックし、"Alert Webhooks" を選択します。

![webhook-menu][6]

"New" ボタンをクリックし、Datadog タイルをクリックして、新しいインテグレーションを追加します。

![webhooks-chooser][7]

この Webhook に一意の名前を追加し、必ず Datadog API キーを使用してトリガーを更新します。

![webhooks-configuration][8]

インテグレーションを構成したら、Real Browser、HTTP、ポート、または API チェックに追加できます。チェックを編集し、"Notifications" タブに移動します。ここで、今作成した webhook を追加できます。

![add-webhookto-check][9]

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "rigor" >}}


### ヘルプ

Datadog イベントを介してアラートを発生するようチェックが構成されている場合は、次の 2 種類のイベントタイプが Datadog にプッシュされます。

- **Failed** - しきい値を超えるほどチェックが失敗すると、アラートが送信された場合
- **Back online** - アラート中にチェックが正しく実行された場合

![events-example][11]

### ヘルプ

Rigor インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Rigor サポート][12]までお問合せください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_timeboard_with_metrics.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_admin_menu.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_integration_configuration.png
[4]: https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_add_integration_to_check.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_webhooks_menu.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_webhooks_chooser.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_webhooks_configuration.png
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_add_webhook_to_check.png
[10]: https://github.com/DataDog/integrations-extras/blob/master/rigor/metadata.csv
[11]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_events_example.png
[12]: mailto:support@rigor.com