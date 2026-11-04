---
description: プロビジョニングの改善とコストの最適化に役立つ、GPU フリート全体のリアルタイムインサイト
further_reading:
- link: https://www.datadoghq.com/blog/datadog-gpu-monitoring/
  tag: ブログ
  text: Datadog GPU Monitoring を使った AI インフラストラクチャーの最適化とトラブルシューティング
- link: /gpu_monitoring/explorer
  tag: ドキュメント
  text: GPU Monitoring エクスプローラー
title: GPU モニタリングの概要ページ
---
## 概要 {#overview}

[GPU モニタリングの概要ページ][0]では、GPU フリート全体を分析し、選択された期間におけるオンプレミスおよびクラウドデバイス全体の統合されたインサイトを強調表示します。このページでは、次のような重要な質問に回答しています。
- どれくらいのフリートが有効に活用され、どれくらいのフリートが完全なアイドル状態になっていますか。
- アイドル時間に基づいて、最も無駄が多いのはどのチーム、サービス、またはクラスターですか。
- ワークロードの需要とクォータ使用効率に合わせてこれらのデバイスをより適切にプロビジョニングするにはどうすればよいですか。
- 既存の GPU フリートからより多くの価値を得るために、どのような最適化アクションを実行できますか。

以下のセクションタイトルをクリックして、対応するセクションにアクセスします。
- [フリート全体の使用状況](#usage-across-fleet)
- [コストと利用率](#cost--utilization)
- [割り当てとプロビジョニング](#allocation-and-provisioning)
- [ワークロード最適化の機会](#workload-optimization-opportunities)

## フリート全体の使用状況 {#usage-across-fleet}

運用効率は、全体的なコストを左右する重要な要素です。GPU フリートの使用状況を把握することで、過剰なプロビジョニングを回避し、アイドル状態の GPU にかかるコストを削減できます。

### GPU フリートファネルの可視化 {#gpu-fleet-funnel-visualization}

Datadog GPU Monitoring は、オンプレミスとクラウドの両方のデバイスについて、単一の統合ビューで監視可能性を提供します。

この可視化機能では、主要なクラウドプロバイダー (AWS、GCP、Azure、Oracle Cloud)、ホストされたオンプレミス、または Coreweave や Lambda Labs のような GPUaaS プロバイダーでホストされた GPU フリート全体の内訳を確認でき、すべての Kubernetes クラスター、ホスト、GPU デバイスが表示されます。

このファネルは、アイドル状態のデバイス、十分に活用されていない GPU コア、再調整が必要なリソース不足など、チームのリソース利用におけるパフォーマンスの問題やプロビジョニングの非効率性も明らかにします。

{{< img src="gpu_monitoring/funnel-5.jpg" alt="「Your GPU fleet at a glance」というタイトルのファネルの可視化。合計デバイス、アクティブデバイス、有効なデバイス、Kubernetes の割り当て、および 1 週間の予測を伴うデバイスの割り当てを時系列で表示します。" style="width:90%;" >}}

ファネルのステップは次のように定義されています。
- {{< ui >}}Total Devices{{< /ui >}}: GPU モニタリングが正しく設定され、メトリクスを報告している GPU デバイスの数
- {{< ui >}}Active Devices{{< /ui >}}: ワークロードにアクティブに使用されており、価値を提供している GPU デバイスの数
- {{< ui >}}Effective Devices{{< /ui >}}: 選択された期間の 50% を超えて稼働している GPU デバイスの数

Kubernetes を使用し、Kubernetes インテグレーションを有効にしている場合は、Kubernetes 割り当てに関する追加情報が表示されます。これにより、Kubernetes ワークロードに {{< ui >}}Allocated{{< /ui >}} されている GPU デバイスの数を確認できます。

### デバイスの時系列割り当て {#device-allocation-over-time}

AI ワークロードでは、リソース使用量が予測不能な急増を見せることがあります。そのため、利用可能な GPU を今後のワークロードに合わせて調整することが重要です。このセクションは、GPU を過剰に割り当ててアイドル状態にしているか、あるいはリソースの供給が不足して重要なジョブを停滞させているかを特定する上で役立ちます。

たとえば、割り当てられたデバイス数の予測値が急増している場合、将来のワークロードで追加の GPU デバイスが必要になる可能性があります。

## コストと利用率 {#cost-utilization}

{{< img src="gpu_monitoring/cost-and-utilization2.jpg" alt="クラスター別にグループ化された合計 GPU 時間と推定コストの経時変化、およびアイドル時間と推定アイドルコスト別のトップクラスターを示すアイドル GPU 内訳が表示されたコストと利用率ページ。" style="width:90%;" >}}

このセクションを使用して、クラウド GPU の総支出と利用効率を追跡し、最も無駄の多いクラスター、チーム、またはサービスを特定します。

**注**: クラウド GPU の総支出を確認するには、Datadog UI で [AWS][3]、[Google Cloud][4]、[Azure][5]、または [Oracle][6] クラウドインテグレーションを有効にする必要があります。

合計 GPU 時間または推定 GPU クラウド支出をクリックすると、それらの経時的な傾向を確認できます。また、これらをサービスやクラスターなどの主要なタグで分類し、1 週間、1 か月、または 3 か月の期間で表示することもできます。{{< ui >}}Idle GPU Breakdown{{< /ui >}} の下では、デバイスが完全にアイドル状態になっている最も無駄の多いチーム、サービス、またはクラスターを特定できます。任意のエンティティをクリックすると、[エクスプローラー][1]で開き、さらなる最適化を行うことができます。たとえば、特定のクラスターのコストが高い場合、[エクスプローラー][1]ページで Pod レベルの使用状況を表示して、Pod をシャットダウンしたり、クラスターのサイズを変更したりできます。

## 割り当てとプロビジョニング {#allocation-and-provisioning}

このセクションを使用して、GPU の割り当てと容量に関するインサイトを取得します。これは、GPU の制約による失敗ワークロードのトラブルシューティングを行い、フリートの運用効率を向上させる上で役立ちます。

### クラウドプロバイダーのインスタンスの内訳 {#cloud-provider-instance-breakdown}

主要なクラウドプロバイダーを通じてデプロイされた GPU に依存している場合、このウィジェットはフリート内のクラウドインスタンスタイプの内訳を表示します。

{{< img src="gpu_monitoring/instance_breakdown.png" alt="クラウドプロバイダーのインスタンスの内訳ウィジェット" style="width:90%;" >}}

### デバイスタイプの内訳 {#device-type-breakdown}

AI ワークロードが失敗する場合、コードのパフォーマンスではなく、利用可能な GPU デバイスの数が原因である可能性があります。このウィジェットは、すべての GPU デバイスタイプにわたるデバイスの可用性を表示し、完全に飽和しているデバイスタイププールを強調表示します (追加のデバイスが必要である可能性があることを示します)。

デバイスタイププールに追加のプロビジョニングが必要かどうかを把握するには、このデータをその下の {{< ui >}}Unmet GPU requests{{< /ui >}} ウィジェットと照らし合わせてチェックします。

**注**: いずれかのデバイスタイプで利用可能なデバイスの数がデバイス総数の 5% 未満である場合、そのデバイスタイプは赤色で強調表示されます。

{{< img src="gpu_monitoring/device_type.png" alt="GPU デバイスタイプ別の可用性" style="width:90%;" >}}

### GPU リソースが不足している領域の特定とプロビジョニング判断への活用 (Kubernetes が必要) {#pinpoint-areas-with-insufficient-gpu-resources-to-guide-provisioning-decisions-kubernetes-required}

**注**: このセクションは Kubernetes ユーザーのみ利用可能です。

このセクションを使用して、Kubernetes クラスターに対する未充足の GPU リクエスト数を特定します。

{{< img src="gpu_monitoring/unmet-requests-2.png" alt="GPU リクエストの未充足数による Kubernetes クラスターのトップリスト。" style="width:90%;" >}}

GPU リクエストの未充足数が多い Kubernetes クラスターがある場合は、{{< ui >}}Device Type Breakdown{{< /ui >}} ウィジェットを確認して特定のサービスがどのデバイスタイプに依存しているかを把握し、{{< ui >}}Device Allocation over time{{< /ui >}} ウィジェットを確認して過去の需要を追跡することもできます。これは、これらのクラスターとデバイスタイプが一貫してプロビジョニング不足であるかどうかを確認する上で役立ちます。

**注**: サービスやクラスターが一覧に表示されず、適切なタグを出力している場合、選択した期間中にすべてのサービスとクラスターが十分な GPU リソースを確保していることを示しています。

## ワークロード最適化の機会 {#workload-optimization-opportunities}

GPU はチームのインフラストラクチャー予算の中で最も高価な項目であることが多いため、GPU ワークロードのコスト最適化は非常に重要です。このセクションでは、GPU の利用効率が低いワークロードを明らかにし、無駄なコストを特定のワークロードとそのリソース使用量に関連付けます。

### 非効率な Pod (Kubernetes が必要) {#ineffective-pods-kubernetes-required}

**注**: このセクションは Kubernetes ユーザーのみ利用可能です。

GPU インフラストラクチャーへの支出の価値を最大化するには、GPU デバイスを常に稼働させ続けることが重要です。このウィジェットは、どの Pod が関連付けられた GPU デバイスを非効率に使用しているかを明らかにします。テーブルはデフォルトで {{< ui >}}SM activity{{< /ui >}} によってソートされています。

{{< img src="gpu_monitoring/inefficient_pods.png" alt="SM Engine Activity レベル順にソートされた、非効率な Pod のテーブル。" style="width:90%;" >}}

非効率な Pod をクリックすると、Kubernetes エクスプローラーページで表示するオプションを含むメニューが開きます。Kubernetes エクスプローラーページでは、Pod の詳細ビューにアクセスし、{{< ui >}}GPU{{< /ui >}} タブをクリックして関連する GPU デバイスを確認できます。

たとえば、SM アクティビティの時系列グラフが 50% を下回っていることに気付くかもしれません。その場合、特定の期間中にデバイスの {{< ui >}}Memory Utilization{{< /ui >}} と {{< ui >}}Graphics Activity{{< /ui >}} の値が急上昇していないかをチェックできます。急上昇していれば、それが SM Engine Activity が低い (デバイスがアイドル状態である) 理由です。これを改善するには、ワークロードをより少ないデバイスに統合する、より小さな GPU を使用する、または既存の GPU でより高いスループットを得られるようコードを最適化することについて、Pod の所有者に相談できます。

このウィジェットは、「ノイズの多いネイバー」(1 つ以上の Pod がホスト上の共有リソースを不釣り合いに大量に消費している状態) を特定する上でも役立ちます。たとえば、別の Pod が特定のホストの CPU をすべて使用し、そのホスト上の他の Pod が CPU を使えなくなる可能性があります。

### ゾンビプロセス (Live Processes が必要) {#zombie-processes-live-processes-required}

**注**: このセクションは、[Live Processes][2] 製品をインストールしているお客様のみ利用可能です。

ゾンビプロセスは、不適切に GPU 容量を確保するため、GPU の無駄な支出の主な原因となることがよくあります。このウィジェットは、他のワークロードのために GPU 容量を解放する目的で終了させるべきゾンビプロセスを一覧表示します。

{{< img src="gpu_monitoring/zombie_processes.png" alt="GPU 容量を解放するために終了させる必要があるゾンビプロセスを、SM Engine Activity 順に並べたテーブル。" style="width:90%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[0]: https://app.datadoghq.com/gpu-monitoring
[1]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=fleet
[2]: /ja/infrastructure/process/?tab=linuxwindows
[3]: /ja/getting_started/integrations/aws/
[4]: /ja/getting_started/integrations/google_cloud/?tab=orglevel
[5]: /ja/getting_started/integrations/azure/?tab=createanappregistration
[6]: /ja/getting_started/integrations/oci/