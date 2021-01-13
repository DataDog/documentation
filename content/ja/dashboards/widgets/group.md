---
title: グループウィジェット
kind: documentation
description: 複数のウィジェットを 1 つのタイムボードにグループ化する
aliases:
  - /ja/graphing/widgets/group/
further_reading:
  - link: /dashboards/timeboards/
    tag: ドキュメント
    text: Timeboards
  - link: /dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
---
グループウィジェットを使用すると、類似のグラフを[タイムボード][1]にまとめることができます。各グループにはカスタムヘッダーと 1 つ以上のグラフを含めることができ、折りたたみ可能です。

{{< img src="dashboards/widgets/group/group.mp4" alt="グループウィジェット" video="true"  >}}

## セットアップ

グループの右上隅にある歯車アイコンを使用して、グループの名前を選択します。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][2] ドキュメントをご参照ください。

変化ウィジェット専用の[ウィジェット JSON スキーマ定義][3]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/timeboard/
[2]: /ja/api/v1/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/