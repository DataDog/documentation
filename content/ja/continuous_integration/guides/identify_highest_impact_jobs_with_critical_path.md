---
description: CI パイプラインの所要時間を改善するため、クリティカル パス上にある CI ジョブの特定方法を学びます。
further_reading:
- link: /continuous_integration/search/#pipeline-details-and-executions
  tag: ドキュメント
  text: パイプライン実行を検索・管理する方法を学びます
- link: continuous_integration/search/#highlight-critical-path
  tag: ドキュメント
  text: パイプライン実行でクリティカル パスをハイライトする
title: パイプラインの所要時間を短縮するためにクリティカル パス上の CI ジョブを特定する
---

## 概要

このガイドでは、CI パイプライン全体の所要時間を短縮するために、どのジョブを優先すべきかを判断できるよう、クリティカル パス上にある CI ジョブの特定方法を解説します。

### CI パイプラインにおけるクリティカル パスの理解

CI パイプライン実行におけるクリティカル パスとは、そのパイプライン実行の総所要時間を決定する、最も長い CI ジョブの連なりです。本質的には、CI ジョブの依存関係グラフの中で、完了までに最も時間がかかる経路を指します。CI パイプライン実行の総所要時間を短縮するには、このクリティカル パス上の CI ジョブの所要時間を短縮する必要があります。

{{< img src="continuous_integration/critical_path_highlight_pipeline.png" alt="パイプライン実行におけるクリティカル パス上のジョブのハイライト。" width="90%">}}

ジョブの所要時間を見るだけでは十分でない場合があります。CI ジョブは通常、他のジョブと並列に実行されるため、パイプライン実行時間の短縮は、その CI ジョブの **排他的時間** をどれだけ減らせるかによって決まります。

クリティカル パス上のジョブの排他的時間は、並列で実行されていた他のジョブの実行時間を除外して、CI ランナーが特定のジョブの実行に費やした時間を表します。

{{< img src="continuous_integration/critical_path_highlight_pipeline_exclusive_time.png" alt="パイプライン実行においてクリティカル パス上のジョブの排他的時間をハイライト。" width="90%">}}

たとえば、CI ジョブ `job1` が 100 ms の所要時間でクリティカル パス上にあり、80 ms の所要時間を持つ CI ジョブ `job2` と並列で実行されている場合、クリティカル パス上における `job1` の排他的時間は 20 ms です。つまり、`job1` の所要時間を 20 ms より多く短縮しても、パイプライン全体の所要時間は 20 ms しか短縮されません。

## CI パイプラインを改善するための主要な CI ジョブを特定する

### ファセットの使用

`@ci.on_critical_path` や `@ci.critical_path.exclusive_time` といったファセットを使用すると、CI パイプライン内でどの CI ジョブがクリティカル パス上にあるかを特定できます。これらのファセットを活用して、要件に合わせたカスタム ダッシュボードやノート ブックを作成できます。

{{< img src="continuous_integration/critical_path_facets.png" alt="クリティカル パスのファセットでフィルタリング" width="90%">}}

これらのファセットは、クエリで `ci_level:job` を使用する場合にのみ利用できます。

### ダッシュボード テンプレートの使用

次のダッシュボード テンプレート [CI Visibility - Critical Path][1] をインポートすることもできます:
- ダッシュボード テンプレート [civisibility-critical-path-dashboard.json][1] を開き、内容をクリップボードにコピーします。
- Datadog で [New Dashboard][2] を作成します。
- コピーした内容を新しいダッシュボードに貼り付けます。
- ダッシュボードを保存します。

{{< img src="continuous_integration/critical_path_dashboard.png" alt="CI Visibility のクリティカル パス ダッシュボード" width="90%">}}

#### 用語

| 列                                | 説明                                                                                                                                                      |
|---------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Total Exclusive Time On Critical Path | ジョブの排他的時間の合計です。対象となるパイプラインで見込める時間短縮量の概算を示します。                                      |
| Avg Exclusive Time On Critical Path   | クリティカル パス上にある特定ジョブの平均排他的時間です。ジョブの排他的時間を減らした場合に、パイプラインの所要時間がどの程度短縮されるかを示します。 |
| Rate On Critical Path                 | ジョブがクリティカル パス上にある頻度を測定します。                                                                                                                |

##### 例

前の画像では、`metrics` という CI ジョブは合計排他的時間 (Total Exclusive Time On Critical Path) が最も高く、改善候補であることがわかります。平均排他的時間はおよそ 21 分であり、この CI ジョブについて最大 21 分の改善余地があることを意味します。

この CI ジョブが 43.5% の割合でクリティカル パス上にあることがわかっているため、パイプライン実行の 43.5% において、平均パイプライン所要時間を最大 21 分短縮できる可能性があります。

{{< img src="continuous_integration/critical_path_dashboard_outlier_job_highlighted.png" alt="排他的時間の改善候補となる CI ジョブ。" width="90%">}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /resources/json/civisibility-critical-path-dashboard.json
[2]: /ja/dashboards/
[3]: /ja/continuous_integration/pipelines/gitlab/?tab=gitlabcom
[4]: /ja/continuous_integration/search/#highlight-critical-path