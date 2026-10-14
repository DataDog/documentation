---
description: 停止または失敗したトレーニング実行のトラブルシューティングを行い、トレーニングワークロードのスループットを最大化します。
further_reading:
- link: /gpu_monitoring/setup
  tag: ドキュメント
  text: GPU モニタリングの設定
- link: /gpu_monitoring/tracing
  tag: ドキュメント
  text: GPU モニタリングによる継続的なトレース
- link: /gpu_monitoring
  tag: ドキュメント
  text: GPU モニタリングの機能の詳細
title: GPUモニタリングによるトレーニングワークロードの最適化
---
{{< callout url="https://www.datadoghq.com/product-preview/gpu-monitoring-training-obs/" >}}
GPUモニタリングによるトレーニングワークロードの最適化は、アーリーアクセスプレビュー版です。フォームに入力してアクセスをリクエストします。
{{< /callout >}}

## 概要 {#overview}

トレーニングワークロードは頻繁に失敗し、そのたびに高価なGPU時間が無駄になります。大規模な分散トレーニングワークロードのデバッグは、MLOps、プラットフォーム、およびMLエンジニアリングチームにとって時間がかかる場合があります。GPUモニタリングのトレーニングページは、停止または失敗したワークロードのトラブルシューティングを行い、トレーニング実行の全体的なスループットを最大化するのに役立ちます。このページでは、各トレーニング実行を、それが実行されたGPUハードウェアおよびネットワークインターコネクトの健全性と関連付けます。

トレーニングページでは、以下のことが可能です。

- **停止または失敗したトレーニングワークロードのAgentによる根本原因分析**: ハードウェアの不具合、通信、メモリ帯域幅、スケジューリングのいずれが原因であるかにかかわらず、トレーニングワークロードが失敗または遅延している理由を特定します。
- **トレーニング実行のパフォーマンス最適化**: 成功したトレーニング実行において、スループットを向上させるための最も影響の大きい機会を特定します。

{{< img src="gpu_monitoring/training-page.png" alt="GPUモニタリングのトレーニングページは、トレーニング実行のインサイト、実行の時系列棒グラフ、およびトレーニング実行のリストを表示します。" style="width:100%;" >}}

## セットアップ {#setup}

### 前提条件{#prerequisites}

トレーニングワークロードのモニタリングを開始するには、まず以下の基準を満たす必要があります。
- [GPU モニタリングを有効にして][1] Datadog Cluster Agent バージョン 7.80 以上を実行していること。
- CUDAおよびCUPTIのバージョン13以降を実行していること。

### 1. トレーニング実行をGPUハードウェアに接続する {#1-connect-training-runs-to-gpu-hardware}

Kubernetesワークロードには、トレーニング実行や実行グループを識別するラベルやアノテーションが付いている場合があります。このステップでは、それらの識別子をタグとしてGPUメトリクスに追加し、トレーニング実行データを実行されたGPUハードウェアに直接関連付けます。ステップ2では、同じ識別子をトレースに追加します。

以下の例では、`company.name/run-id`および`company.name/group-id`のPodアノテーションを使用しています。これらを、お使いのワークロードで使用しているアノテーションに置き換えてください。

メトリクスについては、[タグ抽出][2]を使用してアノテーションをタグにマッピングしてください。以下の構成を既存の `DatadogAgent` リソースにマージします。

```yaml
spec:
  global:
    kubernetesResourcesAnnotationsAsTags:
      pods:
        company.name/run-id: training_run_id
        company.name/group-id: training_group_id
```

アノテーションの代わりにPodラベルを使用するには、メトリクスに`kubernetesResourcesLabelsAsTags`を使用します。

この設定を適用すると、GPU メトリクスに `training_run_id` と `training_group_id` がタグ付けされます。

### 2. GPU トレースを構成する {#2-configure-gpu-tracing}

GPU トレースを有効にし、トレーニング実行およびグループの識別子をトレースに追加するには、以下の設定を既存の DatadogAgent リソースにマージします。

```yaml
spec:
  features:
    apm:
      enabled: true
      instrumentation:
        enabled: true
        targets:
          - name: gpu-monitoring
            podSelector:
              matchLabels:
                admission.datadoghq.com/gpu.enabled: "true"
            ddTraceVersions:
              c: "0.20.0"
            ddTraceConfigs:
              - name: DD_INJECT_NATIVE
                value: "always"
              - name: DD_TRACE_HOOK_MODULES
                value: "gpu"
              - name: DD_TRAINING_RUN_ID
                valueFrom:
                  fieldRef:
                    fieldPath: metadata.annotations['company.name/run-id']
              - name: DD_TRAINING_GROUP_ID
                valueFrom:
                  fieldRef:
                    fieldPath: metadata.annotations['company.name/group-id']
```

アノテーションの代わりにPodラベルを使用するには、トレースの `fieldPath` として `metadata.labels['<LABEL_KEY>']` を設定します。

構成を適用し、`DatadogAgent`のロールアウトが完了するまで待ちます。この設定により、[GPU ワークロードにラベルを付ける](#3-label-the-gpu-workload) ステップでラベル付けしたワークロードからのトレースに、`training.run_id` と `training.group_id` がタグ付けされます。

### 3. GPU ワークロードにラベルを付ける {#3-label-the-gpu-workload}

ワークロードのコントローラー（ジョブなど）のPodテンプレートに`admission.datadoghq.com/gpu.enabled: "true"`ラベルを追加します。ワークロードは、Agentがデプロイされている名前空間の外で実行する必要があります。ジョブの場合は、`spec.template.metadata.labels`の下にラベルを追加します。

```yaml
spec:
  template:
    metadata:
      labels:
        admission.datadoghq.com/gpu.enabled: "true"
```

リソースを適用し、ロールアウトが完了するまで待ちます。

### 4. セットアップを検証する {#4-verify-setup}

新しく作成されたGPU Podに対して以下のコマンドを実行し、セットアップを確認します。

```shell
# Confirm setup containers completed
kubectl get pod <NEW_GPU_POD> -n <GPU_WORKLOAD_NAMESPACE> \
  -o jsonpath='{range .status.initContainerStatuses[*]}{.name}{" exit="}{.state.terminated.exitCode}{"\n"}{end}'

# Confirm the GPU tracing settings
kubectl exec <NEW_GPU_POD> -n <GPU_WORKLOAD_NAMESPACE> -- sh -c \
  'env | grep -E "^(DD_INJECT_NATIVE|DD_TRACE_HOOK_MODULES|DD_SERVICE|DD_ENV)="'
```

**セットアップコンテナがありませんか？**ラベルがPodテンプレートに存在すること、設定を適用した後にPodが作成されたこと、およびワークロードがAgentの名前空間外で実行されていることを確認してください。次に、Cluster Agent のログを調べます。

セットアップが完了すると、GPU メトリクスには `training_run_id` と `training_group_id` がタグ付けされ、トレースには `training.run_id` と `training.group_id` がタグ付けされます。これらのタグを使用して、同じトレーニング実行の GPU メトリクスとトレースをフィルタリングします。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/gpu_monitoring/setup
[2]: /ja/containers/kubernetes/tag/?tab=datadogoperator#tag-extraction