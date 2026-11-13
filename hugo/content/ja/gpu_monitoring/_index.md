---
further_reading:
- link: /gpu_monitoring/setup
  tag: ドキュメント
  text: GPU モニタリングの設定
- link: https://www.datadoghq.com/blog/datadog-gpu-monitoring/
  tag: ブログ
  text: Datadog GPU Monitoring を使用して、AI インフラストラクチャーの最適化とトラブルシューティングを行いましょう。
- link: https://www.datadoghq.com/blog/monitor-tas-and-gang-scheduling-for-ai-training-in-kubernetes/
  tag: ブログ
  text: Kubernetes における AI トレーニング向けの TAS およびギャングスケジューリングを監視します。
- link: https://www.datadoghq.com/architecture/gpu-monitoring/
  tag: Architecture Center
  text: GPU 監視リファレンスアーキテクチャ
title: GPU モニタリング
---
## 概要 {#overview}
Datadog の [GPU Monitoring][1] は、GPU フリートの健全性、コスト、パフォーマンスを一元的に表示します。これにより、チームはプロビジョニングに関するより適切な意思決定を行い、AI ワークロードのパフォーマンスを最適化およびトラブルシューティングし、個別のベンダーツール（NVIDIA の DCGM など）を手動でセットアップすることなく、アイドル状態の GPU コストを削減できます。GPU Monitoring は、主要なクラウドプロバイダー（AWS、GCP、Azure、Oracle Cloud）全体にデプロイされたフリート、オンプレミスでホストされているフリート、または Coreweave や Lambda Labs などの GPU-as-a-Service プラットフォームを通じてプロビジョニングされたフリートをサポートします。

GPU アクセラレーションが有効なホストに Datadog Agent をデプロイすることで、GPU フリートに関するインサイトにアクセスできます。セットアップ手順については、[GPU Monitoring のセットアップ][2] を参照してください。

## 主な機能 {#key-capabilities}
### データに基づいた GPU の割り当てとプロビジョニングの意思決定を行う {#make-data-driven-gpu-allocation-and-provisioning-decisions}
フリート全体と利用可能な容量を包括的に把握できる Datadog の GPU Monitoring は、組織全体でインフラストラクチャーと容量を公平に割り当て、管理するのに役立ちます。

{{< img src="gpu_monitoring/funnel-3.png" alt="「GPU フリートの概要」というタイトルのファンネル可視化。合計、アクティブ、および有効なデバイスを表示します。利用率の低い GPU コアとアイドル状態のデバイスを強調表示します。" style="width:100%;" >}}

また、現在のデバイスの可用性を把握し、リソース競合によるワークロードの失敗を回避するために、特定のチームやワークロードに何台のデバイスが必要かを予測することもできます。

{{< img src="gpu_monitoring/device_allocation.png" alt="GPU の割り当てを可視化するチャート。「デバイス割り当ての推移」というタイトルの折れ線グラフ。合計/割り当て済み/アクティブなデバイス数をプロットし、4 週間先までの予測を含みます。「クラウドプロバイダーインスタンスの内訳」というタイトルのドーナツチャート。フリート全体におけるクラウドプロバイダーインスタンスの普及状況を表示します。さまざまな GPU デバイスの割り当て済み/合計を表示する「デバイスタイプの内訳」。" style="width:100%;" >}}

### モデルとアプリケーションのパフォーマンスを最大化する {#maximize-model-and-application-performance}
GPU Monitoring のリソーステレメトリを使用すると、ホスト、ノード、またはポッドごとに GPU リソースとメトリクス（GPU 使用率、電力、メモリなど）の傾向を時系列で分析でき、デバイスがモデルやアプリケーションのパフォーマンスに与える影響を理解するのに役立ちます。たとえば、ワークロードの実行のボトルネックとなる可能性のある、高価な GPU インフラストラクチャーのホットスポットや過小利用を特定できます。

{{< img src="gpu_monitoring/device_metrics.png" alt="SMアクティビティ、メモリ使用率、電力、エンジンアクティビティの構成可能な時系列の可視化を表示する、デバイスの詳細を表示します。" style="width:100%;" >}}

### ハードウェアの問題を事前に検出します {#proactively-detect-hardware-issues}
GPUは高価で希少なリソースであり、標準的なサーバーよりも故障率が高くなります。DatadogのGPUモニタリングソリューションは、すぐに使えるモニターと事前の推奨事項を提供し、ミッションクリティカルなワークロードに影響が出る前にハードウェアの問題を検出して修復できるようにします。

### 無駄なアイドル状態のGPUコストを特定して排除します {#identify-and-eliminate-wasted-idle-gpu-costs}
GPUインフラストラクチャーへの総支出を特定し、それらのコストを特定のワークロードやインスタンスに割り当てます。GPUの使用状況を関連するポッドやプロセスに直接関連付けます。

{{< img src="gpu_monitoring/fleet_costs.png" alt="デバイス（合計/割り当て済み/アクティブ/有効）、クラウドの総コスト、クラウドのアイドルコストのファネル可視化、および接続されているさまざまなエンティティ（ポッド、プロセッサ、SLURMジョブ）の可視化と詳細を表示する、クラスターの詳細を表示します。" style="width:100%;" >}}

## 始める準備はできましたか{#ready-to-start}

DatadogのGPUモニタリングのセットアップ方法については、[Set up GPU Monitoring][2]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/gpu-monitoring
[2]: /ja/gpu_monitoring/setup