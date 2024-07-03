---
aliases:
- /ja/graphing/widgets/hostmap/
description: Display the Datadog host map in your dashboards.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Building Dashboards using JSON
title: Host Map Widget
widget_type: hostmap
---

ホストマップウィジェットは、メインの[ホストマップ][1]ページから利用できる同じ視覚化機能を使用して、ホスト全体のあらゆるメトリクスをグラフ化します。

{{< img src="dashboards/widgets/hostmap/hostmap.png" alt="ホストマップ" >}}

## セットアップ

{{< img src="dashboards/widgets/hostmap/hostmap_setup.png" alt="ホストマップの設定" >}}

### 構成

ホストマップウィジェットの構成は、メインの[ホストマップ][1]ページに似ています。

1. **Type**: `hosts` と `containers` のどちらを表示するかを選択します。
2. **Filter by**: 表示するホストまたはコンテナを選択します。
3. **Group by**: ホストまたはコンテナを 1 つまたは複数のタグで集計します。
4. **Fill by**: ホストまたはコンテナマップの要素を塗りつぶすメトリクスを選択します。
5. **Size by** (オプション): ホストまたはコンテナマップの要素のサイズを決定するメトリクスを選択します。
6. **Palette** (オプション): カラーパレットを選択します。
7. **Values** (オプション): カラーパレットの塗りつぶしの最小および最大値を定義します。

**注**: ホストマップウィジェットではフリーテキスト検索は使用できません。

### オプション

#### コンテキストリンク

[コンテキストリンク][2]はデフォルトで有効になっていますが、有効/無効を切り替えることができます。コンテキストリンクは、ダッシュボードウィジェットと他のページ (Datadog 内またはサードパーティ) を接続します。

## API

このウィジェットは **[Dashboards API][3]** で使用できます。[ウィジェット JSON スキーマ定義][4]については、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/infrastructure/hostmap/
[2]: /ja/dashboards/guide/context-links/
[3]: /ja/api/latest/dashboards/
[4]: /ja/dashboards/graphing_json/widget_json/