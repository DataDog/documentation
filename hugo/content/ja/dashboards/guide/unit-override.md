---
algolia:
  tags:
  - 単位のオーバーライド
  - カスタム単位
disable_toc: false
further_reading:
- link: metrics/units/
  tag: ドキュメント
  text: メトリクス単位
- link: logs/explorer/facets/#units
  tag: ドキュメント
  text: イベント単位
- link: dashboards/widgets/
  tag: ドキュメント
  text: ウィジェットのリスト
title: 単位のオーバーライドで視覚化をカスタマイズする
---

## 概要

視覚化の単位オーバーライド機能により、データのラベル表示をカスタマイズできます。このガイドでは、単位オーバーライドの構成オプションと、それらがグラフの分析にどのように役立つかを説明します。

**注**: このガイドの多くの例では [Table ウィジェット][1]を使用していますが、単位オーバーライドはこのウィジェットに限定されません。

{{< whatsnext desc="組織レベルで単位を設定するには、以下のドキュメントを参照してください。">}}
{{< nextlink href="/metrics/units">}} メトリクスの単位を設定する{{< /nextlink >}}
{{< nextlink href="/logs/explorer/facets/#units">}} イベントベースのクエリに単位を設定する{{< /nextlink >}}
{{< /whatsnext >}}

## 構成

Notebook や Dashboard ウィジェットで、セルまたはウィジェットのグラフエディタを見つけます。Notebook の場合は、**More Options** をクリックし、Dashboard の場合は **Graph your data** セクションを見つけます。

{{< img src="dashboards/guide/unit_override/unit_override_config.png" alt="Change ウィジェットの Graph your data セクションにある Unit override オプション" style="width:100%;" >}}

## 単位とスケールの割り当ての仕組み

単位が検出されると、Datadog はデータの大きさに応じて最も読みやすい単位スケールを自動的に選択します。例えば、ソースデータがナノ秒の場合、ウィジェットは数百万ナノ秒の代わりに、分や秒で読みやすい値を表示できます。

{{< img src="dashboards/guide/unit_override/unit_override_with_autoscale.png" alt="Autoscale unit が有効になっている単位オーバーライド構成とともに、分と秒にスケールされた値を表示する Table ウィジェット" style="width:100%;" >}}

単位オーバーライドを使用すると、値を比較するために単一の固定スケールを選択できます。以下の例では、すべての値が `minutes` にスケールするように構成されています。これは、同じスケールで値を直接比較するためです。

{{< img src="dashboards/guide/unit_override/unit_override_without_autoscale.png" alt="Autoscale unit が無効になっている単位オーバーライド構成とともに、すべての値が分にスケールされた Table ウィジェット" style="width:100%;" >}}

## カスタム単位の割り当て

カスタム単位をウィジェットに割り当てて、(カウントなどの) 単位のないメトリクスにコンテキストを追加します。

{{< img src="dashboards/guide/unit_override/custom_unit_tests.png" alt="カスタム単位を割り当てるための Unit ドロップダウンメニューをハイライトした単位オーバーライド構成" style="width:100%;" >}}

単位リストに含まれていない、完全にカスタムな単位を定義します。一般的なイベントのカウントではなく、10,000 件のテストや 100 件のセッションを表示していることを指定できます。これにより、分析しているデータの内容が即座に理解できるようになります。

**注**: 単位ファミリーが認識されないため、カスタム単位では自動スケーリングは利用できません。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/dashboards/widgets/table/