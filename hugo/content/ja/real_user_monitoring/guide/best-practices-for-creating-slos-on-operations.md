---
description: RUM オペレーションメトリクスから可用性とレイテンシーの SLO を作成する方法を学びます。
further_reading:
- link: /real_user_monitoring/operations_monitoring/?tab=browser
  tag: ドキュメント
  text: オペレーションモニタリングについて学ぶ
- link: /service_level_objectives/metric/
  tag: ドキュメント
  text: メトリクスベースの SLO の作成
- link: /journey_monitoring/
  tag: ドキュメント
  text: Journey Monitoring について
- link: /real_user_monitoring/guide/best-practices-for-operations-setup/
  tag: ガイド
  text: RUM オペレーションを設定するためのベストプラクティス
- link: https://www.datadoghq.com/blog/rum-operations-monitoring/
  tag: ブログ
  text: RUM オペレーションを使用して、ユーザー ジャーニーにおける重要なステップのパフォーマンスを監視する
title: RUM オペレーションの SLO を作成するためのベストプラクティス
---
## 概要{#overview}

[RUM オペレーション][1]は、[ユーザー ジャーニー][2]における技術的なステップの可用性とレイテンシーを測定します。たとえば、オペレーションで、チェックアウトのリクエストが成功したかどうか、およびリクエストの完了にどれくらいの時間がかかったかを追跡できます。

2 つのオペレーションメトリクスを使用して[メトリクスベースの SLO][3] を作成します。

- `rum.measure.operation` を使用して、オペレーションの成功率に基づく**可用性 SLO** を作成します。
- `rum.measure.operation.duration` を使用して、オペレーションの完了時間に基づく**レイテンシー SLO** を作成します。

どちらのメトリクスにも `operation.name`、`operation.status`、`operation.failure_reason`、`application.id` タグが含まれており、これらを使用して SLO クエリを定義します。

可用性とレイテンシーの SLO を個別に作成し、オペレーションの健全性のこれらの異なる側面を測定します。

## 前提条件 {#prerequisites}

- 組織で [RUM without Limits][4] が有効になっています。
- [少なくとも 1 つの RUM オペレーションを設定][5] 済みです。

## オペレーションの結果の把握 {#understand-operation-outcomes}

各オペレーションの結果をどのように扱うかは、SLO が何を測定するかによって異なります。

| 結果                | 可用性 SLO | レイテンシー SLO                                      |
|------------------------|------------------|--------------------------------------------------|
| 成功                | 良好イベント       | しきい値以下で良好、それを超える場合は不良     |
| エラーまたはその他の失敗 | 不良イベント        | 除外                                         |
| 離脱            | 除外         | しきい値を超える場合は不良、それ以外は除外      |
| タイムアウト                | 不良イベント        | 除外                                         |

**可用性 SLO では離脱を除外します**。オペレーションが完了する前に離脱したユーザーが、必ずしも技術的な障害に遭遇したとは限らないためです。**レイテンシー SLO が離脱を含めるのは**、離脱までの時間がしきい値を超えた場合に限ります。この扱いにより、離脱が両方の SLO で不良としてカウントされることも防げます。

**可用性 SLO ではタイムアウトを失敗したイベントとして含めます**。これは、他のオペレーションの失敗との整合性を保ち、オペレーションの終了が記録されないパスで潜在的な問題を見逃さないようにするためです。**レイテンシー SLO ではタイムアウトを除外します**。RUM はオペレーションの開始を記録しますが、終了は記録しないため、その時間ではアプリケーションのパフォーマンスを正確に測定できないからです。

## SLO の作成へ移動 {#navigate-to-slo-creation}

SLO 作成ワークフローは、RUM または SLO ページから開くことができます。

### RUM から移動 {#navigate-from-rum}

Datadog は選択したオペレーションを使用して SLO クエリを初期化するため、オペレーションレポートから開始する方が便利です。SLO ページから開始する場合は、オペレーションのクエリを最初から構築する必要があります。

1. **[RUM] > [Performance Monitoring] > [Operations]** に移動します。
2. カタログからオペレーションを選択します。
3. オペレーションレポート上部の [{{< ui >}}SLOs{{< /ui >}}] セクションで [{{< ui >}}Create{{< /ui >}}] をクリックします。
4. 作成する SLO のタイプを選択します。

### SLO ページから移動 {#navigate-from-the-slo-page}

1. 左側のナビゲーションで、**[Monitoring] > [SLOs]** を選択します。
2. [{{< ui >}}\+ New SLO{{< /ui >}}] をクリックし、[{{< ui >}}By Count{{< /ui >}}] を選択します。

