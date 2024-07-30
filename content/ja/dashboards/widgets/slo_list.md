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
---

SLO リストウィジェットは、[SLO][1] のサブセットを主要タイムウィンドウに表示します。その他の構成されたタイムウィンドウはすべて、SLO ページの SLO のサイドパネルで利用できます。

{{< img src="dashboards/widgets/slo_list/slo_list_widget_v2.png" alt="SLO の一覧を表示する SLO リストウィジェット" style="width:90%;" >}}

## セットアップ

{{< img src="dashboards/widgets/slo_list/slo_list_editor_v2.png" alt="SLO リストウィジェットエディタでサービスを Web ストアとして定義する検索クエリ" style="width:90%;" >}}

### コンフィギュレーション

1. ダッシュボードに SLO リストウィジェットを追加します。
2. タグを使用して、SLO の一覧をフィルターします (`service:foo, env:prod` など)。テンプレート変数がサポートされています。
3. 表示する SLO の最大数 (デフォルトは 100) を選択し、ステータスまたはエラーバジェットのいずれかでソートします。
4. オプションでウィジェットのタイトルを指定します。

ウィジェットを作成する準備ができたら、**Save** をクリックします。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][2] ドキュメントをご参照ください。

SLO リストウィジェットの[ウィジェット JSON スキーマ定義][3]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/service_management/service_level_objectives/
[2]: /ja/api/v1/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/