---
aliases: null
description: SLO の一覧を表示する
further_reading:
- link: https://www.datadoghq.com/blog/slo-monitoring-tracking/
  tag: GitHub
  text: Datadog ですべての SLO のステータスを追跡する
- link: /ja/dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
title: SLO リストウィジェット
widget_type: slo_list
---

SLOs (service-level objectives) are an agreed-upon target that must be achieved for each activity, function, and process to provide the best opportunity for customer success. SLOs represent the performance or health of a service.

The SLO List widget displays a subset of SLOs over their primary time window. All other configured time windows are available in the SLO's side panel on the SLO page. For more information, see the [SLO][1] documentation.

{{< img src="dashboards/widgets/slo_list/slo-list-widget-latest.png" alt="The SLO List widget displaying a list of SLOs" style="width:90%;" >}}

## セットアップ

{{< img src="dashboards/widgets/slo_list/slo-list-widget-editor-latest.png" alt="A search query defining the service as web-store in the SLO List widget editor" style="width:90%;" >}}

### 構成

1. ダッシュボードに SLO リストウィジェットを追加します。
2. タグを使用して、SLO の一覧をフィルターします (`service:foo, env:prod` など)。テンプレート変数がサポートされています。
3. 表示する SLO の最大数 (デフォルトは 100) を選択し、ステータスまたはエラーバジェットのいずれかでソートします。
4. オプションでウィジェットのタイトルを指定します。

ウィジェットを作成する準備ができたら、**Save** をクリックします。

## API

このウィジェットは **[Dashboards API][2]** で使用できます。[ウィジェット JSON スキーマ定義][3]については、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/service_management/service_level_objectives/
[2]: /ja/api/latest/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/