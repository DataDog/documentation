---
title: Metrics without Limits™ 入門
kind: ガイド
is_beta: true
---
<div class="alert alert-warning">この機能は非公開ベータ版です。</div>

## 概要

このガイドでは、初めて Metrics without Limits™ を使うユーザーが、この機能をすばやく活用するための方法について説明します。

1. [Metrics without Limits™ の FAQ][1] をご覧ください。

2. Create Tag Configuration API を使用している場合は、上記の API を使用してタグコンフィギュレーションを作成する前に、まず [tag configuration cardinality estimator API][2] を使用してタグコンフィギュレーションの潜在的な影響を検証してください。

   UI または Estimator API が、[取り込みよりも大きい](#why-is-my-indexed-volume-greater-than-ingested-volume)インデックスの結果の数を返す場合は、タグコンフィギュレーションを保存しないでください。

3. Usage ページ、または [API を使用][3]して上位 20 のメトリクスを構成します。

   複数のメトリクスのタグをすばやく構成するには、一括メトリクスコンフィギュレーション (`*` 構文) を使用できます。

   {{< img src="metrics/guide/bulk-tag-configuration.gif" alt="一括タグコンフィギュレーションの適用"  style="width:80%;" >}}

   Datadog は、一括コンフィギュレーションジョブが完了すると通知します。

### その他のヒント

リアルタイムの[推定カスタムメトリクス使用量][4]メトリクスにアラートを設定して、カスタムメトリクスのスパイクをコンフィギュレーションと関連付けることができます。


Metrics without Limits™ 用の[ロールベースのアクセス制御][5]を使用して、課金に影響するこの機能を使用するアクセス許可を持つユーザーを制御することもできます。


監査イベントを使用すると、カスタムメトリクスのスパイクと相関する可能性のある、作成されたタグコンフィギュレーションまたはパーセンタイル集計を追跡できます。“queryable tag configuration” または “percentile aggregations” を検索します。

### インデックス化されたボリュームが取り込まれたボリュームよりも大きいのはなぜですか？

これはバグではありません。現在提案されているタグコンフィギュレーションでは、Metrics without Limits™ の設計方法の影響を相殺するのに十分なほどメトリクスのカーディナリティが低下しません。

* カウント、ゲージ、またはレートメトリクスが Metrics without Limits™ で**構成されていない**場合、Datadog はクエリ時に適切な生データを分類および集計して、数学的に正確な結果を提供できます。


* カウント、ゲージ、またはレートメトリクスが Metrics without Limits™ で**構成されている**場合、指定されたタグコンフィギュレーションの場合、クエリの結果と値の精度を維持するために、クエリ時間の前に元の生データを再結合して集計する必要があります。

このため、Datadog は、タグコンフィギュレーションによって定義された残りのタグ値の組み合わせごとに、6 つの異なる時間/空間集計 (以下にチェックマークを付けて表示) を格納します。[メトリクスの構造][6]のドキュメントを参照して、時間/空間集計とは何か、およびそれがどのように機能するかを確認してください。
  |           | 平均時間  | 合計時間  | 最小時間  | 最大時間  |
  |-----------|-----------|-----------|-----------|-----------|
  | 平均空間 | {{< X >}} | {{< X >}} |           |           |
  | 合計空間 | {{< X >}} | {{< X >}} |           |           |
  | 最小空間 | {{< X >}} |           |           |           |
  | 最大空間 | {{< X >}} |           |           |           |

クエリに必要な組み合わせにチェックマークが付いていない場合は、この特定のメトリクスを Metrics without Limits™ で構成しないことをお勧めします。

したがって、指定されたタグの組み合わせによって 6 倍の係数を相殺するのに十分なほど残りのタグ値の組み合わせの数が減らない場合は、結果のインデックス化されたカスタムメトリクスボリュームを取り込まれたカスタムメトリクスボリュームよりも大きくすることができます。

ゲージメトリクスの 4 つのタグ値の組み合わせ、つまり **4 つのカスタムメトリクス**で開始した場合に、取り込みよりも大きいインデックスが発生する可能性がある簡単な例を次に示します。

{{< img src="metrics/guide/before-mwl.jpg" alt="2 つのホストからの 4 つのカスタムメトリクスを含むフローチャート"  style="width:80%;" >}}

Metrics without Limits™ を使って `{endpoint, status}` で構成する場合: 

{{< img src="metrics/guide/after-mwl.jpg" alt="x でマークされたホストを含むフローチャート"  style="width:80%;" >}}

ホストがないと、残りの 3 つのタグの組み合わせが残ります。

1. `{endpoint:x, status:200}`
2. `{endpoint:x, status:400}`
3. `{endpoint:y, status:200}`

ただし、これら 3 つの組み合わせのそれぞれについて、Metrics without Limits™ は 6 つの事前に集計された値を格納するため、**合計 18 のカスタムメトリクス**になります。したがって、未構成のままにすると、メトリクス数は少なくなります。


[1]: /ja/metrics/faq/metrics-without-limits/
[2]: /ja/metrics/guide/tag-configuration-cardinality-estimation-tool/
[3]: /ja/api/latest/metrics/#create-a-tag-configuration
[4]: /ja/account_management/billing/usage_metrics/
[5]: /ja/account_management/rbac/permissions/?tab=ui#metrics
[6]: /ja/metrics/#time-and-space-aggregation