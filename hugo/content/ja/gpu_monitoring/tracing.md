---
description: 一部の Kubernetes ワークロードの GPU アクティビティトレースを有効にしします。
further_reading:
- link: /gpu_monitoring/setup
  tag: ドキュメント
  text: GPU モニタリングの設定
- link: /gpu_monitoring
  tag: GPU モニタリングとは
  text: GPU モニタリングの機能の詳細
is_beta: true
private: true
title: GPU モニタリングによる継続的なトレース
---
{{< beta-callout url="#" btn_hidden="true" >}}
GPU モニタリングによる継続的なトレースは、アーリーアクセスプレビュー版です。
{{< /beta-callout >}}

## 概要 {#overview}

GPU モニタリングによる継続的なトレースを使用すると、一部の Kubernetes ワークロードの軽量な GPU アクティビティトレースが可能になります。大規模な分散ワークロードのトラブルシューティングは、煩雑で時間がかかることがあります。GPU モニタリングのこのトレース機能を使用すると、CUDA および NCCL オペレーションをモデルや PyTorch オペレーションに関連付ける詳細な実行トレースを使用して、ボトルネックを特定および調査できます。

{{< img src="gpu_monitoring/gpu-tracing.png" alt="torch.step トレースのフレームグラフビュー。CPU スパンが GPU ストリームアクティビティに整列されています (NCCL allgather オペレーションと CUDA カーネル起動を含む)。" style="width:100%;" >}}

## セットアップ {#setup}

### 前提条件 {#prerequisites}

ワークロードの継続的なトレースを開始するには、まず以下の条件を満たしている必要があります。
- [GPU モニタリングを有効にして][1] Datadog Cluster Agent バージョン 7.80 以上を実行していること。
- CUDA および CUPTI の最小必須バージョン: 13。

### 1. GPU トレースを構成する {#1-configure-gpu-tracing}

以下の構成を既存の `DatadogAgent` リソースにマージします。

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
```

構成を適用し、`DatadogAgent`のロールアウトが完了するまで待ちます。

### 2. GPU ワークロードにラベルを付ける {#2-label-the-gpu-workload}

コントローラーの Pod ポッドテンプレートにラベルを追加します。ワークロードは Agent ネームスペースの外に存在している必要があります。ジョブの場合は `spec.template.metadata.labels` を使用します。KubeRay の場合は、ヘッドおよびワーカー Pod テンプレートにラベルを付けます。

```yaml
spec:
  template:
    metadata:
      labels:
        admission.datadoghq.com/gpu.enabled: "true"
```

リソースを適用し、ロールアウトが完了するまで待ちます。

### 3. セットアップを検証する {#3-verify-setup}

```shell
# Confirm setup containers completed
kubectl get pod <NEW_GPU_POD> -n <GPU_WORKLOAD_NAMESPACE> \
  -o jsonpath='{range .status.initContainerStatuses[*]}{.name}{" exit="}{.state.terminated.exitCode}{"\n"}{end}'

# Confirm the GPU tracing settings
kubectl exec <NEW_GPU_POD> -n <GPU_WORKLOAD_NAMESPACE> -- sh -c \
  'env | grep -E "^(DD_INJECT_NATIVE|DD_TRACE_HOOK_MODULES|DD_SERVICE|DD_ENV)="'
```

**セットアップコンテナがありませんか？**ラベルが Pod テンプレートに付いていること、Pod が新しいこと、およびワークロードが Agent ネームスペースの外にあることを確認します。次に、Cluster Agent のログを調べます。

### 4. トレースを調べる {#4-explore-traces}

ワークロードを実行し、[APM Trace Explorer][2] で以下をクエリします。

```
pod_name:<NEW_GPU_POD> kube_namespace:<GPU_WORKLOAD_NAMESPACE>
```

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/gpu_monitoring/setup
[2]: /ja/tracing/trace_explorer/