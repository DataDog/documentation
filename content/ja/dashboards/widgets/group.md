---
title: Group Widget
widget_type: group
description: "Group your widgets together in a dashboard widget."
aliases:
- /graphing/widgets/group/
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Building Dashboards using JSON
---

## 概要
<div class="alert alert-info">スクリーンボードウィジェットは、グループ内に配置することはできません。</a></div>

グループウィジェットを使用すると、類似のグラフをダッシュボードにまとめることができます。各グループにはカスタムヘッダーと 1 つ以上のグラフを含めることができ、折りたたみ可能です。グループを使用して、ダッシュボード上のウィジェットを整理します。

## セットアップ

1. ダッシュボードに複数のウィジェットを追加します。
2. クリックアンドドラッグ機能で複数のウィジェットを選択するか、Shift キーを押しながらクリックします。
3. **Group** オプションをクリックします。
  {{< img src="dashboards/widgets/group/widget-group-button.png" alt="複数のウィジェットを選択すると表示されるグループオプション" style="width:100%;" >}}
4. グループの右上にある鉛筆のアイコンをクリックして、名前を選択し、グループにスタイルを適用します。

## API
<div class="alert alert-info">スクリーンボードウィジェットは、グループ内に配置することはできません。</a></div>

このウィジェットは **[Dashboards API][2]** で使用できます。[ウィジェット JSON スキーマ定義][3]については、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/#get-started
[2]: /api/latest/dashboards/
[3]: /dashboards/graphing_json/widget_json/
