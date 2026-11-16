---
description: チームやキューごとの GPU クォータ使用量を追跡し、オーバーサブスクライブされている GPU タイプを特定して、ワークロードが保留中または強制終了された理由を把握します。
further_reading:
- link: /gpu_monitoring/setup
  tag: ドキュメント
  text: GPU Monitoring の設定
- link: /gpu_monitoring/fleet
  tag: ドキュメント
  text: フリートページで GPU フリートを探索する
- link: /gpu_monitoring
  tag: ドキュメント
  text: GPU Monitoring の機能の詳細
title: GPU Monitoring による GPU キャパシティの計画
---
{{< callout url="https://www.datadoghq.com/product-preview/gpu-monitoring-capacity-planning/" >}}
GPU Monitoring のキャパシティプランニングは、アーリーアクセスプレビュー版です。フォームに入力してアクセスをリクエストします。
{{< /callout >}}

## 概要 {#overview}

多くのチームが高価な GPU プールを共有している場合、どのチームがデバイスを十分に活用できていないかを把握するのは困難です。また、リソースの競合を特定したり、ジョブが保留状態で停滞している理由を把握したりするのも困難です。GPU Monitoring のキャパシティプランニングページでは、プラットフォームチームとワークロード所有者が、キュー全体の GPU プロビジョニングを共通のビューで確認できます。手動でのフィルタリングやクエリは不要です。これを使用してワークロードを安定して実行し、GPU フリートを最大限に活用できます。

キャパシティプランニングページを使用すると、次のような疑問を解決できます。

- **どのチームやプロジェクトがクォータを過剰使用または過少使用していますか?**未使用のクォータを特定し、組織全体でコンピューティングリソースを公平に再割り当てします。
- **どの GPU タイプがオーバーサブスクライブされていますか?**需要がクォータを超えている箇所を特定し、キャパシティを追加できるようにします。
- **ワークロードの現在の状態はどうなっていますか?**各ワークロードが承認済み、保留中、強制終了された状態のいずれであるか、また何台の GPU を使用しているかを確認します。
- **ワークロードが遅延または強制終了された理由は?**保留中およびプリエンプトされたワークロードを、キュー内のクォータや競合と関連付けます。

{{< img src="gpu_monitoring/capacity-planning-page.png" alt="ワークロード一覧の上に GPU クォータ、アイドル状態の割り当て済み GPU、プリエンプション、フリートカバレッジのグラフを表示している GPU Monitoring のキャパシティプランニングページ。" style="width:100%;" >}}

## 前提条件{#prerequisites}

キャパシティプランニングページを使用するには、以下の要件を満たす必要があります。
- [GPU Monitoring を有効][1]にした状態で Datadog Agent バージョン 7.84.1 以降を実行していること。アップグレードするには、[Fleet Automation による Agent のアップグレード][2]を参照してください。
- GPU ワークロードが Kubernetes 上で実行されていること。
- Datadog で [Kueue インテグレーション][3]が有効になっていること。詳細については、[Kueue インテグレーションのドキュメント][4]を参照してください。

## キャパシティプランニングページの探索{#explore-the-capacity-planning-page}

開始するには、GPU Monitoring の[キャパシティプランニングページ][5]に移動します。

### チームとキューによるフィルタリング{#filter-by-team-and-queue}

ページ上部のフィルターを使用して、ビューのスコープを絞り込みます。{{< ui >}}Team{{< /ui >}}、{{< ui >}}Cluster Name{{< /ui >}}、{{< ui >}}Cluster Queue{{< /ui >}}、{{< ui >}}Resource Flavor{{< /ui >}}、{{< ui >}}Provider{{< /ui >}}、{{< ui >}}Datacenter{{< /ui >}}、{{< ui >}}Environment{{< /ui >}} でフィルタリングできます。フィルタリングされたビューを保存して、後から参照できます。

### クォータと使用率 {#quota-and-utilization}

ページ上部のグラフには、フリート全体で GPU クォータがどのように使用されているかが表示されます。

| グラフ | 説明 |
|-------|-------------|
| GPU クォータの未割り当て数 | ClusterQueue ごとにグループ化された、使用されていないクォータ内の GPU 数。|
| GPU クォータの未割り当て率 | ClusterQueue ごとにグループ化された、使用されていない GPU クォータの割合。|
| アイドル状態の割り当て済み GPU | ClusterQueue ごとにグループ化された、エンジン作業を行っていない割り当て済み GPU の数。|
| プリエンプション率 | ClusterQueue ごとにグループ化された、承認済みワークロードあたりのプリエンプションにより強制終了されたワークロードの割合。|
| フリートの GPU カバレッジ | フリート全体でアクティブ、アイドル、未割り当ての各デバイスに分けた割り当て済み GPU クォータ。|
| 飽和度 - クォータ超過 GPU | 公称クォータを超えて使用された GPU 数でランク付けされた ClusterQueue と ResourceFlavor のペア。|

未割り当てクォータが多い、またはアイドル状態の割り当て済み GPU が多いキューは、再割り当ての候補となります。常にクォータを超過して実行されているキューや、プリエンプション率が高いキューは、より多くのキャパシティが必要になる可能性があります。

### キューとワークロード{#queues-and-workloads}

ページ下部のテーブルには、2 つのタブがあります。

- {{< ui >}}Queues{{< /ui >}}: 各キューとそのクォータおよび使用量を一覧表示します。
- {{< ui >}}Workloads{{< /ui >}}: 各ワークロードのチーム、クラスター、ClusterQueue、リソースフレーバー別の GPU 使用量、および {{< ui >}}Admitted{{< /ui >}} などの最新ステータスを一覧表示します。

{{< ui >}}Workloads{{< /ui >}} タブを使用してワークロードの現在の状態を確認し、保留中または強制終了されたワークロードを調査します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/gpu_monitoring/setup
[2]: /ja/agent/guide/upgrade_agent_fleet_automation/
[3]: https://app.datadoghq.com/integrations?search=kueue
[4]: /ja/integrations/kueue/
[5]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=capacity-planning