SLO 作成ワークフローを開いたら、可用性 SLO またはレイテンシー SLO の [SLO クエリを構成](#configure-the-slo-query)します。

## SLO クエリの構成 {#configure-the-slo-query}

作成する SLO のタイプに対応するクエリを選択します。`<OPERATION_NAME>` をオペレーション名に、`<APPLICATION_ID>` を RUM アプリケーション ID に置き換えます。

### 可用性 SLO {#availability-slo}

可用性 SLO は、オペレーションが正常に完了するかどうかを測定します。

- **良好イベント**には、正常に完了したオペレーションが含まれます。
- **不良イベント**には、離脱以外の失敗したオペレーションが含まれます。

{{< img src="real_user_monitoring/guide/operations-monitoring/operations-monitoring-availability-slo-example.png" alt="良好なイベントと不良イベントのクエリおよびプレビューグラフを含む、カウントベースの可用性 SLO を示す [Create SLO] ページ" style="width:100%;" >}}

良好イベントには、この未加工のクエリを使用します。

{{< code-block lang="text" >}}
sum:rum.measure.operation{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:success}.as_count()
{{< /code-block >}}

不良イベントには、この未加工のクエリを使用します。

{{< code-block lang="text" >}}
sum:rum.measure.operation{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:failure AND NOT operation.failure_reason:abandoned}.as_count()
{{< /code-block >}}

SLO は可用性を `successful operations / (successful operations + non-abandoned failures)` として計算します。

### レイテンシー SLO {#latency-slo}

レイテンシー SLO は、オペレーションが許容可能な時間内に完了するかどうかを測定します。期待されるユーザーエクスペリエンスと、観測されたオペレーションの時間に基づいてしきい値を選択します。たとえば、ユーザーがチェックアウトの送信を 3 秒以内に完了することを期待している場合は、3 秒のしきい値を使用します。

{{< img src="real_user_monitoring/guide/operations-monitoring/operations-monitoring-latency-slo-example.png" alt="良好なイベントと不良イベントのクエリおよびプレビューグラフを含む、カウントベースのレイテンシー SLO を示す SLO 作成ページ" style="width:100%;" >}}

`rum.measure.operation.duration` メトリクスはナノ秒を使用します。秒に `1,000,000,000` を掛けて、しきい値をナノ秒に変換します。たとえば、3 秒は `3,000,000,000` ナノ秒に相当します。

`<LATENCY_THRESHOLD_NS>` をナノ秒単位のしきい値に置き換え、以下のイベントを構成します。

- **良好なイベント**には、しきい値以下で正常に完了したオペレーションが含まれます。
- **不良イベント**には、時間がしきい値を超えた、正常に完了したオペレーションと離脱したオペレーションが含まれます。

良好イベントには、この未加工のクエリを使用します。

{{< code-block lang="text" >}}
count(v: v<=<LATENCY_THRESHOLD_NS>):rum.measure.operation.duration{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:success}.as_count()
{{< /code-block >}}

これら 2 つの未加工のクエリの合計を不良イベントとして定義します。

{{< code-block lang="text" >}}
count(v: v><LATENCY_THRESHOLD_NS>):rum.measure.operation.duration{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:success}.as_count()
{{< /code-block >}}

{{< code-block lang="text" >}}
count(v: v><LATENCY_THRESHOLD_NS>):rum.measure.operation.duration{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:failure AND operation.failure_reason:abandoned}.as_count()
{{< /code-block >}}

SLO はレイテンシーを `fast successful operations / (all successful operations + slow abandoned operations)` として計算します。

### SLO の完成 {#complete-the-slo}

可用性またはレイテンシーのクエリを設定したら、次の手順に進みます。

1. 重要なユーザージャーニーに対して、30 日間のローリングウィンドウで 99% の目標から始めます。ジャーニーの信頼性要件と過去のパフォーマンスに基づいて目標を調整します。
2. すべてのクエリに同じスコープ、フィルター、グループを適用します。
3. わかりやすい名前とオプションのタグを追加します。
4. SLO を保存します。

## SLO の検証 {#validate-the-slos}

SLO を作成した後、次のように検証します。

1. 良好なイベントのクエリと不良イベントのクエリが重複していないことを確認します。
2. すべてのクエリで同じオペレーションのスコープ、フィルター、グループが使用されていることを確認します。
3. SLO イベント数を [{{< ui >}}Operations{{< /ui >}}] ページのオペレーションの量と比較します。
4. [タイムアウトしたオペレーション][6]を確認します ([**Parallelization**] の下の注記を参照)。タイムアウト率が高い場合、一部のアプリケーションパスで、終了を記録せずにオペレーションが開始されている可能性があります。
5. レイテンシーのしきい値がナノ秒単位であり、そのオペレーションの許容可能な完了時間を表していることを確認します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/operations_monitoring/?tab=browser
[2]: /ja/journey_monitoring/
[3]: /ja/service_level_objectives/metric/
[4]: /ja/real_user_monitoring/rum_without_limits/
[5]: /ja/real_user_monitoring/guide/best-practices-for-operations-setup/
[6]: /ja/real_user_monitoring/operations_monitoring/?tab=browser#parallelization