---
title: ホストマップウィジェット
kind: documentation
description: Datadog のホストマップをダッシュボードに表示する
aliases:
  - /ja/graphing/widgets/hostmap/
further_reading:
  - link: /dashboards/timeboards/
    tag: ドキュメント
    text: Timeboards
  - link: /dashboards/screenboards/
    tag: ドキュメント
    text: スクリーンボード
  - link: /dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
---
ホストマップウィジェットは、メインの[ホストマップ][1]ページから利用できる同じ視覚化機能を使用して、ホスト全体のあらゆるメトリクスをグラフ化します。

{{< img src="dashboards/widgets/hostmap/hostmap.png" alt="ホストマップ"  >}}

## セットアップ

{{< img src="dashboards/widgets/hostmap/hostmap_setup.png" alt="ホストマップの設定"  >}}

### コンフィギュレーション

ホストマップウィジェットの構成は、メインの[ホストマップページ][1]に似ています。

1. **Type**: `hosts` と `containers` のどちらを表示するかを選択します。
2. **Filter by**: 表示するホストまたはコンテナを選択します。
3. **Group by**: ホストまたはコンテナを 1 つまたは複数のタグで集計します。
4. **Fill by**: ホストまたはコンテナマップの要素を塗りつぶすメトリクスを選択します。
5. **Size by** (オプション): ホストまたはコンテナマップの要素のサイズを決定するメトリクスを選択します。
6. **Palette** (オプション): カラーパレットを選択します。
7. **Values** (オプション): カラーパレットの塗りつぶしの最小および最大値を定義します。

**注**: ホストマップウィジェットではフリーテキスト検索は使用できません。

### オプション

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="dashboards/widgets/options/title.png" alt="ウィジェットのタイトル"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][2] ドキュメントをご参照ください。

ホストマップウィジェットの[ウィジェット JSON スキーマ定義][3]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/infrastructure/hostmap/
[2]: /ja/api/v1/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/