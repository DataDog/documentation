---
"assets":
  "dashboards": {}
  "monitors": {}
  "service_checks": /assets/service_checks.json
"categories":
- モニター
"creates_events": !!bool "true"
"ddtype": check
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/rigor/README.md"
"display_name": Rigor
"git_integration_title": rigor
"guid": f51704ed-a327-4132-9f04-a25a47791693
"integration_id": rigor
"integration_title": Rigor
"is_public": !!bool "true"
"kind": インテグレーション
"maintainer": support@rigor.com
"manifest_version": 1.0.0
"metric_prefix": rigor.
"name": rigor
"public_title": Datadog-Rigor インテグレーション
"short_description": Rigor は、開発ライフサイクル全体の総合的な監視および最適化を提供
"support": contrib
"supported_os":
- linux
- mac_os
- windows
---

## 概要
Rigor は、開発ライフサイクル全体の総合的な監視および最適化を提供します。


![timeboard][1]

Rigor を使用すると、総合的なフロントエンドパフォーマンスメトリクスを収集して Datadog にプッシュできます。
  アラートをイベントとして Datadog にプッシュすることもできます。

## セットアップ

Rigor と Datadog とのインテグレーションには、メトリクスインテグレーションとイベントインテグレーションの 2 種類があります。


### メトリクスインテグレーションの構成
管理者として、画面の右上にある "Admin Tools" メニューをクリックし、
"Integrations" を選択します。

![admin-menu][2]

"New" ボタンをクリックして、新しいインテグレーションを追加します。これで、
インテグレーションを構成できます。

![push-configuration][3]

このインテグレーションの一意の名前と Datadog の API キーを追加します。
次に、送信するタグとメトリクスを選択します。以下の点に注意してください。
- デフォルトのタグとして、正規化されたチェック名を含めます。
- 複数手順のチェック (Real Browser チェックと API チェック) には、
  メトリクスの送信元になるリクエストの場所を含めます。
- アップタイムチェックには、HTTP、ポート、および API のチェックが含まれます。
- ポートチェックは、「応答時間」メトリクスのみを報告します。
- すべてのブラウザがすべてのメトリクスをサポートするわけではありません。

Real Browser チェックで [User Timings API][4] からタイミングを
報告する場合は、
"Send All User Timings?" を選択します。すべてのマークは
`rigor.real_browser.marks` ネームスペース下に報告され、メジャーは
`rigor.real_browser.measures` ネームスペース下に報告されます。このオプションを選択すると、
特にテストしているサイトに対してマークとメジャーが動的に生成される場合は、
新しい系列が Datadog に多数送信される可能性があることに注意してください。

インテグレーションを構成したら、任意の Real Browser、HTTP、ポート、
または API チェックに追加できます。チェックを編集し、"Notifications" タブに移動します。ここで、今作成した
インテグレーションを追加できます。

![add-integration-to-check][5]


### イベントインテグレーションの構成
管理者として、画面の右上にある "Admin Tools" メニューをクリックし、
"Alert Webhooks" を選択します。

![webhook-menu][6]

"New" ボタンをクリックし、Datadog タイルをクリックして、新しいインテグレーションを追加します。

![webhooks-chooser][7]

この Webhook の新しい名前を追加し、Datadog API キーを使用してトリガーを更新します。


![webhooks-configuration][8]

インテグレーションを構成したら、任意の Real Browser、HTTP、ポート、
または API チェックに追加できます。チェックを編集し、"Notifications" タブに移動します。ここで、今作成した
Webhook を追加できます。

![add-webhookto-check][9]

## 収集データ

### メトリクス

Rigor の任意のメトリクスを Datadog に送信できます。実際に送信されるメトリクスは、
インテグレーションの構成方法によって異なります。以下のメトリクスがあります。

#### HTTP チェック
- `rigor.http.dns_time`
- `rigor.http.first_byte_time`
- `rigor.http.response_time`

#### ポートチェック
- `rigor.port.response_time`

#### API チェック
- `rigor.api.dns_time`
- `rigor.api.first_byte_time`
- `rigor.api.response_time`

#### Real Browser Checks
- `rigor.real_browser.first_byte_time_ms`
- `rigor.real_browser.dom_interactive_time_ms`
- `rigor.real_browser.first_paint_time_ms`
- `rigor.real_browser.start_render_ms`
- `rigor.real_browser.first_contentful_paint_time_ms`
- `rigor.real_browser.first_meaningful_paint_time_ms`
- `rigor.real_browser.dom_load_time_ms`
- `rigor.real_browser.dom_complete_time_ms`
- `rigor.real_browser.onload_time_ms`
- `rigor.real_browser.visually_complete_ms`
- `rigor.real_browser.speed_index`
- `rigor.real_browser.fully_loaded_time_ms`
- `rigor.real_browser.requests`
- `rigor.real_browser.content_bytes`
- `rigor.real_browser.html_files`
- `rigor.real_browser.html_bytes`
- `rigor.real_browser.image_files`
- `rigor.real_browser.image_bytes`
- `rigor.real_browser.javascript_files`
- `rigor.real_browser.javascript_bytes`
- `rigor.real_browser.css_files`
- `rigor.real_browser.css_bytes`
- `rigor.real_browser.video_files`
- `rigor.real_browser.video_bytes`
- `rigor.real_browser.font_files`
- `rigor.real_browser.font_bytes`
- `rigor.real_browser.other_files`
- `rigor.real_browser.other_bytes`
- `rigor.real_browser.client_errors`
- `rigor.real_browser.connection_errors`
- `rigor.real_browser.server_errors`
- `rigor.real_browser.errors`

さらに、インテグレーションを構成すると、ブラウザの User Timings が 
`rigor.real_browser.marks` ネームスペースおよび `rigor.real_browser.measures` ネームスペース下に送信されます。

### イベント

Datadog イベントを介してアラートするようにチェックが構成されている場合は、次の 2 種類のイベントが Datadog にプッシュされます。

- **Failed** - しきい値を超過してチェックが失敗し、アラートが送信された場合
  アラート
- **Back online** - アラート中にチェックが正しく実行された場合

![events-example][10]

### サービスのチェック

このインテグレーションには、サービスのチェック機能は含まれません。

### トラブルシューティング
ご不明な点は、[Rigor のサポートチーム][11]までお問合せください。

### その他の参考資料
Rigor の詳細および Datadog を活用して Web サイトを高速化する方法については、[rigor][12] を参照してください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/rigor/rigor/images/rigor_timeboard_with_metrics.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/rigor/rigor/images/rigor_admin_menu.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/rigor/rigor/images/rigor_integration_configuration.png
[4]: https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/rigor/rigor/images/rigor_add_integration_to_check.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/rigor/rigor/images/rigor_webhooks_menu.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/rigor/rigor/images/rigor_webhooks_chooser.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/rigor/rigor/images/rigor_webhooks_configuration.png
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/rigor/rigor/images/rigor_add_webhook_to_check.png
[10]: https://raw.githubusercontent.com/DataDog/integrations-extras/rigor/rigor/images/rigor_events_example.png
[11]: mailto:support@rigor.com
[12]: https://rigor.com



