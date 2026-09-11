---
aliases:
- /ja/graphing/widgets/group/
description: ダッシュボードウィジェットでウィジェットをグループ化します。
further_reading:
- link: /ja/dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
title: グループウィジェット
widget_type: グループ
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

[1]: /ja/dashboards/#get-started
[2]: /ja/api/latest/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/