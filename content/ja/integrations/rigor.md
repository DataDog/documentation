---
"assets":
  "dashboards": {}
  "metrics_metadata": metadata.csv
  "monitors": {}
  "service_checks": assets/service_checks.json
"categories":
- モニター
"creates_events": true
"ddtype": "crawler"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/rigor/README.md"
"display_name": "Rigor"
"draft": false
"git_integration_title": "rigor"
"guid": "f51704ed-a327-4132-9f04-a25a47791693"
"integration_id": "rigor"
"integration_title": "Rigor"
"is_public": true
"kind": "インテグレーション"
"maintainer": "support@rigor.com"
"manifest_version": "1.0.0"
"metric_prefix": "rigor."
"metric_to_check": "rigor.http.dns_time"
"name": "rigor"
"public_title": "Datadog-Rigor インテグレーション"
"short_description": "Rigor は、開発ライフサイクル全体の総合的な監視および最適化を提供"
"support": "contrib"
"supported_os":
- linux
- mac_os
- windows
---

## 概要

Rigor により、開発ライフサイクル全体で総合的な監視と最適化を実施できます。

![timeboard][1]

Rigor を使用すると、総合的なフロントエンドパフォーマンスメトリクスを収集して、そのメトリクスを Datadog にプッシュできます。アラートをイベントとして Datadog にプッシュすることもできます。

## セットアップ

Rigor と Datadog とのインテグレーションには、メトリクスインテグレーションとイベントインテグレーションの 2 種類があります。

### コンフィギュレーション
#### メトリクスの収集

管理者として、画面右上の "Admin Tools" メニューをクリックし、"Integrations" を選択します。

![admin-menu][2]

"New" ボタンをクリックして、新しいインテグレーションを追加します。これで、インテグレーションを構成できます。

![push-configuration][3]

このインテグレーションに一意の名前と Datadog の API キーを追加します。次に、送信するタグとメトリクスを選択します。以下の点に注意してください。

- デフォルトのタグとして、正規化されたチェック名を含めます。
- 複数手順のチェック (Real Browser チェックと API チェック) には、
  メトリクスの送信元になるリクエストの場所を含めます。
- アップタイムチェックには、HTTP、ポート、および API のチェックが含まれます。
- ポートチェックは、「応答時間」メトリクスのみを報告します。
- すべてのブラウザがすべてのメトリクスをサポートするわけではありません。

Real Browser チェックで [User Timings API][4] からタイミングを報告する場合は、必ず "Send All User Timings?" を選択します。マークは `rigor.real_browser.marks` ネームスペース配下に、メジャーは `rigor.real_browser.measures` ネームスペース配下に報告されます。このオプションを選択しており、特にテスト中のサイトでマークとメジャーが動的に生成される場合は、新しい系列が Datadog に多数送信されることがあることにご留意ください。

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

## 収集データ

### メトリクス
{{< get-metrics-from-git "rigor" >}}


### イベント

Datadog イベントを介してアラートするようにチェックが構成されている場合は、次の 2 種類のイベントが Datadog にプッシュされます。

- **Failed** - しきい値を超えるほどチェックが失敗すると、アラートが送信された場合
- **Back online** - アラート中にチェックが正しく実行された場合

![events-example][11]

### サービスのチェック

このインテグレーションには、サービスのチェック機能は含まれません。

### トラブルシューティング

ご不明な点は、[Rigor のサポートチーム][12]までお問合せください。

### その他の参考資料

Rigor の詳細および Datadog を活用して Web サイトを高速化する方法については、[rigor][13] を参照してください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_timeboard_with_metrics.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_admin_menu.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_integration_configuration.png
[4]: https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_add_integration_to_check.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_webhooks_menu.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_webhooks_chooser.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_webhooks_configuration.png
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_add_webhook_to_check.png
[10]: https://github.com/DataDog/integrations-core/blob/master/rigor/metadata.csv
[11]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_events_example.png
[12]: mailto:support@rigor.com
[13]: https://rigor.com

